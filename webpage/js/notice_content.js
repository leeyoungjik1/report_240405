import { noticeArr } from "./data.js"
const noticeNcpage = document.getElementById('notice-ncpage')
const titleNcpage = document.querySelector('.title-ncpage')
const contentNcpage = document.querySelector('.content-ncpage')
const dateNcpage = document.querySelector('.date-ncpage')
const noticeNextTitle = document.querySelector('.notice-ncpage.next-title a')
const noticeNextDate = document.querySelector('.notice-ncpage.next-date')
const noticePrevTitle = document.querySelector('.notice-ncpage.prev-title a')
const noticePrevDate = document.querySelector('.notice-ncpage.prev-date')
const noticeNcpageBtn = noticeNcpage.querySelector('button')

const selectedNoticeIdNum = window.location.search.split('?')[1].split('=')[1]
const selectedNotice = noticeArr[selectedNoticeIdNum-1]

titleNcpage.innerText = selectedNotice.title
contentNcpage.innerText = selectedNotice.content
dateNcpage.innerText = `등록일 ${selectedNotice.date}`

function pushNextNotice(){
    noticeNextTitle.innerText = noticeArr[selectedNoticeIdNum-2].title
    noticeNextTitle.setAttribute('href', `/webpage/notice_content.html?id=${noticeArr[selectedNoticeIdNum-2].noticeIdNum}`)
    noticeNextDate.innerText = noticeArr[selectedNoticeIdNum-2].date
}
function pushPrevNotice(){
    noticePrevTitle.innerText = noticeArr[selectedNoticeIdNum].title
    noticePrevTitle.setAttribute('href', `/webpage/notice_content.html?id=${noticeArr[selectedNoticeIdNum].noticeIdNum}`)
    noticePrevDate.innerText = noticeArr[selectedNoticeIdNum].date
}



function loadNotice(){
    if(!noticeArr[selectedNoticeIdNum-2]){
        noticeNextTitle.innerText = '다음글이 없습니다.'
        pushPrevNotice()
    }else if(!noticeArr[selectedNoticeIdNum]){
        noticePrevTitle.innerText = '이전글이 없습니다.'
        pushNextNotice()
    }else{
        pushNextNotice()
        pushPrevNotice()
    }
}

function moveToList(){
    window.location.href = "/webpage/notice.html"
}

noticeNcpageBtn.addEventListener('click', moveToList)
window.addEventListener('load', loadNotice)


