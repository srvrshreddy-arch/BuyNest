const USER_ID =
    Number(
        localStorage.getItem("userId")
    );


const CART_ITEMS_API =
    "https://buynest-qbzg.onrender.com/getCartitems/" +
    USER_ID;


// ===============================
// CHECK LOGIN
// ===============================

if (!USER_ID) {

    alert("Please login first.");

    window.location.href =
        "customer-login.html";
}


// ===============================
// LOAD CART
// ===============================

async function loadCart() {

    try {

        const response =
            await fetch(
                CART_ITEMS_API
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch cart"
            );
        }


        const result =
            await response.json();


        console.log(
            "Cart received:",
            result
        );


        const cartItems =
            Array.isArray(result)
                ? result
                : result.data;


        displayCart(cartItems || []);


    } catch (error) {

        console.error(
            "Error loading cart:",
            error
        );


        const cartContainer =
            document.getElementById(
                "cartContainer"
            );


        if (cartContainer) {

            cartContainer.innerHTML = `

                <p style="
                    text-align:center;
                    color:red;
                    font-size:18px;
                ">

                    Unable to load cart.

                </p>

            `;
        }
    }
}


// ===============================
// DISPLAY CART
// ===============================

function displayCart(cartItems) {

    const cartContainer =
        document.getElementById(
            "cartContainer"
        );


    if (!cartContainer) return;


    cartContainer.innerHTML = "";


    if (
        !cartItems ||
        cartItems.length === 0
    ) {

        cartContainer.innerHTML = `

            <div style="
                text-align:center;
                padding:40px;
            ">

                <h2>Your Cart is Empty</h2>

                <p>
                    Add some products to your cart.
                </p>

            </div>

        `;

        updateTotals(0);

        return;
    }


    let subtotal = 0;


    cartItems.forEach(
        cartItem => {

            const product =
                cartItem.product;


            const quantity =
                Number(
                    cartItem.quantity || 1
                );


            const price =
                Number(
                    product?.price || 0
                );


            const itemTotal =
                price * quantity;


            subtotal += itemTotal;


            const cartCard =
                document.createElement(
                    "div"
                );


            cartCard.className =
                "cart-item";


            cartCard.innerHTML = `

                <img
                    src="${
                        product?.imageUrl ||
                        product?.image ||
                        ""
                    }"
                    alt="${
                        product?.name ||
                        "Product"
                    }"
                    onerror="
                        this.src='https://via.placeholder.com/150x150?text=No+Image'
                    "
                >


                <div class="cart-item-details">

                    <h3>
                        ${
                            product?.name ||
                            "Product"
                        }
                    </h3>


                    <p>
                        Price:
                        ₹${price}
                    </p>


                    <div class="quantity-controls">

                        <button
                            onclick="
                                decreaseQuantity(
                                    ${cartItem.id},
                                    ${quantity}
                                )
                            "
                        >
                            -
                        </button>


                        <span>
                            ${quantity}
                        </span>


                        <button
                            onclick="
                                increaseQuantity(
                                    ${cartItem.id},
                                    ${quantity}
                                )
                            "
                        >
                            +
                        </button>

                    </div>


                    <p>
                        <strong>
                            Total:
                            ₹${itemTotal}
                        </strong>
                    </p>


                    <button
                        onclick="
                            removeItem(
                                ${cartItem.id}
                            )
                        "
                    >
                        Remove
                    </button>

                </div>

            `;


            cartContainer.appendChild(
                cartCard
            );
        }
    );


    updateTotals(subtotal);
}


// ===============================
// UPDATE TOTALS
// ===============================

function updateTotals(subtotal) {

    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    const totalElement =
        document.getElementById(
            "total"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            "₹" + subtotal;
    }


    if (totalElement) {

        totalElement.textContent =
            "₹" + subtotal;
    }
}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(
    cartItemId,
    currentQuantity
) {

    updateCartItem(
        cartItemId,
        currentQuantity + 1
    );
}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(
    cartItemId,
    currentQuantity
) {

    if (currentQuantity <= 1) {

        removeItem(cartItemId);

        return;
    }


    updateCartItem(
        cartItemId,
        currentQuantity - 1
    );
}


// ===============================
// UPDATE CART ITEM
// ===============================

async function updateCartItem(
    cartItemId,
    quantity
) {

    try {

        // First get existing cart item
        const getResponse =
            await fetch(
                "https://buynest-qbzg.onrender.com/getCartitem/" +
                cartItemId
            );


        if (!getResponse.ok) {

            throw new Error(
                "Unable to get cart item"
            );
        }


        const result =
            await getResponse.json();


        const cartItem =
            result.data || result;


        cartItem.quantity =
            quantity;


        // Update cart item
        const response =
            await fetch(
                "https://buynest-qbzg.onrender.com/updateCartitem/" +
                cartItemId,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(cartItem)
                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to update cart"
            );
        }


        await loadCart();


    } catch (error) {

        console.error(
            "Error updating cart:",
            error
        );


        alert(
            "Unable to update cart."
        );
    }
}


// ===============================
// REMOVE CART ITEM
// ===============================

async function removeItem(
    cartItemId
) {

    if (
        !confirm(
            "Are you sure you want to remove this item?"
        )
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                "https://buynest-qbzg.onrender.com/deleteCartitem/" +
                cartItemId,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to delete cart item"
            );
        }


        await loadCart();


    } catch (error) {

        console.error(
            "Error removing cart item:",
            error
        );


        alert(
            "Unable to remove item."
        );
    }
}


// ===============================
// PROCEED TO CHECKOUT
// ===============================

function proceedToCheckout() {

    window.location.href =
        "checkout.html";
}


// ===============================
// INITIAL LOAD
// ===============================

loadCart();