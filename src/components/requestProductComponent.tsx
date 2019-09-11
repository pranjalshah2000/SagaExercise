import * as React from "react";
import { connect } from "react-redux";
import { State } from "../reducers/index";
import { productsRequestStartAction, productSaveAction, productUpdateAction } from "../actions/index";
import { ProductData } from "../models/productmodel";

interface Props {
  onRequestProducts: () => void;
  saveProduct: (productData: ProductData) => void;
  updateProduct: (productData: ProductData) => void;
  editedProduct: ProductData;
  products: Array<ProductData>;
}

interface OptionComponentProps {
  optValue?: string;
}

export interface ProductsRequestComponentState {
  ProductRowId: number;
  ProductId: string;
  ProductName: string;
  Manufacturer: string;
  CategoryName: string;
  BasePrice: number;
  Manufacturers: Array<string>;
  Categories: Array<string>;
  Product: ProductData;
  Products: Array<ProductData>;
  // the tuple that will read the 'name' attribute base keys matched with state keys
  // key: The name of the state key
  // any: is the type of the key
  [key: string]: any;
}

class ProductsRequestComponent extends React.Component<Props, ProductsRequestComponentState> {
  // the state instance type
  state: ProductsRequestComponentState = {
    ProductRowId: 0,
    ProductId: "",
    ProductName: "",
    Manufacturer: "",
    CategoryName: "",
    Description: "",
    BasePrice: 0,
    Manufacturers: ["HP", "Bajaj", "Parle"],
    Categories: ["Electronics", "Electrical", "Food"],
    Product: new ProductData(0, "", "", "", "", "", 0),
    Products: new Array<ProductData>()
  };

  clear = () => {
    if (this.props.products && this.props.products.length > 0) {
      const product: ProductData = this.props.products[this.props.products.length - 1];
      this.setState({ ProductRowId: product.ProductRowId + 1 });
    } else {
      this.setState({ ProductRowId: 0 });
    }

    this.setState({ ProductId: "" });
    this.setState({ ProductName: "" });
    this.setState({ Manufacturer: "" });
    this.setState({ CategoryName: "" });
    this.setState({ Description: "" });
    this.setState({ BasePrice: 0 });
  };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.onRequestProducts();
    console.log(`Received data : ${JSON.stringify(this.state.Products)}`);
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (nextProps.editedProduct) {
      this.setState({
        ProductRowId: nextProps.editedProduct.ProductRowId,
        ProductId: nextProps.editedProduct.ProductId,
        ProductName: nextProps.editedProduct.ProductName,
        Manufacturer: nextProps.editedProduct.Manufacturer,
        CategoryName: nextProps.editedProduct.CategoryName,
        BasePrice: nextProps.editedProduct.BasePrice,
        Description: nextProps.editedProduct.Description
      });
    }
    else {
      const product: ProductData = nextProps.products[nextProps.products.length - 1];

      this.setState({
        ProductRowId: product.ProductRowId + 1,
        ProductId: '',
        ProductName: '',
        Manufacturer: '',
        CategoryName: '',
        Description: '',
        BasePrice: 0
      });
    }
  }

  // common change method for all editable elements
  handleChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    // reading name of the element
    const name = evt.target.name as string;
    // the State Object that will be used to read new Value default is empty
    const newValue: Partial<ProductsRequestComponentState> = {};
    // set the new value based on value entered in target element
    newValue[name] = evt.target.value;
    // finally set state
    this.setState(newValue);

  };

  getProductItemIndex() {
    let tempArray = this.props.products.slice();
    const product = tempArray.find(x => { return x.ProductRowId === this.state.ProductRowId });
    return tempArray.indexOf(product);
  }

  save = (evt: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    let tempArray = this.props.products.slice();
    const editIndexIndex: number = this.getProductItemIndex();
    let prd: ProductData = editIndexIndex === -1 ? new ProductData(0, '', '', '', '', '', 0) : tempArray[editIndexIndex];

    prd.ProductRowId = this.state.ProductRowId;
    prd.ProductId = this.state.ProductId;
    prd.ProductName = this.state.ProductName;
    prd.Manufacturer = this.state.Manufacturer;
    prd.CategoryName = this.state.CategoryName;
    prd.BasePrice = this.state.BasePrice;
    prd.Description = this.state.Description;

    if (editIndexIndex !== -1) {
      this.props.updateProduct(prd);
    }
    else {
      this.props.saveProduct(prd);
    }

  };

  render() {
    return (
      <div className="container">
        <h2>The Product Component</h2>

        <div className="form-group">
          <label htmlFor="ProductRowId">ProductRowId</label>
          <input
            type="text"
            name="ProductRowId"
            className="form-control"
            value={this.state.ProductRowId}
            onChange={this.handleChange}
            disabled={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductId">ProductId</label>
          <input
            type="text"
            name="ProductId"
            onChange={this.handleChange}
            className="form-control"
            value={this.state.ProductId}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductName">ProductName</label>
          <input
            type="text"
            name="ProductName"
            onChange={this.handleChange}
            className="form-control"
            value={this.state.ProductName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            name="Description"
            onChange={this.handleChange}
            className="form-control"
            value={this.state.Description}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Manufacturer">Manufacturer</label>
          <select
            className="form-control"
            onChange={this.handleChange}
            name="Manufacturer"
            value={this.state.Manufacturer}
          >
            <option>Select Manufacturer</option>
            {this.state.Manufacturers.map((v, i) => (
              <OptionComponent key={i} optValue={v} />
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="CategoryName">CategoryName</label>
          <select
            className="form-control"
            onChange={this.handleChange}
            name="CategoryName"
            value={this.state.CategoryName}
          >
            <option>Select Category</option>
            {this.state.Categories.map((v, i) => (
              <OptionComponent key={i} optValue={v} />
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="BasePrice">BasePrice</label>
          <input
            type="text"
            name="BasePrice"
            onChange={this.handleChange}
            className="form-control"
            value={this.state.BasePrice}
          />
        </div>
        <div className="form-group">
          <input
            type="button"
            value="Clear"
            onClick={this.clear}
            className="btn btn-warning"
          />
          <input
            type="button"
            value="Save"
            onClick={this.save}
            className="btn btn-success m-2"
          />
        </div>
        <hr />
      </div>
    );
  }
}

// define an OptionComponent for Reusability
class OptionComponent extends React.Component<OptionComponentProps, State> {
  render() {
    return <option value={this.props.optValue}>{this.props.optValue}</option>;
  }
}

// mapping state to props 
const mapStateToProps = (state: State) => ({
  editedProduct: state.productsCollectionState.product,
  products: state.productsCollectionState.products
});

// map actions to be dispatched from current component to props types
const mapDispatchToProps = dispatch => ({
  onRequestProducts: () => dispatch(productsRequestStartAction()),
  updateProduct: (productData: ProductData) => dispatch(productUpdateAction(productData)),
  saveProduct: (productData: ProductData) => dispatch(productSaveAction(productData))
});

// connect the props/states map witht the "STATE" object from redux to react component
export const ProductRequestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsRequestComponent);
