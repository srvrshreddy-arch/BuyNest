// =====================================================
// LOGIN / LOGOUT
// =====================================================

const authLink = document.getElementById("authLink");

const loggedIn = localStorage.getItem("loggedIn");


// =====================================================
// CHECK LOGIN STATUS
// =====================================================

if (loggedIn === "true") {

    // ---------------------------------------------
    // USER IS LOGGED IN
    // ---------------------------------------------

    authLink.textContent = "Logout";

    authLink.href = "#";


    authLink.addEventListener("click", function (event) {

        event.preventDefault();


        // ---------------------------------------------
        // CLEAR CUSTOMER LOGIN DATA
        // ---------------------------------------------

        localStorage.removeItem("loggedIn");

        localStorage.removeItem("userId");

        localStorage.removeItem("userName");

        localStorage.removeItem("userEmail");


        // ---------------------------------------------
        // GO TO LOGIN PAGE
        // ---------------------------------------------

        window.location.href = "customer-login.html";

    });


} else {

    // ---------------------------------------------
    // USER IS NOT LOGGED IN
    // ---------------------------------------------

    authLink.textContent = "Login";

    authLink.href = "customer-login.html";

}



// =====================================================
// CATEGORY CARDS
// =====================================================

const categoryCards =
    document.querySelectorAll(".category-card");


// =====================================================
// CATEGORY CLICK
// =====================================================

categoryCards.forEach(card => {

    card.addEventListener("click", function () {

        const categoryId =
            this.getAttribute("data-category-id");


        console.log(
            "Selected Category ID:",
            categoryId
        );


        if (!categoryId) {

            console.error(
                "Category ID not found"
            );

            return;

        }


        window.location.href =
            "products.html?categoryId=" +
            categoryId;

    });

});



// =====================================================
// ADD TO CART
// =====================================================

async function addToCart(productId) {

    try {

        console.log(
            "Adding product to cart:",
            productId
        );


        // =================================================
        // CHECK LOGIN
        // =================================================

        const loggedIn =
            localStorage.getItem("loggedIn");

        const userId =
            localStorage.getItem("userId");


        if (loggedIn !== "true" || !userId) {

            alert(
                "Please login before adding products to cart."
            );

            window.location.href =
                "customer-login.html";

            return;

        }


        console.log(
            "Logged-in User ID:",
            userId
        );


        // =================================================
        // SAVE CART ITEM
        // =================================================

        const response =
            await fetch(
                "http://localhost:8080/saveCartitem",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            quantity: 1,

                            cart: {
                                id: 1
                            },

                            product: {
                                id: productId
                            }

                        })

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
                "Failed to add product to cart. Status: " +
                response.status
            );

        }


        // =================================================
        // RESPONSE
        // =================================================

        const result =
            await response.json();


        console.log(
            "Cart item saved:",
            result
        );


        // =================================================
        // SUCCESS
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
            "Unable to add product to cart."
        );

    }

}