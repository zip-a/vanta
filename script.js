/* =========================================
   VANTA 2.0
   НАСТРОЙКИ МАГАЗИНА
========================================= */

const STORE = {
    name: "VANTA",
    phone: "+992 90 123 45 67",
    whatsapp: "992037486060",
    telegram: "demo_shop"
};


/* =========================================
   ТОВАРЫ
========================================= */

let products = [

    {
        id: 1,
        name: "Classic Steel Watch",
        category: "Аксессуары",
        price: 690,
        oldPrice: 850,
        rating: 4.9,
        badge: "ХИТ",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
        description: "Минималистичные часы из стали для повседневного стиля."
    },

    {
        id: 2,
        name: "Premium Sneakers",
        category: "Обувь",
        price: 520,
        oldPrice: 650,
        rating: 4.8,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
        description: "Удобные кроссовки с современным дизайном."
    },

    {
        id: 3,
        name: "Wireless Headphones",
        category: "Техника",
        price: 890,
        oldPrice: null,
        rating: 4.9,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
        description: "Беспроводные наушники с чистым звуком и удобной посадкой."
    },

    {
        id: 4,
        name: "Urban Backpack",
        category: "Аксессуары",
        price: 390,
        oldPrice: 450,
        rating: 4.7,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
        description: "Практичный городской рюкзак для работы, учёбы и поездок."
    },

    {
        id: 5,
        name: "Aroma Coffee Set",
        category: "Дом",
        price: 240,
        oldPrice: null,
        rating: 4.8,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85",
        description: "Набор для тех, кто любит хороший кофе и красивую подачу."
    },

    {
        id: 6,
        name: "Modern Smartphone",
        category: "Техника",
        price: 2490,
        oldPrice: 2790,
        rating: 4.9,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
        description: "Современный смартфон с ярким экраном и быстрым процессором."
    },

    {
        id: 7,
        name: "Minimal Desk Lamp",
        category: "Дом",
        price: 180,
        oldPrice: 220,
        rating: 4.6,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
        description: "Минималистичная лампа для рабочего стола и уютного интерьера."
    }

];


/* =========================================
   СОСТОЯНИЕ
========================================= */

let cart =
    JSON.parse(localStorage.getItem("vantaCart")) || [];

let currentCategory = "Все";

let searchQuery = "";

let selectedProduct = null;


/* =========================================
   ЭЛЕМЕНТЫ СТРАНИЦЫ
========================================= */

const productsContainer =
    document.getElementById("productsContainer");

const searchInput =
    document.getElementById("searchInput");

const categories =
    document.getElementById("categories");

const emptyState =
    document.getElementById("emptyState");

const cartElement =
    document.getElementById("cart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const openCart =
    document.getElementById("openCart");

const closeCart =
    document.getElementById("closeCart");

const checkoutButton =
    document.getElementById("checkoutButton");

const toast =
    document.getElementById("toast");


/* =========================================
   PRODUCT MODAL
========================================= */

const productModal =
    document.getElementById("productModal");

const closeProductModal =
    document.getElementById("closeProductModal");

const modalProductImage =
    document.getElementById("modalProductImage");

const modalProductCategory =
    document.getElementById("modalProductCategory");

const modalProductName =
    document.getElementById("modalProductName");

const modalProductRating =
    document.getElementById("modalProductRating");

const modalProductDescription =
    document.getElementById("modalProductDescription");

const modalProductPrice =
    document.getElementById("modalProductPrice");

const modalAddButton =
    document.getElementById("modalAddButton");


/* =========================================
   CHECKOUT
========================================= */

const checkoutModal =
    document.getElementById("checkoutModal");

const closeCheckout =
    document.getElementById("closeCheckout");

const checkoutForm =
    document.getElementById("checkoutForm");

const customerName =
    document.getElementById("customerName");

const customerPhone =
    document.getElementById("customerPhone");

const customerAddress =
    document.getElementById("customerAddress");

const customerComment =
    document.getElementById("customerComment");

const checkoutSummary =
    document.getElementById("checkoutSummary");


/* =========================================
   ПОКАЗ ТОВАРОВ
========================================= */

function renderProducts() {

    productsContainer.innerHTML = "";


    const filteredProducts =
        products.filter(product => {

            const matchesCategory =
                currentCategory === "Все" ||
                product.category === currentCategory;


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(
                        searchQuery.toLowerCase()
                    );


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    if (filteredProducts.length === 0) {

        emptyState.style.display =
            "block";

        return;

    }


    emptyState.style.display =
        "none";


    filteredProducts.forEach(product => {

        const card =
            document.createElement("article");


        card.className =
            "product-card";


        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(".add-button")
                ) {
                    return;
                }


                openProductModal(
                    product.id
                );

            }
        );


        card.innerHTML = `

            <div class="product-image-wrap">

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <div class="product-badge">
                    ${product.badge}
                </div>

            </div>


            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>


                <h3 class="product-name">
                    ${product.name}
                </h3>


                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-rating">
                    ★ ${product.rating}
                    <span>/ 5.0</span>
                </div>


                <div class="product-bottom">

                    <div class="product-price">

                        ${formatPrice(product.price)}
                        сомони

                        ${
                            product.oldPrice
                            ?
                            `
                            <span class="old-price">
                                ${formatPrice(product.oldPrice)}
                            </span>
                            `
                            :
                            ""
                        }

                    </div>


                    <button
                        class="add-button"
                        type="button"
                    >
                        В корзину
                    </button>

                </div>


                <div class="stock">
                    ● В наличии
                </div>

            </div>

        `;


        const addButton =
            card.querySelector(".add-button");


        addButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                addToCart(product.id);

            }
        );


        productsContainer.appendChild(card);

    });

}


/* =========================================
   ФОРМАТ ЦЕНЫ
========================================= */

function formatPrice(price) {

    return Number(price)
        .toLocaleString("ru-RU");

}


/* =========================================
   ОТКРЫТЬ ТОВАР
========================================= */

function openProductModal(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    selectedProduct =
        product;


    modalProductImage.src =
        product.image;

    modalProductImage.alt =
        product.name;


    modalProductCategory.textContent =
        product.category;


    modalProductName.textContent =
        product.name;


    modalProductRating.textContent =
        `★ ${product.rating} / 5.0`;


    modalProductDescription.textContent =
        product.description;


    modalProductPrice.innerHTML = `

        ${formatPrice(product.price)}
        сомони

        ${
            product.oldPrice
            ?
            `
            <span class="old-price">
                ${formatPrice(product.oldPrice)}
            </span>
            `
            :
            ""
        }

    `;


    productModal.classList.add(
        "show"
    );


    document.body.classList.add(
        "no-scroll"
    );

}


/* =========================================
   ЗАКРЫТЬ ТОВАР
========================================= */

function hideProductModal() {

    productModal.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "no-scroll"
    );

}


closeProductModal.addEventListener(
    "click",
    hideProductModal
);


productModal.addEventListener(
    "click",
    event => {

        if (
            event.target === productModal
        ) {

            hideProductModal();

        }

    }
);


/* =========================================
   ДОБАВИТЬ В КОРЗИНУ
========================================= */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();


    showToast(
        "Товар добавлен в корзину ✓"
    );

}


/* =========================================
   ДОБАВИТЬ ИЗ MODAL
========================================= */

modalAddButton.addEventListener(
    "click",
    () => {

        if (!selectedProduct) {
            return;
        }


        addToCart(
            selectedProduct.id
        );


        hideProductModal();

    }
);


/* =========================================
   УДАЛИТЬ ИЗ КОРЗИНЫ
========================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    updateCart();

}


/* =========================================
   ИЗМЕНИТЬ КОЛИЧЕСТВО
========================================= */

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) return;


    item.quantity +=
        change;


    if (item.quantity <= 0) {

        removeFromCart(
            productId
        );

        return;

    }


    updateCart();

}


/* =========================================
   ОБНОВИТЬ КОРЗИНУ
========================================= */

function updateCart() {

    localStorage.setItem(
        "vantaCart",
        JSON.stringify(cart)
    );


    cartItems.innerHTML = "";


    let total = 0;

    let count = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="cart-empty">
                Корзина пока пустая.
            </div>

        `;

    }


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        total +=
            itemTotal;


        count +=
            item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div>

                <h4>
                    ${item.name}
                </h4>


                <div class="cart-item-price">
                    ${formatPrice(item.price)}
                    сомони
                </div>


                <div class="quantity">

                    <button
                        type="button"
                        data-action="minus"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        data-action="plus"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                type="button"
            >
                ×
            </button>

        `;


        const minusButton =
            cartItem.querySelector(
                '[data-action="minus"]'
            );


        const plusButton =
            cartItem.querySelector(
                '[data-action="plus"]'
            );


        const removeButton =
            cartItem.querySelector(
                ".remove-item"
            );


        minusButton.addEventListener(
            "click",
            () => {

                changeQuantity(
                    item.id,
                    -1
                );

            }
        );


        plusButton.addEventListener(
            "click",
            () => {

                changeQuantity(
                    item.id,
                    1
                );

            }
        );


        removeButton.addEventListener(
            "click",
            () => {

                removeFromCart(
                    item.id
                );

            }
        );


        cartItems.appendChild(
            cartItem
        );

    });


    cartCount.textContent =
        count;


    cartTotal.textContent =
        `${formatPrice(total)} сомони`;


    checkoutButton.disabled =
        cart.length === 0;

}


/* =========================================
   ОТКРЫТЬ КОРЗИНУ
========================================= */

function showCart() {

    cartElement.classList.add(
        "open"
    );


    overlay.classList.add(
        "show"
    );


    document.body.classList.add(
        "no-scroll"
    );

}


/* =========================================
   ЗАКРЫТЬ КОРЗИНУ
========================================= */

function hideCart() {

    cartElement.classList.remove(
        "open"
    );


    overlay.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "no-scroll"
    );

}


openCart.addEventListener(
    "click",
    showCart
);


closeCart.addEventListener(
    "click",
    hideCart
);


overlay.addEventListener(
    "click",
    hideCart
);


/* =========================================
   КАТЕГОРИИ
========================================= */

categories.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".category"
            );


        if (!button) return;


        document
            .querySelectorAll(
                ".category"
            )
            .forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


        button.classList.add(
            "active"
        );


        currentCategory =
            button.dataset.category;


        renderProducts();

    }
);


/* =========================================
   ПОИСК
========================================= */

searchInput.addEventListener(
    "input",
    event => {

        searchQuery =
            event.target.value;


        renderProducts();

    }
);


/* =========================================
   ОТКРЫТЬ CHECKOUT
========================================= */

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "Сначала добавьте товар в корзину"
            );

            return;

        }


        renderCheckoutSummary();


        checkoutModal.classList.add(
            "show"
        );


        document.body.classList.add(
            "no-scroll"
        );

    }
);


/* =========================================
   ЗАКРЫТЬ CHECKOUT
========================================= */

function hideCheckout() {

    checkoutModal.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "no-scroll"
    );

}


closeCheckout.addEventListener(
    "click",
    hideCheckout
);


checkoutModal.addEventListener(
    "click",
    event => {

        if (
            event.target === checkoutModal
        ) {

            hideCheckout();

        }

    }
);


/* =========================================
   SUMMARY CHECKOUT
========================================= */

function renderCheckoutSummary() {

    if (cart.length === 0) {

        checkoutSummary.innerHTML = "";

        return;

    }


    let total = 0;


    let itemsHTML = "";


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        total +=
            itemTotal;


        itemsHTML += `

            <div class="checkout-summary-item">

                <span>
                    ${item.name}
                    × ${item.quantity}
                </span>

                <strong>
                    ${formatPrice(itemTotal)}
                    сомони
                </strong>

            </div>

        `;

    });


    checkoutSummary.innerHTML = `

        <div class="checkout-summary-title">
            Ваш заказ
        </div>


        ${itemsHTML}


        <div class="checkout-summary-total">

            <span>
                Итого
            </span>

            <strong>
                ${formatPrice(total)}
                сомони
            </strong>

        </div>

    `;

}


/* =========================================
   ОФОРМЛЕНИЕ ЗАКАЗА
========================================= */

checkoutForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (cart.length === 0) {

            showToast(
                "Корзина пустая"
            );

            return;

        }


        const name =
            customerName.value.trim();


        const phone =
            customerPhone.value.trim();


        const address =
            customerAddress.value.trim();


        const comment =
            customerComment.value.trim();


        if (
            !name ||
            !phone ||
            !address
        ) {

            showToast(
                "Заполните обязательные поля"
            );

            return;

        }


        let message =
            `Здравствуйте! Хочу оформить заказ в магазине ${STORE.name}.\n\n`;


        message +=
            `👤 Имя: ${name}\n`;


        message +=
            `📞 Телефон: ${phone}\n`;


        message +=
            `📍 Адрес: ${address}\n`;


        if (comment) {

            message +=
                `💬 Комментарий: ${comment}\n`;

        }


        message +=
            `\n🛒 ТОВАРЫ:\n`;


        let total = 0;


        cart.forEach(item => {

            const itemTotal =
                item.price *
                item.quantity;


            total +=
                itemTotal;


            message +=
                `• ${item.name} × ${item.quantity} — ${formatPrice(itemTotal)} сомони\n`;

        });


        message +=
            `\n💰 ИТОГО: ${formatPrice(total)} сомони`;


        message +=
            `\n\nЖду подтверждения заказа.`;


        const whatsappURL =
            `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;


        window.open(
            whatsappURL,
            "_blank"
        );


        cart = [];


        updateCart();


        checkoutForm.reset();


        hideCheckout();

        hideCart();


        showToast(
            "Заказ отправлен в WhatsApp ✓"
        );

    }
);


/* =========================================
   TOAST
========================================= */

let toastTimer = null;


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =========================================
   WHATSAPP ССЫЛКИ
========================================= */

document
    .querySelectorAll(
        'a[href*="wa.me"]'
    )
    .forEach(link => {

        link.href =
            `https://wa.me/${STORE.whatsapp}`;

    });


/* =========================================
   TELEGRAM
========================================= */

document
    .querySelectorAll(
        'a[href*="t.me"]'
    )
    .forEach(link => {

        link.href =
            `https://t.me/${STORE.telegram}`;

    });


/* =========================================
   PHONE LINKS
========================================= */

document
    .querySelectorAll(
        'a[href^="tel:"]'
    )
    .forEach(link => {

        link.href =
            `tel:${STORE.phone.replace(
                /[^\d+]/g,
                ""
            )}`;

    });


/* =========================================
   ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        hideProductModal();

        hideCheckout();

        hideCart();

    }
);


/* =========================================
   ЗАПУСК
========================================= */

renderProducts();

updateCart();
/* ===== ТОВАРЫ ИЗ SUPABASE ===== */
(async function loadFromSupabase() {
  try {
    const r = await fetch("https://zpoktwvegcjakroajipe.supabase.co/rest/v1/Products?select=*&order=id", { headers: { apikey: "sb_publishable_2yC3-XMRjvsEE32AMOXJ-g_TxH_3EDF" } });
    if (!r.ok) return;
    const rows = await r.json();
    if (!Array.isArray(rows) || !rows.length) return;
    products = rows.map(p => ({
      id: p.id,
      name: p.name || "",
      category: p.category || "Другое",
      price: Number(p.price) || 0,
      oldPrice: null,
      rating: 4.8,
      badge: (p.stock > 0 && p.stock <= 3) ? "МАЛО" : "",
      image: p.image_url || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%25' height='100%25' fill='%23222'/></svg>",
      description: p.description || "",
      stock: p.stock
    }));
    renderProducts();
    try { updateCart(); } catch (e) {}
  } catch (e) { console.log("Supabase:", e); }
})();
