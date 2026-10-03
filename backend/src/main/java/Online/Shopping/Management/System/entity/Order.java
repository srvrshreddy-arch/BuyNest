package Online.Shopping.Management.System.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Table(name = "orders")
@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull(message = "Total amount is required")
    @Positive(message = "Total amount must be greater than 0")
    private Double totalAmount;

    @NotBlank(message = "Status is required")
    private String status;


    // =========================
    // USER
    // =========================

    @ManyToOne
    private User user;


    // =========================
    // DELIVERY PERSON
    // =========================

    @ManyToOne
    private DeliveryPerson deliveryPerson;


    // =========================
    // ORDER ITEMS
    // =========================

    @OneToMany(
        mappedBy = "orders",
        fetch = FetchType.EAGER
    )
    @JsonManagedReference
    private List<Orderitem> orderitems;


    // =========================
    // DEFAULT CONSTRUCTOR
    // =========================

    public Order() {
        super();
    }


    // =========================
    // PARAMETERIZED CONSTRUCTOR
    // =========================

    public Order(Double totalAmount,
                 String status,
                 User user) {

        super();

        this.totalAmount = totalAmount;
        this.status = status;
        this.user = user;
    }


    // =========================
    // ID
    // =========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // =========================
    // TOTAL AMOUNT
    // =========================

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }


    // =========================
    // STATUS
    // =========================

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    // =========================
    // USER
    // =========================

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    // =========================
    // DELIVERY PERSON
    // =========================

    public DeliveryPerson getDeliveryPerson() {
        return deliveryPerson;
    }

    public void setDeliveryPerson(DeliveryPerson deliveryPerson) {
        this.deliveryPerson = deliveryPerson;
    }


    // =========================
    // ORDER ITEMS
    // =========================

    public List<Orderitem> getOrderitems() {
        return orderitems;
    }

    public void setOrderitems(List<Orderitem> orderitems) {
        this.orderitems = orderitems;
    }
}