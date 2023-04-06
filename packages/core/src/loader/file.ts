import fs from 'fs-extra'

export async function loadFile(filepath: string) {
  if (fs.existsSync(filepath))
    return await fs.readFile(filepath, 'utf-8')
  return undefined
}
