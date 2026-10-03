package Online.Shopping.Management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Online.Shopping.Management.System.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Admin findByEmailAndPassword(String email, String password);

}