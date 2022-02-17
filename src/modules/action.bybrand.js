/** @format */

import {
    set_start_loading,
    set_stop_loading,
    set_product_by_brand,
    set_product_count,
    reset_products
} from './reducer.bybrand';
import {
    getProductByBrand
} from '../services/service.bycategory.js';

import { OPEN_GET_CONFIG } from '../constant/header';

export const fetch_ProductByBrand = (id = 0, page = 1) => {
    return async (dispatch) => {
        dispatch(set_start_loading());
        try {
            const response = await getProductByBrand(id, page, OPEN_GET_CONFIG);
            if (response.ok) {
                const data = await response.json();
                dispatch(set_product_count(data.products.length))
                dispatch(set_product_by_brand(data));
            }
            dispatch(set_stop_loading());
        } catch (error) {
            console.log(error);
        }
    };
};

export const resetProduct = () => {
    return async (dispatch) => {
        dispatch(reset_products())
    }
}