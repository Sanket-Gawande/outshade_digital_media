import { createSlice } from "@reduxjs/toolkit";
const gc = async () => {
  const request = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/category/get`
  );
  const response = await request.json();
  return response.category;
};
const catSlice = createSlice({
  name: "category",
  initialState: { category: await gc() },
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
