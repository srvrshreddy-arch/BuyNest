package Online.Shopping.Management.System.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Product name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @Positive(message = "Price must be greater than 0")
    private Double price;

    @Min(value = 0, message = "Quantity cannot be negative")
    @Column(name = "quntity")
    private Integer quantity;

    // Product image URL
    // TEXT allows long image URLs
    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    // Multiple colours for one product
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "product_colors",
        joinColumns = @JoinColumn(name = "product_id")
    )
    private List<String> colors;

    // Product -> Category
    @ManyToOne
    @JsonIgnore
    private Category category;

    // Product -> CartItems
    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<Cartitem> cartitems;

    // Product -> OrderItems
    @OneToMany(mappedBy = "products")
    @JsonIgnore
    private List<Orderitem> orderitems;


    // Default Constructor
    public Product() {
        super();
    }


    // Parameterized Constructor
    public Product(String name,
                   String description,
                   Double price,
                   Integer quantity,
                   String imageUrl,
                   List<String> colors,
                   Category category) {

        super();

        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.colors = colors;
        this.category = category;
    }


    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }


    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    public List<String> getColors() {
        return colors;
    }

    public void setColors(List<String> colors) {
        this.colors = colors;
    }


    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }


    public List<Cartitem> getCartitems() {
        return cartitems;
    }

    public void setCartitems(List<Cartitem> cartitems) {
        this.cartitems = cartitems;
    }


    public List<Orderitem> getOrderitems() {
        return orderitems;
    }

    public void setOrderitems(List<Orderitem> orderitems) {
        this.orderitems = orderitems;
    }
}