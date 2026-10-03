package Online.Shopping.Management.System.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Online.Shopping.Management.System.entity.Cartitem;

public interface CartitemRepository extends JpaRepository<Cartitem, Long> {

    List<Cartitem> findByCart_User_Id(Long userId);

}