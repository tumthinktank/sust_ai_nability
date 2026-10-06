const fs = require('fs')
const path = require('path')

const IMAGE_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.avif',
  '.svg',
  '.tif',
  '.tiff',
])

function isLikelyImage(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (!IMAGE_EXTENSIONS.has(ext)) return false

  try {
    const buffer = fs.readFileSync(filePath)
    if (buffer.length < 12) return false

    if (ext === '.png') {
      return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      return buffer.subarray(0, 2).equals(Buffer.from([0xff, 0xd8]))
    }

    if (ext === '.gif') {
      const sig = buffer.subarray(0, 6).toString('ascii')
      return sig === 'GIF87a' || sig === 'GIF89a'
    }

    if (ext === '.webp') {
      return buffer.subarray(0, 4).equals(Buffer.from('RIFF')) && buffer.subarray(8, 12).equals(Buffer.from('WEBP'))
    }

    if (ext === '.svg') {
      return buffer.toString('utf8', 0, 1024).toLowerCase().includes('<svg')
    }

    if (ext === '.tif' || ext === '.tiff') {
      return (
        buffer.subarray(0, 4).equals(Buffer.from([0x49, 0x49, 0x2a, 0x00])) ||
        buffer.subarray(0, 4).equals(Buffer.from([0x4d, 0x4d, 0x00, 0x2a]))
      )
    }

    return true
  } catch (error) {
    return false
  }
}

function logInvalidImages(dir) {
  const invalid = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      invalid.push(...logInvalidImages(fullPath))
      continue
    }

    if (!IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      continue
    }

    if (!isLikelyImage(fullPath)) {
      invalid.push(path.relative(process.cwd(), fullPath))
    }
  }

  return invalid
}

const root = path.join(process.cwd(), 'content')
if (!fs.existsSync(root)) {
  console.warn('No content directory found; skipping image validation.')
  process.exit(0)
}

const invalidFiles = logInvalidImages(root)
if (invalidFiles.length === 0) {
  console.log('Image validation passed: no invalid image files detected.')
} else {
  console.warn('Potentially invalid image files detected:')
  invalidFiles.forEach(file => console.warn(`  - ${file}`))
  console.warn('Build will continue; these files require manual review.')
}
