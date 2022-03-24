import React from "react";

//images
import UserProfile from "../../../assets/Authentication/Register/user_profile.svg";
import CameraProfile from "../../../assets/Authentication/Register/camera_profile.svg";

const ProfilePhoto = ({
  UserProfilePhoto,
  ImageUploader,
  UploadedImage,
  /**
   * action
   */
  HandleImageUpload,
}) => {
  return (
    <div className="cursor-pointer">
      <input
        type="file"
        name="File[0]"
        ref={ImageUploader}
        accept="image/*"
        className="hidden relative"
        onChange={HandleImageUpload}
      />
      <div
        className="flex items-end"
        onClick={() => ImageUploader.current.click()}
      >
        <img
          src={`${UserProfilePhoto ? UserProfilePhoto : UserProfile}`}
          // ?random_number=${new Date().getTime()}
          ref={UploadedImage}
          className="w-20 h-20 object-contain border rounded-full"
          alt="UploadedImage"
        />
        <img
          src={CameraProfile}
          className="w-8 h-auto -ml-5 -mb-1"
          alt="CameraProfile"
        />
      </div>
    </div>
  );
};

export default ProfilePhoto;
