import { connect } from "react-redux";
import AddNewAddress from "../../components/MyAccount/ChangeAddress/v2-ChangeAddress/AddNewAddress/add_new_address";
import { auth_get_city_list, auth_get_township_list } from "../../modules/action.auth";
import { create_replaceDeliveryAddress } from "../../modules/action.deliveryAddressChange";

export default connect(
  (state) => ({
    isLoading: state.myAccount.isLoading,
    isSecondaryLoading: state.auth.isSecondaryLoading,
    cityList: state.auth.cityList,
    townshipList: state.auth.townshipList
  }),
  (dispatch) => ({
    authGetCityList: (token) => dispatch(auth_get_city_list(token)),
    authGetTownshipList: (id, token) => dispatch(auth_get_township_list(id, token)),
    createReplaceDeliveryAddress : (data) => dispatch(create_replaceDeliveryAddress(data))
  })
)(AddNewAddress);
