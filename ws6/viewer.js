async function loadGlitches() {
    const response = await fetch('get_data.php');
    const data = await response.json();

    const container = document.getElementById('glitch-center');
    container.innerHTML = '';

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glitch-card';

        const glitchContainer = document.createElement('div');
        card.appendChild(glitchContainer);

        const glitch = new GlitchText(
            item.text,
            item.count,
            glitchContainer
        );

        glitch.render();

        container.appendChild(card);
    });
}

loadGlitches();
setInterval(loadGlitches, 5000);
