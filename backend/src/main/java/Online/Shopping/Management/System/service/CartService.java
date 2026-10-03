package Online.Shopping.Management.System.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import Online.Shopping.Management.System.dto.ResponseStructure;

import Online.Shopping.Management.System.entity.Cart;
import Online.Shopping.Management.System.exception.ResourceNotFoundException;
import Online.Shopping.Management.System.repository.CartRepository;

@Service
public class CartService {
	@Autowired

    private CartRepository cartRepository;

    // SAVE

    public ResponseStructure<Cart> saveCart(Cart cart) {

        Cart savedCart = cartRepository.save(cart);

        ResponseStructure<Cart> response = new ResponseStructure<>();

        response.setStatus("SUCCESS");

        response.setMessage("Cart saved successfully");

        response.setData(savedCart);

        return response;

    }

    // GET ALL

    public ResponseStructure<List<Cart>> getCarts() {

        List<Cart> carts = cartRepository.findAll();

        ResponseStructure<List<Cart>> response =

                new ResponseStructure<>();

        response.setStatus("SUCCESS");

        response.setMessage("Carts fetched successfully");

        response.setData(carts);

        return response;

    }

    // GET BY ID

    public ResponseStructure<Cart> getCartById(Long id) {

        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        ResponseStructure<Cart> response = new ResponseStructure<>();

        response.setStatus("SUCCESS");
        response.setMessage("Cart found");
        response.setData(cart);

        return response;
    }

    // UPDATE

    public ResponseStructure<Cart> updateCart(Long id, Cart cart) {

        Cart existingCart = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        existingCart.setUser(cart.getUser());

        Cart updatedCart = cartRepository.save(existingCart);

        ResponseStructure<Cart> response = new ResponseStructure<>();

        response.setStatus("SUCCESS");
        response.setMessage("Cart updated successfully");
        response.setData(updatedCart);

        return response;
    }

    // DELETE

    public ResponseStructure<Cart> deleteCartById(Long id) {

        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        cartRepository.delete(cart);

        ResponseStructure<Cart> response = new ResponseStructure<>();

        response.setStatus("SUCCESS");
        response.setMessage("Cart deleted successfully");
        response.setData(cart);

        return response;
    }
}
	
	


