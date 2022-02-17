import { connect } from "react-redux";

import RegistrationAddress from "../../components/Authentication/RegistrationAddress/registration_address";

import {
  auth_get_city_list,
  auth_get_township_list,
  auth_add_and_change_user_address
} from "../../modules/action.auth";

export default connect(
  (state) => ({
    isLoading: state.auth.isLoading,
    isSecondaryLoading: state.auth.isSecondaryLoading,
    errorMessage: state.auth.errorMessage,
    cityList: state.auth.cityList,
    townshipList: state.auth.townshipList,
  }),
  (dispatch) => ({
    authGetCityList: (token) => dispatch(auth_get_city_list(token)),
    authGetTownshipList: (id, token) => dispatch(auth_get_township_list(id, token)),
    authAddAndChangeUserAddress: (data, userInfo) => dispatch(auth_add_and_change_user_address(data, userInfo))
  })
)(RegistrationAddress);
