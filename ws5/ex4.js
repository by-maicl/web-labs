/* Напишіть скрипт, який при настанні події dblclick задає вирівнювання по лівому
краю вмісту блоків «3», «4», «5» при встановленні користувачем відповідних
галочок у формі і зберігає відповідні значення в localStorage броузера так, щоб
при наступному відкриванні документа властивості вирівнювання по лівому
краю вмісту блоків «3», «4», «5» встановлювались із збережених значень в
localStorage.
*/

const blocksAlign = [
    { id: 'content', chk: 'chk3' },
    { id: 'aside', chk: 'chk4' },
    { id: 'menu', chk: 'chk5' }
];

function applyAlignment() {
    blocksAlign.forEach(item => {
        const checkbox = document.getElementById(item.chk);
        const block = document.getElementById(item.id);

        if (checkbox.checked) {
            block.style.textAlign = 'left';
            localStorage.setItem(item.id, 'left');
        } else {
            block.style.textAlign = 'center';
            localStorage.setItem(item.id, 'center');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    blocksAlign.forEach(item => {
        const saved = localStorage.getItem(item.id);
        const block = document.getElementById(item.id);
        const checkbox = document.getElementById(item.chk);

        if (saved === 'left') {
            block.style.textAlign = 'left';
            checkbox.checked = true;
        } else {
            block.style.textAlign = 'center';
            checkbox.checked = false;
        }
    });
});

document.addEventListener('dblclick', applyAlignment);
