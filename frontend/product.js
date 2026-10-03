// =====================================================
// API URLS
// =====================================================

const API_URL =
    "http://localhost:8080/getProducts";

const CATEGORY_API_URL =
    "http://localhost:8080/getProductsByCategory";

const CATEGORY_ALL_API_URL =
    "http://localhost:8080/getCategories";

const SAVE_CART_ITEM_API =
    "http://localhost:8080/saveCartitem";


// =====================================================
// HTML ELEMENTS
// =====================================================

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortFilter =
    document.getElementById("sortFilter");


// =====================================================
// GET CATEGORY ID FROM URL
// =====================================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const categoryIdFromUrl =
    urlParams.get("categoryId");

console.log(
    "Category ID from URL:",
    categoryIdFromUrl
);


// =====================================================
// PRODUCTS ARRAY
// =====================================================

let allProducts = [];


// =====================================================
// LOAD PRODUCTS
// =====================================================

async function loadProducts() {

    try {

        let response;


        // =================================================
        // CATEGORY PRODUCTS
        // =================================================

        if (categoryIdFromUrl) {

            console.log(
                "Loading products for category:",
                categoryIdFromUrl
            );


            response =
                await fetch(
                    CATEGORY_API_URL +
                    "/" +
                    categoryIdFromUrl
                );

        }


        // =================================================
        // ALL PRODUCTS
        // =================================================

        else {

            console.log(
                "Loading all products"
            );


            response =
                await fetch(
                    API_URL
                );

        }


        // =================================================
        // CHECK RESPONSE
        // =================================================

        if (!response.ok) {

            throw new Error(
                "Failed to fetch products. Status: " +
                response.status
            );

        }


        // =================================================
        // GET JSON
        // =================================================

        const result =
            await response.json();


        console.log(
            "Products API response:",
            result
        );


        // =================================================
        // HANDLE RESPONSE
        // =================================================

        if (
            Array.isArray(result)
        ) {

            allProducts =
                result;

        }

        else if (
            result.data &&
            Array.isArray(result.data)
        ) {

            allProducts =
                result.data;

        }

        else {

            allProducts = [];

        }


        console.log(
            "Products loaded:",
            allProducts
        );


        // =================================================
        // LOAD CATEGORIES
        // =================================================

        await loadCategories();


        // =================================================
        // DISPLAY PRODUCTS
        // =================================================

        displayProducts();

    }

    catch (error) {

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


// =====================================================
// LOAD CATEGORIES
// =====================================================

async function loadCategories() {

    try {

        const response =
            await fetch(
                CATEGORY_ALL_API_URL
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load categories"
            );

        }


        const result =
            await response.json();


        console.log(
            "Categories response:",
            result
        );


        let categories = [];


        // =================================================
        // HANDLE RESPONSE
        // =================================================

        if (
            Array.isArray(result)
        ) {

            categories =
                result;

        }

        else if (
            result.data &&
            Array.isArray(result.data)
        ) {

            categories =
                result.data;

        }


        // =================================================
        // CLEAR DROPDOWN
        // =================================================

        categoryFilter.innerHTML = `

            <option value="">
                All Categories
            </option>

        `;


        // =================================================
        // ADD CATEGORIES
        // =================================================

        categories.forEach(
            category => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    category.name;


                option.textContent =
                    category.name;


                // =================================================
                // SELECT CURRENT CATEGORY
                // =================================================

                if (
                    categoryIdFromUrl &&
                    String(category.id) ===
                    String(categoryIdFromUrl)
                ) {

                    option.selected =
                        true;

                }


                categoryFilter.appendChild(
                    option
                );

            }
        );

    }

    catch (error) {

        console.error(
            "Error loading categories:",
            error
        );

    }

}


// =====================================================
// DISPLAY PRODUCTS
// =====================================================

function displayProducts() {

    let products =
        [...allProducts];


    // =================================================
    // SEARCH
    // =================================================

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    if (searchText) {

        products =
            products.filter(
                product => {

                    return (

                        product.name &&
                        product.name
                            .toLowerCase()
                            .includes(
                                searchText
                            )

                    );

                }
            );

    }


    // =================================================
    // SORT
    // =================================================

    const sortValue =
        sortFilter.value;


    // =================================================
    // PRICE LOW TO HIGH
    // =================================================

    if (
        sortValue === "priceLow"
    ) {

        products.sort(
            (a, b) =>
                Number(a.price) -
                Number(b.price)
        );

    }


    // =================================================
    // PRICE HIGH TO LOW
    // =================================================

    if (
        sortValue === "priceHigh"
    ) {

        products.sort(
            (a, b) =>
                Number(b.price) -
                Number(a.price)
        );

    }


    // =================================================
    // NAME A-Z
    // =================================================

    if (
        sortValue === "nameAZ"
    ) {

        products.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );

    }


    // =================================================
    // NAME Z-A
    // =================================================

    if (
        sortValue === "nameZA"
    ) {

        products.sort(
            (a, b) =>
                b.name.localeCompare(
                    a.name
                )
        );

    }


    // =================================================
    // NO PRODUCTS
    // =================================================

    if (
        !products ||
        products.length === 0
    ) {

        productGrid.innerHTML = `

            <p style="
                text-align:center;
                grid-column:1/-1;
                font-size:18px;
                color:#333;
            ">

                No products found.

            </p>

        `;

        return;

    }


    // =================================================
    // CLEAR PRODUCT GRID
    // =================================================

    productGrid.innerHTML = "";


    // =================================================
    // CREATE PRODUCT CARDS
    // =================================================

    products.forEach(
        product => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "product-card";


            card.innerHTML = `

                <div class="product-image">

                    <img
                        src="${product.imageUrl}"
                        alt="${product.name}"
                        onerror="
                            this.onerror=null;
                            this.src='https://via.placeholder.com/300x210?text=No+Image';
                        "
                    >

                </div>


                <span class="category">

                    ${
                        product.category
                            ? product.category.name
                            : "Product"
                    }

                </span>


                <h2>
                    ${product.name}
                </h2>


                <p>
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <span class="price">
                        ₹${Number(product.price).toLocaleString("en-IN")}
                    </span>

                    <span class="rating">
                        ⭐ 4.5
                    </span>

                </div>


                <button
                    class="cart-button"
                    onclick="
                        event.stopPropagation();
                        addToCart(${product.id});
                    "
                >

                    🛒 Add to Cart

                </button>

            `;


            // =================================================
            // CLICK PRODUCT CARD
            // =================================================

            card.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "product-details.html?id=" +
                        product.id;

                }
            );


            // =================================================
            // ADD CARD TO GRID
            // =================================================

            productGrid.appendChild(
                card
            );

        }
    );

}


// =====================================================
// CATEGORY CHANGE
// =====================================================

categoryFilter.addEventListener(
    "change",
    async function () {

        const selectedCategory =
            categoryFilter.value;


        // =================================================
        // ALL CATEGORIES
        // =================================================

        if (
            selectedCategory === ""
        ) {

            window.location.href =
                "products.html";

            return;

        }


        // =================================================
        // GET CATEGORY ID
        // =================================================

        try {

            const response =
                await fetch(
                    CATEGORY_ALL_API_URL
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to get categories"
                );

            }


            const result =
                await response.json();


            let categories = [];


            if (
                Array.isArray(result)
            ) {

                categories =
                    result;

            }

            else if (
                result.data &&
                Array.isArray(result.data)
            ) {

                categories =
                    result.data;

            }


            // =================================================
            // FIND SELECTED CATEGORY
            // =================================================

            const selected =
                categories.find(
                    category =>
                        category.name ===
                        selectedCategory
                );


            // =================================================
            // OPEN CATEGORY PAGE
            // =================================================

            if (selected) {

                window.location.href =
                    "products.html?categoryId=" +
                    selected.id;

            }

        }

        catch (error) {

            console.error(
                "Category error:",
                error
            );

        }

    }
);


// =====================================================
// SEARCH BUTTON
// =====================================================

searchButton.addEventListener(
    "click",
    function () {

        displayProducts();

    }
);


// =====================================================
// SEARCH ENTER
// =====================================================

searchInput.addEventListener(
    "keyup",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            displayProducts();

        }

    }
);


// =====================================================
// SORT
// =====================================================

sortFilter.addEventListener(
    "change",
    function () {

        displayProducts();

    }
);


// =====================================================
// ADD TO CART
// =====================================================

async function addToCart(
    productId
) {

    try {

        console.log(
            "Adding product to cart:",
            productId
        );


        // =================================================
        // GET LOGGED-IN USER ID
        // =================================================

        const currentUserId =
            Number(
                localStorage.getItem(
                    "userId"
                )
            );


        console.log(
            "Logged-in User ID:",
            currentUserId
        );


        // =================================================
        // CHECK LOGIN
        // =================================================

        if (!currentUserId) {

            alert(
                "Please login first."
            );


            window.location.href =
                "customer-login.html";


            return;

        }


        // =================================================
        // CREATE CART ITEM
        // =================================================

        const cartItem = {

            quantity: 1,

            userId:
                currentUserId,

            productId:
                Number(productId)

        };


        console.log(
            "Cart item being sent:",
            cartItem
        );


        // =================================================
        // SAVE CART ITEM
        // =================================================

        const response =
            await fetch(
                SAVE_CART_ITEM_API,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            cartItem
                        )

                }
            );


        // =================================================
        // CHECK RESPONSE
        // =================================================

        if (!response.ok) {

            const errorText =
                await response.text();


            console.error(
                "Server error:",
                errorText
            );


            throw new Error(
                errorText ||
                "Failed to add product to cart"
            );

        }


        // =================================================
        // GET RESPONSE
        // =================================================

        const result =
            await response.json();


        console.log(
            "Cart item saved:",
            result
        );


        // =================================================
        // SUCCESS MESSAGE
        // =================================================

        alert(
            "Product added to cart successfully!"
        );

    }

    catch (error) {

        console.error(
            "Add to cart error:",
            error
        );


        alert(
            "Unable to add product to cart.\n\n" +
            error.message
        );

    }

}


// =====================================================
// LOAD PRODUCTS WHEN PAGE OPENS
// =====================================================

loadProducts();