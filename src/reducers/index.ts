import { combineReducers} from 'redux';
import { productsCollectionReducer,ProductsCollectionState } from './productReducer';
productsCollectionReducer
export interface State {
  productsCollectionState : ProductsCollectionState;
};

export const reducers = combineReducers<State>({
    productsCollectionState: productsCollectionReducer
});
