package Online.Shopping.Management.System.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class Cartitemdto {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Product ID is required")
    private Long productId;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;


    // ==============================
    // CONSTRUCTOR
    // ==============================

    public Cartitemdto() {
        super();
    }


    public Cartitemdto(Long userId, Long productId, int quantity) {
        super();
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }


    // ==============================
    // GETTERS AND SETTERS
    // ==============================

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }


    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}