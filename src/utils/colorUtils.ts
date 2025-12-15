/**
 * Create CSS gradient from multiple colors
 */
export function createGradient(colors: string[]): string {
  if (colors.length === 0) return 'transparent'
  if (colors.length === 1) return colors[0]

  return `linear-gradient(to bottom, ${colors.join(', ')})`
}

/**
 * Validate if string is a valid hex color
 */
export function isValidHexColor(color: string): boolean {
  return /^#([0-9A-F]{3}){1,2}$/i.test(color)
}

/**
 * Predefined Minecraft-themed colors
 */
export const MINECRAFT_COLORS = {
  grass: '#55FF55',
  stone: '#808080',
  dirt: '#8B4513',
  wood: '#9B7653',
  gold: '#FFD700',
  diamond: '#5DADE2',
  emerald: '#27AE60',
  redstone: '#FF0000',
  lapis: '#3498DB',
  iron: '#D0D3D4',
  coal: '#2C3E50',
  netherite: '#654321',
} as const

/**
 * Get array of Minecraft color values
 */
export function getMinecraftColorOptions(): { name: string; value: string }[] {
  return Object.entries(MINECRAFT_COLORS).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }))
}
