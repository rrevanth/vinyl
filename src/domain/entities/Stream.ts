/**
 * Stream entity for playback
 */
export interface Stream {
  id: string
  url: string
  quality: string // '1080p', '720p', 'CAM', etc.
  source: string // 'torrent', 'direct', 'debrid'

  // Display metadata
  name?: string // Stream name/title from provider
  description?: string // Stream description (may include formatting like \n)

  // Torrent specific
  infoHash?: string
  fileIndex?: number
  seeds?: number
  peers?: number

  // Direct link specific
  headers?: Record<string, string>

  // Metadata
  size?: number // File size in bytes
  language?: string
  provider: string // Which addon/provider returned this
}

/**
 * Subtitle entity
 */
export interface Subtitle {
  id: string
  url: string
  language: string
  format: string // 'srt', 'vtt', 'ass'
  provider: string
}
