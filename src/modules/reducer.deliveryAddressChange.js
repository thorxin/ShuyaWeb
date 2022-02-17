import * as type from "./type";

export const initialState = {
    isLoading: false,
    isTeritaryLoading: false,
    isSecondaryLoading: false,
    data: []
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
        case type.START_TERTIARY_LOADING:
            return {
                ...getCommonState(state),
                isTeritaryLoading: true,
            };
        case type.STOP_TERTIARY_LOADING:
            return {
                ...getCommonState(state),
                isTeritaryLoading: false,
            }
        case type.START_SECONDARY_LOADING:
            return {
                ...getCommonState(state),
                isSecondaryLoading: true,
            };
        case type.STOP_SECONDARY_LOADING:
            return {
                ...getCommonState(state),
            };
        case type.GET_DELIVERY_ADDRESS: {
            return {
                ...getCommonState(state),
                data: action.payload
            }
        }
        case type.CHANGED_SELECTED_VAL: {
            return {
                ...getCommonState(state),
                data: state.data.map(data => (
                    data.id === parseInt(action.payload) ? {
                        ...data,
                        selected: true
                    } : {
                        ...data,
                        selected: false
                    }
                ))
            }
        }
        default:
            return state;
    }
};
export default Reducer;

const getCommonState = (state) => ({
    ...state,
    isSecondaryLoading: false,
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

export const set_tertiary_start_loading = () => ({
    type: type.START_TERTIARY_LOADING
});

export const set_tertiary_stop_loading = () => ({
    type: type.STOP_TERTIARY_LOADING
})

export const set_secondary_start_loading = () => ({
    type: type.START_SECONDARY_LOADING,
});

export const set_secondary_stop_loading = () => ({
    type: type.STOP_SECONDARY_LOADING,
});

export const set_delivery_address = (data) => ({
    type: type.GET_DELIVERY_ADDRESS,
    payload: data
})

export const change_selected_delivery_val = (id) => ({
    type: type.CHANGED_SELECTED_VAL,
    payload: id
})

