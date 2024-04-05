const srollImgContainer = document.getElementById('sroll-img-container')
const scrollImgBtns = document.querySelectorAll('.scroll-img-btn')
const noticeBtns = document.querySelectorAll('.notice-btn')
const noticeTitle = document.getElementById('notice-title')
const noticeDate = document.getElementById('notice-date')
const noticeEx = [
    {title: '공지 사항 제목 1', date: '2024-03-20', content: '공지사항 1의 내용'},
    {title: '공지 사항 제목 2', date: '2024-03-21', content: '공지사항 2의 내용'},
    {title: '공지 사항 제목 3', date: '2024-03-22', content: '공지사항 3의 내용'},
    {title: '공지 사항 제목 4', date: '2024-03-23', content: '공지사항 4의 내용'}
]


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
        }, 10)
    }
    // setInterval(function(){
    //     // console.log(i)
    //     i++
    //     srollImgContainer.style.left = -100 * i + '%'
    //     if(i>3){
    //         i=1
    //         setTimeout(initImg, 2000)
    //     }
    // }, 4000)

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

function showNotice(){
    let i = 0
    puchNotice()
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
    function puchNotice(){
        noticeTitle.innerText = noticeEx[i].title
        noticeDate.innerText = noticeEx[i].date
    }
    function nextNotice(){
        i++
        if(i<noticeEx.length){
            puchNotice()
        }else if(i>noticeEx.length-1){
            i=0
            puchNotice()
        }
    }
    function prevNotice(){
        i--
        if(i>-1){
            puchNotice()
        }else if(i<0){
            i=noticeEx.length-1
            puchNotice()
        }
    }
}

window.addEventListener('load', changeImg)
window.addEventListener('load', showNotice)