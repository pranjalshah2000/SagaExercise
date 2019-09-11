import * as React from "react";
import { connect } from 'react-redux';

import { ProductData } from "../models/productmodel";
import { State } from '../reducers/index';
import { editProductAction } from "../actions";


interface Props {
  productsCollection: ProductData[];
  editProduct: (productData: ProductData) => void;
}


// export const ListProductsComponent = (props: Props) => (
class ListProductsComponent extends React.Component<Props, State> {

  editProduct = (p: ProductData) => {
    this.props.editProduct(p);
  }

  // (console.log(`In List Product Component ${JSON.stringify(props.productsCollection)}`)),
  render() {
    return (
      <div className="container">
        <h5>Received Products List:</h5>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <td>ProductRowId</td>
              <td>ProductId</td>
              <td>ProductName</td>
              <td>Manufacturer</td>
              <td>CategoryName</td>
              <td>Description</td>
              <td>BasePrice</td>
            </tr>
          </thead>
          <tbody>
            {this.props.productsCollection.map((p, i) => (
              <tr key={i} onClick={() => this.editProduct(p)}>
                <td>{p.ProductRowId}</td>
                <td>{p.ProductId}</td>
                <td>{p.ProductName}</td>
                <td>{p.Manufacturer}</td>
                <td>{p.CategoryName}</td>
                <td>{p.Description}</td>
                <td>{p.BasePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)
  }

}

const mapStateToProps = (state: State) => ({
  productsCollection: state.productsCollectionState.products
});

const mapDispatchToProps = (dispatch) => ({
  editProduct: (productData: ProductData) => dispatch(editProductAction(productData))
});

export const ListProductsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProductsComponent);
