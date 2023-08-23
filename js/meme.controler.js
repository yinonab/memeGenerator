'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function drawImg() {
    debugger
    const elImg = new Image()
    elImg.src = 'SITE/images/1.jpg'
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    }
}

function onSelectImg(elImg) {
    coverCanvasWithImg(elImg)
}

// Lets cover a fixed-width canvas using an img
// changing the canvas height
function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth - 2
}