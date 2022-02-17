import { connect } from "react-redux";

import ChangeAddress from "../../components/MyAccount/ChangeAddress/change_address";

import { auth_get_city_list, auth_get_township_list } from "../../modules/action.auth";

import { myAccount_change_user_address } from "../../modules/action.myaccount";

export default connect(
  (state) => ({
    isLoading: state.myAccount.isLoading,
    isSecondaryLoading: state.auth.isSecondaryLoading,
    cityList: state.auth.cityList,
    townshipList: state.auth.townshipList
  }),
  (dispatch) => ({
    authGetCityList:(token) => dispatch(auth_get_city_list(token)),
    authGetTownshipList: (id,token) => dispatch(auth_get_township_list(id, token)),
    myAccountChangeUserAddress: (data, user_info) => dispatch(myAccount_change_user_address(data, user_info)),
   
  })
)(ChangeAddress);
