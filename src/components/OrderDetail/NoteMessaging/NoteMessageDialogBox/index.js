import React, { useRef } from "react";

//images
import CrossSignIcon from "../../../../assets/common/cancel_cross_icon.svg";
import SendIcon from "../../../../assets/productDetail/send_gray_icon.svg";
import SendActiveIcon from "../../../../assets/productDetail/send_blue_icon.svg";
import PlaceHolderImage from "../../../CommonComponent/placeholder_image";

const NoteMessageDialogBox = ({
  NoteValue = "",
  PreviewImage = [],
  /**
   * action
   */
  closeNoteDialogBox,
  onChangeSendTextBox,
  selectedImage,
  sendingNotes,
  removingPreviewImage,
}) => {
  const imageUploader = useRef();

  return (
    <>
      <div className="w-full h-auto max-w-screen-sm md:mx-auto">
        <div className="bg-white w-11/12 md:w-9/12 mx-auto py-4 backdrop-filter backdrop-blur-sm">
          <div className="default-margin-layout space-y-6">
            <div className="flex justify-between">
              <p className="sub-heading-font text-color-default">Sent Note</p>
              <div className="w-3 h-auto" onClick={closeNoteDialogBox}>
                <img
                  src={CrossSignIcon}
                  className="w-full h-full cursor-pointer"
                  alt="Cross Icon"
                />
              </div>
            </div>
            <div className="w-full h-auto space-y-4">
              <textarea
                rows="10"
                className="primary-font w-full h-auto focus:outline-none"
                placeholder="Type your message here!"
                onInput={(e) => onChangeSendTextBox(e)}
              />
              <div className="flex flex-wrap">
                {PreviewImage.length > 0 &&
                  PreviewImage.map((image, index) => (
                    <div key={index} className="w-20 h-20 mt-2 mr-2 relative">
                      <img className="w-full h-full object-cover" src={image} />
                      <img
                        src={CrossSignIcon}
                        className="w-3 h-auto absolute top-2 right-2"
                        alt="Cross Sign Icon"
                        onClick={() => removingPreviewImage(index)}
                      />
                    </div>
                  ))}
              </div>
              <div className="flex justify-between items-center">
                <input
                  type="file"
                  id="fileInput"
                  name="File[0]"
                  multiple
                  accept="image/*"
                  onChange={selectedImage}
                  className="hidden"
                  ref={imageUploader}
                />
                <div
                  className="w-10 md:w-9 h-auto"
                  onClick={() => imageUploader.current.click()}
                >
                  <PlaceHolderImage />
                </div>
                <div className="w-6 h-auto">
                  {NoteValue ? (
                    <img
                      src={SendActiveIcon}
                      className="w-full h-full"
                      alt="Send Icon"
                      onClick={sendingNotes}
                    />
                  ) : (
                    <img
                      src={SendIcon}
                      className="w-full h-full"
                      alt="Send Icon"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteMessageDialogBox;
