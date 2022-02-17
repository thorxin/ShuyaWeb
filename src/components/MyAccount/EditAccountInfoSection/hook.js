import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

//components
import { APPLICATION_CONFIG_ID } from "../../../constant/applicationConfig";
import { changeNameAndLogo } from "../../../services/service.myaccount";
import { POST_CONFIG_MULTIPART_FORM } from "../../../constant/header";
import {
  GET_STORED_USER_INFO,
  GET_STORED_ACCESS_TOKEN,
  GET_STORED_REFRESH_TOKEN,
  setLocalStorageTokenAndUserInfo,
} from "../../../util/storage";

export function Hook(account_info) {
  const { t } = useTranslation();

  const userInfo = JSON.parse(GET_STORED_USER_INFO);

  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [isShowSuccessBox, setIsShowSuccessBox] = useState(false);
  const [successText, setSuccessText] = useState("");

  const [requiredUserName, setRequiredUserName] = useState(false);

  useEffect(() => {
    setUserName(account_info.name);
  }, [account_info.name]);

  const imageUploader = useRef(null);
  const uploadedImage = useRef(null);

  const handleImageUpload = (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      setImageFile(file);

      uploadNewProfilePhoto(file);
    }
  };

  /**
   *
   * @param {String} user_name - Changed Account Name
   * @param {BinaryType} file - Changed User Profile Photo
   */
  function UseCombinedFormData({ user_name = "", file = "" }) {
    const Data = new FormData();
    Data.append("UserId", account_info?.id);
    Data.append("Name", user_name);
    Data.append("LogoFile", file);
    Data.append("ApplicationConfigId", APPLICATION_CONFIG_ID);

    return Data;
  }

  const changingAccountName = (e) => {
    let value = e;
    if (typeof value === "string" && value.length > 0) {
      setUserName(value);
      setRequiredUserName(false);
    } else {
      setUserName("");
    }
  };

  /**
   * To Close Success Dialog Box
   */
  const closeSuccessBox = () => {
    setIsShowSuccessBox(false);
    window.location.reload(true);
  };

  /**
   *
   * @param {} image_file - Uploading New User Profile
   */
  const uploadNewProfilePhoto = async (image_file) => {
    let combinedDataForm = UseCombinedFormData({
      user_name: account_info.name,
      file: image_file,
    });
    setIsLoading(true);
    try {
      const response = await changeNameAndLogo(
        POST_CONFIG_MULTIPART_FORM(combinedDataForm)
      );
      const body = await response.json();
      if (response.ok) {
        setIsShowSuccessBox(true);
        setSuccessText(t("MyAccount.profile"));
      } else {
        alert(body);
      }
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  /**
   * Changing New Account's Name
   */
  const clickUpdateAccountName = async () => {
    if (!userName) {
      setRequiredUserName(true);
      return;
    }

    let combinedDataForm = UseCombinedFormData({
      user_name: userName,
      file: imageFile,
    });
    try {
      const response = await changeNameAndLogo(
        POST_CONFIG_MULTIPART_FORM(combinedDataForm)
      );
      const body = response.json();
      if (response.ok) {
        const new_userInfo = { ...userInfo, name: userName };
        setLocalStorageTokenAndUserInfo(
          GET_STORED_ACCESS_TOKEN,
          GET_STORED_REFRESH_TOKEN,
          new_userInfo
        );
        setIsShowSuccessBox(true);
        setSuccessText(t("MyAccount.your-name"));
      } else {
        alert(body);
      }
    } catch (error) {
      alert(error);
    }
  };
  return [
    isLoading,
    userName,
    imageUploader,
    uploadedImage,
    isShowSuccessBox,
    successText,
    requiredUserName,
    /**
     * action
     */
    handleImageUpload,
    changingAccountName,
    clickUpdateAccountName,
    closeSuccessBox,
  ];
}
