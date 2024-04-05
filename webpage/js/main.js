const srollImgContainer = document.getElementById('sroll-img-container')
const scrollImgBtns = document.querySelectorAll('.scroll-img-btn')
const subContent = document.getElementById('sub-content')
const subContentContainer = subContent.querySelector('.sub-content-container')
const subContentPhrase = subContentContainer.querySelector('.sub-content-phrase')
const subImgWindow = document.getElementById('sub-img-window')
const subImgContainer = document.getElementById('sub-img-container')
const noticeBtns = document.querySelectorAll('.notice-btn')
const noticeTitle = document.getElementById('notice-title')
const noticeDate = document.getElementById('notice-date')
const iconLocation = document.querySelector('.icon.location.material-symbols-outlined')
const iconReserve = document.querySelector('.icon.reserve.material-symbols-outlined')
import { noticeArr } from "./data.js"

let timer, throttleDuration = 3000
function throttling(handler){
    if(!timer){
        handler()
        timer = setTimeout(function(){
            timer = null 
        }, throttleDuration)
    }
}

function changeImg(){
    let i = 1
    function initImg(){
        srollImgContainer.style.transition = 'none'
        srollImgContainer.style.left = -100 * i + '%'
        setTimeout(function(){
            srollImgContainer.style.transition = '2s'
        }, 100)
    }
    // setInterval(function(){
    //     // console.log(i)
    //     i++
    //     srollImgContainer.style.left = -100 * i + '%'
    //     if(i>3){
    //         i=1
    //         setTimeout(initImg, 2000)
    //     }
    // }, 5000)

    for(let [btnIndex, scrollImgBtn] of scrollImgBtns.entries()){
        scrollImgBtn.addEventListener('click', (e) => contorolImg(e, btnIndex))
    }
    function contorolImg(e, btnIndex){
        if(e.target.className.includes('left')){
            throttling(moveToLeft)
        }else if(e.target.className.includes('right')){
            throttling(moveToRight)
        }
        else if(e.target.className.includes('select')){
            moveToImg(btnIndex)
        }
    }
    function moveToLeft(){
        i--
        srollImgContainer.style.left = -100 * i + '%'
        if(i<1){
            i=3
            setTimeout(initImg, 2000)
        }
    }
    function moveToRight(){
        i++
        srollImgContainer.style.left = -100 * i + '%'
        if(i>3){
            i=1
            setTimeout(initImg, 2000)
        }
    }
    function moveToImg(btnIndex){
        i = btnIndex 
        srollImgContainer.style.left = -100 * btnIndex + '%'
    }
}

const perWidth = 100-subContentContainer.getBoundingClientRect().width/subContent.getBoundingClientRect().width*100

for(let imgindex = 1; imgindex <= perWidth; imgindex++){
    window.addEventListener('scroll', changeSubContent)
    const startToWide = 600
    const finishToWide = 1100
    const startToNarrow = 1800
    const finishToNarrow = 2100

    function changeSubContent(){
        if(window.pageYOffset > startToWide + (finishToWide-startToWide)/perWidth * imgindex){
            subContentContainer.style.width = `calc(var(--base-width) + ${imgindex}%)`
        }
        if(window.pageYOffset > startToNarrow + (finishToNarrow-startToNarrow)/perWidth * imgindex){
            subContentContainer.style.width = `calc(var(--base-width) + ${perWidth}% - ${imgindex}%)`
        }
    }
}


function showNotice(){
    let i = 0
    pushNotice()
    for(let noticeBtn of noticeBtns){
        noticeBtn.addEventListener('click', changeNotice)
    }
    function changeNotice(e){
        if(e.target.className.includes('up')){
            prevNotice()
        }else if(e.target.className.includes('down')){
            nextNotice()
        }
    }
    function pushNotice(){
        const noticeTitleA = noticeTitle.querySelector('a')
        noticeTitleA.innerHTML = noticeArr[i].title
        noticeTitleA.setAttribute('href', `/webpage/notice_content.html?id=${noticeArr[i].noticeIdNum}`)
        noticeDate.innerText = noticeArr[i].date
    }
    function nextNotice(){
        i++
        if(i<noticeArr.length){
            pushNotice()
        }else if(i>noticeArr.length-1){
            i=0
            pushNotice()
        }
    }
    function prevNotice(){
        i--
        if(i>-1){
            pushNotice()
        }else if(i<0){
            i=noticeArr.length-1
            pushNotice()
        }
    }
}


// function test2(e){
//     console.log(e.clientX)
//     // console.log(subContent.getBoundingClientRect().top)
//     if(subContent.getBoundingClientRect().top === 0){
//         // console.log('작동')
        
//     }
// }


// subImgWindow.addEventListener('wheel', () => throttling(changeSubImg))

let subImgIndex = 0
function workScroll(){
    document.body.style.overflow = 'visible'
}
function hideScroll(){
    document.body.style.overflow = 'hidden'
}
function changeSubImg(e){
    // e.stopPropagation()
    if(subContent.getBoundingClientRect().top === 0){
        // subContent.click()
        subImgIndex++
        subImgContainer.style.left = -subImgIndex*10 + '%'
        hideScroll()
        console.log(subImgIndex)
        if(subImgIndex > 19){
            subImgWindow.removeEventListener('wheel', changeSubImg)
            setTimeout(workScroll, 1800)
        }
    }

}


// window.addEventListener('mousemove', test2)
function getPosition(e){
    console.log("문서 클릭!")
}



function moveToLocationPage(){
    window.location.href = "/webpage/location.html"
}
function moveToReservePage(){
    window.location.href = "/webpage/reserve_indiv.html"
}

iconReserve.addEventListener('click', moveToReservePage)
iconLocation.addEventListener('click', moveToLocationPage)
subContentPhrase.addEventListener('wheel', workScroll)
subImgWindow.addEventListener('wheel', changeSubImg)
subImgWindow.addEventListener('mouseenter', getPosition)
window.addEventListener('load', changeImg)
window.addEventListener('load', showNotice)

