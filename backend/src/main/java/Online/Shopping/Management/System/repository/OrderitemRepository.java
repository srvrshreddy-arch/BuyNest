package Online.Shopping.Management.System.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import Online.Shopping.Management.System.entity.Orderitem;
public interface OrderitemRepository extends JpaRepository<Orderitem, Long>{
	

}
