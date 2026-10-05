// =====================================================
// ORDERS API
// =====================================================

const ORDERS_API =
    "https://buynest-qbzg.onrender.com/getorders";


// =====================================================
// CURRENT USER
// =====================================================

const CURRENT_USER_ID =
    Number(
        localStorage.getItem("userId")
    );


// =====================================================
// HTML ELEMENT
// =====================================================

const ordersContainer =
    document.getElementById(
        "ordersContainer"
    );


// =====================================================
// CHECK LOGIN
// =====================================================

if (!CURRENT_USER_ID) {

    alert(
        "Please login first."
    );

    window.location.href =
        "customer-login.html";
}


// =====================================================
// LOAD ORDERS
// =====================================================

async function loadOrders() {

    try {

        const response =
            await fetch(
                ORDERS_API
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch orders. Status: " +
                response.status
            );

        }


        const result =
            await response.json();


        console.log(
            "Orders received:",
            result
        );


        // =================================================
        // GET ORDERS ARRAY
        // =================================================

        const orders =
            Array.isArray(result)
                ? result
                : result.data;


        if (!Array.isArray(orders)) {

            throw new Error(
                "Invalid orders response"
            );

        }


        // =================================================
        // FILTER CURRENT USER ORDERS
        // =================================================

        const userOrders =
            orders.filter(
                order => {

                    return (
                        order.user &&
                        Number(
                            order.user.id
                        ) ===
                        CURRENT_USER_ID
                    );

                }
            );


        console.log(
            "Current user's orders:",
            userOrders
        );


        // =================================================
        // DISPLAY
        // =================================================

        displayOrders(
            userOrders
        );


    } catch (error) {

        console.error(
            "Error loading orders:",
            error
        );


        if (ordersContainer) {

            ordersContainer.innerHTML = `

                <p style="
                    text-align:center;
                    color:red;
                    font-size:18px;
                ">

                    Unable to load orders.

                </p>

            `;

        }

    }

}


// =====================================================
// DISPLAY ORDERS
// =====================================================

function displayOrders(
    orders
) {

    if (!ordersContainer) {

        console.error(
            "Orders container not found"
        );

        return;

    }


    ordersContainer.innerHTML =
        "";


    // =================================================
    // NO ORDERS
    // =================================================

    if (
        !orders ||
        orders.length === 0
    ) {

        ordersContainer.innerHTML = `

            <div style="
                text-align:center;
                padding:40px;
            ">

                <h2>
                    No Orders Found
                </h2>

                <p>
                    You have not placed any
                    orders yet.
                </p>

            </div>

        `;

        return;

    }


    // =================================================
    // DISPLAY EACH ORDER
    // =================================================

    orders.forEach(
        order => {

            const orderCard =
                document.createElement(
                    "div"
                );


            orderCard.className =
                "order-card";


            // =================================================
            // STATUS
            // =================================================

            const status =
                order.status ||
                "PLACED";


            const statusClass =
                String(status)
                    .toLowerCase()
                    .replace(
                        /\s+/g,
                        "-"
                    );


            // =================================================
            // USER NAME
            // =================================================

            const userName =
                order.user?.name ||
                order.user?.username ||
                "Customer";


            // =================================================
            // TOTAL
            // =================================================

            const totalAmount =
                Number(
                    order.totalAmount || 0
                );


            // =================================================
            // ORDER CARD
            // =================================================

            orderCard.innerHTML = `

                <div class="order-header">

                    <h3>
                        Order #${order.id}
                    </h3>

                    <span
                        class="order-status ${statusClass}"
                    >
                        ${status}
                    </span>

                </div>


                <div class="order-details">

                    <p>

                        <strong>
                            User:
                        </strong>

                        ${userName}

                    </p>


                    <p>

                        <strong>
                            Total Amount:
                        </strong>

                        ₹${totalAmount}

                    </p>

                </div>


                <button
                    class="view-order-btn"
                    onclick="
                        viewOrder(
                            ${order.id}
                        )
                    "
                >

                    View Order

                </button>

            `;


            ordersContainer.appendChild(
                orderCard
            );

        }
    );

}


// =====================================================
// VIEW ORDER
// =====================================================

function viewOrder(
    orderId
) {

    window.location.href =
        "order_details.html?id=" +
        orderId;

}


// =====================================================
// INITIAL LOAD
// =====================================================

loadOrders();