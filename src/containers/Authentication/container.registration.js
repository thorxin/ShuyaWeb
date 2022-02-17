import { connect } from "react-redux";

import registrationUser from "../../components/Authentication/Registration/registration";

import {
    auth_registration
} from "../../modules/action.auth";

export default  connect(
    (state) => ({
        isLoading: state.auth.isLoading,
        errorMessage: state.auth.errorMessage
    }),
    (dispatch) => ({
        authRegistration: (history, dataForm) => dispatch(auth_registration(history, dataForm))
    })
)(registrationUser)
