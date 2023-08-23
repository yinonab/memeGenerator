'use strict'
let gColor = ''
let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderImagesGallery()
}
function onSelectImg(elImg) {
    getMem(elImg)
}
function onOpenGallery() {
    toggleClass('hidden', 'images-container')
}
function OnRenderMeme() {
    setImage(img)
    drawText('Put Here Your Punch Line', 125, 125)

}
function renderImagesGallery() {
    var imges = gImages
    console.log('image.id:', imges.url)
    console.log('variable:', imges.url)
    var strHtml = imges.map(img => `
    <img data-img="${img.url}" class="image" src="${img.url}" onclick="onSelectImg(this)" />
    `).join('')
    setElHtml('select-img-container', strHtml)
}
function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}
function onClickPlus() {
    gMeme.lines[0].size += 1
    changeText()
}
function onClickMinus() {
    gMeme.lines[0].size -= 1
    changeText()
}

function onChangeClr(clr) {
    gColor = clr
    gMeme.lines[0].color = gColor
    changeText()
    console.log('gMeme:', gMeme)
}
function onAddLine() {
    addLine()
}
function onSwitchLine(ev) {
    gLine +=1
   
}