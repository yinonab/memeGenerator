'use strict'
var gImageSrc
var gSrcImg=''
var gElText
var gImages = [
    {
        id: 1,
        url: './site/images/1.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 2,
        url: './site/images/2.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 3,
        url: './site/images/3.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 4,
        url: './site/images/4.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 5,
        url: './site/images/5.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 6,
        url: './site/images/6.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 7,
        url: './site/images/7.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 8,
        url: './site/images/8.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 9,
        url: './site/images/9.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 10,
        url: './site/images/10.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 11,
        url: './site/images/11.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 12,
        url: './site/images/12.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 13,
        url: './site/images/13.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 14,
        url: './site/images/14.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 15,
        url: './site/images/15.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 16,
        url: './site/images/16.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 17,
        url: './site/images/17.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 18,
        url: './site/images/18.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 19,
        url: './site/images/19.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 20,
        url: './site/images/20.jpg',
        keywords: ['funny', 'cat'],
    },
]
var gMeme = { 
    selectedImgId: gImageSrc, 
    selectedLineIdx: 0, 
    lines: [ 
            { 
                txt: 'I sometimes eat Falafel', 
                size: 20, 
                color: 'red' 
            } 
    ] 
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}
function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = 'white'
    gCtx.font = '20px Arial'
    // gCtx.textAlign = 'center'
    // gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)

}
function getMem(elImg) {
    var userInput=document.querySelector('.txt').value
    userInput=''
    console.log('elImg.data:', gImageSrc)
    gImageSrc=elImg.dataset.img
    var img= new Image();
    img.src=gImageSrc
    console.log('img:', img)
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText('Put Here Your Punch Line', 100, 50)
    console.log('gMeme:', gMeme)
    console.log('gImageSrc:', gImageSrc)
    gMeme.selectedImgId=gImageSrc
}
function saveText(){
    var userInput=document.querySelector('.txt').value
    gElText=userInput
    console.log(userInput);
    gMeme.lines[0].txt=userInput
    var img= new Image();
    img.src=gImageSrc
    console.log('img:', img)
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(userInput, 100, 50)
  }

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 2
}
