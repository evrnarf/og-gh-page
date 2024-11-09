// Slider için gerekli değişkenler
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// Slider fonksiyonu
function showSlide(n) {
    slides.forEach(slide => slide.style.display = 'none');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].style.display = 'block';
}

// Otomatik slider
function autoSlide() {
    showSlide(currentSlide + 1);
}
setInterval(autoSlide, 5000);

// Filtreleme sistemi
const filterButtons = document.querySelectorAll('.filtreler button');
const araclar = document.querySelectorAll('.arac-kart');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Aktif buton stilini güncelle
        filterButtons.forEach(btn => btn.classList.remove('aktif'));
        button.classList.add('aktif');

        // Araçları filtrele
        const kategori = button.textContent.toLowerCase();
        araclar.forEach(arac => {
            const aracKategori = arac.dataset.kategori;
            if (kategori === 'tümü' || aracKategori === kategori) {
                arac.style.display = 'block';
            } else {
                arac.style.display = 'none';
            }
        });
    });
});

// Mobile menü toggle
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar ul');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Form gönderimi
const contactForm = document.querySelector('.iletisim-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Mesajınız başarıyla gönderildi!');
            contactForm.reset();
        } else {
            throw new Error('Bir hata oluştu');
        }
    } catch (error) {
        alert('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
});

// Araç detay sayfası pop-up
const detayButtons = document.querySelectorAll('.detay-btn');
const modal = document.querySelector('.modal');

detayButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const aracId = button.dataset.aracId;
        // Araç detaylarını getir ve modalı göster
        getAracDetay(aracId);
    });
});

async function getAracDetay(id) {
    try {
        const response = await fetch(`/api/arac/${id}`);
        const data = await response.json();
        // Modal içeriğini güncelle
        updateModal(data);
    } catch (error) {
        console.error('Araç detayları alınamadı:', error);
    }
}

// Arama sistemi
const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');

searchInput.addEventListener('input', debounce(async (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.length < 2) return;

    try {
        const response = await fetch(`/api/search?term=${searchTerm}`);
        const results = await response.json();
        displaySearchResults(results);
    } catch (error) {
        console.error('Arama hatası:', error);
    }
}, 300));

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}