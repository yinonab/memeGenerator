'use strict'

let gElCanvas
let gCtx


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderImagesGallery()
    addListeners()
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
function onOpenEditor() {
    openEditor()
}
function renderImagesGallery() {
    let imges = gImages
    console.log('image.id:', imges.url)
    console.log('variable:', imges.url)
    let strHtml = imges.map(img => `
    <img data-img="${img.url}" class="image" src="${img.url}" onclick="onSelectImg(this)" />
    `).join('')
    setElHtml('select-img-container', strHtml)
}
function onDownloadImg(elLink) {
    saveChangesBeforeDownload()
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}
function onSetFont(font) {
    changeFont(font)
    saveChanges()
}
function onSetEmojis(emg) {
    setEmoji(emg)
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
function onSave() {
    saveChanges()
}
function onAddLine() {
    addLine()
    onSwitchLine()
}
function onSwitchLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        clearInput()
        saveChanges()
        gMeme.selectedLineIdx++
    }
    else {
        clearInput()
        saveChanges()
        gMeme.selectedLineIdx--
    }
}
function onReset() {
    reset()
    saveChangesBeforeDownload()
}
function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}
function onShareWhatsapp() {
    saveChangesBeforeDownload()
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg');

    function onSuccess(imgDataUrl) {
        // const url = encodeURIComponent(uploadedImgUrl);
        
        // Construct the WhatsApp sharing URL
        // const whatsappText = "Check out this image!";
        var message = "Check out this image: " + imgDataUrl;
        var whatsappUrl = "whatsapp://send?text=" + encodeURIComponent(message);
                // const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}&url=${url}`;
        console.log('whatsappUrl:', whatsappUrl)
        console.log('imgDataUrl:', imgDataUrl)
        
        // Open the WhatsApp sharing URL in a new tab
        window.location.href = whatsappUrl;
    }
    
    doUploadImg(imgDataUrl, onSuccess);
    
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
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
}