// =====================================================
// GET LOGGED-IN USER ID
// =====================================================

const USER_ID =
    Number(
        localStorage.getItem("userId")
    );

console.log(
    "Logged-in User ID:",
    USER_ID
);


// =====================================================
// CART ITEMS API
// =====================================================

const CART_ITEMS_API =
    "http://localhost:8080/getCartitems/" +
    USER_ID;


// =====================================================
// CHECK LOGIN
// =====================================================

if (!USER_ID) {

    alert(
        "Please login first."
    );

    window.location.href =
        "customer-login.html";
}


// =====================================================
// LOAD CART
// =====================================================

async function loadCart() {

    try {

        console.log(
            "Loading cart for user:",
            USER_ID
        );


        // =================================================
        // GET CURRENT USER'S CART ITEMS
        // =================================================

        const response =
            await fetch(
                CART_ITEMS_API
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Cart API error:",
                errorText
            );

            throw new Error(
                "Failed to load cart items"
            );

        }


        const cartItems =
            await response.json();


        console.log(
            "Cart items:",
            cartItems
        );


        // =================================================
        // CHECK EMPTY CART
        // =================================================

        if (
            !Array.isArray(cartItems) ||
            cartItems.length === 0
        ) {

            document.getElementById(
                "cartItems"
            ).innerHTML = `

                <div class="empty-cart">

                    <p>
                        Your cart is empty.
                    </p>

                    <br>

                    <button
                        onclick="window.location.href='orders.html'"
                    >

                        View My Orders

                    </button>

                </div>

            `;


            updateSummary(0);

            return;

        }


        // =================================================
        // DISPLAY CART
        // =================================================

        displayCart(
            cartItems
        );

    }

    catch (error) {

        console.error(
            "Cart Error:",
            error
        );


        document.getElementById(
            "cartItems"
        ).innerHTML = `

            <p>
                Unable to load cart.
            </p>

        `;


        updateSummary(0);

    }

}


// =====================================================
// DISPLAY CART
// =====================================================

function displayCart(
    cartItems
) {

    const cartItemsContainer =
        document.getElementById(
            "cartItems"
        );


    cartItemsContainer.innerHTML =
        "";


    let subtotal = 0;


    cartItems.forEach(
        item => {

            // =================================================
            // CHECK PRODUCT
            // =================================================

            if (!item.product) {

                console.log(
                    "Product missing:",
                    item
                );

                return;

            }


            // =================================================
            // PRODUCT DETAILS
            // =================================================

            const product =
                item.product;


            const quantity =
                Number(
                    item.quantity
                ) || 0;


            const price =
                Number(
                    product.price
                ) || 0;


            const itemTotal =
                price * quantity;


            subtotal +=
                itemTotal;


            // =================================================
            // CREATE CART ITEM
            // =================================================

            const cartItem =
                document.createElement(
                    "div"
                );


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div class="item-image">

                    <img
                        src="${product.imageUrl || ""}"
                        alt="${product.name || "Product"}"
                        onerror="
                            this.onerror=null;
                            this.src='https://via.placeholder.com/100x100?text=No+Image';
                        "
                    >

                </div>


                <div class="item-details">

                    <h2>
                        ${product.name || "Product"}
                    </h2>


                    <p>
                        ${product.description || ""}
                    </p>


                    <p>
                        Price:
                        ₹${price.toLocaleString("en-IN")}
                    </p>


                    <p>
                        Quantity:
                        ${quantity}
                    </p>


                    <strong>
                        Total:
                        ₹${itemTotal.toLocaleString("en-IN")}
                    </strong>

                </div>


                <div class="cart-actions">

                    <button
                        onclick="
                            increaseQuantity(
                                ${item.id},
                                ${quantity}
                            )
                        "
                    >
                        +
                    </button>


                    <span>
                        ${quantity}
                    </span>


                    <button
                        onclick="
                            decreaseQuantity(
                                ${item.id},
                                ${quantity}
                            )
                        "
                    >
                        -
                    </button>


                    <button
                        class="remove"
                        onclick="
                            removeItem(${item.id})
                        "
                    >
                        Remove
                    </button>

                </div>

            `;


            cartItemsContainer.appendChild(
                cartItem
            );

        }
    );


    // =================================================
    // UPDATE SUMMARY
    // =================================================

    updateSummary(
        subtotal
    );

}


// =====================================================
// UPDATE SUMMARY
// =====================================================

function updateSummary(
    subtotal
) {

    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    const totalElement =
        document.getElementById(
            "total"
        );


    if (subtotalElement) {

        subtotalElement.innerText =
            "₹" +
            subtotal.toLocaleString("en-IN");

    }


    if (totalElement) {

        totalElement.innerText =
            "₹" +
            subtotal.toLocaleString("en-IN");

    }

}


// =====================================================
// INCREASE QUANTITY
// =====================================================

async function increaseQuantity(
    cartItemId,
    currentQuantity
) {

    await updateCartItem(
        cartItemId,
        currentQuantity + 1
    );

}


// =====================================================
// DECREASE QUANTITY
// =====================================================

async function decreaseQuantity(
    cartItemId,
    currentQuantity
) {

    if (
        currentQuantity <= 1
    ) {

        alert(
            "Quantity cannot be less than 1."
        );

        return;

    }


    await updateCartItem(
        cartItemId,
        currentQuantity - 1
    );

}


// =====================================================
// UPDATE CART ITEM
// =====================================================

async function updateCartItem(
    cartItemId,
    newQuantity
) {

    try {

        // =================================================
        // GET EXISTING CART ITEM
        // =================================================

        const getResponse =
            await fetch(
                "http://localhost:8080/getCartitem/" +
                cartItemId
            );


        if (!getResponse.ok) {

            throw new Error(
                "Unable to get cart item"
            );

        }


        const existingItem =
            await getResponse.json();


        console.log(
            "Existing cart item:",
            existingItem
        );


        // =================================================
        // CHECK PRODUCT
        // =================================================

        if (
            !existingItem.product
        ) {

            throw new Error(
                "Product information not found"
            );

        }


        // =================================================
        // CREATE UPDATED CART ITEM
        // =================================================

        const cartItem = {

            quantity:
                newQuantity,

            userId:
                USER_ID,

            productId:
                existingItem.product.id

        };


        console.log(
            "Updating cart item:",
            cartItem
        );


        // =================================================
        // UPDATE API
        // =================================================

        const response =
            await fetch(
                "http://localhost:8080/updateCartitem/" +
                cartItemId,
                {

                    method: "PUT",

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


        if (!response.ok) {

            const errorText =
                await response.text();


            console.error(
                "Update error:",
                errorText
            );


            throw new Error(
                "Failed to update cart item"
            );

        }


        // =================================================
        // RELOAD CART
        // =================================================

        await loadCart();

    }

    catch (error) {

        console.error(
            "Update error:",
            error
        );


        alert(
            "Unable to update quantity."
        );

    }

}


// =====================================================
// DELETE CART ITEM
// =====================================================

async function removeItem(
    cartItemId
) {

    const confirmDelete =
        confirm(
            "Are you sure you want to remove this item?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        // =================================================
        // DELETE
        // =================================================

        const response =
            await fetch(
                "http://localhost:8080/deleteCartitem/" +
                cartItemId,
                {

                    method: "DELETE"

                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();


            console.error(
                "Delete error:",
                errorText
            );


            throw new Error(
                "Failed to delete cart item"
            );

        }


        // =================================================
        // RELOAD CART
        // =================================================

        await loadCart();

    }

    catch (error) {

        console.error(
            "Delete error:",
            error
        );


        alert(
            "Unable to remove product."
        );

    }

}


// =====================================================
// PROCEED TO CHECKOUT
// =====================================================

function proceedToCheckout() {

    console.log(
        "========== PROCEED TO CHECKOUT =========="
    );


    // =================================================
    // GET CURRENT USER
    // =================================================

    const currentUserId =
        Number(
            localStorage.getItem(
                "userId"
            )
        );


    console.log(
        "Checkout User ID:",
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
    // GO TO CHECKOUT PAGE
    // =================================================

    window.location.href =
        "checkout.html";

}


// =====================================================
// LOAD CART WHEN PAGE OPENS
// =====================================================

loadCart();