import { connect } from "react-redux";

import {
    fetch_deliveryAddress,
    update_selectedDeliveryAddress,
} from "../../modules/action.deliveryAddressChange";
import DeliveyAddressChange from "../../components/DeliveryAddressChange/delivery_address_change";

export default connect(
    (state) => ({
        deliveryAddress: state.deliveryAddressChange.data,
        isTeritaryLoading: state.deliveryAddressChange.isTeritaryLoading,
        isSecondaryLoading: state.deliveryAddressChange.isSecondaryLoading
    }),
    (dispatch) => ({
        fetchDeliveryAddress: () => dispatch(fetch_deliveryAddress()),
        updateSelectedDeliveryAddress: (data) => dispatch(update_selectedDeliveryAddress(data))
    })
)(DeliveyAddressChange);
