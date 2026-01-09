import React from 'https://esm.sh/react@18';
import ReactDOM from 'https://esm.sh/react-dom@18/client';
import { VariableProximity } from './VariableProximity.js';

// Tambahkan efek partikel background
function createParticles() {
    const container = document.querySelector('.container');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 100 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.1 + 0.05;
        particle.style.animation = `float ${Math.random() * 20 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(particle);
    }
}

// Tambahkan CSS untuk animasi partikel
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(20px, -20px) rotate(90deg); }
        50% { transform: translate(0, -40px) rotate(180deg); }
        75% { transform: translate(-20px, -20px) rotate(270deg); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    // Render komponen React
    const container = document.getElementById('neptune-text');
    const root = ReactDOM.createRoot(container);
    
    const containerRef = React.createRef();
    container.parentElement.ref = containerRef;
    
    root.render(
        React.createElement(VariableProximity, {
            label: "NEPTUNE PANEL",
            fromFontVariationSettings: "'wght' 300, 'wdth' 100, 'opsz' 10, 'GRAD' 0",
            toFontVariationSettings: "'wght' 900, 'wdth' 125, 'opsz' 144, 'GRAD' 150",
            containerRef: containerRef,
            radius: 150,
            falloff: 'gaussian',
            style: {
                color: '#fe96f5',
                fontFamily: "'Roboto Flex', sans-serif",
                textShadow: '0 0 20px rgba(254, 150, 245, 0.7), 0 0 40px rgba(254, 150, 245, 0.5), 0 0 60px rgba(254, 150, 245, 0.3)'
            }
        })
    );
    
    // Buat partikel background
    createParticles();
    
    // Tambahkan event listener untuk klik
    container.addEventListener('click', () => {
        container.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            container.style.animation = '';
        }, 500);
    });
    
    // Tambahkan CSS untuk efek pulse
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(pulseStyle);
});