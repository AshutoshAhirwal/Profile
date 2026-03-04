/**
 * Portfolio Stage Architecture & MNC Interactions
 * Author: Antigravity for Ashutosh Ahirwal
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // 2. The Stage Switcher (The WOW factor)
    const layers = document.querySelectorAll('.section-layer');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentIndex = 0;
    let isTransitioning = false;

    function transitionTo(index) {
        if (index < 0 || index >= layers.length || isTransitioning) return;
        isTransitioning = true;

        layers.forEach((layer, i) => {
            layer.classList.remove('active', 'prev', 'next');
            if (i < index) layer.classList.add('prev');
            else if (i > index) layer.classList.add('next');
            else layer.classList.add('active');
        });

        // Update Nav
        navLinks.forEach((link, i) => {
            link.classList.toggle('active', i === index);
        });

        currentIndex = index;
        setTimeout(() => isTransitioning = false, 1000);
    }

    // Handle Wheel / Scroll
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 50) transitionTo(currentIndex + 1);
        else if (e.deltaY < -50) transitionTo(currentIndex - 1);
    });

    // Nav Click
    navLinks.forEach((link, i) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            transitionTo(i);
        });
    });

    // 3. Kinetic Parallax Text
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        document.querySelectorAll('.parallax-text').forEach(text => {
            text.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // 4. View Toggle (Visual vs Structure)
    const toggleBtn = document.getElementById('view-toggle');
    let isVisualMode = true;

    toggleBtn.addEventListener('click', () => {
        isVisualMode = !isVisualMode;
        document.body.classList.toggle('structure-mode');
        toggleBtn.textContent = isVisualMode ? 'VIEW: VISUAL' : 'VIEW: STRUCTURE';
        
        // Add a glitch effect for the transition
        document.body.style.filter = 'invert(1) contrast(2)';
        setTimeout(() => document.body.style.filter = 'none', 150);
    });

    // Terminal logic remains for the hero section
    const terminalOutput = document.getElementById('terminal-output');
    if (terminalOutput) {
        const commands = [
            { text: "ssh ashutosh@drupal-architect", delay: 500 },
            { text: "Status: ACCESS GRANTED", delay: 200, type: 'output' },
            { text: "npx drupal-credits --user=ahirwal", delay: 800 },
            { text: "Credits: 105+ (Core & Contrib)", delay: 400, type: 'output' },
            { text: "Loading custom SDC components...", delay: 600, type: 'output' }
        ];

        async function type() {
            for (const cmd of commands) {
                await new Promise(r => setTimeout(r, cmd.delay));
                const div = document.createElement('div');
                div.style.marginBottom = '4px';
                div.innerHTML = cmd.type === 'output' ? `<span style="color:#FFF">> ${cmd.text}</span>` : `<span style="color:#3B82F6">$</span> ${cmd.text}`;
                terminalOutput.appendChild(div);
            }
        }
        type();
    }
});
