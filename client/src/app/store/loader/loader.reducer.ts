import {on, createReducer, Action} from '@ngrx/store';
import {showLoader, stopLoader} from './loader.actions';

export const initialState = false;

// tslint:disable-next-line: variable-name
const _loadingReducer = createReducer(initialState,
    on(showLoader, state => state = true),
    on(stopLoader, state => state = false)

);


export function loadingReducer(state: boolean, action: Action ) {
    return _loadingReducer(state, action);
}
