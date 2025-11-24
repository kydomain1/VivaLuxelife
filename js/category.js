// Category page functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    const categories = {
        fashion: {
            name: 'Fashion & Accessories',
            description: 'Discover the latest trends, sustainable brands, and timeless style advice from fashion experts.'
        },
        health: {
            name: 'Health & Beauty',
            description: 'Explore natural skincare, wellness tips, and beauty innovations that enhance your well-being.'
        },
        home: {
            name: 'Home & Garden',
            description: 'Transform your living spaces with inspiring design ideas, decor tips, and gardening wisdom.'
        },
        travel: {
            name: 'Travel & Accommodation',
            description: 'Uncover hidden destinations, boutique hotels, and travel experiences that inspire wanderlust.'
        },
        finance: {
            name: 'Finance & Insurance',
            description: 'Navigate financial planning, investment strategies, and insurance solutions with expert guidance.'
        },
        food: {
            name: 'Food & Beverage',
            description: 'Savor gourmet recipes, culinary trends, and restaurant recommendations from food connoisseurs.'
        }
    };
    
    // Update page title and description
    if (category && categories[category]) {
        document.getElementById('categoryTitle').textContent = categories[category].name;
        document.getElementById('categoryDescription').textContent = categories[category].description;
        document.getElementById('categoryName').textContent = categories[category].name;
        document.title = categories[category].name + ' - VivaLuxelife';
        
        // Filter articles by category
        const articles = document.querySelectorAll('.article-card');
        articles.forEach(article => {
            if (article.dataset.category === category) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }
    
    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        if (link.href.includes('?cat=' + category)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Initialize pagination after filtering (using function from script.js)
    if (typeof initPagination === 'function') {
        initPagination();
    }
});

