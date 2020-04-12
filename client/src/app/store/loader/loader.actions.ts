import {createAction} from '@ngrx/store';

export const LoaderActionsTypes = Object.freeze({
    showLoading: 'showLoading',
    stopLoading: 'stopLoading'
});

export const showLoader = createAction(LoaderActionsTypes.showLoading);
export const stopLoader = createAction(LoaderActionsTypes.stopLoading);
