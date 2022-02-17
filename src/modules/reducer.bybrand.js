import * as type from "./type";

export const initialState = {
    isLoading: false,
    productsByBrand: {},
    products: [],
    product_count: 0
};

/**
 * @param action
 */
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.START_LOADING:
            return {
                ...getCommonState(state),
                isLoading: true,
            };
        case type.STOP_LOADING:
            return {
                ...getCommonState(state)
            }
        case type.PRODUCT_BY_BRAND: {
            return {
                ...getCommonState(state),
                productsByBrand: action.payload,
                products: [...state.products, ...action.payload.products]
            }
        }
        case type.PRODUCT_COUNT_BRAND: {
            return {
                ...getCommonState(state),
                product_count: action.payload
            }
        }
        case "RESET_PRODUCT": {
            return {
                ...getCommonState(state),
                products: action.payload
            }
        }
        default:
            return state;
    }
};
export default Reducer;

const getCommonState = (state) => ({
    ...state,
    isLoading: false
});

/**
 * Action
 */
export const set_start_loading = () => ({
    type: type.START_LOADING
});

export const set_stop_loading = () => ({
    type: type.STOP_LOADING
})

export const set_product_by_brand = (productsByBrand = []) => ({
    type: type.PRODUCT_BY_BRAND,
    payload: productsByBrand
});

export const set_product_count = (count = 0) => ({
    type: type.PRODUCT_COUNT_BRAND,
    payload: count
});

export const reset_products = () => ({
    type: "RESET_PRODUCT",
    payload: []
})

