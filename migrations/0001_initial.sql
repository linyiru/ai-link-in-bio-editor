-- Create users table for storing profile and theme settings
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  theme_settings TEXT NOT NULL, -- JSON string for theme configuration
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create links table for storing user links
CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  link_id TEXT NOT NULL, -- UUID from frontend
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  is_active INTEGER DEFAULT 1, -- SQLite uses INTEGER for boolean
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create unique index on user_slug for fast lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_slug ON users(user_slug);

-- Create index on user_id for links table
CREATE INDEX IF NOT EXISTS idx_links_user_id ON links(user_id);

-- Create index on order for sorting links
CREATE INDEX IF NOT EXISTS idx_links_order ON links(user_id, order_index);