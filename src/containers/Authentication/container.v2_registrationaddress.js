import { connect } from "react-redux";
import RegistrationAddress from "../../components/Authentication/RegistrationAddress/v2-Registration-Address/registration_address";
import { auth_get_city_list, auth_get_township_list } from "../../modules/action.auth";
import { create_replaceDeliveryAddress, update_selectedDeliveryAddress } from "../../modules/action.deliveryAddressChange";

export default connect(
  (state) => ({
    isLoading: state.myAccount.isLoading,
    isSecondaryLoading: state.auth.isSecondaryLoading,
    cityList: state.auth.cityList,
    townshipList: state.auth.townshipList
  }),
  (dispatch) => ({
    updateSelectedDeliveryAddress: (data) => dispatch(update_selectedDeliveryAddress(data)),
    authGetCityList: (token) => dispatch(auth_get_city_list(token)),
    authGetTownshipList: (id, token) => dispatch(auth_get_township_list(id, token)),
    createReplaceDeliveryAddress : (data) => dispatch(create_replaceDeliveryAddress(data))
  })
)(RegistrationAddress);
