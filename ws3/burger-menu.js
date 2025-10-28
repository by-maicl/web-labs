const burgerButton = document.getElementById("burgerButton")
const menu = document.getElementById("menu")

burgerButton.addEventListener('click', () => {
    menu.classList.toggle('active')
    
    if (menu.classList.contains('active') ) {
        document.body.style.overflowY = 'hidden'
        burgerButton.innerText = '×'
    } else {
        document.body.style.overflowY = ''
        burgerButton.innerText = '≡'
    }
})