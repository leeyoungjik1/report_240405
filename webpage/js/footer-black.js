const footerElements = document.querySelectorAll('footer div')
const iconFooterInsta = document.querySelector('.icon.footer-insta')

for(let footerElement of footerElements){
    footerElement.style.color = 'black'
}
iconFooterInsta.style.backgroundImage = 'url(img/4691240_instagram_icon.png)'


function moveToInsta(){
    window.open('https://www.instagram.com/flower_th_/')
}

iconFooterInsta.addEventListener('click', moveToInsta)