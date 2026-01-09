document.addEventListener('DOMContentLoaded', function() {
    const text = "Neptune Panel";
    const textElement = document.getElementById('animated-text');
    const cursor = document.querySelector('.cursor');
    const particlesContainer = document.getElementById('particles-container');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let letters = [];
    let animationId = null;
    
    // Create letters
    for (let i = 0; i < text.length; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'letter';
        letterSpan.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        letterSpan.style.fontVariationSettings = "'wght' 400, 'wdth' 100";
        
        // Store letter data
        letters.push({
            element: letterSpan,
            x: 0,
            y: 0,
            width: 0,
            height: 0
        });
        
        textElement.appendChild(letterSpan);
    }
    
    // Update letter positions
    function updateLetterPositions() {
        letters.forEach((letter, index) => {
            const rect = letter.element.getBoundingClientRect();
            letter.x = rect.left + rect.width / 2;
            letter.y = rect.top + rect.height / 2;
            letter.width = rect.width;
            letter.height = rect.height;
        });
    }
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Touch tracking
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
    }, { passive: false });
    
    // Animation loop
    function animate() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Update font variations based on cursor proximity
        letters.forEach((letter) => {
            const dx = cursorX - letter.x;
            const dy = cursorY - letter.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Maximum interaction radius
            const maxRadius = 150;
            
            if (distance < maxRadius) {
                // Calculate influence (0 to 1)
                const influence = 1 - (distance / maxRadius);
                
                // Weight variation (400 to 900)
                const weight = 400 + (500 * influence);
                
                // Width variation (100 to 125)
                const width = 100 + (25 * influence);
                
                // Apply font variations
                letter.element.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}`;
                
                // Add subtle scale effect
                const scale = 1 + (0.1 * influence);
                letter.element.style.transform = `scale(${scale})`;
                
                // Create particles occasionally
                if (Math.random() < 0.3 * influence) {
                    createParticle(letter.x, letter.y);
                }
            } else {
                // Reset to default
                letter.element.style.fontVariationSettings = "'wght' 400, 'wdth' 100";
                letter.element.style.transform = 'scale(1)';
            }
        });
        
        // Update particles
        updateParticles();
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Particles system
    let particles = [];
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = '0.7';
        
        // Random velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        particles.push({
            element: particle,
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            life: 1.0,
            speed: speed
        });
        
        particlesContainer.appendChild(particle);
    }
    
    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Update life
            p.life -= 0.02;
            
            // Apply
            p.element.style.left = p.x + 'px';
            p.element.style.top = p.y + 'px';
            p.element.style.opacity = p.life * 0.7;
            p.element.style.transform = `scale(${p.life})`;
            
            // Remove dead particles
            if (p.life <= 0) {
                p.element.remove();
                particles.splice(i, 1);
            }
        }
    }
    
    // Initialize
    updateLetterPositions();
    animate();
    
    // Update on resize
    window.addEventListener('resize', updateLetterPositions);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
});
