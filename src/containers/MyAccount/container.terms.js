import { connect } from "react-redux";

import {
  fetch_terms,
} from "../../modules/action.productdetails";

import TermsCondition from "../../components/MyAccount/Terms/index";

export default connect(
  (state) => ({
      isLoading: state.productDetails.isLoading,
      termsConditions: state.productDetails.productOfferList,
  }),
  (dispatch) => ({
    fetchTerms: () => dispatch(fetch_terms())
  })
)(TermsCondition);
