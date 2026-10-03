package Online.Shopping.Management.System.dto;

import jakarta.validation.constraints.NotNull;

public class Cartdto {

    private Long id;

    @NotNull(message = "User ID is required")
    private Long userId;

    public Cartdto() {
        super();
    }

    public Cartdto(Long id, Long userId) {
        super();
        this.id = id;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}