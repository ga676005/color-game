/* eslint-disable prefer-const */
import { randomNumber } from './util.js'

export function getColorStrings() {
  const [r, g, b] = generateRandomRGBValue()
  const rgb = RGBNumberToString(r, g, b)
  const hex = RGBToHex(r, g, b)
  const hsl = RGBToHSL(r, g, b)

  return { rgb, hex, hsl }
}

export function generateRandomRGBValue() {
  const r = randomRBG()
  const g = randomRBG()
  const b = randomRBG()
  return { r, g, b }
}

export function generateRandomRGBValueWithinRange({ r, g, b, range } = {}) {
  const _r = randomRBG(r - range, r + range)
  const _g = randomRBG(g - range, g + range)
  const _b = randomRBG(b - range, b + range)
  return { r: _r, g: _g, b: _b }
}

function RGBNumberToString(r, g, b) {
  return `rgb(${r},${g},${b})`
}

function RGBToHex(r, g, b) {
  r = r.toString(16)
  g = g.toString(16)
  b = b.toString(16)

  if (r.length === 1) r = `0${r}`
  if (g.length === 1) g = `0${g}`
  if (b.length === 1) b = `0${b}`

  return `#${r}${g}${b}`
}

function RGBToHSL(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255
  g /= 255
  b /= 255

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin

  let h = 0
  let s = 0
  let l = 0

  // Calculate hue
  // No difference
  if (delta === 0)
    h = 0
  // Red is max
  else if (cmax === r)
    h = ((g - b) / delta) % 6
  // Green is max
  else if (cmax === g)
    h = (b - r) / delta + 2
  // Blue is max
  else
    h = (r - g) / delta + 4

  h = Math.round(h * 60)

  // Make negative hues positive behind 360°
  if (h < 0)
    h += 360

  // Calculate lightness
  l = (cmax + cmin) / 2

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return `hsl("${h},${s}%,${l}%")`
}

function randomRBG(min = 0, max = 255) {
  min = min < 0 ? 0 : min
  max = max > 255 ? 255 : max
  return randomNumber(min, max)
}
