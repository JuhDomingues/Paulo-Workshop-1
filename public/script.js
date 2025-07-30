
// Countdown Timer para 29/07/2025 às 19:30
function updateCountdown() {
    const targetDate = new Date('2025-08-12T19:30:00-03:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<div style="font-size: 2rem; color: #ff3333;">A AULA JÁ COMEÇOU!</div>';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Form submission
document.getElementById('captureForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const button = form.querySelector('.cta-button');
    const originalText = button.textContent;
    const data = new FormData(form);

    button.textContent = 'Processando...';
    button.disabled = true;

    fetch('/inscrever', {
        method: 'POST',
        body: new URLSearchParams(data)
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'obrigado.html';
        } else {
            button.textContent = '❌ Erro ao inscrever';
            button.style.background = '#c0392b';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        button.textContent = '❌ Erro de conexão';
        button.style.background = '#c0392b';
    })
    .finally(() => {
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 4000);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.benefit-card, .stat-item');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animation styles
document.querySelectorAll('.benefit-card, .stat-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Auto-focus no primeiro campo do formulário em desktop
if (window.innerWidth > 768) {
    document.querySelector('.form-input').focus();
}
