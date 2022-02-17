import { connect } from "react-redux";
import { fetchPOSVoucher } from '../../modules/action.orderdetail';
import POSVoucher from '../../components/VoucherPrint';

export default connect(
    (state) => ({
        isLoading: state.orderDetail.isLoading,
        posVoucher:state.orderDetail.posVoucher,
        Message: state.orderDetail.errorMessage
    }),
    (dispatch) => ({
        fetchPOSVoucher: (orderId) => dispatch(fetchPOSVoucher(orderId))
    })
)(POSVoucher)