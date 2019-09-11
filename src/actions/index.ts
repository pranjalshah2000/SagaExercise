import { BaseAction, actionIds } from '../common';
import { ProductData } from '../models/productmodel';

export const productsRequestStartAction: () => BaseAction = () => ({
  type: actionIds.GET_PRODUCTS_REQUEST_START,
  payload: null,
});

export const productsRequestCompletedAction: (p: ProductData[]) => BaseAction = (productsReceived) => (
  {
    type: actionIds.GET_PRODUCTS_REQUEST_COMPLETED,
    payload: productsReceived,
  });

export const editProductAction: (productData: ProductData) => BaseAction = (productData: ProductData) => ({
  type: actionIds.EDIT_PRODUCT,
  payload: productData,
});

export const editProductCompletedAction: (p: ProductData) => BaseAction = (productsReceived) => (
  {
    type: actionIds.EDIT_PRODUCT_COMPLETED,
    payload: productsReceived,
  });

export const productUpdateAction: (productData: ProductData) => BaseAction = (productData: ProductData) => ({
  type: actionIds.UPDATE_PRODUCT,
  payload: productData,
});

export const productUpdateCompletedAction: () => BaseAction = () => (
  {
    type: actionIds.UPDATE_PRODUCT_COMPLETED,
    payload: null,
  });

export const productSaveAction: (productData: ProductData) => BaseAction = (productData: ProductData) => ({
  type: actionIds.SAVE_PRODUCT,
  payload: productData,
});

