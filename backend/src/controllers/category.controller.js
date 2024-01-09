import { ApiError } from "../utlis/ApiError";
import { ApiResponse } from "../utlis/ApiResponse";
import { asyncHandler } from "../utlis/AsyncHander";



const createCategory=asyncHandler(async (req,res)=>{
    const { name, description } = req.body;

  if (!name) {
    throw new ApiError(400, "Category name is required");
  }

  const newCategory = await Category.create({
    name,
    description,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      { category: newCategory },
      "Category created successfully"
    )
  );
})

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
  
    return res.status(200).json(
      new ApiResponse(
        200,
        { categories: categories },
        "Categories fetched successfully"
      )
    );
  });

const getCategoryDetails = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
  
    const category = await Category.findById(categoryId);
  
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
  
    return res.status(200).json(
      new ApiResponse(200, { category: category }, "Category details fetched successfully")
    );
  });

  const updateCategory = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const { name, description } = req.body;
  
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: {
          name: name,
          description: description,
        },
      },
      { new: true }
    );
  
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
  
    return res.status(200).json(
      new ApiResponse(
        200,
        { category: category },
        "Category updated successfully"
      )
    );
  });

  const deleteCategory = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
  
    const category = await Category.findByIdAndDelete(categoryId);
  
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
  
    return res.status(200).json(
      new ApiResponse(200, {}, "Category deleted successfully")
    );
  });
  
  export {
    createCategory,
    getAllCategories,
    getCategoryDetails,
    updateCategory,
    deleteCategory,
  };