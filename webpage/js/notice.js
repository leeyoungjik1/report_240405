const noticeContainerNpage = document.getElementById('notice-container-npage')
const pageNav = document.getElementById('page-nav')
const pageNavBtnFirst = document.querySelector('.page-nav-btn.first')
const pageNavBtnLeft = document.querySelector('.page-nav-btn.left')
const pageNavBtnRight = document.querySelector('.page-nav-btn.right')
const pageNavBtnLast = document.querySelector('.page-nav-btn.last')


import { noticeArr } from "./data.js"
// const noticeArr = [
// ]
const noticeMaxOfPage = 5
const pageNavMaxOfPage = 5

console.log(noticeArr)


function pushNotice(n){
    const noticeNpageDiv = document.createElement('div')
    noticeNpageDiv.className = 'notice-npage'
    const noticeNpageH2 = document.createElement('h2')
    const noticeNpageA = document.createElement('a')
    noticeNpageA.setAttribute('href', `/webpage/notice_content.html?id=${noticeArr[n].noticeIdNum}`)
    noticeNpageA.innerText = noticeArr[n].title
    noticeNpageH2.appendChild(noticeNpageA)
    const noticeNpageP = document.createElement('p')
    noticeNpageP.innerText = noticeArr[n].date
    
    noticeNpageDiv.append(noticeNpageH2, noticeNpageP)
    noticeContainerNpage.appendChild(noticeNpageDiv)
}
function pushNoticePageNav(n){
    const pageNavBtnSelectDiv = document.createElement('div')
    pageNavBtnSelectDiv.className = 'page-nav-btn select'
    pageNavBtnSelectDiv.innerText = `${n}`
    pageNav.insertBefore(pageNavBtnSelectDiv, pageNavBtnRight)
}
function showNextBtn(){
    pageNavBtnRight.style.display = 'flex'
    pageNavBtnLast.style.display = 'flex'
}
function hideNextBtn(){
    pageNavBtnRight.style.display = 'none'
    pageNavBtnLast.style.display = 'none'
}
function showPrevBtn(){
    pageNavBtnFirst.style.display = 'flex'
    pageNavBtnLeft.style.display = 'flex'
}
function hidePrevBtn(){
    pageNavBtnFirst.style.display = 'none'
    pageNavBtnLeft.style.display = 'none'
}

if(noticeArr.length<=noticeMaxOfPage){
    pageNav.style.display = 'none'
    for(let n=0; n<noticeArr.length; n++){
        pushNotice(n)
    }
}else if(noticeArr.length>noticeMaxOfPage){
    hidePrevBtn()
    loadNoticePageNav(noticeArr.length)
    for(let n=0; n<noticeMaxOfPage; n++){
        pushNotice(n)
    }
}

function loadNoticePageNav(n){
    let i = Math.ceil(n/pageNavMaxOfPage)
    if(i<=pageNavMaxOfPage){
        hideNextBtn()
        for(let n=1; n<i+1; n++){
            pushNoticePageNav(n)
        }
    }else if(i>pageNavMaxOfPage){
        for(let n=1; n<pageNavMaxOfPage+1; n++){
            pushNoticePageNav(n)
        }
    }
}


const pageNavBtns = document.querySelectorAll('.page-nav-btn')
for(let pageNavBtn of pageNavBtns){
    pageNavBtn.addEventListener('click', (e) => contorolPage(e))
}

function contorolPage(e){
    if(e.target.className.includes('select')){
        let i = e.target.innerText
        // e.target.style.color = 'red'
        moveToPage(i)
    }else if(e.target.className.includes('right')){
        showPrevBtn()
        nextToPage()
    }else if(e.target.className.includes('last')){
        hideNextBtn()
        showPrevBtn()
        lastToPage()
    }else if(e.target.className.includes('left')){
        showNextBtn()
        prevToPage()
    }
    else if(e.target.className.includes('first')){
        showNextBtn()
        firstToPage()
    }
    const pageNavBtns = document.querySelectorAll('.page-nav-btn')
    for(let pageNavBtn of pageNavBtns){
        if(pageNavBtn.className.includes('select')){
            pageNavBtn.addEventListener('click', (e) => contorolPage(e))
        }
    }
}
function moveToPage(i){
    noticeContainerNpage.innerHTML = ''
    if(noticeArr.length<i*noticeMaxOfPage){
        for(let n=(i-1)*noticeMaxOfPage; n<noticeArr.length; n++){
            pushNotice(n)
        }
    }else{
        for(let n=(i-1)*noticeMaxOfPage; n<i*noticeMaxOfPage; n++){
            pushNotice(n)
        }
    }
}
function initNoticePageNav(){
    const pageNavBtnsSelect = document.querySelectorAll('.page-nav-btn.select')
    for(let pageNavBtnSelect of pageNavBtnsSelect){
        pageNavBtnSelect.remove()
    }
}
function nextToPage(){
    const pageNavBtns = document.querySelectorAll('.page-nav-btn')
    let i = Number(pageNavBtns[pageNavBtns.length-3].innerText)
    const lastOfPage = Math.ceil(noticeArr.length/pageNavMaxOfPage)
    moveToPage(i+1)
    initNoticePageNav()
    if(lastOfPage<=i+pageNavMaxOfPage){
        hideNextBtn()
        for(let n=i+1; n<lastOfPage+1; n++){
            pushNoticePageNav(n)
        }
    }else{
        for(let n=i+1; n<i+pageNavMaxOfPage+1; n++){
            pushNoticePageNav(n)
        }
    }
}
function lastToPage(){
    const lastOfPage = Math.ceil(noticeArr.length/pageNavMaxOfPage)
    const startLastOfPage = Math.ceil(lastOfPage/pageNavMaxOfPage-1)*pageNavMaxOfPage+1
    moveToPage(startLastOfPage)
    initNoticePageNav()
    for(let n=startLastOfPage; n<lastOfPage+1; n++){
        pushNoticePageNav(n)
    }
}
function prevToPage(){
    const pageNavBtns = document.querySelectorAll('.page-nav-btn')
    let i = Number(pageNavBtns[2].innerText)
    moveToPage(i-pageNavMaxOfPage)
    initNoticePageNav()
    if(i-1 === pageNavMaxOfPage){
        hidePrevBtn()
    }
    for(let n=i-pageNavMaxOfPage; n<i; n++){
        pushNoticePageNav(n)
    }
}
function firstToPage(){
    hidePrevBtn()
    moveToPage(1)
    initNoticePageNav()
    for(let n=1; n<pageNavMaxOfPage+1; n++){
        pushNoticePageNav(n)
    }
}