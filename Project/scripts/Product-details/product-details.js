// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const mainImage = document.querySelector('.product-main-image');
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');
const productTitle = document.getElementById('product-title');
const productCategory = document.getElementById('product-category');
const productDescription = document.getElementById('product-description');
const productPrice = document.getElementById('product-price');
const productRating = document.getElementById('product-rating');

let galleryImages = [];
let currentImageIndex = 0;

if (!productId) {
    document.querySelector('.product-info').innerHTML = '<p>Product ID not specified.</p>';
} else {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://fakestoreapi.com/products/${productId}`, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const product = JSON.parse(xhr.responseText);

            // For demo: simulate multiple images using same image
            galleryImages = [product.image, product.image, product.image];
            mainImage.src = galleryImages[currentImageIndex];

            productTitle.textContent = product.title;
            productCategory.textContent = `Category: ${product.category}`;
            productDescription.textContent = product.description;
            productPrice.textContent = `$${product.price.toFixed(2)}`;

            // Generate rating stars
            productRating.innerHTML = '';
            const fullStars = Math.floor(product.rating.rate);
            const halfStar = product.rating.rate - fullStars >= 0.5;
            for (let i = 0; i < fullStars; i++) {
                const star = document.createElement('span');
                star.className = 'star';
                star.textContent = '★';
                productRating.appendChild(star);
            }
            if (halfStar) {
                const star = document.createElement('span');
                star.className = 'star';
                star.textContent = '☆';
                productRating.appendChild(star);
            }

        } else {
            document.querySelector('.product-info').innerHTML = '<p>Product not found.</p>';
        }
    };

    xhr.send();
}


