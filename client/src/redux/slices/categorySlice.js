import { createSlice } from "@reduxjs/toolkit";
let category;
const gc = async () => {
  const request = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/category/get`
  );
  const response = await request.json();
  category = response.category;
};
gc();
const catSlice = createSlice({
  name: "category",
  initialState: { category },
  reducers: {
    addCategory: (state, { type, payload }) => {
      state.category?.push(payload.category);
    },
    deleteCategories: (state, { type, payload }) => {
      return {
        category: state.category.filter((obj) => obj.id !== payload.id),
      };
    },
  },
});

export default catSlice.reducer;
export const { deleteCategories, addCategory } = catSlice.actions;
