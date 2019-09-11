export const actionIds = {
  GET_PRODUCTS_REQUEST_START: 'Request For Products',
  GET_PRODUCTS_REQUEST_COMPLETED: 'Products are returned',
  EDIT_PRODUCT: 'Edit Product',
  EDIT_PRODUCT_COMPLETED: 'Edit Product Completed',
  UPDATE_PRODUCT: 'Update Product',
  UPDATE_PRODUCT_COMPLETED: 'Update Product Completed',
  SAVE_PRODUCT: 'Save Product'
}

export interface BaseAction {
  type: string;
  payload: any;
}
