type Data = {
  categoryName: string;
  categoryImage: File | null | string;
};
export const validate = (data: Data) => {
  const errors = {
    categoryName: "",
    categoryImage: "",
  };
  if (data.categoryName.length < 3) {
    errors.categoryName = "Category name must be 3 character at least";
  }

  if (!data.categoryImage) {
    errors.categoryImage = "Category image is required";
  }
  return errors;
};
