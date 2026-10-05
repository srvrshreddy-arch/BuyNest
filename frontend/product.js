const API_URL =
    "https://buynest-qbzg.onrender.com/getProducts";

const CATEGORY_API_URL =
    "https://buynest-qbzg.onrender.com/getProductsByCategory";

const CATEGORY_ALL_API_URL =
    "https://buynest-qbzg.onrender.com/getCategories";

const SAVE_CART_ITEM_API =
    "https://buynest-qbzg.onrender.com/saveCartitem";


const productGrid =
    document.getElementById("productGrid");

const categorySelect =
    document.getElementById("categorySelect");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const sortSelect =
    document.getElementById("sortSelect");


let allProducts = [];


// ===============================
// LOAD PRODUCTS
// ===============================

async function loadProducts() {

    try {

        const urlParams =
            new URLSearchParams(window.location.search);

        const categoryId =
            urlParams.get("categoryId");

        let response;

        if (categoryId) {

            response = await fetch(
                CATEGORY_API_URL + "/" + categoryId
            );

        } else {

            response = await fetch(API_URL);
        }

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const result =
            await response.json();

        console.log("Products received:", result);

        if (Array.isArray(result)) {

            allProducts = result;

        } else if (Array.isArray(result.data)) {

            allProducts = result.data;

        } else {

            allProducts = [];
        }

        displayProducts(allProducts);

    } catch (error) {

        console.error(
            "Error loading products:",
            error
        );

        productGrid.innerHTML = `
            <p style="
                text-align:center;
                grid-column:1/-1;
                color:red;
                font-size:18px;
            ">
                Unable to load products.
            </p>
        `;
    }
}


// ===============================
// LOAD CATEGORIES
// ===============================

async function loadCategories() {

    try {

        const response =
            await fetch(CATEGORY_ALL_API_URL);

        if (!response.ok) {
            throw new Error(
                "Failed to fetch categories"
            );
        }

        const result =
            await response.json();

        console.log(
            "Categories received:",
            result
        );

        const categories =
            Array.isArray(result)
                ? result
                : result.data;

        if (!categories) return;

        if (categorySelect) {

            categorySelect.innerHTML =
                `<option value="">All Categories</option>`;

            categories.forEach(category => {

                const option =
                    document.createElement("option");

                option.value =
                    category.id;

                option.textContent =
                    category.name;

                categorySelect.appendChild(option);
            });
        }

    } catch (error) {

        console.error(
            "Error loading categories:",
            error
        );
    }
}


// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts(products) {

    if (!productGrid) return;

    productGrid.innerHTML = "";

    if (!products || products.length === 0) {

        productGrid.innerHTML = `
            <p style="
                text-align:center;
                grid-column:1/-1;
                font-size:18px;
            ">
                No products found.
            </p>
        `;

        return;
    }


    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "product-card";


        card.innerHTML = `
            <img
                src="${product.imageUrl || product.image || ""}"
                alt="${product.name || "Product"}"
                onerror="this.src='https://via.placeholder.com/300x250?text=No+Image'"
            >

            <h3>
                ${product.name || "Product"}
            </h3>

            <p>
                ${product.description || ""}
            </p>

            <h4>
                ₹${product.price || 0}
            </h4>

            <button class="add-cart-btn">
                Add to Cart
            </button>
        `;


        // Open product details
        card.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "add-cart-btn"
                    )
                ) {
                    return;
                }

                window.location.href =
                    "product-details.html?id=" +
                    product.id;
            }
        );


        // Add to cart
        const addButton =
            card.querySelector(".add-cart-btn");


        addButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                addToCart(product);
            }
        );


        productGrid.appendChild(card);
    });
}


// ===============================
// ADD TO CART
// ===============================

async function addToCart(product) {

    const userId =
        Number(
            localStorage.getItem("userId")
        );


    if (!userId) {

        alert(
            "Please login to add products to cart."
        );

        window.location.href =
            "customer-login.html";

        return;
    }


    const cartItem = {

        user: {
            id: userId
        },

        product: {
            id: product.id
        },

        quantity: 1
    };


    try {

        const response =
            await fetch(
                SAVE_CART_ITEM_API,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(cartItem)
                }
            );


        const result =
            await response.json();


        console.log(
            "Cart response:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to add product to cart"
            );
        }


        alert(
            "Product added to cart successfully!"
        );


    } catch (error) {

        console.error(
            "Error adding to cart:",
            error
        );

        alert(
            "Unable to add product to cart."
        );
    }
}


// ===============================
// CATEGORY FILTER
// ===============================

if (categorySelect) {

    categorySelect.addEventListener(
        "change",
        function () {

            const categoryId =
                this.value;


            if (categoryId) {

                window.location.href =
                    "products.html?categoryId=" +
                    categoryId;

            } else {

                window.location.href =
                    "products.html";
            }
        }
    );
}


// ===============================
// SEARCH PRODUCTS
// ===============================

function searchProducts() {

    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const filteredProducts =
        allProducts.filter(product => {

            const name =
                (product.name || "")
                    .toLowerCase();

            const description =
                (product.description || "")
                    .toLowerCase();


            return (
                name.includes(searchText) ||
                description.includes(searchText)
            );
        });


    displayProducts(filteredProducts);
}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchProducts
    );
}


if (searchInput) {

    searchInput.addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                searchProducts();
            }
        }
    );
}


// ===============================
// SORT PRODUCTS
// ===============================

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        function () {

            const sortValue =
                this.value;


            let sortedProducts =
                [...allProducts];


            if (sortValue === "priceLow") {

                sortedProducts.sort(
                    (a, b) =>
                        Number(a.price) -
                        Number(b.price)
                );

            } else if (
                sortValue === "priceHigh"
            ) {

                sortedProducts.sort(
                    (a, b) =>
                        Number(b.price) -
                        Number(a.price)
                );

            } else if (
                sortValue === "nameAZ"
            ) {

                sortedProducts.sort(
                    (a, b) =>
                        (a.name || "")
                            .localeCompare(
                                b.name || ""
                            )
                );

            } else if (
                sortValue === "nameZA"
            ) {

                sortedProducts.sort(
                    (a, b) =>
                        (b.name || "")
                            .localeCompare(
                                a.name || ""
                            )
                );
            }


            displayProducts(
                sortedProducts
            );
        }
    );
}


// ===============================
// INITIAL LOAD
// ===============================

loadCategories();
loadProducts();