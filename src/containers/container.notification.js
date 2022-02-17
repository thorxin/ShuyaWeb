import { connect } from "react-redux";

import Notification from "../components/Notification/notification";
import { fetch_notification, seen_notification, set_PageDefault } from "../modules/action.notification";
import { GET_STORED_ACCESS_TOKEN } from '../util/storage'
import NeedToLogin from "../components/CommonComponent/NeedToLogin/index";
import { change_noti_count } from "../modules/reducer.notifications";


export default connect(
    (state) => ({
        isLoading: state.notifications.isLoading,
        NotificationList: state.notifications.notification,
        isNoMoreData: state.notifications.isNoMoreData,
        notiCount: state.notifications.notiCount
    }),
    (dispatch) => ({
        fetchNotification: (postData) => dispatch(fetch_notification(postData)),
        SeenNotification: (id) => dispatch(seen_notification(id)),
        setPageDefault: () => dispatch(set_PageDefault()),
        changeNotiCount : (count) => dispatch(change_noti_count(count))
    })
)(GET_STORED_ACCESS_TOKEN ? Notification : NeedToLogin)