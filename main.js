/* eslint-disable prefer-const */
import { shuffle } from 'lodash-es'

import './styles.css'
import {
  DIFFICULTY,
  generateRandomRGBValue,
  createColorsWithRange,
  formatColorStrings,
} from './color.js'

const targetColorDisplay = document.querySelector('[data-target-color]')
const nextColorBtn = document.querySelector('[data-next-color-btn]')
const colorsContainer = document.querySelector('[data-color-container]')
let currentFormat = 'rgb'
let currentDifficulty = 'EASY'
const NUM_OF_COLORS = 6
initGame()

nextColorBtn.addEventListener('click', initGame)

document.addEventListener('click', (e) => {
  if (!e.target.matches('[data-color-btn]')) return

  const clickedBtnColor = getRGBValuesFromElement(e.target)
  const targetColor = getRGBValuesFromElement(targetColorDisplay)
  const isSameColor = compareColor(clickedBtnColor, targetColor)

  const colorElements = Array.from(document.querySelectorAll('[data-color-btn]'))
  colorElements.forEach((element) => {
    const isSameColor = compareColor(getRGBValuesFromElement(element), targetColor)
    element.disabled = true
    if (!isSameColor) element.classList.add('wrong')
  })

  showResult(isSameColor)
})

document.addEventListener('change', (e) => {
  if (!e.target.matches('[data-difficulty-input]')) return
  const difficulty = e.target.value.toUpperCase()
  changeDifficulty(difficulty)
  initGame()
})

document.addEventListener('change', (e) => {
  if (!e.target.matches('[data-format-input]')) return

  changeFormat(e.target.value)
  initGame()
})

function initGame() {
  hideResult()

  const targetColor = generateRandomRGBValue()
  const restColors = createColorsWithRange({
    targetColor,
    range: DIFFICULTY[currentDifficulty],
    number: NUM_OF_COLORS - 1,
  })

  saveRGBValuesInElement(targetColorDisplay, targetColor)
  renderColors([targetColor, ...restColors])
  saveFormattedColorStringsInElement(targetColorDisplay, targetColor)
  displayColorString()
}

function saveFormattedColorStringsInElement(element, values) {
  const { rgb, hex, hsl } = formatColorStrings(values)
  element.dataset.rgb = rgb
  element.dataset.hex = hex
  element.dataset.hsl = hsl
}

function renderColors(colorsArray) {
  const colors = shuffle(colorsArray)
  colorsContainer.innerHTML = ''

  colors.forEach((rgb) => {
    const btn = document.createElement('button')
    btn.dataset.colorBtn = ''
    saveRGBValuesInElement(btn, rgb)
    btn.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    colorsContainer.append(btn)
  })
}

function changeDifficulty(value) {
  currentDifficulty = value
}

function changeFormat(value) {
  currentFormat = value
  displayColorString ()
}

function saveRGBValuesInElement(element, { r, g, b } = {}) {
  element.dataset.r = r
  element.dataset.h = g
  element.dataset.h = b
}

function getRGBValuesFromElement(element) {
  return {
    r: element.dataset.r,
    g: element.dataset.g,
    b: element.dataset.b,
  }
}

function compareColor(el1, el2) {
  return el1.r === el2.r && el1.g === el2.g && el1.b === el2.b
}

function displayColorString() {
  targetColorDisplay.textContent = targetColorDisplay.dataset[currentFormat]
}

function showResult(isCorrect) {
  const resultContainer = document.querySelector('[data-result-container]')
  resultContainer.style.display = 'block'

  const resultText = document.querySelector('[data-result]')
  resultText.textContent = isCorrect ? 'Correct' : 'Wrong'
}

function hideResult() {
  const resultContainer = document.querySelector('[data-result-container]')
  resultContainer.style.display = 'none'
}
