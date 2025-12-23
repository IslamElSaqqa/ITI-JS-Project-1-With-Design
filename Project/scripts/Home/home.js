document.addEventListener("DOMContentLoaded", function() {
    retrieveUsername();

    const logoutBtn = document.getElementById("logoutBtn");
    if (!getCookie('username') && logoutBtn) {
        logoutBtn.style.display = "none";
    }

});

let spannedUsername = document.getElementById("Username");

function getCookie(name) {
    let cookieArr = document.cookie.split("; ");
    for (let cookie of cookieArr) {
        let [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

function retrieveUsername() {
    let storedUsername = getCookie('username');
    console.log(storedUsername)
    if (!storedUsername) { 
        spannedUsername.textContent = '';
        return false;
    }

    spannedUsername.textContent = storedUsername;
    return true;
}
//^ ****************************************************
const heroImages = [
    'https://res.cloudinary.com/dr9yx1tod/image/upload/v1766256829/A_Man_VR_xvlv3u.jpg',
    'https://res.cloudinary.com/dr9yx1tod/image/upload/v1766256830/Woman2_VRjpg_esm5l7.jpg',
    'https://res.cloudinary.com/dr9yx1tod/image/upload/v1766256868/VR_MAN_arunbp.jpg',
    'https://res.cloudinary.com/dr9yx1tod/image/upload/v1766256939/A_kid_Wearing_VR_eurtsc.png'
];

let currentHeroIndex = 0;
const heroSlider = document.getElementById('hero-slider');

function showNextHero() {
    if (!heroSlider) return;
    heroSlider.style.opacity = 0; // fade out
    setTimeout(() => {
        heroSlider.src = heroImages[currentHeroIndex];
        heroSlider.style.opacity = 1; // fade in
        currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
    }, 500);
}

// Initialize
if (heroSlider) {
    heroSlider.src = heroImages[currentHeroIndex];
    currentHeroIndex++;
    setInterval(showNextHero, 4000); // change every 4 seconds
}


// ***********************************************
//^ Fake store api (https://fakestoreapi.com)

//^ Select the container where products will be displayed
const productsGrid = document.querySelector('.products-grid');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://fakestoreapi.com/products', true);

xhr.onload = function() {
    if (xhr.status === 200) {
        const products = JSON.parse(xhr.responseText);

        console.log(products)
        // Clear existing content
        productsGrid.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            const imgDiv = document.createElement('div');
            imgDiv.className = 'product-image';
            imgDiv.style.backgroundImage = `url(${product.image})`;

            const nameDiv = document.createElement('div');
            nameDiv.className = 'product-name';
            nameDiv.textContent = product.title;

            const priceDiv = document.createElement('div');
            priceDiv.className = 'product-price';
            priceDiv.textContent = `$${product.price.toFixed(2)}`;

            const descDiv = document.createElement('div');
            descDiv.className = 'product-description';
            descDiv.textContent = product.description;

            card.appendChild(imgDiv);
            card.appendChild(nameDiv);
            card.appendChild(priceDiv);
            // card.appendChild(descDiv);

            // Click event: store product in localStorage and redirect
            card.addEventListener('click', () => {
            localStorage.setItem('selectedProduct', JSON.stringify(product));
                window.location.href = `product-details.html?id=${product.id}`;
    });


            productsGrid.appendChild(card);
        });
    } else {
        console.error('Failed to fetch products:', xhr.status);
    }
};

xhr.send();



