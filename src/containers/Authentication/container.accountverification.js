import { connect } from "react-redux";

import AccountVerification from "../../components/Authentication/AccountVerification/account_verification";

import { auth_resend_code } from "../../modules/action.auth";

export default  connect(
    (state) => ({
        isLoading: state.auth.isLoading,
        isResendLoading: state.auth.isResendLoading,
        errorMessage: state.auth.errorMessage
    }),
    (dispatch) => ({
        authResendCode: (Data) => dispatch(auth_resend_code(Data))
    })
)(AccountVerification)
