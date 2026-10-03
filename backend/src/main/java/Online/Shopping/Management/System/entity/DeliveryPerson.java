package Online.Shopping.Management.System.entity;
import jakarta.persistence.Column;

import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;

import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;

import jakarta.persistence.Table;

import jakarta.validation.constraints.Email;

import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.NotNull;

import jakarta.validation.constraints.Size;

@Table(name = "delivery_persons")

@Entity
public class DeliveryPerson {
	@Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @NotBlank(message = "Name is required")

    private String name;

    @NotBlank(message = "Email is required")

    @Email(message = "Enter a valid email")

    @Column(unique = true)

    private String email;

    @NotBlank(message = "Password is required")

    @Size(min = 6, message = "Password must contain at least 6 characters")

    private String password;

    @NotNull(message = "Phone number is required")

    @Column(unique = true)

    private Long phone;

    private String status;

    public DeliveryPerson() {

        super();

    }

    public DeliveryPerson(String name, String email, String password,

                          Long phone, String status) {

        super();

        this.name = name;

        this.email = email;

        this.password = password;

        this.phone = phone;

        this.status = status;

    }

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

    public String getEmail() {

        return email;

    }

    public void setEmail(String email) {

        this.email = email;

    }

    public String getPassword() {

        return password;

    }

    public void setPassword(String password) {

        this.password = password;

    }

    public Long getPhone() {

        return phone;

    }

    public void setPhone(Long phone) {

        this.phone = phone;

    }

    public String getStatus() {

        return status;

    }

    public void setStatus(String status) {

        this.status = status;

    }

}


