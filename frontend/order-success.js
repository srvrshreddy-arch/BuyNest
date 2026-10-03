// =====================================================
// GET ORDER DETAILS FROM LOCAL STORAGE
// =====================================================

const orderId =
    localStorage.getItem("orderId");


const totalAmount =
    localStorage.getItem("totalAmount");


const paymentMethod =
    localStorage.getItem("paymentMethod");


// =====================================================
// DISPLAY ORDER ID
// =====================================================

const orderIdElement =
    document.getElementById(
        "orderId"
    );


if (
    orderIdElement &&
    orderId
) {

    orderIdElement.innerText =
        "#" + orderId;

}


// =====================================================
// DISPLAY TOTAL AMOUNT
// =====================================================

const totalAmountElement =
    document.getElementById(
        "totalAmount"
    );


if (
    totalAmountElement &&
    totalAmount
) {

    totalAmountElement.innerText =
        "₹" +
        Number(totalAmount)
            .toLocaleString("en-IN");

}


// =====================================================
// DISPLAY PAYMENT METHOD
// =====================================================

const paymentMethodElement =
    document.getElementById(
        "paymentMethod"
    );


if (
    paymentMethodElement &&
    paymentMethod
) {

    paymentMethodElement.innerText =
        paymentMethod;

}


// =====================================================
// DEBUG
// =====================================================

console.log(
    "Order ID:",
    orderId
);


console.log(
    "Total Amount:",
    totalAmount
);


console.log(
    "Payment Method:",
    paymentMethod
);