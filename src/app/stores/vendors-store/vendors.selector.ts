import {createFeatureSelector} from '@ngrx/store';
import {VendorsState} from './vendors.reducer';

export const selectVendorsState = createFeatureSelector<VendorsState>('vendors');
