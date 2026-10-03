package Online.Shopping.Management.System.dto;

import jakarta.validation.constraints.NotBlank;

public class Categorydto {

    @NotBlank(message = "Category name is required")
    private String name;

    public Categorydto() {
        super();
    }

    public Categorydto(String name) {
        super();
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}