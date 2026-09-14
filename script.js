// Hero Image Slider

let currentImage = 0;

const heroSlides = document.querySelector(".hero-slides");

const totalImages = 3;

function nextImage() {

    currentImage++;

    if (currentImage >= totalImages) {
        currentImage = 0;
    }
    heroSlides.style.transform =
        `translateX(-${currentImage * 33.3333}%)`;
}

function prevImage() {

    currentImage--;

    if (currentImage < 0) {
        currentImage = totalImages - 1;
    }
    heroSlides.style.transform =
        `translateX(-${currentImage * 33.3333}%)`;
}

// Navbar Active Link

const navLinks = document.querySelectorAll("#navMenu a");

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach(function(link) {

    const href = link.getAttribute("href");

    // Page links
    if (!href.startsWith("#")) {

        const linkPage = href.split("#")[0];

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    }

    link.addEventListener("click", function() {

        navLinks.forEach(function(item) {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});


// Mobile menu

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn) {
    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("open");
    });
}

const offerBar = document.getElementById("offerBar");
const closeOffer = document.getElementById("closeOffer");

if (closeOffer) {
    closeOffer.addEventListener("click", function () {
        offerBar.style.display = "none";

    });

}


// Favorite button

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        if (button.classList.contains("liked")) {
            button.classList.remove("liked");
            button.textContent = "♡";

        } else {
            button.classList.add("liked");
            button.textContent = "♥";
        }
    });
});


// Collections search + category + occasion filtering

const searchInput = document.getElementById("searchInput");
const categoryFilters =
    document.querySelectorAll(".category-filter");

const occasionFilters =
    document.querySelectorAll(".occasion-filter");

const productCards =
    document.querySelectorAll(".product");

const productCount =
    document.getElementById("productCount");

const noProducts =
    document.getElementById("noProducts");

const clearFilter =
    document.getElementById("clearFilter");

function filterProducts() {

    if (!productCards.length) return;

    // Search value
    const searchText =
        searchInput.value.toLowerCase().trim();

    // Selected categories
    const selectedCategories =
        [...categoryFilters]
            .filter(input => input.checked)
            .map(input => input.value);

    // Selected occasions

    const selectedOccasions =
        [...occasionFilters]
            .filter(input => input.checked)
            .map(input => input.value);

    let visible = 0;

    productCards.forEach(function(product) {

        const name =
            product.dataset.name.toLowerCase();

        const tags =
            product.dataset.tags.split(" ");

        // Search

        const matchesSearch =
            name.includes(searchText);

        // Category

        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.some(category =>
                tags.includes(category)
            );

        // Occasion

        const matchesOccasion =
            selectedOccasions.length === 0 ||
            selectedOccasions.some(occasion =>
                tags.includes(occasion)
            );

        // Final result
        if (
            matchesSearch &&
            matchesCategory &&
            matchesOccasion
        ) {

            product.style.display = "";

            visible++;

        } else {

            product.style.display = "none";
        }
    });

    productCount.textContent =
        visible + " products";

    noProducts.hidden =
        visible !== 0;
}

// Search

if (searchInput) {
    searchInput.addEventListener(
        "input",
        filterProducts
    );
}
// Category filters

categoryFilters.forEach(function(input) {
    input.addEventListener(
        "change",
        filterProducts
    );
});


// Occasion filters

occasionFilters.forEach(function(input) {
    input.addEventListener(
        "change",
        filterProducts
    );
});

// Clear filters

if (clearFilter) {

    clearFilter.addEventListener(
        "click",
        function() {
            searchInput.value = "";
            categoryFilters.forEach(
                input => input.checked = false
            );
            occasionFilters.forEach(
                input => input.checked = false
            );
            filterProducts();
        }
    );
}


filterProducts();


// Newsletter

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        document.getElementById("newsletterMsg").textContent =
            "Thank you for subscribing!";

        newsletterForm.reset();

    });

}


// Contact form

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        document.getElementById("contactMsg").textContent =
            "Your message has been submitted successfully!";
        contactForm.reset();

    });

}