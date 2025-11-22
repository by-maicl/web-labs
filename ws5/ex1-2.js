// Поміняйте місцями контент блоків «4» та «5».
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById('menu')
    const aside = document.getElementById('aside')

    const tempContent = menu.innerHTML

    menu.innerHTML = aside.innerHTML
    aside.innerHTML = tempContent
})

// Напишіть функцію, яка обчислює площу овала, беручи необхідні значення із відповідних змінних у скрипті, 
// і виводить отриманий результат в кінці контенту в блоці «3».
function ovalSquere(a, b) {
    const PI = 3.14
    return PI * a * b
}

const contentBlock = document.getElementById('content')
const result = document.createElement('p')

result.textContent = `Площа овала: ${ovalSquere(20, 10)}`
result.style.color = "#00ff0da4"

contentBlock.append(result)
