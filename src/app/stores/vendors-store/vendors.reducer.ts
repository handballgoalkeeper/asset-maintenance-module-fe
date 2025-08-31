import {createReducer, on} from '@ngrx/store';
import VendorModel from '../../models/vendor.model';
import {setIsLoading, updateVendorsState} from './venors.actions';

export interface VendorsState {
  vendors: VendorModel[],
  loading: boolean,
  error: string | null
}

const initialState: VendorsState = {
  vendors: [],
  loading: false,
  error: null,
};

export const vendorsReducer = createReducer(
  initialState,
  on(
    updateVendorsState,
    (state, action) => ({...state, vendors: action.vendors })
  ),
  on(
    setIsLoading,
    (state, action) => ({...state, loading: action.isLoading})
  ),
);
