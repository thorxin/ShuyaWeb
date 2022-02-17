import { connect } from "react-redux";

import {
  fetch_terms,
  fetch_shipping,
  fetch_warranty,
  fetch_policy,
  fetch_preordertc,
  fetch_installation
} from "../../modules/action.productdetails";

import ProductOfferInfo from "../../components/ProductOffer/product_offer";

export default connect(
  (state) => ({
      isLoading: state.productDetails.isLoading,
      productOfferList: state.productDetails.productOfferList,
  }),
  (dispatch) => ({
    fetchTerms: () => dispatch(fetch_terms()),
    fetchShipping: () => dispatch(fetch_shipping()),
    fetchWarranty: () => dispatch(fetch_warranty()),
    fetchPolicy: () => dispatch(fetch_policy()),
    fetchPreOrderTC: () => dispatch(fetch_preordertc()),
    fetchInstallation: () => dispatch(fetch_installation()),
  })
)(ProductOfferInfo);
