import { createSlice } from "@reduxjs/toolkit";

const gp = async () => {
  const request = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/product/get`
  );
  const response = await request.json();
  return response.products;
};

const initialState = { products: await gp() };
export const postSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, { type, payload }) {
      state.products.push(payload.product);
      // return { products: [...state.productSlice.products,payload.product] };
    },
    deleteProducts(state, { type, payload }) {
      return {
        products: state.products.filter(
          (obj) =>  !payload.id.includes(obj.id)
        ),
      };
    },
  },
});

export default postSlice.reducer;

export const { addProducts, deleteProducts } = postSlice.actions;
