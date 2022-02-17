/** @format */

import {
  set_start_loading,
  set_stop_loading,
  set_notification,
  set_is_no_more_data,
  change_noti_count,
  notification_hide_or_show,
} from './reducer.notifications';
import {
  getNotification,
  seenNotification,
} from '../services/service.notification';
import _ from 'lodash';
import { GET_CONFIG } from '../constant/header';

export const fetch_notification = ({
  page_number = 1,
  is_removed_state = true,
  only_noti_count = false,
}) => {
  return async (dispatch, getState) => {
    try {
      let notificationList = getState().notifications.notification;

      if (is_removed_state) {
        notificationList.length = 0;
      }

      const response = await getNotification(page_number, GET_CONFIG);
      const body = await response.json();
      if (response.ok) {
        if (only_noti_count) {
          dispatch(
            change_noti_count(
              Array.isArray(body) && body.length > 0 ? body[0].count : 0
            )
          );
        } else if (Array.isArray(body) && body.length > 0) {
          notificationList = notificationList.concat(body);
          const unSeenList = notificationList.filter((li) => !li.isSeen);

          dispatch(set_notification(notificationList, unSeenList.length));
        }
      } else {
        dispatch(set_is_no_more_data(true));
      }
    } catch (error) {
      alert(error);
    }
  };
};

export const seen_notification = (id) => {
  return async (dispatch, getState) => {
    try {
      await seenNotification(id);
      // if (index > 0) {
      //   const notiList = _.cloneDeep(getState().notification.notification);
      //   if (notiList.length > 0) {
      //     notiList[index].isSeen = true;
      //     dispatch(update_notification_list(notiList));
      //   }
      // }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const set_PageDefault = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(set_notification([], 0));
      dispatch(set_is_no_more_data(false));
    } catch (error) {}
  };
};

export const notification_HideShowAction = (value) => {
  return async (dispatch) => {
    dispatch(notification_hide_or_show(value));
  };
};
