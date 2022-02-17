import { connect } from "react-redux";

import ByCategory from "../components/ByCategory/by_category";
import {
  fetchSubCategory,
  fetch_mainCategoryDetail,
  fetch_ProductByBrand,
} from '../modules/action.bycategory';
import { fetch_productSearch } from "../modules/action.productsearch";
import {
  fetch_mainCategory
} from "../modules/action.home";


export default connect(
  (state) => ({
    isSecondaryLoading: state.home.isSecondaryLoading,
    errorMessage: state.home.errorMessage,
    CategoryList: state.home.mainCategory,
    mainCategory: state.home.mainCategory,
    mainCategoryDetail: state.home.mainCategoryDetail,
    SubCategoryList: state.home.subCategoryList,
    currentCategory: state.home.selectedCategory,
    CategoryDetailList: state.home.mainCategoryDetail,
    brandData: state.home.brandById
  }),
  (dispatch) => ({
    fetchCategory: () => dispatch(fetch_mainCategory()),
    ProductSearch: (props) => dispatch(fetch_productSearch(props)),
    fetchSubCategory: (mainId) => dispatch(fetchSubCategory(mainId)),
    fetchMainCategoryDetail: () => dispatch(fetch_mainCategoryDetail()),
    fetchProductByBrand: (id) => dispatch(fetch_ProductByBrand(id)),
  })
)(ByCategory);
