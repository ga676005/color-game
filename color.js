/* eslint-disable prefer-const */
import { randomNumber } from './util.js'

export const DIFFICULTY = {
  EASY: 60,
  MEDIUM: 40,
  HARD: 20,
}

export function createColorsWithRange({ targetColor, number, range }) {
  const colors = Array.from({ length: number }, () => {
    return generateRandomRGBValueWithRange({
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      range,
    })
  })

  return colors
}

export function generateRandomRGBValue() {
  const r = randomRBGSingleNumber()
  const g = randomRBGSingleNumber()
  const b = randomRBGSingleNumber()
  return { r, g, b }
}

export function generateRandomRGBValueWithRange({ r, g, b, range } = {}) {
  const _r = randomRGBWithRange(r, range)
  const _g = randomRGBWithRange(g, range)
  const _b = randomRGBWithRange(b, range)

  return { r: _r, g: _g, b: _b }
}

function randomRGBWithRange(value, range) {
  const randomness = Math.round(Math.random())

  if (randomness === 1)
    return randomRBGSingleNumber(value - range, value - (2 * range))
  if (randomness === 0)
    return randomRBGSingleNumber(value + range, value + (2 * range))
}

function randomRBGSingleNumber(min = 0, max = 255) {
  min = min < 0 ? 0 : min
  max = max > 255 ? 255 : max
  return randomNumber(min, max)
}
