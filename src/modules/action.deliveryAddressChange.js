/** @format */

import {
  GET_CONFIG,
  POST_CONFIG,
  GET_CONFIG_WITH_TOKEN,
  DELETE_CONFIG,
} from '../constant/header';
import {
  getDeliveryAddress,
  changeSelectedDelivery,
  createdReplaceDeliveryAddress,
  deleteDeliveryAddress,
} from '../services/service.order';
import {
  change_selected_delivery_val,
  set_delivery_address,
  set_secondary_start_loading,
  set_secondary_stop_loading,
  set_tertiary_start_loading,
  set_tertiary_stop_loading,
  set_start_loading,
  set_stop_loading,
} from './reducer.deliveryAddressChange';

export const fetch_deliveryAddress = () => {
  console.log('fetching delivery address');
  return async (dispatch) => {
    dispatch(set_tertiary_start_loading());
    try {
      const response = await getDeliveryAddress(GET_CONFIG);
      if (response.ok) {
        const data = await response.json();
        dispatch(set_delivery_address(data));
      }
      dispatch(set_tertiary_stop_loading());
    } catch (error) {
      alert(error.message);
    }
  };
};

export const update_selectedDeliveryAddress = (data = {}) => {
  return async (dispatch) => {
    dispatch(set_secondary_start_loading());
    try {
      const response = await changeSelectedDelivery(
        POST_CONFIG(JSON.stringify(data))
      );
      if (response.ok) {
        await response.json();
        dispatch(change_selected_delivery_val(data.deliveryAddressId));
      }
      dispatch(set_secondary_stop_loading());
    } catch (error) {
      alert(error.message);
    }
  };
};

export const create_replaceDeliveryAddress = (data = {}) => {
  return async (dispatch) => {
    dispatch(set_secondary_start_loading());
    try {
      const response = await createdReplaceDeliveryAddress(
        POST_CONFIG(JSON.stringify(data))
      );
      if (response.ok) {
        await response.json();
        // dispatch(change_selected_delivery_val(data.deliveryAddressId));
      }
      dispatch(set_secondary_stop_loading());
    } catch (error) {
      alert(error.message);
    }
  };
};

export const fetchDeleteDeliveryAddress = (product_id = 0) => {
  return async (dispatch) => {
    dispatch(set_tertiary_start_loading());
    try {
      const response = await deleteDeliveryAddress(product_id, DELETE_CONFIG);
      const body = await response.json();
      if (response.ok) {
        window.location.reload();
        // console.log("success")
      } else {
        alert(body?.message);
      }
      dispatch(set_tertiary_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};
