import { FETCH_PRODUCTS } from "../type";

export const fetchActions = () => async (dispatch) => {
  console.log("Actions")
  const res = await fetch("/api/products");
  const data = await res.json()
  dispatch({ type: FETCH_PRODUCTS, payload: data });
};
