package Online.Shopping.Management.System.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @NotNull(message = "User is required")
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;


    // ========================================
    // CART -> CART ITEMS
    // ========================================

    @OneToMany(
        mappedBy = "cart",
        fetch = FetchType.EAGER
    )
    @JsonIgnore
    private List<Cartitem> cartitems;


    // ========================================
    // CONSTRUCTOR
    // ========================================

    public Cart() {
        super();
    }


    public Cart(Long id, User user) {
        super();
        this.id = id;
        this.user = user;
    }


    // ========================================
    // GETTER AND SETTER
    // ========================================

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
    }


    public List<Cartitem> getCartitems() {
        return cartitems;
    }


    public void setCartitems(List<Cartitem> cartitems) {
        this.cartitems = cartitems;
    }
}