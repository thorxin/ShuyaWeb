import {
    set_start_loading,
    set_error_message,
    set_stop_loading,
    set_wish_list_product,
  } from "./reducer.myaccount";

  import { getWishList } from "../services/service.wishlist";
  import {updateWishList} from "../services/service.myaccount"
  import checkStatus from '../util/status'
  import _ from 'lodash';
  import { GET_CONFIG, POST_CONFIG } from "../constant/header";
  import { GET_STORED_ACCESS_TOKEN } from "../util/storage";


  export const fetch_wishList = () => {
    return async (dispatch, getState) => {
        if (GET_STORED_ACCESS_TOKEN){
            dispatch(set_start_loading());
        try {
            const response = await getWishList(GET_CONFIG);
            if (checkStatus(response.status)) {
                const body = await response.json();
                dispatch(set_wish_list_product(body));
            }
            dispatch(set_stop_loading());
        } catch (error) {
            dispatch(set_error_message(error.message));
        }
        }
        
    }
}
export const remove_everything = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(set_start_loading());
      const productInfo = _.cloneDeep(getState().wishList);

      const productList = productInfo.wishList || [];

      const response = async (product) =>
        await updateWishList(product.productId, false, POST_CONFIG({}));

      if (Array.isArray(productList) && productList.length > 0) {
        for (let g = 0; g < productList.length; g++) {
          let itemTobeRemove = productList[g];
          await response(itemTobeRemove);
        }
        console.log(response);
        if (response) {
          window.location.reload();
        }
      }
      setTimeout(() => {
        dispatch(set_stop_loading());
      }, 2000);
    } catch (error) {
      dispatch(set_error_message(error.message));
    }
  };
};