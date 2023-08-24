'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderImagesGallery()
    addListeners()
}
function onSelectImg(elImg) {
    getMem(elImg)
}
function onOpenGallery() {
   openGallery()
}
function onOpenEditor(){
    openEditor()
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
   increaseFont()
   saveChanges()
}
function onClickMinus() {
    decreaseFont()
    saveChanges()
}

function onChangeClr() {
    changeClr()
    saveChanges()

}
function onChangeText() {
    changeText()
    saveChanges()

}
function onSave(){
    saveChanges()
}
function onAddLine() {
    addLine()
    onSwitchLine() 

}
function onSwitchLine() {
    if (gLine<gMeme.lines.length-1){
        clearInput()
        gLine++
        // onChangeText()
        drawRect(10, 110,430,50)
    }
    else {gLine--
    clearInput()
    // onChangeText()
    drawRect(10, 10,430,50)
    }
   
}