package Online.Shopping.Management.System.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Online.Shopping.Management.System.dto.Userdto;
import Online.Shopping.Management.System.entity.Admin;
import Online.Shopping.Management.System.entity.DeliveryPerson;
import Online.Shopping.Management.System.entity.Order;
import Online.Shopping.Management.System.entity.Product;
import Online.Shopping.Management.System.entity.User;
import Online.Shopping.Management.System.exception.ResourceNotFoundException;
import Online.Shopping.Management.System.repository.AdminRepository;
import Online.Shopping.Management.System.repository.DeliveryPersonRepository;
import Online.Shopping.Management.System.repository.OrderRepository;
import Online.Shopping.Management.System.repository.ProductRepository;
import Online.Shopping.Management.System.repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private DeliveryPersonRepository deliveryPersonRepository;


    // =====================================================
    // ADMIN
    // =====================================================

    // SAVE ADMIN
    public Admin saveAdmin(Admin admin) {

        return adminRepository.save(admin);
    }


    // ADMIN LOGIN
    public Admin loginAdmin(String email, String password) {

        return adminRepository.findByEmailAndPassword(
                email,
                password
        );
    }


    // =====================================================
    // ADMIN DASHBOARD
    // =====================================================

    // TOTAL USERS
    public long getTotalUsers() {

        return userRepository.count();
    }


    // TOTAL PRODUCTS
    public long getTotalProducts() {

        return productRepository.count();
    }


    // TOTAL ORDERS
    public long getTotalOrders() {

        return orderRepository.count();
    }


    // TOTAL DELIVERIES
    public long getTotalDeliveries() {

        return orderRepository.countByStatus("DELIVERED");
    }


    // RECENT ORDERS
    public List<Order> getRecentOrders() {

        return orderRepository.findTop5ByOrderByIdDesc();
    }


    // =====================================================
    // USER MANAGEMENT
    // =====================================================

    // GET ALL USERS
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }


    // GET USER BY ID
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));
    }


    // UPDATE USER
    public User updateUser(
            Long id,
            Userdto userDTO) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));

        user.setName(userDTO.getName());

        user.setEmail(userDTO.getEmail());

        user.setPassword(userDTO.getPassword());

        user.setPhone(userDTO.getPhone());

        return userRepository.save(user);
    }


    // DELETE USER
    public User deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));

        userRepository.delete(user);

        return user;
    }


    // =====================================================
    // PRODUCT MANAGEMENT
    // =====================================================

    // GET ALL PRODUCTS
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }


    // GET PRODUCT BY ID
    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found"
                        ));
    }


    // SAVE PRODUCT
    public Product saveProduct(Product product) {

        return productRepository.save(product);
    }


    // UPDATE PRODUCT
    public Product updateProduct(
            Long id,
            Product productDetails) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found"
                        ));

        product.setName(
                productDetails.getName()
        );

        product.setDescription(
                productDetails.getDescription()
        );

        product.setPrice(
                productDetails.getPrice()
        );

        product.setQuantity(
                productDetails.getQuantity()
        );

        product.setImageUrl(
                productDetails.getImageUrl()
        );

        product.setColors(
                productDetails.getColors()
        );

        product.setCategory(
                productDetails.getCategory()
        );

        return productRepository.save(product);
    }


    // DELETE PRODUCT
    public Product deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found"
                        ));

        productRepository.delete(product);

        return product;
    }


    // =====================================================
    // ORDER MANAGEMENT
    // =====================================================

    // GET ALL ORDERS
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }


    // GET ORDER BY ID
    public Order getOrderById(Long id) {

        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found"
                        ));
    }


    // UPDATE ORDER STATUS
    public Order updateOrderStatus(
            Long id,
            String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found"
                        ));


        // Remove quotation marks if JSON string is sent
        if (status != null) {

            status = status.replace("\"", "");

        }


        order.setStatus(status);


        // =================================================
        // IF ORDER IS DELIVERED
        // MAKE DELIVERY PERSON AVAILABLE AGAIN
        // =================================================

        if ("DELIVERED".equalsIgnoreCase(status)) {

            DeliveryPerson deliveryPerson =
                    order.getDeliveryPerson();

            if (deliveryPerson != null) {

                deliveryPerson.setStatus("AVAILABLE");

                deliveryPersonRepository.save(
                        deliveryPerson
                );

            }

        }


        return orderRepository.save(order);
    }


    // DELETE ORDER
    public Order deleteOrder(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found"
                        ));

        orderRepository.delete(order);

        return order;
    }


    // =====================================================
    // ASSIGN DELIVERY PERSON
    // =====================================================

    public Order assignDeliveryPerson(
            Long orderId,
            Long deliveryPersonId) {


        // =================================================
        // FIND ORDER
        // =================================================

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found"
                        ));


        // =================================================
        // FIND NEW DELIVERY PERSON
        // =================================================

        DeliveryPerson newDeliveryPerson =
                deliveryPersonRepository
                        .findById(deliveryPersonId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Delivery person not found"
                                ));


        // =================================================
        // CHECK PREVIOUS DELIVERY PERSON
        // =================================================

        DeliveryPerson previousDeliveryPerson =
                order.getDeliveryPerson();


        // =================================================
        // IF SAME PERSON IS ALREADY ASSIGNED
        // =================================================

        if (previousDeliveryPerson != null
                && previousDeliveryPerson.getId()
                .equals(newDeliveryPerson.getId())) {

            newDeliveryPerson.setStatus("BUSY");

            deliveryPersonRepository.save(
                    newDeliveryPerson
            );

            return orderRepository.save(order);
        }


        // =================================================
        // IF ORDER WAS ASSIGNED TO SOMEONE ELSE BEFORE
        // MAKE OLD PERSON AVAILABLE
        // =================================================

        if (previousDeliveryPerson != null) {

            previousDeliveryPerson.setStatus(
                    "AVAILABLE"
            );

            deliveryPersonRepository.save(
                    previousDeliveryPerson
            );
        }


        // =================================================
        // ASSIGN NEW DELIVERY PERSON
        // =================================================

        order.setDeliveryPerson(
                newDeliveryPerson
        );


        // =================================================
        // CHANGE NEW PERSON STATUS TO BUSY
        // =================================================

        newDeliveryPerson.setStatus(
                "BUSY"
        );


        deliveryPersonRepository.save(
                newDeliveryPerson
        );


        // =================================================
        // SAVE ORDER
        // =================================================

        return orderRepository.save(order);
    }

}