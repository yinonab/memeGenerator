'use strict'

let gElCanvas
let gCtx


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderImagesGallery()
    // addListeners()
    resizeCanvas()
}
function onClearCanvas() {
    delateLines()
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
function onSetFont(font) {
    changeFont(font)
    saveChanges()
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
        drawRect(0, 110,430,50)
    }
    else {gLine--
    clearInput()
    // onChangeText()
    drawRect(0, 10,430,50)
    }
   
}
function onUploadImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') 
  
    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
  }
  function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)
  
    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText
  
        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
  }
  function onSetLang(lang) {
    setLang(lang)
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()

}