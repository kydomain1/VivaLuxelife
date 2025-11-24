// ==================== MOBILE MENU TOGGLE ====================
function toggleMobileMenu() {
    const navList = document.querySelector('.nav-list');
    if (navList.style.display === 'flex') {
        navList.style.display = 'none';
    } else {
        navList.style.display = 'flex';
        navList.style.flexDirection = 'column';
        navList.style.position = 'absolute';
        navList.style.top = '100%';
        navList.style.left = '0';
        navList.style.width = '100%';
        navList.style.background = 'white';
        navList.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    }
}

// ==================== SEARCH FUNCTIONALITY ====================
function toggleSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchOverlay) return;
    
    if (searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        if (searchInput) searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
    } else {
        searchOverlay.classList.add('active');
        if (searchInput) {
            searchInput.focus();
            // Clear results when opening
            if (searchResults) searchResults.innerHTML = '';
        }
    }
}

// Article database for search functionality
const articles = [
    {
        title: "The Rise of Sustainable Fashion: A 2025 Perspective",
        category: "Fashion & Accessories",
        url: "article1.html",
        excerpt: "Discover how eco-conscious designers are revolutionizing the fashion industry...",
        date: "March 15, 2025"
    },
    {
        title: "Minimalist Home Design Trends",
        category: "Home & Garden",
        url: "article2.html",
        excerpt: "Embrace simplicity with the latest minimalist design trends...",
        date: "May 22, 2025"
    },
    {
        title: "Natural Skincare Revolution",
        category: "Health & Beauty",
        url: "article3.html",
        excerpt: "Transform your skincare routine with natural ingredients...",
        date: "February 10, 2025"
    },
    {
        title: "Hidden Gems: European Boutique Hotels You Must Visit",
        category: "Travel & Accommodation",
        url: "article4.html",
        excerpt: "Escape the ordinary and discover exclusive boutique accommodations...",
        date: "July 8, 2025"
    },
    {
        title: "The Art of Plant-Based Gourmet Cuisine",
        category: "Food & Beverage",
        url: "article5.html",
        excerpt: "Explore the sophisticated world of plant-based gastronomy...",
        date: "January 28, 2025"
    },
    {
        title: "Your Guide to Fat Loss Workouts That Actually Work",
        category: "Health & Beauty",
        url: "article6.html",
        excerpt: "Engineer fat loss workouts with intelligent strength blocks, conditioning finishers, and recovery rituals that actually stick.",
        date: "October 4, 2025"
    }
];

function searchArticles() {
    const searchInputElement = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInputElement || !searchResults) return;
    
    const searchInput = searchInputElement.value.toLowerCase().trim();
    
    if (searchInput.length < 2) {
        searchResults.innerHTML = '';
        return;
    }
    
    const results = articles.filter(article => 
        article.title.toLowerCase().includes(searchInput) ||
        article.category.toLowerCase().includes(searchInput) ||
        article.excerpt.toLowerCase().includes(searchInput)
    );
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p style="padding: 20px; text-align: center; color: #6c7a89;">No articles found matching your search.</p>';
        return;
    }
    
    let html = '<div style="padding: 10px;">';
    results.forEach(article => {
        html += `
            <div style="padding: 15px; border-bottom: 1px solid #ecf0f1; cursor: pointer; transition: background-color 0.2s ease;" 
                 onmouseover="this.style.backgroundColor='#f8f9fa'" 
                 onmouseout="this.style.backgroundColor='transparent'"
                 onclick="window.location.href='${article.url}'">
                <h4 style="color: #2c3e50; margin-bottom: 5px; font-size: 16px;">${article.title}</h4>
                <p style="font-size: 12px; color: #3498db; margin-bottom: 5px; font-weight: 600;">${article.category}</p>
                <p style="font-size: 14px; color: #6c7a89; line-height: 1.5;">${article.excerpt}</p>
            </div>
        `;
    });
    html += '</div>';
    
    searchResults.innerHTML = html;
}

// ==================== SOCIAL SHARE LINKS ====================
function initSocialShare() {
    const currentUrl = encodeURIComponent(window.location.href);
    const currentTitle = encodeURIComponent(document.title);
    
    // Update Facebook share links
    document.querySelectorAll('a[href*="facebook.com/sharer"]').forEach(link => {
        link.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    });
    
    // Update Twitter share links
    document.querySelectorAll('a[href*="twitter.com/intent/tweet"]').forEach(link => {
        link.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`;
    });
    
    // Update Pinterest share links
    document.querySelectorAll('a[href*="pinterest.com/pin/create"]').forEach(link => {
        link.href = `https://www.pinterest.com/pin/create/button/?url=${currentUrl}&description=${currentTitle}`;
    });
    
    // Update LinkedIn share links
    document.querySelectorAll('a[href*="linkedin.com/sharing"]').forEach(link => {
        link.href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
    });
}

// ==================== NEWSLETTER FORM ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize social share links
    initSocialShare();
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert('Thank you for subscribing! We will send updates to: ' + email);
            this.reset();
        });
    }
    
    // Add smooth scroll animation on page load
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.article-card, .featured-article, .side-article').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize pagination
    initPagination();
});

// ==================== CATEGORY FILTERING ====================
function filterByCategory(category) {
    const articles = document.querySelectorAll('.article-card');
    articles.forEach(article => {
        if (category === 'all' || article.dataset.category === category) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

// ==================== PAGINATION FUNCTIONALITY ====================
let currentPage = 1;
const articlesPerPage = 3;

function initPagination() {
    const articlesGrid = document.querySelector('.articles-grid');
    const pagination = document.querySelector('.pagination');
    
    if (!articlesGrid || !pagination) return;
    
    const allArticles = Array.from(articlesGrid.querySelectorAll('.article-card'));
    const totalPages = Math.ceil(allArticles.length / articlesPerPage);
    
    // Show articles for current page
    function showPage(page) {
        currentPage = page;
        
        // Hide all articles first
        allArticles.forEach(article => {
            article.style.display = 'none';
        });
        
        // Show articles for current page
        const start = (page - 1) * articlesPerPage;
        const end = start + articlesPerPage;
        const articlesToShow = allArticles.slice(start, end);
        
        articlesToShow.forEach(article => {
            article.style.display = 'block';
        });
        
        // Scroll to top of articles
        articlesGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update pagination buttons
        updatePaginationButtons();
    }
    
    // Update pagination button states
    function updatePaginationButtons() {
        const pageButtons = pagination.querySelectorAll('.page-btn');
        
        pageButtons.forEach(btn => {
            btn.classList.remove('active');
            
            const btnText = btn.textContent.trim();
            
            // Handle numbered buttons
            if (!isNaN(btnText)) {
                const pageNum = parseInt(btnText);
                if (pageNum === currentPage) {
                    btn.classList.add('active');
                }
                // Disable if page doesn't exist
                if (pageNum > totalPages) {
                    btn.style.display = 'none';
                } else {
                    btn.style.display = 'inline-block';
                }
            }
            
            // Handle Previous button
            if (btnText.includes('Previous')) {
                if (currentPage <= 1) {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                } else {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                }
            }
            
            // Handle Next button
            if (btnText.includes('Next')) {
                if (currentPage >= totalPages) {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                } else {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                }
            }
        });
    }
    
    // Add click handlers to pagination buttons
    const pageButtons = pagination.querySelectorAll('.page-btn');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            
            if (btnText.includes('Previous')) {
                if (currentPage > 1) {
                    showPage(currentPage - 1);
                }
            } else if (btnText.includes('Next')) {
                if (currentPage < totalPages) {
                    showPage(currentPage + 1);
                }
            } else if (!isNaN(btnText)) {
                const pageNum = parseInt(btnText);
                if (pageNum <= totalPages) {
                    showPage(pageNum);
                }
            }
        });
    });
    
    // Initialize with first page
    showPage(1);
}

// Close search overlay when clicking outside or pressing Escape
document.addEventListener('click', function(e) {
    const searchOverlay = document.getElementById('searchOverlay');
    if (searchOverlay && searchOverlay.classList.contains('active') && e.target === searchOverlay) {
        toggleSearch();
    }
});

// Close search overlay when pressing Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay && searchOverlay.classList.contains('active')) {
            toggleSearch();
        }
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navList = document.querySelector('.nav-list');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navList && menuToggle && 
        !navList.contains(e.target) && 
        !menuToggle.contains(e.target) &&
        window.innerWidth <= 968) {
        navList.style.display = 'none';
    }
});

