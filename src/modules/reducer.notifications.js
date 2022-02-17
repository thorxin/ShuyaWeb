import * as type from './type';

export const initialState = {
    isLoading: false,
    errorMessage: '',
    dataExist: true,
    orderID: '',
    notification: [],
    isNoMoreData: false,

    noMoreData: false,
    CurrentPage: 1,
    notiCount: 0,
    isShowNoti: false
}

/**
 * @param action
 */
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.START_LOADING:
            return {
                ...getCommontState(state),
                isLoading: true
            }
        case type.STOP_LOADING:
            return {
                ...getCommontState(state),
            }

        case type.IS_NO_MORE_DATA:
            return {
                ...getCommontState(state),
                isNoMoreData: action.payload
            }

        case type.ERROR_MESSAGE:
            return {
                ...getCommontState(state),
                errorMessage: action.payload
            }
        case type.GET_NOTIFICATION:
            return {
                ...getCommontState(state),
                notification: [...action.payload],
                CurrentPage: state.CurrentPage + 1
            }
        case type.CHANGE_NOTI_COUNT: {
            return {
                ...getCommontState(state),
                notiCount: action.payload
            }
        }
        case type.SET_ORDER_ID:
            return {
                ...getCommontState(state),
                orderID: action.payload
            }
        case type.SET_NO_MORE_DATA:
            return {
                ...getCommontState(state),
                noMoreData: true,
                CurrentPage: 1
            }
        case type.SET_PAGE_DEFAULT:
            return {
                ...getCommontState(state),
                CurrentPage: 1,
                notification: [],
                noMoreData: false
            }
        case type.SHOW_HIDE_NOTIFICATION: {
            return {
                ...getCommontState(state),
                isShowNoti: action.payload,
                notification: action.payload ? [] : [...state.notification]
            }
        }
        default:
            return state
    }
}
export default Reducer;

const getCommontState = (state) => ({
    ...state,
    isLoading: false,
    errorMessage: '',
    dataExist: true,
    orderID: '',
})

/**
 * Action
 */

export const set_start_loading = () => ({
    type: type.START_LOADING,
})

export const set_stop_loading = () => ({
    type: type.STOP_LOADING,
})

export const set_is_no_more_data = (isNoMore = false) => ({
    type: type.IS_NO_MORE_DATA,
    payload: isNoMore
})

export const set_error_message = (message = '') => ({
    type: type.ERROR_MESSAGE,
    payload: message
})

export const set_data_exist = () => ({
    type: type.SET_DATA_EXIST,
    payload: false
})

export const clear_data_list = () => ({
    type: type.CLEAR_DATA_LIST,
})

export const set_notification = (notilist = [], count = 0) => ({
    type: type.GET_NOTIFICATION,
    payload: notilist,
    count: count
})


export const set_order_id = (orderid = '') => ({
    type: type.SET_ORDER_ID,
    payload: orderid
})

// export const set_no_more_data = (isNoMore = false) => ({
//     type: type.SET_NO_MORE_DATA,
//     payload: isNoMore
// })

export const set_page_default = () => ({
    type: type.SET_PAGE_DEFAULT
})

export const update_notification_list = (list = []) => ({
    type: type.UPDATE_NOTIFICATION,
    payload: list
})

/*
*   Common
*/
export const set_data_exist_default = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: type.SET_DATA_EXIST,
            payload: true
        })
    }
}

export const change_noti_count = (count) => ({
    type: type.CHANGE_NOTI_COUNT,
    payload: count
})


export const notification_hide_or_show = (val) => {
    return async (dispatch) => {
        dispatch({
            type: type.SHOW_HIDE_NOTIFICATION,
            payload: val
        })
    }
}