//1
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from './redux/store/index'
import { Provider } from "react-redux";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: "",
    };
  }
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    let alreadyInCart = false
    cartItems.forEach(item => {
      if(item._id === product._id)
      {
        item.count++
        alreadyInCart = true
      }
    });
    if(!alreadyInCart)
    {
      cartItems.push({...product,count : 1})
    }
    this.setState({
      cartItems : cartItems
    })
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    this.setState({
      cartItems: cartItems.filter(item => item._id !== product._id)
    })
    localStorage.setItem("cartItems",JSON.stringify(cartItems.filter(item => item._id !== product._id)))
  }
  sortProducts = (e) => {
    console.log(e.target.value , this.state.products)
    const sort = e.target.value;
    this.setState({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    });
  };
  filterProducts = (e) => {
    console.log(e.target.value);
    console.log("Products ", this.state.products);
    if (e.target.value === "All") {
      this.setState({
        size: e.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };
  createOrder = (order) => {
    alert("Need to save order for "+ order.name)
  }
  render() {
    
    return (
      <Provider store={store}>
        <div className="grid-container">
        <header>
          <a href="/">Header</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                sortProducts={this.sortProducts}
                filterProducts={this.filterProducts}
              />
              <Products products={this.state.products} addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}/>
            </div>
          </div>
        </main>
        <footer>Footer</footer>
      </div>
      </Provider>
    );
  }
}

export default App;
