const header = document.querySelector('header')
const logo = document.getElementById('logo')
const gnb = document.getElementById('gnb')
const mainMenus = document.querySelectorAll('.main-menu')
const subMenus = document.querySelectorAll('.sub-menu')
const subMenuInfo = document.querySelector('.sub-menu.info')
const subMenuIntro = document.querySelector('.sub-menu.intro')
const subMenuEvent = document.querySelector('.sub-menu.event')
const subMenuNews = document.querySelector('.sub-menu.news')
const iconSitemap = document.querySelector('.icon.sitemap')
const iconSearch = document.querySelector('.icon.search')
const searchbar = document.getElementById('searchbar')
// console.log(subMenus)

function getSubMenuHeight(subMenu){
    return subMenu.getBoundingClientRect().height
}

function showSubMenu(e){

    if(e.target.className === 'main-menu'){
        e.target.children[1].style.bottom = -getSubMenuHeight(e.target.children[1]) - 10 + 'px'
    }
}
function hideSubMenu(e){
    for(let subMenu of subMenus){
        subMenu.style.bottom = getSubMenuHeight(subMenu) + 'px'
    }
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
            for(let subMenu of subMenus){
                subMenu.style.bottom = -getSubMenuHeight(subMenu) - 10 + 'px'
            }
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
            window.removeEventListener('scroll', moveGnb)
            searchbar.style.display = 'block'
            iconSearch.style.backgroundImage = 'url(img/8666595_x_icon.png)'
            iconSearch.style.zIndex = '2'
            isSearchbar = true
        }else if(isSearchbar){
            window.addEventListener('scroll', moveGnb)
            searchbar.style.display = 'none'
            iconSearch.style.backgroundImage = 'url(img/8666693_search_icon.png)'
            iconSearch.style.zIndex = '0'
            isSearchbar = false
        }
        return isSearchbar
    }
    return search
}



let preScrollTop = 0;

function moveGnb(e){
    let nextScrollTop = window.scrollY
    // console.log(preScrollTop, nextScrollTop)
	if(preScrollTop < nextScrollTop && window.pageYOffset>gnb.getBoundingClientRect().height+50) {
        gnb.style.top = -gnb.getBoundingClientRect().height + 'px'
        // console.log(gnb.getBoundingClientRect().height)
    }
	else{
        // console.log('위')
        gnb.style.top = 0 + 'px'
    }
	preScrollTop = nextScrollTop;
}

window.addEventListener('scroll', moveGnb)


function moveToMain(){
    window.location.href = "/webpage/main.html"
}


logo.addEventListener('click', moveToMain)
iconSearch.addEventListener('click', showSearchbar())
iconSitemap.addEventListener('click', showSitemap())