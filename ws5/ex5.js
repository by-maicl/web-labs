/* Напишіть скрипт, який при настанні події dblclick задає вирівнювання по лівому
краю вмісту блоків «3», «4», «5» при встановленні користувачем відповідних
галочок у формі і зберігає відповідні значення в localStorage броузера так, щоб
при наступному відкриванні документа властивості вирівнювання по лівому
краю вмісту блоків «3», «4», «5» встановлювались із збережених значень в
localStorage.
*/

const BLOCK_IDS = ["header", "menuHeader", "content", "menu", "aside", "contentFooter", "footer"];
const editorContainer = document.getElementById("editorContainer");
const select = document.getElementById("blockSelect");

const originalContent = Object.fromEntries(
    BLOCK_IDS.map(id => [id, document.getElementById(id).innerHTML])
);

document.addEventListener("DOMContentLoaded", restoreEditedBlocks);
select.addEventListener("change", showEditor);

function restoreEditedBlocks() {
    BLOCK_IDS.forEach(id => {
        const saved = localStorage.getItem(id);
        if (saved) applyEditedContent(id, saved);
    });
}

function showEditor() {
    const blockId = select.value;
    if (!blockId) return;

    const block = document.getElementById(blockId);
    editorContainer.innerHTML = "";

    const textarea = createTextarea(block.innerHTML);

    const saveBtn = createButton("Зберегти зміни", () => {
        const newHTML = textarea.value.trim();
        saveBlock(blockId, newHTML);
    });

    editorContainer.append(textarea, saveBtn);
}

function saveBlock(id, newContent) {
    localStorage.setItem(id, newContent);

    const block = document.getElementById(id);

    block.innerHTML = newContent;

    block.style.fontStyle = "italic";

    ensureRestoreButton(id);
}


function applyEditedContent(id, html) {
    const block = document.getElementById(id);

    block.innerHTML = html;
    block.style.fontStyle = "italic";

    ensureRestoreButton(id);
}

function ensureRestoreButton(id) {
    const existing = document.getElementById(`restore-${id}`);
    if (existing) return;

    const btn = createButton("Відновити початковий стан", () => restoreBlock(id));
    btn.id = `restore-${id}`;

    document.getElementById(id).insertAdjacentElement("afterend", btn);
}

function restoreBlock(id) {
    localStorage.removeItem(id);

    const block = document.getElementById(id);
    block.innerHTML = originalContent[id];
    block.style.fontStyle = "normal";

    const btn = document.getElementById(`restore-${id}`);
    if (btn) btn.remove();
}

function createTextarea(value) {
    const t = document.createElement("textarea");
    t.value = value;
    return t;
}

function createButton(text, onClick) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.classList.add("btn-clear")
    btn.onclick = onClick;
    return btn;
}
