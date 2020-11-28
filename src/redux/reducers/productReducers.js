const { FETCH_PRODUCTS } = require("../type");

const productReducers = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log("Reducers")
      return {
        items: action.payload,
      };

    default:
      return state;
  }
};
export default productReducers