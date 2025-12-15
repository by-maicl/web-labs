class GlitchText {
    constructor(text, count, container) {
        this.text = text;
        this.count = parseInt(count);
        this.container = container;
    }

    render() {
        // 🛡 Захист від null (дуже добре для лабораторної)
        if (!this.container) {
            console.error('GlitchText: container not found');
            return;
        }

        this.container.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'glitch-text';
        wrapper.innerText = this.text;

        const colors = ['red', 'blue', 'lime', 'magenta', 'cyan'];

        for (let i = 0; i < this.count; i++) {
            const layer = document.createElement('div');
            layer.className = 'glitch-layer';
            layer.innerText = this.text;

            const color = colors[i % colors.length];
            layer.style.textShadow = `${(Math.random() * 4) - 2}px 0 ${color}`;

            const animName = i % 2 === 0 ? 'glitch-anim-1' : 'glitch-anim-2';
            const duration = 2 + Math.random();
            layer.style.animation = `${animName} ${duration}s infinite linear alternate-reverse`;

            layer.style.zIndex = 1 + i;

            wrapper.appendChild(layer);
        }

        this.container.appendChild(wrapper);
    }
}
