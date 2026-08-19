import Database from 'better-sqlite3'
import path from 'path'
import { mkdirSync } from 'node:fs'
import os from 'node:os'
import seedContent from '@/data/content.json'

type SeedContent = Record<string, any>

const PRIMARY_DATA_DIR = path.join(process.cwd(), 'data')
const PRIMARY_DB_PATH = path.join(PRIMARY_DATA_DIR, 'cms.db')

// Vercel serverless functions may not allow writes to the project directory.
// This temp dir is writable and will let the app boot reliably.
const TMP_DATA_DIR = path.join(os.tmpdir(), 'oskvid-cms')
const TMP_DB_PATH = path.join(TMP_DATA_DIR, 'cms.db')

// Initialize database
let db: Database.Database | null = null
let seedLoaded = false

const DEFAULT_STATS_DATA = JSON.stringify({
  totalEdits: 156,
  lastUpdate: '',
  totalPages: 12,
  totalImages: 48,
  totalVideos: 6,
  activeUsers: 1,
})

function loadSeed(): SeedContent | null {
  // `seedContent` comes from `data/content.json` and is bundled by Next.
  if (!seedContent || typeof seedContent !== 'object') return null
  return seedContent as SeedContent
}

function ensureSchema(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS cms_data (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      content_data TEXT NOT NULL DEFAULT '{}',
      stats_data TEXT NOT NULL DEFAULT '{}'
    )
  `)
}

function insertOrSeed(database: Database.Database) {
  const existingRow = database
    .prepare('SELECT content_data FROM cms_data WHERE id = 1')
    .get() as { content_data: string } | undefined

  const seed = loadSeed()
  const shouldSeed =
    !!seed &&
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
      .run(JSON.stringify(seed ?? {}), DEFAULT_STATS_DATA)
    return
  }

  if (shouldSeed && seed) {
    database
      .prepare('UPDATE cms_data SET content_data = ? WHERE id = 1')
      .run(JSON.stringify(seed))
  }
}

function openDb(databasePath: string) {
  // Ensure directory exists synchronously for better-sqlite3
  const dir = path.dirname(databasePath)
  mkdirSync(dir, { recursive: true })

  const database = new Database(databasePath)
  ensureSchema(database)

  // Seed only once per process to avoid unnecessary JSON parses.
  if (!seedLoaded) {
    insertOrSeed(database)
    seedLoaded = true
  }

  return database
}

function getDb(): Database.Database {
  if (db) {
    return db
  }

  // First try the regular path (works locally).
  try {
    db = openDb(PRIMARY_DB_PATH)
    return db
  } catch (primaryError) {
    // eslint-disable-next-line no-console
    console.warn(
      'Primary sqlite open failed, falling back to tmp:',
      primaryError,
    )
  }

  // Then fall back to a writable tmp directory (works on Vercel).
  db = openDb(TMP_DB_PATH)
  return db
}

function getSeedContent(): Record<string, any> {
  const seed = loadSeed()
  return seed && typeof seed === 'object' ? seed : {}
}

// Get all content data
export function getContentData(): Record<string, any> {
  try {
    const database = getDb()
    const row = database.prepare('SELECT content_data FROM cms_data WHERE id = 1').get() as { content_data: string } | undefined
    if (!row) {
      return getSeedContent()
    }
    try {
      const parsed = JSON.parse(row.content_data)
      if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
        return parsed
      }
    } catch {
      // Fall through to bundled published content.
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('SQLite content load failed, using published seed:', error)
  }
  return getSeedContent()
}

// Save all content data
export function saveContentData(content: Record<string, any>): void {
  const database = getDb()
  database.prepare('UPDATE cms_data SET content_data = ? WHERE id = 1').run(JSON.stringify(content))
}

// Get stats data
export function getStatsData(): Record<string, any> {
  const database = getDb()
  const row = database.prepare('SELECT stats_data FROM cms_data WHERE id = 1').get() as { stats_data: string } | undefined
  if (!row) {
    return {
      totalEdits: 156,
      lastUpdate: new Date().toLocaleDateString(),
      totalPages: 12,
      totalImages: 48,
      totalVideos: 6,
      activeUsers: 1
    }
  }
  try {
    return JSON.parse(row.stats_data)
  } catch {
    return {
      totalEdits: 156,
      lastUpdate: new Date().toLocaleDateString(),
      totalPages: 12,
      totalImages: 48,
      totalVideos: 6,
      activeUsers: 1
    }
  }
}

// Save stats data
export function saveStatsData(stats: Record<string, any>): void {
  const database = getDb()
  database.prepare('UPDATE cms_data SET stats_data = ? WHERE id = 1').run(JSON.stringify(stats))
}

// Close database connection (useful for cleanup)
export function closeDb(): void {
  if (db) {
    db.close()
    db = null
  }
}

