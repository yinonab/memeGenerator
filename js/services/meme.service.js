'use strict'
const STORAGE_KEY = 'memeDB'
var gImageSrc
var gSrcImg=''
var gElText
var gLine =0
var gSize=20
var gFont
let gColor ='white'
let gIsDrag=false
let prevCursorPos = { x: 0, y: 0 }
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
var gImages = [
    {
        id: 1,
        url: './images/1.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 2,
        url: './images/2.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 3,
        url: './images/3.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 4,
        url: './images/4.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 5,
        url: './images/5.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 6,
        url: './images/6.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 7,
        url: './images/7.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 8,
        url: './images/8.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 9,
        url: './images/9.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 10,
        url: './images/10.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 11,
        url: './images/11.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 12,
        url: './images/12.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 13,
        url: './images/13.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 14,
        url: './images/14.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 15,
        url: './images/15.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 16,
        url: './images/16.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 17,
        url: './images/17.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 18,
        url: './images/18.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 19,
        url: './images/19.jpg',
        keywords: ['funny', 'cat'],
    },
    {
        id: 20,
        url: './images/20.jpg',
        keywords: ['funny', 'cat'],
    },
]
var gMeme = { 
    selectedImgId: gImageSrc, 
    selectedLineIdx: 0, 
    lines: [ 
            { 
                txt: '⏩ Put Here Your Punch Line ⏪', 
                size: '', 
                color: gColor,
                font:gFont,
            } ,
            { 
                txt: '', 
                size: '', 
                color:  gColor,
                font:gFont,
            } 
    ] 
}
function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
}
function _createMems() {
    var gMeme = loadFromStorage(STORAGE_KEY)
    if (!gMeme) {
        gMeme = 
            { 
                txt: '⏩ Put Here Your Punch Line ⏪', 
                size: gSize, 
                color: gColor,
                font:gFont,
            } ,
            { 
                txt: '', 
                size: gSize, 
                color:  gColor,
                font:gFont,
            } 
    }
    _saveBookToStorage()
    return gMeme
}
function openGallery(){
    removeClass('hidden', 'images-container')
    addClass('hidden', 'editor')
}
function openEditor(){
    removeClass('hidden', 'editor')
    addClass('hidden', 'images-container')
}
function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[gLine]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}
function renderText(text, x, y,clr,size,font) {
    gCtx.lineWidth = 5
    gCtx.strokeStyle = clr
    gCtx.fillStyle = clr
    gCtx.font = size + 'px ' + font
    // console.log('gCtx.font:', gCtx.font)
    // console.log('gFont:', gFont)
    gCtx.fillText(text, x, y)

}
function clearInput(){
    let userInput=document.querySelector('.txt')
    userInput.value=''
    gMeme.lines[gLine].size=gSize
}
function setImage(elImg){
    openEditor()
    gImageSrc=elImg.dataset.img
    let img= new Image();
    img.src=gImageSrc
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    renderImg(img)
}
function getMem(elImg) {
    gLine=0
    clearInput()
    setImage(elImg)
    gMeme.selectedImgId=gImageSrc
    saveChanges()
}
function changeText(){
    console.log('gMeme:', gMeme)
    var userInput=document.querySelector('.txt').value
    gElText=userInput
    console.log(userInput);
    gMeme.lines[gLine].txt=userInput
    _saveMemeToStorage()
  }
  function setEmoji(emg){
      let x=getRandomInt(1,300)
      let y=getRandomInt(1,300)
    const emojiSize = 40;
    const emojiX = x;
    const emojiY = y;
    gCtx.font = `${emojiSize}px sans-serif`;
    gCtx.fillText(emg, emojiX, emojiY);
  }
  function changeClr(){
      let userclr=document.querySelector('.clr').value
      gColor=userclr
      gMeme.lines[gLine].color=gColor
      _saveMemeToStorage()
  }
  function delateLines(){
    gMeme.lines[gLine].txt=' '
    gLine=0
    clearInput()
    removeClass('hidden', 'add')
    var img= new Image();
    img.src=gMeme.selectedImgId
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    renderImg(img)
    saveChanges()
  }
  function saveChanges(){
    var img= new Image();
    img.src=gMeme.selectedImgId
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    renderImg(img)
    setText()
  }
function addLine(){
    addClass('hidden', 'add')
    saveChanges()
  }
  function setText(){
    gMeme.lines.forEach((line,idx)=>{
        renderText(line.txt,0,50+idx*100,line.color,line.size,line.font)
        
    });
  }
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 2
}
function decreaseFont(){
   gSize--
   gMeme.lines[gLine].size=gSize
   _saveMemeToStorage()

}
function increaseFont(){
    gSize++
    gMeme.lines[gLine].size=gSize
    _saveMemeToStorage()
}
function changeFont(font){
    console.log('font:', font)
    gFont=font
    gMeme.lines[gLine].font=gFont
    console.log('gFont:', gFont)
    _saveMemeToStorage()
}
function drawRect(x, y,h,w) {
    // gCtx.strokeStyle = gColor
    gCtx.strokeRect(x, y, h, w)
  }

  

//   function addListeners() {
//     addMouseListeners()
//     addTouchListeners()
//     //Listen for resize ev
//     window.addEventListener('resize', () => {
//       resizeCanvas()
//       // //Calc the center of the canvas
//       // const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
//       // //Create the circle in the center
//       // createCircle(center)
//       // renderCanvas()
//     })
//   }
//   function addMouseListeners() {
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mouseup', onUp)
//   }
//   function addTouchListeners() {
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchend', onUp)
//   }

//   function onDown(ev) {

//     gIsDrag = true
//     const pos = getEvPos(ev)
//     console.log('ev:', ev)
//     console.log('pos:', pos)
//     if (pos.x)
//     gCtx.beginPath()
//     gCtx.moveTo(pos.x, pos.y)
//     // onDraw(pos.x, pos.y)
//   }
  
//   function onMove(ev) {
//     if (!gIsDrag) return
//     const pos = getEvPos(ev)
//     drawText(gMeme.lines[gLine].txt, pos.x, pos.y,gMeme.lines[gLine].color,gMeme.lines[gLine].size)
//     drawText(pos.x, pos.y)
//     gCtx.lineWidth = 2
//     gCtx.stroke()
//     prevCursorPos = pos
//   }
  
//   function onUp(ev) {
//     gIsDrag = false
//     // prevCursorPos = pos
//   }
//   function getLine() {
//     return gMeme.lines[gLine]
//   }
