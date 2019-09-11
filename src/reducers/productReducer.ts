import { BaseAction, actionIds } from '../common';
import { ProductData } from '../models/productmodel';

export type ProductsCollectionState = {
  products: Array<ProductData>,
  product: ProductData
};

// a pure function that accepts state and returns the state
export const productsCollectionReducer = (state:
  ProductsCollectionState = {
    products: new Array<ProductData>(),
    product: null
  }, action: BaseAction) => {

  switch (action.type) {
    case actionIds.GET_PRODUCTS_REQUEST_COMPLETED:
      return {
        ...state,
        products: action.payload
      }

    case actionIds.EDIT_PRODUCT_COMPLETED:
      return {
        ...state,
        product: action.payload
      }

    case actionIds.UPDATE_PRODUCT_COMPLETED:
      return {
        ...state,
        product: action.payload
      }
  }

  return state;
}
