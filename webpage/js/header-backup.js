const header = document.querySelector('header')
const logo = document.getElementById('logo')
const gnb = document.getElementById('gnb')
const mainMenus = document.querySelectorAll('.main-menu')
const subMenuInfo = document.querySelector('.sub-menu.info')
const subMenuIntro = document.querySelector('.sub-menu.intro')
const subMenuEvent = document.querySelector('.sub-menu.event')
const subMenuNews = document.querySelector('.sub-menu.news')
const iconSitemap = document.querySelector('.icon.sitemap')
const iconSearch = document.querySelector('.icon.search')
const searchbar = document.getElementById('searchbar')
console.log(mainMenus)

function getSubMenuHeight(subMenu){
    return subMenu.getBoundingClientRect().height
}

function showSubMenu(e){
    if(e.target.className === 'main-menu'){
        e.target.children[1].style.bottom = -getSubMenuHeight(e.target.children[1]) - 10 + 'px'
    }
    // if(e.target.innerText.includes('이용 안내')){
    //     subMenuInfo.style.bottom = -getSubMenuHeight(subMenuInfo) - 10 + 'px'
    // }else if(e.target.innerText.includes('관광지 소개')){
    //     subMenuIntro.style.bottom = -getSubMenuHeight(subMenuIntro) - 10 + 'px'
    // }else if(e.target.innerText.includes('행사')){
    //     subMenuEvent.style.bottom = -getSubMenuHeight(subMenuEvent) - 10 + 'px'
    // }else if(e.target.innerText.includes('소식')){
    //     subMenuNews.style.bottom = -getSubMenuHeight(subMenuNews) -10 + 'px'
    // }

}
function hideSubMenu(){
    subMenuInfo.style.bottom = getSubMenuHeight(subMenuInfo) + 'px'
    subMenuIntro.style.bottom = getSubMenuHeight(subMenuIntro) + 'px'
    subMenuEvent.style.bottom = getSubMenuHeight(subMenuEvent) + 'px'
    subMenuNews.style.bottom = getSubMenuHeight(subMenuNews) + 'px'
}

for(let mainMenu of mainMenus){
    mainMenu.addEventListener('mouseenter', showSubMenu)
    mainMenu.addEventListener('mouseleave', hideSubMenu)
}

function showSitemap(){
    let isSitemap = false
    function sitemap(){
        if(!isSitemap){
            iconSitemap.style.backgroundImage = 'url(img/8666595_x_icon.png)'
            subMenuInfo.style.bottom = -getSubMenuHeight(subMenuInfo) - 10 + 'px'
            subMenuIntro.style.bottom = -getSubMenuHeight(subMenuIntro) - 10 + 'px'
            subMenuEvent.style.bottom = -getSubMenuHeight(subMenuEvent) - 10 + 'px'
            subMenuNews.style.bottom = -getSubMenuHeight(subMenuNews) - 10 + 'px'
            for(let mainMenu of mainMenus){
                mainMenu.removeEventListener('mouseenter', showSubMenu)
                mainMenu.removeEventListener('mouseleave', hideSubMenu)
            }
            isSitemap = true
        }else if(isSitemap){
            iconSitemap.style.backgroundImage = 'url(img/8666802_menu_navigation_icon.png)'
            hideSubMenu()
            for(let mainMenu of mainMenus){
                mainMenu.addEventListener('mouseenter', showSubMenu)
                mainMenu.addEventListener('mouseleave', hideSubMenu)
            }
            isSitemap = false
        }
        return isSitemap
    }
    return sitemap
}


function showSearchbar(){
    let isSearchbar = false
    function search(){
        if(!isSearchbar){
            searchbar.style.display = 'block'
            iconSearch.style.backgroundImage = 'url(img/8666595_x_icon.png)'
            iconSearch.style.zIndex = '2'
            isSearchbar = true
        }else if(isSearchbar){
            searchbar.style.display = 'none'
            iconSearch.style.backgroundImage = 'url(img/8666693_search_icon.png)'
            iconSearch.style.zIndex = '0'
            isSearchbar = false
        }
        return isSearchbar
    }
    return search
}

function moveToMain(){
    window.location.href = "/webpage/main.html"
}

let preScrollTop = 0;

function moveGnb(e){
    // console.log('세로 스크롤에 의해 가려진 위쪽 영역 높이: ' + window.pageYOffset)
    let nextScrollTop = window.scrollY
	if(preScrollTop < nextScrollTop && window.pageYOffset>gnb.getBoundingClientRect().height+50) {
      gnb.style.top = -gnb.getBoundingClientRect().height + 'px'
    }
	else {
      gnb.style.top = 0 + 'px'
    }
	preScrollTop = nextScrollTop;
}

window.addEventListener('scroll', moveGnb)

logo.addEventListener('click', moveToMain)
iconSearch.addEventListener('click', showSearchbar())
iconSitemap.addEventListener('click', showSitemap())