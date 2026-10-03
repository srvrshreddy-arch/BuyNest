package Online.Shopping.Management.System.dto;

public class Buynowrequest {
	private Long userId;

    private Long productId;

    private Integer quantity;

    public Buynowrequest () {

        super();

    }

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

    public Integer getQuantity() {

        return quantity;

    }

    public void setQuantity(Integer quantity) {

        this.quantity = quantity;

    }

}


