/** @format */

import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

//component
import { APPLICATION_CONFIG_ID } from '../../../constant/applicationConfig';

export function Hook({
  isLoading,
  errorMessage,
  /**
   * action
   */
  authRegistration,
}) {
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [imageFile, setImageFile] = useState(null);

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

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
    }
  };

  function UseShowingPassword(data, setData) {
    setData(data ? false : true);
  }

  const togglePasswordVisibility = () => {
    UseShowingPassword(showPassword, setShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    UseShowingPassword(showConfirmPassword, setShowConfirmPassword);
  };

  function UseCombinedFormData({
    user_name = '',
    phone_number = '',
    file = '',
    password = '',
    occupation_id = 0,
    application_config_id = 0,
    language = 1,
  }) {
    const Data = new FormData();
    Data.append('Name', user_name);
    Data.append('EmailOrPhoneNo', phone_number);
    Data.append('File', file);
    Data.append('Password', password);
    Data.append('OccupationId', occupation_id);
    Data.append('ApplicationConfigId', application_config_id);
    Data.append('Language', language);
    return Data;
  }

  const onSubmit = (dataForm) => {
    let combinedData = UseCombinedFormData({
      user_name: dataForm.UserName,
      phone_number: dataForm.PhoneNumber,
      file: imageFile,
      password: dataForm.ConfirmPassword,
      occupation_id: 0,
      application_config_id: APPLICATION_CONFIG_ID,
      language: 1,
    });
    authRegistration(history, combinedData);
  };

  return [
    isLoading,
    errorMessage,
    imageUploader,
    uploadedImage,
    imageFile,
    showPassword,
    showConfirmPassword,
    /**
     * action
     */
    handleImageUpload,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    onSubmit,
  ];
}
