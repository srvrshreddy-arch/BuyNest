package Online.Shopping.Management.System.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import Online.Shopping.Management.System.dto.Userdto;
import Online.Shopping.Management.System.entity.Admin;
import Online.Shopping.Management.System.entity.Order;
import Online.Shopping.Management.System.entity.Product;
import Online.Shopping.Management.System.entity.User;
import Online.Shopping.Management.System.service.AdminService;

@RestController
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;


    // =====================================================
    // ADMIN
    // =====================================================

    // SAVE ADMIN
    @PostMapping("/saveAdmin")
    public Admin saveAdmin(
            @RequestBody Admin admin) {

        return adminService.saveAdmin(admin);
    }


    // ADMIN LOGIN
    @PostMapping("/loginAdmin")
    public Admin loginAdmin(
            @RequestBody Admin admin) {

        return adminService.loginAdmin(
                admin.getEmail(),
                admin.getPassword()
        );
    }


    // =====================================================
    // ADMIN DASHBOARD
    // =====================================================

    // TOTAL USERS
    @GetMapping("/admin/totalUsers")
    public long getTotalUsers() {

        return adminService.getTotalUsers();
    }


    // TOTAL PRODUCTS
    @GetMapping("/admin/totalProducts")
    public long getTotalProducts() {

        return adminService.getTotalProducts();
    }


    // TOTAL ORDERS
    @GetMapping("/admin/totalOrders")
    public long getTotalOrders() {

        return adminService.getTotalOrders();
    }


    // TOTAL DELIVERIES
    @GetMapping("/admin/totalDeliveries")
    public long getTotalDeliveries() {

        return adminService.getTotalDeliveries();
    }


    // RECENT ORDERS
    @GetMapping("/admin/recentOrders")
    public List<Order> getRecentOrders() {

        return adminService.getRecentOrders();
    }


    // =====================================================
    // USER MANAGEMENT
    // =====================================================

    // GET ALL USERS
    @GetMapping("/admin/users")
    public List<User> getAllUsers() {

        return adminService.getAllUsers();
    }


    // GET USER BY ID
    @GetMapping("/admin/users/{id}")
    public User getUserById(
            @PathVariable Long id) {

        return adminService.getUserById(id);
    }


    // UPDATE USER
    @PutMapping("/admin/users/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody Userdto userDTO) {

        return adminService.updateUser(
                id,
                userDTO
        );
    }


    // DELETE USER
    @DeleteMapping("/admin/users/{id}")
    public User deleteUser(
            @PathVariable Long id) {

        return adminService.deleteUser(id);
    }


    // =====================================================
    // PRODUCT MANAGEMENT
    // =====================================================

    // GET ALL PRODUCTS
    @GetMapping("/admin/products")
    public List<Product> getAllProducts() {

        return adminService.getAllProducts();
    }


    // GET PRODUCT BY ID
    @GetMapping("/admin/products/{id}")
    public Product getProductById(
            @PathVariable Long id) {

        return adminService.getProductById(id);
    }


    // ADD PRODUCT
    @PostMapping("/admin/products")
    public Product saveProduct(
            @RequestBody Product product) {

        return adminService.saveProduct(product);
    }


    // UPDATE PRODUCT
    @PutMapping("/admin/products/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        return adminService.updateProduct(
                id,
                product
        );
    }


    // DELETE PRODUCT
    @DeleteMapping("/admin/products/{id}")
    public Product deleteProduct(
            @PathVariable Long id) {

        return adminService.deleteProduct(id);
    }


    // =====================================================
    // ORDER MANAGEMENT
    // =====================================================

    // GET ALL ORDERS
    @GetMapping("/admin/orders")
    public List<Order> getAllOrders() {

        return adminService.getAllOrders();
    }


    // GET ORDER BY ID
    @GetMapping("/admin/orders/{id}")
    public Order getOrderById(
            @PathVariable Long id) {

        return adminService.getOrderById(id);
    }


    // UPDATE ORDER STATUS
    @PutMapping("/admin/orders/{id}/status")
    public Order updateOrderStatus(
            @PathVariable Long id,
            @RequestBody String status) {

        return adminService.updateOrderStatus(
                id,
                status
        );
    }


    // DELETE ORDER
    @DeleteMapping("/admin/orders/{id}")
    public Order deleteOrder(
            @PathVariable Long id) {

        return adminService.deleteOrder(id);
    }


    // =====================================================
    // DELIVERY MANAGEMENT
    // =====================================================

    // ASSIGN ORDER TO DELIVERY PERSON
    @PutMapping(
            "/admin/orders/{orderId}/assign/{deliveryPersonId}"
    )
    public Order assignDeliveryPerson(
            @PathVariable Long orderId,
            @PathVariable Long deliveryPersonId) {

        return adminService.assignDeliveryPerson(
                orderId,
                deliveryPersonId
        );
    }

}