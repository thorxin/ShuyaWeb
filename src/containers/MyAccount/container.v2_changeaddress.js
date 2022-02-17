import { connect } from "react-redux";
import ChangeAddress from "../../components/MyAccount/ChangeAddress/v2-ChangeAddress/change_address";

import {
    fetch_deliveryAddress,
    update_selectedDeliveryAddress
} from "../../modules/action.deliveryAddressChange";
import {
    fetchDeleteDeliveryAddress
} from "../../modules/action.deliveryAddressChange";

export default connect(
    (state) => ({
        deliveryAddress: state.deliveryAddressChange.data,
        isTeritaryLoading: state.deliveryAddressChange.isTeritaryLoading,
        isSecondaryLoading: state.deliveryAddressChange.isSecondaryLoading
    }),
    (dispatch) => ({
        fetchDeliveryAddress: () => dispatch(fetch_deliveryAddress()),
        updateSelectedDeliveryAddress: (data) => dispatch(update_selectedDeliveryAddress(data)),
        fetchDeleteDeliveryAddress: (productId) =>dispatch(fetchDeleteDeliveryAddress(productId)),
    })
)(ChangeAddress);
