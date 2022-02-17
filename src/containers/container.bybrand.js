import { connect } from "react-redux";
import ByBrand from "../components/ByBrand/by_brand";
import { fetch_ProductByBrand, resetProduct } from "../modules/action.bybrand";
export default connect(
    (state) => ({
        productsByBrand: state.byBrand.productsByBrand,
        products: state.byBrand.products,
        isLoading: state.byBrand.isLoading,
        product_count: state.byBrand.product_count
    }),
    (dispatch) => ({
        fetch_ProductByBrand: (id, page) => dispatch(fetch_ProductByBrand(id, page)),
        resetProduct: () => dispatch(resetProduct())
    })
)(ByBrand);
