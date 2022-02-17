import { connect } from "react-redux";

import { fetch_wishList, remove_everything} from '../modules/action.wishlist';
import { update_ProductWishList } from "../modules/action.myaccount";

import WishList from "../components/MyAccount/WishList"

export default connect(
    (state) => ({
        isLoading: state.wishList.isLoading,
        errorMessage: state.wishList.errorMessage,
        successMessage: state.wishList.successMessage,
        WishListProduct: state.wishList.wishList,
    }),
    (dispatch) => ({
        fetchWishList: () => dispatch(fetch_wishList()),
        changeWishList:  (productId, isFav) =>dispatch(update_ProductWishList(productId, isFav)),
        removeEverything: () => dispatch(remove_everything()),
    })
)(WishList)