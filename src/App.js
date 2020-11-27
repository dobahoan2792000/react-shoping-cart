//1
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
  // sort === "lowest"
  //         ? a.price > b.price
  //           ? 1
  //           : -1
  //         : a.price < b.price
  //         ? 1
  //         : -1
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
  render() {
    return (
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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Sidebar</div>
          </div>
        </main>
        <footer>Footer</footer>
      </div>
    );
  }
}

export default App;
