/** @format */

import { connect } from 'react-redux'

import MyAccount from '../../components/MyAccount/my_account'
import { fetch_deliveryAddress } from '../../modules/action.deliveryAddressChange'
import { update_selectedDeliveryAddress } from '../../modules/action.deliveryAddressChange'
import { fetch_wishList } from '../../modules/action.wishlist'

import { fetch_userAccountInfo } from '../../modules/action.myaccount'

export default connect(
  (state) => ({
    shopCartDetail: state.shoppingCart.shopCartDetail,
    userAccountInfo: state.myAccount.userAccountInfo,
    deliveryAddress: state.deliveryAddressChange.data,
    wishList: state.wishList,
  }),
  (dispatch) => ({
    fetchUserAccountInfo: (userId) => dispatch(fetch_userAccountInfo(userId)),
    fetchDeliveryAddress: () => dispatch(fetch_deliveryAddress()),
    updateSelectedDeliveryAddress: (data) =>
      dispatch(update_selectedDeliveryAddress(data)),
    fetchWishList: () => dispatch(fetch_wishList()),
  }),
)(MyAccount)
