package Online.Shopping.Management.System.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import Online.Shopping.Management.System.dto.ResponseStructure;
import Online.Shopping.Management.System.dto.Userdto;
import Online.Shopping.Management.System.entity.Cart;
import Online.Shopping.Management.System.entity.User;
import Online.Shopping.Management.System.exception.ResourceNotFoundException;
import Online.Shopping.Management.System.repository.CartRepository;
import Online.Shopping.Management.System.repository.UserRepository;

@Service
public class Userservice {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;


    // =====================================================
    // SAVE USER
    // =====================================================

    @Transactional
    public ResponseStructure<User> saveUser(User user) {

        ResponseStructure<User> response =
                new ResponseStructure<>();


        // =================================================
        // CHECK PHONE
        // =================================================

        if (userRepository.existsByPhone(user.getPhone())) {

            response.setStatus("ERROR");

            response.setMessage(
                    "Phone number already registered"
            );

            response.setData(null);

            return response;
        }


        // =================================================
        // CHECK EMAIL
        // =================================================

        if (userRepository.existsByEmail(user.getEmail())) {

            response.setStatus("ERROR");

            response.setMessage(
                    "Email already registered"
            );

            response.setData(null);

            return response;
        }


        // =================================================
        // SAVE USER
        // =================================================

        User savedUser =
                userRepository.save(user);


        // =================================================
        // CREATE CART FOR NEW USER
        // =================================================

        Cart cart = new Cart();

        cart.setUser(savedUser);

        cartRepository.save(cart);


        // =================================================
        // SUCCESS RESPONSE
        // =================================================

        response.setStatus("SUCCESS");

        response.setMessage(
                "User and Cart saved successfully"
        );

        response.setData(savedUser);

        return response;
    }


    // =====================================================
    // LOGIN USER
    // =====================================================

    public User login(
            String email,
            String password) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid email or password"
                                )
                        );


        if (!user.getPassword().equals(password)) {

            throw new ResourceNotFoundException(
                    "Invalid email or password"
            );
        }


        return user;
    }


    // =====================================================
    // GET ALL USERS
    // =====================================================

    public List<User> getUsers() {

        return userRepository.findAll();
    }


    // =====================================================
    // GET USER BY ID
    // =====================================================

    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );
    }


    // =====================================================
    // UPDATE USER
    // =====================================================

    public User updateUser(
            Long id,
            Userdto userDTO) {

        User user =
                userRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                )
                        );


        user.setName(userDTO.getName());

        user.setEmail(userDTO.getEmail());

        user.setPassword(userDTO.getPassword());

        user.setPhone(userDTO.getPhone());


        return userRepository.save(user);
    }


    // =====================================================
    // DELETE USER
    // =====================================================

    public User deleteUserById(Long id) {

        User user =
                userRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                )
                        );


        userRepository.delete(user);

        return user;
    }
}