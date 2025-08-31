import {createAction, props} from '@ngrx/store';
import VendorModel from '../../models/vendor.model';

export const updateVendorsState = createAction(
  '[Vendors] Update',
  props<{ vendors: VendorModel[]}>()
);

export const setIsLoading = createAction(
  '[Vendors] SetIsLoading',
  props<{ isLoading: boolean }>()
);
