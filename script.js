document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    
    // Gestione del cursore
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    });

    // Gestione hover
    const hoverElements = document.querySelectorAll('a, button, .hover-effect, h1, .nav-link, p, .intro-text, .paragraph, .content-container, section');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // Gestione della navigazione e delle sezioni
    const links = document.querySelectorAll('.nav-link');
    const sezioni = document.querySelectorAll('.sezione');

    // Mostra la sezione intro all'avvio
    document.getElementById('intro').classList.add('active');

    // Gestione click sui link di navigazione
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Nascondi tutte le sezioni, incluso intro
            sezioni.forEach(sezione => {
                sezione.classList.remove('active');
            });
            document.getElementById('intro').classList.remove('active');

            // Mostra la sezione target
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                // Aggiungi un piccolo ritardo per lo scroll
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        });
    });

    // Gestione scroll per attivare le sezioni
    function checkScroll() {
        sezioni.forEach(sezione => {
            const sectionTop = sezione.offsetTop;
            const sectionHeight = sezione.offsetHeight;
            const windowHeight = window.innerHeight;
            const scroll = window.pageYOffset;

            if (scroll > sectionTop - windowHeight / 2) {
                sezione.classList.add('active');
            }
        });
    }

    // Ascolta l'evento scroll
    window.addEventListener('scroll', checkScroll);
    
    // Controlla lo scroll all'avvio
    checkScroll();

    // Gestione cursore
    document.body.style.cursor = 'none';
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    });
    
    // Gestione del cambio immagine
    const toggleButton = document.getElementById('toggleImage');
    const compareImage = document.getElementById('compareImage');
    let isFirstImage = true;
    
    toggleButton.addEventListener('click', () => {
        if (isFirstImage) {
            compareImage.src = 'https://raw.githubusercontent.com/ALE19M/CSV_MITD/main/foto4_2.png';
        } else {
            compareImage.src = 'https://raw.githubusercontent.com/ALE19M/CSV_MITD/main/foto4_1.png';
        }
        isFirstImage = !isFirstImage;
    });
    
    // Carica i testi delle statistiche
    fetch('https://raw.githubusercontent.com/ALE19M/CSV_MITD/main/descrizione.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('statistiche-descrizione').innerHTML = data.replace(/\n/g, '<br>');
        })
        .catch(error => console.error('Errore nel caricamento del testo:', error));

    fetch('https://raw.githubusercontent.com/ALE19M/CSV_MITD/main/testo1.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('statistiche-testo').innerHTML = data.replace(/\n/g, '<br>');
        })
        .catch(error => console.error('Errore nel caricamento del testo:', error));

    fetch('https://raw.githubusercontent.com/ALE19M/CSV_MITD/main/testo2.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('statistiche-metodologia').innerHTML = data.replace(/\n/g, '<br>');
        })
        .catch(error => console.error('Errore nel caricamento del testo:', error));
    fetch('https://raw.githubusercontent.com/ALE19M/CSV_MITD/main/testo3.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('statistiche-conclusioni').innerHTML = data.replace(/\n/g, '<br>');
        })
        .catch(error => console.error('Errore nel caricamento del testo:', error));
    // Gestione click sul titolo per tornare alla homepage
    const homeLink = document.querySelector('.home-link');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Nascondi tutte le sezioni
            sezioni.forEach(sezione => {
                sezione.classList.remove('active');
            });

            // Mostra la sezione intro
            const introSection = document.getElementById('intro');
            if (introSection) {
                introSection.classList.add('active');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});