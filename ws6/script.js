function generateGlitch() {
    const text = document.getElementById('userText').value;
    const count = document.getElementById('elemCount').value;
    const container = document.getElementById('glitch-result-area')

    if (text) {
        const myGlitch = new GlitchText(text, count, container);
        myGlitch.render();
        container.value = ''
    } else {
        alert("Будь ласка, введіть текст!");
    }
}

async function saveConfig() {
    const textVal = document.getElementById('userText').value;
    const countVal = document.getElementById('elemCount').value;

    if (!textVal) {
        alert('Введіть текст перед збереженням!');
        return;
    }

    const dataToSend = {
        text: textVal,
        count: countVal
    };

    try {
        const response = await fetch('save_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert(result.message);
            console.log('Збережено:', result);
        } else {
            alert('Помилка: ' + result.message);
        }

    } catch (error) {
        console.error('Помилка з\'єднання:', error);
        alert('Не вдалося з\'єднатися з сервером. Переконайтеся, що ви використовуєте локальний сервер (OpenServer/XAMPP).');
    }
}