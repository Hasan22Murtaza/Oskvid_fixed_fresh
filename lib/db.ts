import type BetterSqlite3 from 'better-sqlite3'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'path'
import seedContent from '@/data/content.json'

type SqliteDatabase = BetterSqlite3.Database
type SeedContent = Record<string, any>

const PRIMARY_DATA_DIR = path.join(process.cwd(), 'data')
const PRIMARY_DB_PATH = path.join(PRIMARY_DATA_DIR, 'cms.db')
const CONTENT_JSON_PATH = path.join(PRIMARY_DATA_DIR, 'content.json')

// Vercel serverless functions may not allow writes to the project directory.
// This temp dir is writable and will let the app boot reliably.
const TMP_DATA_DIR = path.join(os.tmpdir(), 'oskvid-cms')
const TMP_DB_PATH = path.join(TMP_DATA_DIR, 'cms.db')

let DatabaseCtor: typeof BetterSqlite3 | null | undefined
let db: SqliteDatabase | null = null
let seedLoaded = false
let sqliteUnavailable = false

const DEFAULT_STATS = {
  totalEdits: 156,
  lastUpdate: '',
  totalPages: 12,
  totalImages: 48,
  totalVideos: 6,
  activeUsers: 1,
}

const DEFAULT_STATS_DATA = JSON.stringify(DEFAULT_STATS)

function loadSeed(): SeedContent {
  if (!seedContent || typeof seedContent !== 'object') return {}
  return seedContent as SeedContent
}

function readJsonStore(): SeedContent {
  try {
    const raw = readFileSync(CONTENT_JSON_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') return parsed as SeedContent
  } catch {
    // Bundled seed is always available even if the data dir is read-only.
  }
  return loadSeed()
}

function writeJsonStore(content: SeedContent): void {
  mkdirSync(PRIMARY_DATA_DIR, { recursive: true })
  writeFileSync(CONTENT_JSON_PATH, JSON.stringify(content, null, 3), 'utf8')
}

function getDatabaseCtor(): typeof BetterSqlite3 | null {
  if (DatabaseCtor !== undefined) return DatabaseCtor
  try {
    // Native addon must stay external to webpack (see next.config.mjs).
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    DatabaseCtor = require('better-sqlite3') as typeof BetterSqlite3
  } catch (error) {
    console.warn('better-sqlite3 unavailable, using JSON content store:', error)
    DatabaseCtor = null
    sqliteUnavailable = true
  }
  return DatabaseCtor
}

function ensureSchema(database: SqliteDatabase) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS cms_data (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      content_data TEXT NOT NULL DEFAULT '{}',
      stats_data TEXT NOT NULL DEFAULT '{}'
    )
  `)
}

function insertOrSeed(database: SqliteDatabase) {
  const existingRow = database
    .prepare('SELECT content_data FROM cms_data WHERE id = 1')
    .get() as { content_data: string } | undefined

  const seed = readJsonStore()
  const shouldSeed =
    Object.keys(seed).length > 0 &&
    (!existingRow ||
      (() => {
        try {
          const parsed = JSON.parse(existingRow.content_data)
          return !parsed || (typeof parsed === 'object' && Object.keys(parsed).length === 0)
        } catch {
          return true
        }
      })())

  if (!existingRow) {
    database
      .prepare(
        `
      INSERT INTO cms_data (id, content_data, stats_data)
      VALUES (1, ?, ?)
    `,
      )
      .run(JSON.stringify(seed), DEFAULT_STATS_DATA)
    return
  }

  if (shouldSeed) {
    database
      .prepare('UPDATE cms_data SET content_data = ? WHERE id = 1')
      .run(JSON.stringify(seed))
  }
}

function openDb(Database: typeof BetterSqlite3, databasePath: string) {
  const dir = path.dirname(databasePath)
  mkdirSync(dir, { recursive: true })

  const database = new Database(databasePath)
  ensureSchema(database)

  if (!seedLoaded) {
    insertOrSeed(database)
    seedLoaded = true
  }

  return database
}

function getDb(): SqliteDatabase | null {
  if (sqliteUnavailable) return null
  if (db) return db

  const Database = getDatabaseCtor()
  if (!Database) return null

  try {
    db = openDb(Database, PRIMARY_DB_PATH)
    return db
  } catch (primaryError) {
    console.warn('Primary sqlite open failed, falling back to tmp:', primaryError)
  }

  try {
    db = openDb(Database, TMP_DB_PATH)
    return db
  } catch (tmpError) {
    console.warn('Tmp sqlite open failed, using JSON content store:', tmpError)
    sqliteUnavailable = true
    return null
  }
}

export function getContentData(): Record<string, any> {
  try {
    const database = getDb()
    if (!database) return readJsonStore()

    const row = database
      .prepare('SELECT content_data FROM cms_data WHERE id = 1')
      .get() as { content_data: string } | undefined
    if (!row) return readJsonStore()

    try {
      const parsed = JSON.parse(row.content_data)
      if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
        return parsed
      }
    } catch {
      // Fall through to JSON store.
    }
  } catch (error) {
    console.warn('SQLite content read failed, using JSON content store:', error)
  }

  return readJsonStore()
}

export function saveContentData(content: Record<string, any>): void {
  const payload = JSON.stringify(content)
  const database = getDb()

  if (database) {
    try {
      database.prepare('UPDATE cms_data SET content_data = ? WHERE id = 1').run(payload)
    } catch (error) {
      console.warn('SQLite content write failed, falling back to JSON:', error)
    }
  }

  try {
    writeJsonStore(content)
  } catch (error) {
    if (!database) {
      throw error
    }
    console.warn('JSON content write failed:', error)
  }
}

export function getStatsData(): Record<string, any> {
  try {
    const database = getDb()
    if (database) {
      const row = database
        .prepare('SELECT stats_data FROM cms_data WHERE id = 1')
        .get() as { stats_data: string } | undefined
      if (row) {
        try {
          return JSON.parse(row.stats_data)
        } catch {
          // Use defaults below.
        }
      }
    }
  } catch (error) {
    console.warn('SQLite stats read failed:', error)
  }

  return {
    ...DEFAULT_STATS,
    lastUpdate: new Date().toLocaleDateString(),
  }
}

export function saveStatsData(stats: Record<string, any>): void {
  const database = getDb()
  if (!database) return
  database.prepare('UPDATE cms_data SET stats_data = ? WHERE id = 1').run(JSON.stringify(stats))
}

export function closeDb(): void {
  if (db) {
    db.close()
    db = null
  }
}
