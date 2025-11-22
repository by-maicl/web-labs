/* Напишіть скрипт, який визначає кількість слів у тексті, де слова розділяються пробілом, беручи
текст із відповідної форми в блоці «3», а отриманий результат виводить за допомогою діалогового вікна
і зберігає в cookies, причому:
а) при оновленні веб-сторінки в броузері користувачу за допомогою
діалогового вікна виводиться інформація, збережена в cookies, із питанням про
необхідність видалити дані із cookies, і не виводиться згадана вище форма
б) при підтвердженні питання відповідні cookies видаляються, і веб-сторінка
оновлюється з початковим станом із наявною формою для введення даних;
в) при відмові виводиться наступне діалогове вікно із інформуванням
користувача про наявність cookies і потребу перезавантажити веб-сторінку.
*/

const formBlock = document.getElementById('formBlock')
const formInput = document.getElementById('formInput')
const formButton = document.getElementById('formButton')
const modalWindow = document.getElementById('modalWindow')

formButton.addEventListener('click', () => {
    if (formInput.value !== '') {
        let text = formInput.value.trim().split(' ')
        let wordCount = text.length

        const textParagraph = document.createElement('p')
        textParagraph.textContent = `Кількість слів: ${wordCount}`

        modalWindow.style.display = 'block'
        modalWindow.append(textParagraph)

        Cookies.set('words', `${wordCount}`)

        formInput.value = ''
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const cookiesValue = Cookies.get('words')

    if (!cookiesValue)
        return

    formBlock.style.display = 'none'

    const textParagraph = document.createElement('p')
    textParagraph.textContent = `Кількість слів: ${cookiesValue}. Видалити ці дані з Cookies?`

    const btnBlock = document.createElement('div')
    const agreeBtn = document.createElement('button')
    const rejectBtn = document.createElement('button')
    btnBlock.classList.add('modalWindowBtnBlock')
    agreeBtn.classList.add('modalWindowBtn')
    rejectBtn.classList.add('modalWindowBtn')
    agreeBtn.textContent = 'Так'
    rejectBtn.textContent = 'Ні'

    btnBlock.append(agreeBtn, rejectBtn)

    modalWindow.style.display = 'block'
    modalWindow.append(textParagraph, btnBlock)

    cookiesButtons(agreeBtn, rejectBtn, textParagraph)
})


function cookiesButtons(agreeBtn, rejectBtn, text) {
    agreeBtn.addEventListener('click', () => {
        Cookies.remove('words')
        location.reload()
        return true
    })

    rejectBtn.addEventListener('click', () => {
        const message = document.createElement('p')
        message.textContent = 'Cookies ще існують, необхідно перезавантажити сторінку'

        modalWindow.append(message)

        agreeBtn.remove()
        rejectBtn.remove()
        text.remove()

        setTimeout(() => {
            modalWindow.style.display = 'none'
        }, 5000)
    })
}