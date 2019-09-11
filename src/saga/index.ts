// operators to manage all async calls and provide response from async call
// as per demanded by the application
// call: initiate the sync operation for execution
// put: define subscription to the async call for the 'resolve' or 'reject'
// takeEvery: Read the complete response e.d select * from Table1
// fork: activating the subscription for the SAGA client
import { call, put, takeEvery, all, fork, take } from 'redux-saga/effects';
import { getData, putData, postData } from '../services/httpservice';
import { productsRequestCompletedAction, editProductCompletedAction, productUpdateCompletedAction } from '../actions/index';
import { actionIds } from '../common/index';
import { ProductData } from '../models/productmodel';

// ES 6 Generator
export const rootSaga = function* root() {
  yield all([
    fork(watchProductRequestStart),
  ])
}

// defining watchers
function* watchProductRequestStart() {
  yield takeEvery(actionIds.GET_PRODUCTS_REQUEST_START, requestProducts);
  yield takeEvery(actionIds.EDIT_PRODUCT, editProduct);
  yield takeEvery(actionIds.UPDATE_PRODUCT, updateProduct);
  yield takeEvery(actionIds.SAVE_PRODUCT, saveProduct);
}

// get list of product
function* requestProducts() {
  const products: Array<ProductData> = yield call(getData);
  yield put(productsRequestCompletedAction(products))
}

// updating 'product' property of state of Product reducer 
function* editProduct() {
  const data = yield take(actionIds.EDIT_PRODUCT);
  yield put(editProductCompletedAction(data.payload))
}

// updating product and fetching the updated product list
function* updateProduct() {
  const data = yield take(actionIds.UPDATE_PRODUCT);
  yield call(putData, data.payload.ProductRowId, data.payload);

  yield put(productUpdateCompletedAction());

  const products: Array<ProductData> = yield call(getData);
  yield put(productsRequestCompletedAction(products))
}

// creating new product and fetching the updated product list
function* saveProduct() {
  const data = yield take(actionIds.SAVE_PRODUCT);
  yield call(postData, data.payload);

  const products: Array<ProductData> = yield call(getData);
  yield put(productsRequestCompletedAction(products))
}
