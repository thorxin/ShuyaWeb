import { connect } from "react-redux";

import {auth_login, login_with_facebook} from "../../modules/action.auth";

import logIn from "../../components/Authentication/Login/login";

export default  connect(
    (state) => ({
        isLoading: state.auth.isLoading,
        isSecondaryLoading: state.auth.isSecondaryLoading,
        errorMessage: state.auth.errorMessage
    }),
    (dispatch) => ({
        authLogin: (formData) => dispatch(auth_login(formData)),
        LoginWithFaceBook: (body) => dispatch(login_with_facebook(body))
    })
)(logIn)
