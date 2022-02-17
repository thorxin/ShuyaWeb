import React from "react";
import { useTranslation } from "react-i18next";
import dateFormatter from "../../../util/dateFormatter";
import DialogBox from "../../CommonComponent/DialogBox/dialog_box";

//components
import { Hook } from "./hook";
import NoteMessageDialogBox from "./NoteMessageDialogBox";

const NoteMessaging = ({
  OrderId = 0,
  MessageList = [],
  /**
   * action
   */
  SendOrderMessage,
}) => {
  const [
    isShowNoteBox,
    setIsShowNoteBox,
    noteValue,
    previewImage,
    /**
     * action
     */
    changeOnTextBox,
    onUploadSelectedImage,
    sendNotesToSeller,
    removePreviewImage,
  ] = Hook(OrderId, SendOrderMessage);

  const { t } = useTranslation();
  let limit_text = 200;

  return (
    <>
      <div className="w-full md:w-11/12 md:mx-auto h-auto space-y-3">
        <p className="primary-font text-color-secondary">
          {t("OrderDetail.notes")}
        </p>
        <div className="bg-gray-100 py-3 px-4 rounded-md space-y-3">
          <p className="caption-font text-color-link">Ordered</p>
          {MessageList.length > 0 ? (
            MessageList.map((message, index) => (
              <React.Fragment key={index}>
                <div className="py-3 px-3 bg-white rounded-l-xl rounded-t-xl">
                  <p className="tertiary-font text-color-default text-justify">
                    {message.content}
                  </p>
                </div>
                <div className="flex items-center justify-end space-x-4">
                  <p className className="tertiary-font text-color-secondary">
                    {dateFormatter(message.timeStamp)}
                  </p>
                  <div>
                    <img src={message.senderImageUrl} className="rounded-full h-8 w-8" alt="UserImage" />
                  </div>
                </div>
              </React.Fragment>
            ))
          ) : (
            <p></p>
          )}

          <p className="primary-font text-color-default text-center">
            New Message Received <span className="text-color-link"> View </span>
          </p>
        </div>
        <button
          className="bg-yellow-200 w-full h-auto py-3 rounded-full primary-font"
          onClick={() => setIsShowNoteBox(true)}
        >
          {t("OrderDetail.sent-note-seller")}
        </button>
      </div>
      <DialogBox
        isOpen={isShowNoteBox}
        closeModal={() => setIsShowNoteBox(false)}
      >
        <NoteMessageDialogBox
          NoteValue={noteValue}
          PreviewImage={previewImage}
          /**
           * action
           */
          closeNoteDialogBox={() => setIsShowNoteBox(false)}
          onChangeSendTextBox={changeOnTextBox}
          selectedImage={onUploadSelectedImage}
          sendingNotes={sendNotesToSeller}
          removingPreviewImage={removePreviewImage}
        />
      </DialogBox>
    </>
  );
};

export default NoteMessaging;
