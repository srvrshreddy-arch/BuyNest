package Online.Shopping.Management.System.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import Online.Shopping.Management.System.dto.Cartitemdto;
import Online.Shopping.Management.System.entity.Cart;
import Online.Shopping.Management.System.entity.Cartitem;
import Online.Shopping.Management.System.entity.Product;
import Online.Shopping.Management.System.entity.User;
import Online.Shopping.Management.System.exception.ResourceNotFoundException;
import Online.Shopping.Management.System.repository.CartRepository;
import Online.Shopping.Management.System.repository.CartitemRepository;
import Online.Shopping.Management.System.repository.ProductRepository;
import Online.Shopping.Management.System.repository.UserRepository;

@Service
public class CartitemService {

    @Autowired
    private CartitemRepository cartitemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;


    // =====================================================
    // SAVE CART ITEM
    // =====================================================

    @Transactional
    public Cartitem saveCartitem(Cartitemdto dto) {

        // =================================================
        // CHECK USER
        // =================================================

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: "
                                        + dto.getUserId()
                        )
                );


        // =================================================
        // FIND CART BY USER
        // =================================================

        Cart cart = cartRepository.findByUser_Id(user.getId())
                .orElse(null);


        // =================================================
        // CREATE CART AUTOMATICALLY IF NOT EXISTS
        // =================================================

        if (cart == null) {

            cart = new Cart();

            cart.setUser(user);

            cart = cartRepository.save(cart);
        }


        // =================================================
        // FIND PRODUCT
        // =================================================

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: "
                                        + dto.getProductId()
                        )
                );


        // =================================================
        // CREATE CART ITEM
        // =================================================

        Cartitem cartitem = new Cartitem();

        cartitem.setQuantity(dto.getQuantity());

        cartitem.setCart(cart);

        cartitem.setProduct(product);


        return cartitemRepository.save(cartitem);
    }


    // =====================================================
    // GET ALL CART ITEMS
    // =====================================================

    public List<Cartitem> getAllCartitems() {

        return cartitemRepository.findAll();
    }


    // =====================================================
    // GET CART ITEMS BY USER
    // =====================================================

    public List<Cartitem> getCartitemsByUser(Long userId) {

        return cartitemRepository.findByCart_User_Id(userId);
    }


    // =====================================================
    // GET CART ITEM BY ID
    // =====================================================

    public Cartitem getCartitemById(Long id) {

        return cartitemRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cartitem not found with id: "
                                        + id
                        )
                );
    }


    // =====================================================
    // UPDATE CART ITEM
    // =====================================================

    @Transactional
    public Cartitem updateCartitem(
            Long id,
            Cartitemdto dto) {

        // =================================================
        // FIND EXISTING CART ITEM
        // =================================================

        Cartitem existing =
                cartitemRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Cartitem not found with id: "
                                                + id
                                )
                        );


        // =================================================
        // FIND USER
        // =================================================

        User user =
                userRepository.findById(dto.getUserId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found with id: "
                                                + dto.getUserId()
                                )
                        );


        // =================================================
        // FIND CART
        // =================================================

        Cart cart =
                cartRepository.findByUser_Id(user.getId())
                        .orElse(null);


        // =================================================
        // CREATE CART IF NOT EXISTS
        // =================================================

        if (cart == null) {

            cart = new Cart();

            cart.setUser(user);

            cart = cartRepository.save(cart);
        }


        // =================================================
        // FIND PRODUCT
        // =================================================

        Product product =
                productRepository.findById(dto.getProductId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                                + dto.getProductId()
                                )
                        );


        // =================================================
        // UPDATE
        // =================================================

        existing.setQuantity(dto.getQuantity());

        existing.setCart(cart);

        existing.setProduct(product);


        return cartitemRepository.save(existing);
    }


    // =====================================================
    // DELETE CART ITEM
    // =====================================================

    public void deleteCartitem(Long id) {

        Cartitem cartitem =
                cartitemRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Cartitem not found with id: "
                                                + id
                                )
                        );


        cartitemRepository.delete(cartitem);
    }
}