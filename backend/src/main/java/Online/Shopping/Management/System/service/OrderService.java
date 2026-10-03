package Online.Shopping.Management.System.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Online.Shopping.Management.System.dto.Buynowrequest;
import Online.Shopping.Management.System.dto.ResponseStructure;
import Online.Shopping.Management.System.entity.Order;
import Online.Shopping.Management.System.entity.Orderitem;
import Online.Shopping.Management.System.entity.Product;
import Online.Shopping.Management.System.entity.User;
import Online.Shopping.Management.System.exception.ResourceNotFoundException;
import Online.Shopping.Management.System.repository.OrderRepository;
import Online.Shopping.Management.System.repository.OrderitemRepository;
import Online.Shopping.Management.System.repository.ProductRepository;
import Online.Shopping.Management.System.repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderitemRepository orderitemRepository;


    // =====================================================
    // SAVE ORDER
    // =====================================================

    public ResponseStructure<Order> saveOrder(Order order) {

        Order savedOrder =
                orderRepository.save(order);

        ResponseStructure<Order> response =
                new ResponseStructure<>();

        response.setStatus("SUCCESS");

        response.setMessage(
                "Order saved successfully"
        );

        response.setData(savedOrder);

        return response;
    }


    // =====================================================
    // BUY NOW
    // =====================================================

    public ResponseStructure<Order> buyNow(
            Buynowrequest request) {


        // -------------------------------------------------
        // CHECK QUANTITY
        // -------------------------------------------------

        if (request.getQuantity() == null ||
            request.getQuantity() < 1) {

            throw new IllegalArgumentException(
                    "Quantity must be at least 1"
            );
        }


        // -------------------------------------------------
        // FIND USER
        // -------------------------------------------------

        User user =
                userRepository
                        .findById(request.getUserId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                )
                        );


        // -------------------------------------------------
        // FIND PRODUCT
        // -------------------------------------------------

        Product product =
                productRepository
                        .findById(request.getProductId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found"
                                )
                        );


        // -------------------------------------------------
        // CALCULATE TOTAL AMOUNT
        // -------------------------------------------------

        Double totalAmount =
                product.getPrice()
                       * request.getQuantity();


        // -------------------------------------------------
        // CREATE ORDER
        // -------------------------------------------------

        Order order =
                new Order();

        order.setTotalAmount(
                totalAmount
        );

        order.setStatus(
                "PLACED"
        );

        order.setUser(
                user
        );


        // -------------------------------------------------
        // SAVE ORDER
        // -------------------------------------------------

        Order savedOrder =
                orderRepository.save(order);


        // -------------------------------------------------
        // CREATE ORDER ITEM
        // -------------------------------------------------

        Orderitem orderitem =
                new Orderitem();

        orderitem.setQuantity(
                request.getQuantity()
        );

        orderitem.setPrice(
                product.getPrice()
        );

        orderitem.setOrders(
                savedOrder
        );

        orderitem.setProducts(
                product
        );


        // -------------------------------------------------
        // SAVE ORDER ITEM
        // -------------------------------------------------

        orderitemRepository.save(
                orderitem
        );


        // -------------------------------------------------
        // RESPONSE
        // -------------------------------------------------

        ResponseStructure<Order> response =
                new ResponseStructure<>();

        response.setStatus(
                "SUCCESS"
        );

        response.setMessage(
                "Order placed successfully"
        );

        response.setData(
                savedOrder
        );

        return response;
    }


    // =====================================================
    // GET ALL ORDERS
    // =====================================================

    public ResponseStructure<List<Order>> getOrders() {

        List<Order> orders =
                orderRepository.findAll();


        ResponseStructure<List<Order>> response =
                new ResponseStructure<>();

        response.setStatus(
                "SUCCESS"
        );

        response.setMessage(
                "Orders fetched successfully"
        );

        response.setData(
                orders
        );

        return response;
    }


    // =====================================================
    // GET ORDER BY ID
    // =====================================================

    public ResponseStructure<Order> getOrderById(
            Long id) {

        Order order =
                orderRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found"
                                )
                        );


        ResponseStructure<Order> response =
                new ResponseStructure<>();

        response.setStatus(
                "SUCCESS"
        );

        response.setMessage(
                "Order found"
        );

        response.setData(
                order
        );

        return response;
    }


    // =====================================================
    // UPDATE ORDER
    // =====================================================

    public ResponseStructure<Order> updateOrder(
            Long id,
            Order order) {


        Order existingOrder =
                orderRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found"
                                )
                        );


        existingOrder.setTotalAmount(
                order.getTotalAmount()
        );

        existingOrder.setStatus(
                order.getStatus()
        );

        existingOrder.setUser(
                order.getUser()
        );


        Order updatedOrder =
                orderRepository.save(
                        existingOrder
                );


        ResponseStructure<Order> response =
                new ResponseStructure<>();

        response.setStatus(
                "SUCCESS"
        );

        response.setMessage(
                "Order updated successfully"
        );

        response.setData(
                updatedOrder
        );

        return response;
    }


    // =====================================================
    // DELETE ORDER
    // =====================================================

    public ResponseStructure<Order> deleteOrderById(
            Long id) {


        Order order =
                orderRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found"
                                )
                        );


        orderRepository.delete(
                order
        );


        ResponseStructure<Order> response =
                new ResponseStructure<>();

        response.setStatus(
                "SUCCESS"
        );

        response.setMessage(
                "Order deleted successfully"
        );

        response.setData(
                order
        );

        return response;
    }
}