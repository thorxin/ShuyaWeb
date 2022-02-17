import { useState } from "react";

import { APPLICATION_CONFIG_ID, APPLICATION_USER_TYPE } from "../../../constant/applicationConfig";
import convertImgToBase64URL from "../../../util/base64";
export function Hook({
    isLoading,
    isSecondaryLoading,
    errorMessage,
    /**
     * action
     */
    authLogin,
    LoginWithFaceBook
}) {

    const onSubmit = async (data) => {
        const authInfo = {
            "emailOrPhoneNo": data.PhoneNumber,
            "password": data.Password,
            "userType": APPLICATION_USER_TYPE,
            "applicationConfigId": APPLICATION_CONFIG_ID,
            "language": 1
        }
        authLogin(authInfo);
    }

    const [showPassword, setShowPassword] = useState(false);
    const IMG_EXTENSION = 'image/png'
    const PROFILE_SIZE = 200

    function UseShowingPassword(data, setData) {
        setData(data ? false : true);
    }

    const togglePasswordVisibility = () => {
        UseShowingPassword(showPassword, setShowPassword);
    };

    const responseFacebook = async (response) => {
        try {
            if (response.name) {

                const profile_pic = `https://graph.facebook.com/${response.id}/picture?width=${PROFILE_SIZE}&height=${PROFILE_SIZE}`

                convertImgToBase64URL(profile_pic, function (base64IMG) {

                    let imgURL = base64IMG.split(',')[1]

                    const options = {
                        facebookId: response.id,
                        name: response.name,
                        emailOrPhoneNo: response.email ? response.email : `${response.id}@facebook.com`,
                        userImage: {
                            userImageStr: imgURL,
                            userImageStrExtension: IMG_EXTENSION
                        },
                        applicationConfigId: APPLICATION_CONFIG_ID,
                    }

                    LoginWithFaceBook(options)

                }, [IMG_EXTENSION])
            } else {
                alert('FaceBook ဖြင့် login ၀င်ခြင်း မအောင်မြင်ပါ။')
            }

        } catch (error) {
            alert('FaceBook ဖြင့် login ၀င်ခြင်း မအောင်မြင်ပါ။')
        }
    }
    return [
        isLoading,
        isSecondaryLoading,
        errorMessage,
        showPassword,
        /**
         * action
         */
        onSubmit,
        togglePasswordVisibility,
        responseFacebook
    ]
}