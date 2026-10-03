package Online.Shopping.Management.System.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import Online.Shopping.Management.System.dto.ResponseStructure;

import Online.Shopping.Management.System.entity.Category;
import Online.Shopping.Management.System.exception.ResourceNotFoundException;
import Online.Shopping.Management.System.repository.CategoryRepository;

@Service

public class CategoryService {
	@Autowired

    private CategoryRepository categoryRepository;

    // SAVE

    public ResponseStructure<Category> saveCategory(Category category) {

        Category savedCategory = categoryRepository.save(category);

        ResponseStructure<Category> response = new ResponseStructure<>();

        response.setStatus("SUCCESS");

        response.setMessage("Category saved successfully");

        response.setData(savedCategory);

        return response;

    }

    // GET ALL

    public ResponseStructure<List<Category>> getCategories() {

        List<Category> categories = categoryRepository.findAll();

        ResponseStructure<List<Category>> response =

                new ResponseStructure<>();

        response.setStatus("SUCCESS");

        response.setMessage("Categories fetched successfully");

        response.setData(categories);

        return response;

    }

    // GET BY ID

    public ResponseStructure<Category> getCategoryById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        ResponseStructure<Category> response = new ResponseStructure<>();

        response.setStatus("SUCCESS");
        response.setMessage("Category found");
        response.setData(category);

        return response;
    }

    // UPDATE

    public ResponseStructure<Category> updateCategory(Long id, Category category) {

        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        existingCategory.setName(category.getName());

        Category updatedCategory = categoryRepository.save(existingCategory);

        ResponseStructure<Category> response = new ResponseStructure<>();

        response.setStatus("SUCCESS");
        response.setMessage("Category updated successfully");
        response.setData(updatedCategory);

        return response;
    }
    // DELETE

    public ResponseStructure<Category> deleteCategoryById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        categoryRepository.delete(category);

        ResponseStructure<Category> response = new ResponseStructure<>();

        response.setStatus("SUCCESS");
        response.setMessage("Category deleted successfully");
        response.setData(category);

        return response;
    }
    }


	
	