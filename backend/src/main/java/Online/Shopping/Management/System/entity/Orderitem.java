package Online.Shopping.Management.System.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
public class Orderitem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than 0")
    private Double price;


    @NotNull(message = "Order is required")
    @ManyToOne
    @JsonBackReference
    private Order orders;


    @NotNull(message = "Product is required")
    @ManyToOne
    private Product products;


    // DEFAULT CONSTRUCTOR

    public Orderitem() {
        super();
    }


    // PARAMETERIZED CONSTRUCTOR

    public Orderitem(
            Integer quantity,
            Double price,
            Order orders,
            Product products) {

        super();

        this.quantity = quantity;
        this.price = price;
        this.orders = orders;
        this.products = products;
    }


    // ID

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // QUANTITY

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


    // PRICE

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }


    // ORDER

    public Order getOrders() {
        return orders;
    }

    public void setOrders(Order orders) {
        this.orders = orders;
    }


    // PRODUCT

    public Product getProducts() {
        return products;
    }

    public void setProducts(Product products) {
        this.products = products;
    }
}