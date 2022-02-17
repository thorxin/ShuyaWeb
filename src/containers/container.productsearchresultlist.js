import { connect } from "react-redux";

import ResultList from "../components/ProductSearch/ResultList";

import {
  clear_DataList,
  fetch_productSearch,
} from "../modules/action.productsearch";

export default connect(
  (state) => ({
    isLoading: state.productSearch.isLoading,
    searchProductList: state.productSearch.searchProductList,
    searchProductCount: state.productSearch.searchProductCount
  }),
  (dispatch) => ({
    searchProduct: (props) => dispatch(fetch_productSearch(props)),
    clearDataList: () => dispatch(clear_DataList()),
  })
)(ResultList);
