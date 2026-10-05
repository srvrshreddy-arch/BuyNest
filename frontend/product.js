async function addToCart(product) {

    const userId = Number(localStorage.getItem("userId"));

    // Check login
    if (!userId) {
        alert("Please login to add products to cart.");
        window.location.href = "customer-login.html";
        return;
    }

    // Correct DTO format
    const cartItem = {
        userId: userId,
        productId: Number(product.id),
        quantity: 1
    };

    console.log("Sending cart item:", cartItem);

    try {

        const response = await fetch(
            SAVE_CART_ITEM_API,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cartItem)
            }
        );

        const result = await response.json();

        console.log("Cart response:", result);

        if (!response.ok) {

            throw new Error(
                result.message || "Unable to add product to cart"
            );
        }

        alert("Product added to cart successfully!");

    } catch (error) {

        console.error("Error adding to cart:", error);

        alert("Unable to add product to cart.");
    }
}