package Online.Shopping.Management.System.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Online.Shopping.Management.System.entity.Order;
import Online.Shopping.Management.System.entity.Orderitem;
import Online.Shopping.Management.System.entity.Product;
import Online.Shopping.Management.System.exception.ResourceNotFoundException;
import Online.Shopping.Management.System.repository.OrderRepository;
import Online.Shopping.Management.System.repository.OrderitemRepository;
import Online.Shopping.Management.System.repository.ProductRepository;

@Service
public class OrderitemService {

    @Autowired
    private OrderitemRepository orderitemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;


    // SAVE

    public Orderitem saveOrderitem(Orderitem orderitem) {

        Order order = orderRepository
                .findById(orderitem.getOrders().getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        Product product = productRepository
                .findById(orderitem.getProducts().getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        orderitem.setOrders(order);
        orderitem.setProducts(product);

        return orderitemRepository.save(orderitem);
    }


    // GET ALL

    public List<Orderitem> getAllOrderitems() {

        return orderitemRepository.findAll();
    }


    // GET BY ID

    public Orderitem getOrderitemById(Long id) {

        return orderitemRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Orderitem not found with id: " + id
                        ));
    }


    // UPDATE

    public Orderitem updateOrderitem(Long id, Orderitem orderitem) {

        Orderitem existing = orderitemRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Orderitem not found"
                        ));

        existing.setQuantity(orderitem.getQuantity());
        existing.setPrice(orderitem.getPrice());

        Order order = orderRepository
                .findById(orderitem.getOrders().getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found"
                        ));

        Product product = productRepository
                .findById(orderitem.getProducts().getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found"
                        ));

        existing.setOrders(order);
        existing.setProducts(product);

        return orderitemRepository.save(existing);
    }


    // DELETE

    public void deleteOrderitem(Long id) {

        Orderitem orderitem = orderitemRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Orderitem not found"
                        ));

        orderitemRepository.delete(orderitem);
    }
}