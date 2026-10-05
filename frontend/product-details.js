// =====================================================
// API URLS
// =====================================================

const API_BASE_URL =
    "https://buynest-qbzg.onrender.com";

const API_URL =
    API_BASE_URL + "/getProducts";

const SAVE_CART_ITEM_API =
    API_BASE_URL + "/saveCartitem";


// =====================================================
// GET PRODUCT ID FROM URL
// =====================================================

const urlParams =
    new URLSearchParams(window.location.search);

const productId =
    urlParams.get("id");

console.log("Product ID:", productId);


// =====================================================
// GET LOGGED-IN USER ID
// =====================================================

const userId =
    Number(localStorage.getItem("userId"));

console.log("Logged-in User ID:", userId);


// =====================================================
// CHECK LOGIN
// =====================================================

if (!userId) {

    alert("Please login first.");

    window.location.href =
        "customer-login.html";
}


// =====================================================
// HTML ELEMENTS
// =====================================================

const productImage =
    document.getElementById("productImage");

const category =
    document.getElementById("category");

const productName =
    document.getElementById("productName");

const productDescription =
    document.getElementById("productDescription");

const productPrice =
    document.getElementById("productPrice");

const productQuantity =
    document.getElementById("productQuantity");

const quantityInput =
    document.getElementById("quantity");

const productIdElement =
    document.getElementById("productId");

const productCategory =
    document.getElementById("productCategory");

const detailsPrice =
    document.getElementById("detailsPrice");

const detailsQuantity =
    document.getElementById("detailsQuantity");

const cartButton =
    document.getElementById("cartButton");

const buyButton =
    document.getElementById("buyButton");


// =====================================================
// CURRENT PRODUCT
// =====================================================

let currentProduct = null;


// =====================================================
// LOAD PRODUCT
// =====================================================

async function loadProduct() {

    try {

        if (!productId) {

            throw new Error(
                "Product ID is missing from URL"
            );

        }


        console.log(
            "Fetching products from:",
            API_URL
        );


        // =================================================
        // GET PRODUCTS FROM RENDER
        // =================================================

        const response =
            await fetch(API_URL);


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
        // GET PRODUCT ARRAY
        // =================================================

        let products = [];


        if (Array.isArray(result)) {

            products = result;

        }

        else if (
            result.data &&
            Array.isArray(result.data)
        ) {

            products = result.data;

        }

        else {

            throw new Error(
                "Invalid products response"
            );

        }


        // =================================================
        // FIND PRODUCT
        // =================================================

        currentProduct =
            products.find(
                product =>
                    String(product.id) ===
                    String(productId)
            );


        // =================================================
        // PRODUCT NOT FOUND
        // =================================================

        if (!currentProduct) {

            throw new Error(
                "Product with ID " +
                productId +
                " not found"
            );

        }


        console.log(
            "Selected product:",
            currentProduct
        );


        // =================================================
        // DISPLAY PRODUCT
        // =================================================

        displayProduct(
            currentProduct
        );

    }

    catch (error) {

        console.error(
            "Product loading error:",
            error
        );


        if (productName) {

            productName.textContent =
                "Unable to load product";

        }


        if (productDescription) {

            productDescription.textContent =
                error.message;

        }


        if (productPrice) {

            productPrice.textContent =
                "₹0";

        }


        if (productQuantity) {

            productQuantity.textContent =
                "Available: 0";

        }


        if (productImage) {

            productImage.innerHTML =
                "🛍️";

        }

    }

}


// =====================================================
// DISPLAY PRODUCT
// =====================================================

function displayProduct(product) {


    // =================================================
    // IMAGE
    // =================================================

    if (
        productImage &&
        product.imageUrl
    ) {

        productImage.innerHTML = `

            <img
                src="${product.imageUrl}"
                alt="${product.name || "Product"}"
                onerror="
                    this.onerror=null;
                    this.src='https://via.placeholder.com/430x430?text=No+Image';
                "
            >

        `;

    }

    else if (productImage) {

        productImage.innerHTML =
            "🛍️";

    }


    // =================================================
    // CATEGORY
    // =================================================

    if (product.category) {

        if (
            typeof product.category ===
            "object"
        ) {

            if (category) {

                category.textContent =
                    product.category.name ||
                    "Product";

            }


            if (productCategory) {

                productCategory.textContent =
                    product.category.name ||
                    "Product";

            }

        }

        else {

            if (category) {

                category.textContent =
                    product.category;

            }


            if (productCategory) {

                productCategory.textContent =
                    product.category;

            }

        }

    }

    else {

        if (category) {

            category.textContent =
                "Product";

        }


        if (productCategory) {

            productCategory.textContent =
                "Product";

        }

    }


    // =================================================
    // NAME
    // =================================================

    if (productName) {

        productName.textContent =
            product.name ||
            "Product";

    }


    // =================================================
    // DESCRIPTION
    // =================================================

    if (productDescription) {

        productDescription.textContent =
            product.description ||
            "No description available";

    }


    // =================================================
    // PRICE
    // =================================================

    const price =
        Number(product.price) || 0;


    if (productPrice) {

        productPrice.textContent =
            "₹" +
            price.toLocaleString("en-IN");

    }


    if (detailsPrice) {

        detailsPrice.textContent =
            "₹" +
            price.toLocaleString("en-IN");

    }


    // =================================================
    // AVAILABLE QUANTITY
    // =================================================

    const availableQuantity =
        Number(
            product.quantity ??
            product.stock ??
            product.availableQuantity ??
            0
        );


    if (productQuantity) {

        productQuantity.textContent =
            "Available: " +
            availableQuantity;

    }


    if (detailsQuantity) {

        detailsQuantity.textContent =
            availableQuantity;

    }


    // =================================================
    // PRODUCT ID
    // =================================================

    if (productIdElement) {

        productIdElement.textContent =
            product.id;

    }


    // =================================================
    // RESET QUANTITY
    // =================================================

    if (quantityInput) {

        quantityInput.value = 1;

    }

}


// =====================================================
// GET AVAILABLE QUANTITY
// =====================================================

function getAvailableQuantity() {

    if (!currentProduct) {

        return 0;

    }


    return Number(
        currentProduct.quantity ??
        currentProduct.stock ??
        currentProduct.availableQuantity ??
        0
    );

}


// =====================================================
// INCREASE QUANTITY
// =====================================================

function increaseQuantity() {

    if (!currentProduct) {

        return;

    }


    const availableQuantity =
        getAvailableQuantity();


    let quantity =
        Number(quantityInput.value) || 1;


    if (
        availableQuantity > 0 &&
        quantity < availableQuantity
    ) {

        quantity++;

        quantityInput.value =
            quantity;

    }

}


// =====================================================
// DECREASE QUANTITY
// =====================================================

function decreaseQuantity() {

    let quantity =
        Number(quantityInput.value) || 1;


    if (quantity > 1) {

        quantity--;

        quantityInput.value =
            quantity;

    }

}


// =====================================================
// ADD PRODUCT TO CART
// =====================================================

async function addProductToCart() {

    try {

        if (!currentProduct) {

            alert(
                "Product is still loading."
            );

            return;

        }


        const currentUserId =
            Number(
                localStorage.getItem("userId")
            );


        if (!currentUserId) {

            alert(
                "Please login first."
            );

            window.location.href =
                "customer-login.html";

            return;

        }


        const quantity =
            Number(
                quantityInput.value
            ) || 1;


        if (quantity < 1) {

            alert(
                "Quantity must be at least 1."
            );

            return;

        }


        const availableQuantity =
            getAvailableQuantity();


        if (
            availableQuantity > 0 &&
            quantity > availableQuantity
        ) {

            alert(
                "Requested quantity is not available."
            );

            return;

        }


        // =================================================
        // CART ITEM
        // =================================================
        // IMPORTANT:
        // Cartitemdto expects:
        // userId
        // productId
        // quantity
        // =================================================

        const cartItem = {

            userId:
                currentUserId,

            productId:
                Number(
                    currentProduct.id
                ),

            quantity:
                quantity

        };


        console.log(
            "Sending cart item:",
            cartItem
        );


        // =================================================
        // SAVE CART ITEM
        // =================================================

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
                        JSON.stringify(
                            cartItem
                        )

                }
            );


        // =================================================
        // GET RESPONSE
        // =================================================

        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Unable to add product to cart"
            );

        }


        const result =
            await response.text();

        console.log(
            "Cart response:",
            result
        );


        // =================================================
        // SUCCESS
        // =================================================

        alert(
            currentProduct.name +
            " added to cart successfully!"
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
// BUY NOW
// =====================================================

function buyNow() {

    try {

        if (!currentProduct) {

            alert(
                "Product is still loading."
            );

            return;

        }


        const currentUserId =
            Number(
                localStorage.getItem("userId")
            );


        if (!currentUserId) {

            alert(
                "Please login first."
            );

            window.location.href =
                "customer-login.html";

            return;

        }


        const quantity =
            Number(
                quantityInput.value
            ) || 1;


        const availableQuantity =
            getAvailableQuantity();


        if (
            availableQuantity > 0 &&
            quantity > availableQuantity
        ) {

            alert(
                "Requested quantity is not available."
            );

            return;

        }


        const price =
            Number(
                currentProduct.price
            ) || 0;


        const totalAmount =
            price * quantity;


        const buyNowData = {

            userId:
                currentUserId,

            productId:
                Number(
                    currentProduct.id
                ),

            productName:
                currentProduct.name,

            price:
                price,

            quantity:
                quantity,

            totalAmount:
                totalAmount

        };


        localStorage.setItem(
            "buyNowProduct",
            JSON.stringify(
                buyNowData
            )
        );


        localStorage.removeItem(
            "orderId"
        );

        localStorage.removeItem(
            "orderTotal"
        );

        localStorage.removeItem(
            "totalAmount"
        );

        localStorage.removeItem(
            "paymentMethod"
        );


        window.location.href =
            "checkout.html";

    }

    catch (error) {

        console.error(
            "Buy Now error:",
            error
        );


        alert(
            "Unable to continue to checkout.\n\n" +
            error.message
        );

    }

}


// =====================================================
// CART BUTTON
// =====================================================

if (cartButton) {

    cartButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            addProductToCart();

        }
    );

}


// =====================================================
// BUY NOW BUTTON
// =====================================================

if (buyButton) {

    buyButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            buyNow();

        }
    );

}


// =====================================================
// LOAD PRODUCT
// =====================================================

loadProduct();