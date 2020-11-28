import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "../type";

export const fetchActions = () => async (dispatch) => {
  console.log("Actions");
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch({ type: FETCH_PRODUCTS, payload: data });
};
export const filterActions = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter(
              (product) => product.availableSizes.indexOf(size) >= 0
            ),
    },
  });
};
export const sortActions = (filterProducts, sort) => (dispatch) => {
  const sortedProducts = filterProducts.slice();
  if (sort === "") {
    sortedProducts.sort((a, b) => (a._id > b.id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price < b.price
        ? 1
        : -1
    );
  }
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
