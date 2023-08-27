'use strict'
const STORAGE_KEY = 'memeDB'
let gImageSrc
let gSrcImg = ''
let gElText
let gLine = 0
let gSize = 20
let gFont = 'Impact'
let gColor = 'white'
let gIsDrag = false
let prevCursorPos = { x: 0, y: 0 }
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gImages = [
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
var gMeme
function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
}
function _createMems() {
    var gMeme = loadFromStorage(STORAGE_KEY)
    if (!gMeme) {
        gMeme =
        {
            selectedImgId: gImageSrc,
            selectedLineIdx: 0,
            lines: [
                {
                    x: 10,
                    y: 50,
                    txt: '⏩ Put Here Your Punch Line ⏪',
                    size: gSize,
                    color: gColor,
                    font: gFont,
                    align: 'left'
                },
                {
                    x: 10,
                    y: 150,
                    txt: '',
                    size: gSize,
                    color: gColor,
                    font: gFont,
                    align: 'left'
                }
            ]
        }
    }
    // _saveBookToStorage()
    return gMeme
}
function openGallery() {
    removeClass('hidden', 'images-container')
    addClass('hidden', 'editor')
}
function openEditor() {
    removeClass('hidden', 'editor')
    addClass('hidden', 'images-container')
}
function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
function renderText(line) {
    console.log('line:', line)
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.textAlign = line.align
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.fillText(line.txt, line.x, line.y)
}
function setBorder(){
    let line = gMeme.lines[gMeme.selectedLineIdx]
    const textWidth = gCtx.measureText(line.txt).width
    const padding = 5;
    const textHeight = line.size;
    gCtx.beginPath()
    drawRect(
        line.x,
        line.y - textHeight - padding,
        textWidth + 2 * padding,
        textHeight + 3 * padding
    )
}
function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}
function setText() {
    gMeme.lines.forEach((line) => {
        renderText(line)
    })
    setBorder(getSelectedLine())
}
function clearInput() {
    let userInput = document.querySelector('.txt')
    userInput.value = ''
}
function setImage(elImg) {
    openEditor()
    gImageSrc = elImg.dataset.img
    let img = new Image();
    img.src = gImageSrc
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    renderImg(img)
    
}
function getMem(elImg) {
    gMeme = _createMems()
    gMeme.selectedLineIdx = 0
    clearInput()
    setImage(elImg)
    gMeme.selectedImgId = gImageSrc
    saveChanges()
}
function changeText() {
    var userInput = document.querySelector('.txt').value
    gElText = userInput
    getSelectedLine().txt = userInput
    setText()
    _saveMemeToStorage()
}
function setEmoji(emg) {
    let x = getRandomInt(1, 300)
    let y = getRandomInt(1, 300)
    const emojiSize = 40;
    const emojiX = x;
    const emojiY = y;
    gCtx.font = `${emojiSize}px sans-serif`;
    gCtx.fillText(emg, emojiX, emojiY);
}
function changeClr() {
    let userclr = document.querySelector('.clr').value
    gColor = userclr
    getSelectedLine().color = gColor
    _saveMemeToStorage()
}
function delateLines() {
    getSelectedLine().txt = ' '
    if (gMeme.selectedLineIdx !== 0) { removeClass('hidden', 'add') }
    gMeme.selectedLineIdx = 0
    clearInput()
    var img = new Image();
    img.src = gMeme.selectedImgId
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    renderImg(img)
    saveChanges()
}
function saveChanges() {
    var img = new Image();
    img.src = gMeme.selectedImgId
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    renderImg(img)
    setText()
}
function addLine() {
    addClass('hidden', 'add')
    saveChanges()
}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 2
}
function decreaseFont() {
    getSelectedLine().size--
    _saveMemeToStorage()
}
function increaseFont() {
    getSelectedLine().size++
    _saveMemeToStorage()
}
function changeFont(font) {
    getSelectedLine().font = font
    _saveMemeToStorage()
}
function drawRect(x, y, h, w) {
    gCtx.strokeRect(x, y, h, w)
}

function reset() {
    gMeme.selectedLineIdx = 0
    gSize = 20
    gColor = 'white'
    gMeme.lines.forEach((line,idx) => {
        renderText(line.txt='',line.color='white',line.font=gFont,line.size=gSize,line.x=0,line.y=50*(idx+1))
    })
    clearInput()
    removeClass('hidden', 'add')
    localStorage.clear()
}
function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[getSelectedLine()]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}
function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}
function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}
function onDown(ev) {

    gIsDrag = true
    const pos = getEvPos(ev)
    if (pos.x)
        gCtx.beginPath()
    gCtx.moveTo(pos.x, pos.y)
}

function onMove(ev) {
    if (!gIsDrag) return
    const pos = getEvPos(ev)
    var img = new Image();
    img.src = gMeme.selectedImgId
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    renderImg(img)
    setText()
    getSelectedLine().x = pos.x
    getSelectedLine().y = pos.y
    _saveMemeToStorage()
    console.log('gMeme.lines.x:', gMeme.lines.x)
    console.log('gMeme.lines.y:', gMeme.lines.y)

    // setText()
    // gMeme.lines.forEach((line, idx) => {
    //     renderText(line.txt, line.x, line.y, line.color, line.size, line.font)

    // })
    gCtx.lineWidth = 2
    gCtx.stroke()
    prevCursorPos = pos
}

function onUp(ev) {
    gIsDrag = false
}