document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------
  // 1. GLOBAL UTILITIES (เพิ่มใหม่เพื่อแก้ปัญหา CSP)
  // ---------------------------------------------------------
  
  function goBack() {
    if (document.referrer && document.referrer.indexOf(window.location.host) !== -1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  }

  const backButtons = document.querySelectorAll('.back-btn');
  backButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // ป้องกันการทำงานซ้ำซ้อน
      goBack();
    });
  });


  // ---------------------------------------------------------
  // 2. ROUTER & PAGE INITIALIZATION
  // ---------------------------------------------------------

  function initializePage() {

    // (Router ส่วนที่ 1: หน้า Index)
    if (document.getElementById('best-seller-track')) {
      initializeIndexPage();
    }

    // (Router ส่วนที่ 2: หน้า Products (Search/Category))
    if (document.getElementById('product-list-grid')) {
      initializeProductListPage();
    }

    // (Router ส่วนที่ 3: หน้า Product Detail)
    if (document.getElementById('product-detail-container')) {
      initializeProductDetailPage();
    }

    // (Router ส่วนที่ 4: หน้า Cart)
    if (document.getElementById('cart-items-container')) {
      initializeCartPage();
    }

    // (Router ส่วนที่ 5: หน้า Checkout)
    if (document.getElementById('checkout-items-list')) {
      initializeCheckoutPage();
    }

    // (Router ส่วนที่ 6: หน้า Account/Test - เพิ่มเติมเพื่อให้ครอบคลุม)
    if (document.querySelector('.account-layout')) {
      // ถ้ามี logic เฉพาะหน้า account ใส่ตรงนี้
    }

    // (Router ส่วนที่ 7: ปุ่ม Back to Top - ทำงานทุกหน้า)
    initializeBackToTop();
  }


  // ---------------------------------------------------------
  // 3. CLASSES & HELPER FUNCTIONS
  // ---------------------------------------------------------

  class Carousel {
    constructor(trackId, prevButtonId, nextButtonId, options = {}) {
      this.track = document.getElementById(trackId);
      this.prevButton = document.getElementById(prevButtonId);
      this.nextButton = document.getElementById(nextButtonId);
      this.container = this.track ? this.track.closest('.carousel-container') : null;
      if (!this.track || !this.prevButton || !this.nextButton || !this.container) { return; }
      this.items = Array.from(this.track.children);
      this.options = options;
      this.itemsPerPage = this.getItemsPerPage();
      this.currentIndex = 0;
      this.totalItems = this.items.length;
      this.autoplayInterval = this.options.autoplay ? (this.options.interval || 5000) : null;
      this.loop = this.options.loop || false;
      this.autoplayTimer = null;
      this.prevButton.addEventListener('click', () => this.prev());
      this.nextButton.addEventListener('click', () => this.next());
      window.addEventListener('resize', () => this.updateCarousel());
      if (this.autoplayInterval) {
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
      }
      this.updateCarousel();
      this.startAutoplay();
    }
    updateCarousel() {
      if (this.items.length === 0) return;
      this.itemsPerPage = this.getItemsPerPage();
      const itemWidthPercent = 100 / this.itemsPerPage;
      this.items.forEach(item => { item.style.flexBasis = `${itemWidthPercent}%`; });
      const newTransform = -this.currentIndex * itemWidthPercent;
      this.track.style.transform = `translateX(${newTransform}%)`;
      if (this.loop) {
        this.prevButton.style.display = 'block';
        this.nextButton.style.display = 'block';
      } else {
        this.prevButton.style.display = this.currentIndex === 0 ? 'none' : 'block';
        this.nextButton.style.display = this.currentIndex >= (this.totalItems - this.itemsPerPage) ? 'none' : 'block';
      }
    }
    getItemsPerPage() {
      const [desktop, tablet, mobile] = this.options.itemsPerPage || [4, 2, 1];
      if (window.innerWidth <= 480) return mobile;
      if (window.innerWidth <= 768) return tablet;
      return desktop;
    }
    startAutoplay() {
      if (!this.autoplayInterval) return;
      this.stopAutoplay();
      this.autoplayTimer = setInterval(() => { this.next(true); }, this.autoplayInterval);
    }
    stopAutoplay() {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
    }
    next(isAutoplay = false) {
      const atEnd = this.currentIndex >= (this.totalItems - this.itemsPerPage);
      if (!atEnd) { this.currentIndex++; } else if (this.loop) { this.currentIndex = 0; }
      this.updateCarousel();
      if (!isAutoplay) { this.stopAutoplay(); this.startAutoplay(); }
    }
    prev(isAutoplay = false) {
      const atStart = this.currentIndex === 0;
      if (!atStart) { this.currentIndex--; } else if (this.loop) { this.currentIndex = this.totalItems - this.itemsPerPage; }
      this.updateCarousel();
      if (!isAutoplay) { this.stopAutoplay(); this.startAutoplay(); }
    }
  }

  function createProductCardHTML(product) {
    const rating = product.rating || 'N/A';
    return `
      <div class="card">
        <img src="${product.imageUrl}" alt="${product.name}">
        <div class="card-content">
          <h3>${product.name}</h3>
          <div class="card-rating">${rating}</div>
          <p class="price">฿${product.price.toLocaleString()}</p>
        </div>
      </div>
    `;
  }


  // ---------------------------------------------------------
  // 4. PAGE SPECIFIC LOGIC
  // ---------------------------------------------------------

  function initializeIndexPage() {
    const bestSellerTrack = document.getElementById('best-seller-track');
    if (bestSellerTrack && typeof ALL_PRODUCTS !== 'undefined') {
        const bestSellers = ALL_PRODUCTS.filter(product => product.status === 1);
          bestSellerTrack.innerHTML = '';
          bestSellers.forEach(product => {
            const itemDiv = document.createElement('div');
              itemDiv.className = 'carousel-item';
            const linkWrapper = document.createElement('a');
              linkWrapper.href = `product-detail.html?id=${product.id}`;
              linkWrapper.className = 'card-link-wrapper';
              linkWrapper.innerHTML = createProductCardHTML(product);
              itemDiv.appendChild(linkWrapper);
              bestSellerTrack.appendChild(itemDiv);
        });
    }
    new Carousel('best-seller-track', 'best-seller-prev', 'best-seller-next', { itemsPerPage: [4, 2, 1] });
    new Carousel('promo-track', 'promo-prev', 'promo-next', { itemsPerPage: [1, 1, 1], autoplay: true, interval: 4000, loop: true });

    const allItemsGrid = document.getElementById('all-items-grid-index');
    if (allItemsGrid && typeof ALL_PRODUCTS !== 'undefined') {
      const productsToDisplay = ALL_PRODUCTS.slice(0, 15);

      productsToDisplay.forEach(product => {
        const linkWrapper = document.createElement('a');
        linkWrapper.href = `product-detail.html?id=${product.id}`;
        linkWrapper.className = 'card-link-wrapper';
        linkWrapper.innerHTML = createProductCardHTML(product);
        allItemsGrid.appendChild(linkWrapper);
      });
    }
  }

  function initializeProductListPage() {
    const grid = document.getElementById('product-list-grid');
    const title = document.getElementById('product-list-title');

    if (!grid || !title || typeof ALL_PRODUCTS === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const query = urlParams.get('q');
    let filteredProducts = [];
    let pageTitle = "";

    if (category) {
      pageTitle = `Category: ${category}`;
      filteredProducts = ALL_PRODUCTS.filter(product => {
        const productCategories = Array.isArray(product.category) ? product.category : [product.category];
        return productCategories.includes(category);
      });
    } else if (query) {
      const searchTerm = query.toLowerCase().trim();
      pageTitle = `Search results for "${query}"`;
      filteredProducts = ALL_PRODUCTS.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(searchTerm);
        const productCategories = Array.isArray(product.category) ? product.category : [product.category];
        const categoryMatch = productCategories.some(cat => cat.toLowerCase().includes(searchTerm));
        return nameMatch || categoryMatch;
      });
    } else {
      pageTitle = "All Products";
      filteredProducts = ALL_PRODUCTS; 
    }

    if (filteredProducts.length > 0) {
      title.textContent = `${pageTitle} (${filteredProducts.length} items)`;
      filteredProducts.forEach(product => {
        const linkWrapper = document.createElement('a');
        linkWrapper.href = `product-detail.html?id=${product.id}`;
        linkWrapper.className = 'card-link-wrapper';
        linkWrapper.innerHTML = createProductCardHTML(product);
        grid.appendChild(linkWrapper);
      });
    } else {
      title.textContent = pageTitle;
      grid.innerHTML = "<p>No products found matching your criteria.</p>";
    }
  }

  function initializeProductDetailPage() {
    const productName = document.getElementById('product-name');
    const productRating = document.getElementById('product-rating');
    const productPrice = document.getElementById('product-price');
    const productImage = document.getElementById('product-image');
    const productDesc = document.getElementById('product-desc');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const relatedGrid = document.getElementById('related-products-grid');
    
    if (!productName || typeof ALL_PRODUCTS === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = ALL_PRODUCTS.find(p => p.id == productId);

    if (!product) {
      productName.textContent = "Not Found";
      return;
    }
    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    const breadcrumbCategory = document.getElementById('breadcrumb-category');

    if (breadcrumbProduct) breadcrumbProduct.textContent = product.name;

    if (breadcrumbCategory) {
      const cat = Array.isArray(product.category) ? product.category[0] : product.category;
      breadcrumbCategory.textContent = cat.charAt(0).toUpperCase() + cat.slice(1); 
      breadcrumbCategory.href = `product-search.html?category=${cat}`;
    }
    productName.textContent = product.name;
    productRating.textContent = product.rating || '⭐️⭐️⭐️⭐️☆ (N/A)';
    productPrice.textContent = `฿${product.price.toLocaleString()}`;
    productImage.src = product.imageUrl;
    productImage.alt = product.name;
    if (productDesc) {
      productDesc.textContent = product.desc || "No description available.";
    }

    const relatedProducts = ALL_PRODUCTS.filter(p => {
      if (p.id == product.id) return false;
      const currentProductCategories = Array.isArray(product.category) ? product.category : [product.category];
      const otherProductCategories = Array.isArray(p.category) ? p.category : [p.category];
      return currentProductCategories.some(cat => otherProductCategories.includes(cat));
    });
    relatedGrid.innerHTML = '';
    if (relatedProducts.length > 0) {
      relatedProducts.forEach(relatedProduct => {
        const linkWrapper = document.createElement('a');
        linkWrapper.href = `product-detail.html?id=${relatedProduct.id}`;
        linkWrapper.className = 'card-link-wrapper';
        linkWrapper.innerHTML = createProductCardHTML(relatedProduct);
        relatedGrid.appendChild(linkWrapper);
      });
    } else {
      relatedGrid.innerHTML = "<p>ไม่มีสินค้าที่เกี่ยวข้อง</p>";
    }

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        let existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1
            });
        }
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        updateCartIcon();

        const cartIcon = document.getElementById('cart-icon');
        if (!cartIcon) {
            console.warn('Cart icon (cart-icon) not found. Animation will not work.');
            return;
        }
        const flyingImage = document.createElement('img');
        flyingImage.src = product.imageUrl;
        flyingImage.className = 'flying-product';
        const btnRect = addToCartBtn.getBoundingClientRect();
        flyingImage.style.left = `${btnRect.left + (btnRect.width / 2)}px`;
        flyingImage.style.top = `${btnRect.top + (btnRect.height / 2)}px`;
        document.body.appendChild(flyingImage);
        const cartRect = cartIcon.getBoundingClientRect();
        setTimeout(() => {
            flyingImage.style.left = `${cartRect.left + (cartRect.width / 2)}px`;
            flyingImage.style.top = `${cartRect.top + (cartRect.height / 2)}px`;
            flyingImage.style.transform = 'scale(0.1)';
            flyingImage.style.opacity = '0.5';
        }, 10);
        setTimeout(() => {
            cartIcon.classList.add('shake');
            flyingImage.remove();
        }, 710);
        setTimeout(() => {
            cartIcon.classList.remove('shake');
        }, 1210);
        });
    }
  }



  // ---------------------------------------------------------
  // 5. CART LOGIC
  // ---------------------------------------------------------

  function handleCartChange(productId, action) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const productIndex = cart.findIndex(item => item.id == productId);
    if (productIndex === -1) return;
    if (action === 'increase') {
      cart[productIndex].quantity += 1;
    } else if (action === 'decrease') {
      cart[productIndex].quantity -= 1;
      if (cart[productIndex].quantity <= 0) {
        cart.splice(productIndex, 1);
      }
    } else if (action === 'remove') {
      cart.splice(productIndex, 1);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    renderCart();
    updateCartIcon();
  }

  function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalPriceEl = document.getElementById('cart-total-price');
    if (!container || !totalPriceEl) return;
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    container.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
      container.innerHTML = '<p style="padding: 20px; text-align: center;">ตะกร้าของคุณว่างเปล่า</p>';
      totalPriceEl.textContent = '฿0';
      return;
    }
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      const itemHtml = `
        <div class="cart-item">
          <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p class="price">฿${item.price.toLocaleString()}</p>
          </div>
          <div class="cart-item-controls">
            <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
            <span class="quantity-text">${item.quantity}</span>
            <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
          </div>
          <div class="cart-item-total-price">
            ฿${itemTotal.toLocaleString()}
          </div>
          <button class="remove-btn" data-id="${item.id}">
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </div>
      `;
      container.innerHTML += itemHtml;
    });
    totalPriceEl.textContent = `฿${total.toLocaleString()}`;
  }

  function initializeCartPage() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    renderCart();
    container.addEventListener('click', (event) => {
      const target = event.target.closest('button');
      if (!target) return;
      const id = target.dataset.id;
      if (!id) return;
      if (target.classList.contains('increase-btn')) {
        handleCartChange(id, 'increase');
      } else if (target.classList.contains('decrease-btn')) {
        handleCartChange(id, 'decrease');
      } else if (target.classList.contains('remove-btn')) {
        handleCartChange(id, 'remove');
      }
    });
  }



  // ---------------------------------------------------------
  // 6. CHECKOUT LOGIC
  // ---------------------------------------------------------

  function initializeCheckoutPage() {
    const itemsContainer = document.getElementById('checkout-items-list');
    const totalPriceEl = document.getElementById('checkout-total-price');

    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    if (cart.length === 0 && itemsContainer) {
      itemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      if (totalPriceEl) totalPriceEl.textContent = '฿0';
      return;
    }

    let total = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      const itemHtml = `
        <div class="checkout-item" style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          <div style="display: flex; gap: 10px;">
             <img src="${item.imageUrl}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
             <div>
                <h4 style="margin: 0; font-size: 0.9rem;">${item.name}</h4>
                <p class="price" style="margin: 0; font-size: 0.8rem; color: #666;">x ${item.quantity}</p>
             </div>
          </div>
          <div class="checkout-item-total" style="font-weight: bold;">
            ฿${itemTotal.toLocaleString()}
          </div>
        </div>
      `;
      if (itemsContainer) {
        itemsContainer.innerHTML += itemHtml;
      }
    });

    if (totalPriceEl) {
      totalPriceEl.textContent = `฿${total.toLocaleString()}`;
    }

    const confirmBtn = document.getElementById('confirm-order-btn');

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        const shippingForm = document.getElementById('shipping-form');
        const creditCardForm = document.getElementById('credit-card-form');
        const paymentMethodInput = document.querySelector('input[name="payment"]:checked');
        const paymentMethod = paymentMethodInput ? paymentMethodInput.value : 'unknown';

        if (shippingForm && !shippingForm.checkValidity()) {
          shippingForm.reportValidity();
          return;
        }
        if (paymentMethod === 'credit-card' && creditCardForm && !creditCardForm.checkValidity()) {
          creditCardForm.reportValidity();
          return;
        }

        // Show Processing Modal
        const modal = document.getElementById('processing-modal');
        if (modal) {
          modal.style.display = 'flex';

          // Simulate Delay (2.5 seconds)
          setTimeout(() => {
            modal.style.display = 'none';
            const fnameInput = document.getElementById('fname');
            const customerName = fnameInput ? fnameInput.value : "Customer";
            alert(`✅ Payment Successful!\nThank you, ${customerName}.\nYour order is being prepared.`);

            localStorage.removeItem('shoppingCart');
            window.location.href = 'index.html';
          }, 2500);
        }
      });
    }
  }

  function updateCartIcon() {
    const cartIconCount = document.getElementById('cart-item-count');
    if (!cartIconCount) return;
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let totalQuantity = 0;
    cart.forEach(item => {
      totalQuantity += item.quantity;
    });
    if (totalQuantity > 0) {
      cartIconCount.textContent = totalQuantity;
      cartIconCount.style.display = 'flex';
    } else {
      cartIconCount.style.display = 'none';
    }
  }

  function initializeBackToTop() {
    let mybutton = document.getElementById("backToTopBtn");
    if (mybutton) {
      window.onscroll = function () { scrollFunction(); };
      function scrollFunction() {
        if (window.scrollY > 300) {
          mybutton.style.display = "flex";
        } else {
          mybutton.style.display = "none";
        }
      }
      mybutton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  
  // ---------------------------------------------------------
  // 7. STARTUP
  // ---------------------------------------------------------

  updateCartIcon();
  initializePage();

});