// =====================================================
// API URL
// =====================================================

const ORDERS_API =
    "http://localhost:8080/getorders";


// =====================================================
// CURRENT USER
// =====================================================

const CURRENT_USER_ID =
    Number(localStorage.getItem("userId"));


// =====================================================
// HTML ELEMENT
// =====================================================

const ordersContainer =
    document.getElementById("ordersContainer");


// =====================================================
// CHECK LOGIN
// =====================================================

if (!CURRENT_USER_ID) {

    alert("Please login first.");

    window.location.href =
        "customer-login.html";
}


// =====================================================
// LOAD ORDERS
// =====================================================

async function loadOrders() {

    try {

        // =================================================
        // SHOW LOADING
        // =================================================

        ordersContainer.innerHTML = `

            <div class="loading">

                Loading your orders...

            </div>

        `;


        console.log(
            "Logged-in User ID:",
            CURRENT_USER_ID
        );


        // =================================================
        // FETCH ALL ORDERS
        // =================================================

        const response =
            await fetch(
                ORDERS_API
            );


        // =================================================
        // CHECK RESPONSE
        // =================================================

        if (!response.ok) {

            throw new Error(
                "Failed to fetch orders. Status: " +
                response.status
            );

        }


        // =================================================
        // GET JSON
        // =================================================

        const result =
            await response.json();


        console.log(
            "Orders API response:",
            result
        );


        // =================================================
        // GET ORDERS ARRAY
        // =================================================

        let orders = [];


        // -------------------------------------------------
        // CASE 1: DIRECT ARRAY
        // -------------------------------------------------

        if (Array.isArray(result)) {

            orders =
                result;

        }


        // -------------------------------------------------
        // CASE 2: RESPONSE STRUCTURE
        // { data: [...] }
        // -------------------------------------------------

        else if (
            result.data &&
            Array.isArray(result.data)
        ) {

            orders =
                result.data;

        }


        // -------------------------------------------------
        // INVALID RESPONSE
        // -------------------------------------------------

        else {

            throw new Error(
                "Invalid orders response"
            );

        }


        console.log(
            "All Orders:",
            orders
        );


        // =================================================
        // FILTER CURRENT USER'S ORDERS
        // =================================================

        orders =
            orders.filter(
                order => {

                    return (
                        order.user &&
                        Number(order.user.id) ===
                        CURRENT_USER_ID
                    );

                }
            );


        console.log(
            "Current User Orders:",
            orders
        );


        // =================================================
        // NO ORDERS
        // =================================================

        if (
            orders.length === 0
        ) {

            showNoOrders();

            return;

        }


        // =================================================
        // DISPLAY ORDERS
        // =================================================

        displayOrders(
            orders
        );

    }


    catch (error) {

        console.error(
            "Orders loading error:",
            error
        );


        ordersContainer.innerHTML = `

            <div class="error-message">

                <h3>
                    Unable to load orders
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;

    }

}


// =====================================================
// DISPLAY ORDERS
// =====================================================

function displayOrders(
    orders
) {

    // =================================================
    // CLEAR CONTAINER
    // =================================================

    ordersContainer.innerHTML = "";


    // =================================================
    // LOOP THROUGH ORDERS
    // =================================================

    orders.forEach(
        order => {

            // =============================================
            // CREATE ORDER CARD
            // =============================================

            const orderCard =
                document.createElement(
                    "div"
                );


            orderCard.className =
                "order-card";


            // =============================================
            // ORDER STATUS
            // =============================================

            const status =
                order.status ||
                "UNKNOWN";


            const statusClass =
                getStatusClass(
                    status
                );


            // =============================================
            // USER NAME
            // =============================================

            let userName =
                "Customer";


            if (
                order.user &&
                order.user.name
            ) {

                userName =
                    order.user.name;

            }


            // =============================================
            // TOTAL AMOUNT
            // =============================================

            const totalAmount =
                Number(
                    order.totalAmount || 0
                );


            // =============================================
            // CREATE ORDER CARD HTML
            // =============================================

            orderCard.innerHTML = `

                <div class="order-top">

                    <div class="order-id">

                        Order #${order.id}

                    </div>


                    <div class="
                        order-status
                        ${statusClass}
                    ">

                        ${status}

                    </div>

                </div>


                <div class="order-info">


                    <div class="info-box">

                        <p>
                            Customer
                        </p>

                        <strong>
                            ${userName}
                        </strong>

                    </div>


                    <div class="info-box">

                        <p>
                            Total Amount
                        </p>

                        <strong>

                            ₹${totalAmount.toLocaleString("en-IN")}

                        </strong>

                    </div>


                    <div class="info-box">

                        <p>
                            Order Status
                        </p>

                        <strong>
                            ${status}
                        </strong>

                    </div>


                </div>


                <div class="order-bottom">

                    <button
                        class="view-button"
                        onclick="viewOrder(${order.id})">

                        View Order

                    </button>

                </div>

            `;


            // =============================================
            // ADD CARD TO PAGE
            // =============================================

            ordersContainer.appendChild(
                orderCard
            );

        }
    );

}


// =====================================================
// GET STATUS CSS CLASS
// =====================================================

function getStatusClass(
    status
) {

    const statusUpper =
        String(
            status
        ).toUpperCase();


    if (
        statusUpper === "PLACED"
    ) {

        return "status-placed";

    }


    if (
        statusUpper === "PROCESSING"
    ) {

        return "status-processing";

    }


    if (
        statusUpper === "SHIPPED"
    ) {

        return "status-shipped";

    }


    if (
        statusUpper === "DELIVERED"
    ) {

        return "status-delivered";

    }


    return "status-default";

}


// =====================================================
// VIEW ORDER
// =====================================================

function viewOrder(
    orderId
) {

    console.log(
        "Opening order:",
        orderId
    );


    window.location.href =
        "order_details.html?id=" +
        orderId;

}


// =====================================================
// SHOW NO ORDERS
// =====================================================

function showNoOrders() {

    ordersContainer.innerHTML = `

        <div class="no-orders">

            <h2>
                No Orders Found
            </h2>

            <p>
                You have not placed any orders yet.
            </p>


            <a
                href="products.html">

                Continue Shopping

            </a>

        </div>

    `;

}


// =====================================================
// LOAD ORDERS WHEN PAGE OPENS
// =====================================================

loadOrders();