import React, { Component } from "react";
import { filterActions, sortActions } from "../redux/actions/productActions";
import { connect } from "react-redux";
class Filter extends Component {
  render() {
    return !this.props.filterProducts ? (
      <div>Loading...</div>
    ) : (
      <div className="filter">
        <div className="filter-result">
          {this.props.products.length} Products
        </div>
        <div className="filter-sort">
          Order{" "}
          <select value={this.props.sort} onChange={(e) => this.props.sortActions(this.props.filterProducts,e.target.value)}>
            <option>Lastest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-size">
          Size{" "}
          <select value={this.props.size} onChange={(e) =>  this.props.filterActions(this.props.products,e.target.value)}>
            <option value="">All</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filterProducts: state.products.filteredItems,
  }),
  {
    filterActions,
    sortActions,
  }
)(Filter);
