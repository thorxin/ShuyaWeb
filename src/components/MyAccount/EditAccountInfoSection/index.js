import React from "react";

//component
import ProfilePhoto from "./profilePhoto";
import AccountName from "./accountName";
import { Hook } from "./hook";
import DialogBox from "../../CommonComponent/DialogBox/dialog_box";
import SuccessBoxItems from "./box_items";

export default function EditProfileSection({
  account_info = {},
  /**
   * action
   */
}) {
  const [
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
  ] = Hook(account_info);

  return (
    <>
      <div className="w-full h-auto">
        <div className="flex items-center space-x-7">
          <div>
            {isLoading ? (
              <div className="w-20 h-20 rounded-full skeleton-loading-animation" />
            ) : (
              <ProfilePhoto
                UserProfilePhoto={account_info?.url}
                ImageUploader={imageUploader}
                UploadedImage={uploadedImage}
                HandleImageUpload={handleImageUpload}
              />
            )}
          </div>
          <div className="md:w-3/12 h-auto">
            <AccountName
              account_name={account_info.name}
              user_name={userName}
              is_required_name={requiredUserName}
              changingName={changingAccountName}
              clickingUpdate={clickUpdateAccountName}
            />
          </div>
        </div>
      </div>
      {isShowSuccessBox && (
        <DialogBox isOpen={isShowSuccessBox} closeModal={closeSuccessBox}>
          <SuccessBoxItems
            Text={successText}
            /**
             * action
             */
            closeModal={closeSuccessBox}
          />
        </DialogBox>
      )}
    </>
  );
}
