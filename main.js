/* eslint-disable prefer-const */

import './styles.css'
import {
  getColorStrings,
  generateRandomRGBValue,
  generateRandomRGBValueWithinRange,
} from './color.js'

const DIFFICULTY = {
  EASY: 150,
  MEDIUM: 100,
  HARD: 50,
}

const targetColorDisplay = document.querySelector('[data-target-color]')
const nextColorBtn = document.querySelector('[data-next-color-btn]')
const colorsContainer = document.querySelector('[data-color-container]')
let currentFormat = 'rgb'
let currentDifficulty = 'EASY'

nextColorBtn.addEventListener('click', () => {
  const targetColor = generateRandomRGBValue()
  saveRGBValuesInElement(targetColorDisplay, {
    r: targetColor.r,
    g: targetColor.g,
    b: targetColor.b,
  })

  const otherColors = Array.from({ length: 5 }, () => {
    return generateRandomRGBValueWithinRange({
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      range: DIFFICULTY[currentDifficulty],
    })
  })

  colorsContainer.innerHTML = ''

  otherColors.forEach(({ r, g, b }) => {
    const button = document.createElement('button')
    saveRGBValuesInElement(button, { r, g, b })
    button.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    colorsContainer.append(button)
  })

  console.log({ otherColors })

  // const { rgb, hex, hsl } = getColorStrings()
  // targetColorDisplay.dataset.rgb = rgb
  // targetColorDisplay.dataset.hex = hex
  // targetColorDisplay.dataset.hsl = hsl

  // displayColorString ()
})

document.addEventListener('change', (e) => {
  if (!e.target.matches('[data-difficulty-input]')) return

  console.log('difficulty', e.target.value.toUpperCase())
})

document.addEventListener('change', (e) => {
  if (!e.target.matches('[data-format-input]')) return

  currentFormat = e.target.value
  displayColorString ()
})

function displayColorString() {
  targetColorDisplay.textContent = targetColorDisplay.dataset[currentFormat]
}

function saveRGBValuesInElement(element, { r, g, b } = {}) {
  element.dataset.r = r
  element.dataset.h = g
  element.dataset.h = b
}
