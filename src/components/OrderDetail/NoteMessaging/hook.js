import _ from "lodash";
import { useRef, useState } from "react";

//components
import { composeSendMessageData } from "./util";

export function Hook(OrderId, SendOrderMessage) {
  const [isShowNoteBox, setIsShowNoteBox] = useState(false);
  const [noteValue, setNoteValue] = useState("");
  const [previewImage, setPreviewImage] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [imageObj, setImageObj] = useState([]);

  const changeOnTextBox = (e) => {
    setNoteValue(e.target.value);
  };

  //#region - Uploading Image
  const onUploadSelectedImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    let imgFile;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageObj([...imageObj, e.target.result]);
      };
      reader.readAsDataURL(document.getElementById("fileInput").files[0]);

      imgFile = file.type;
    }
    setImageFile([...imageFile, imgFile]);

    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]));
    }
    setPreviewImage([...previewImage, images]);
  };
  //#endregion - Uploading Image

  const removePreviewImage = (idx) => {
    let clone_imageFile = _.cloneDeep(imageFile || []);
    let clone_imageObj = _.cloneDeep(imageObj || []);
    let clone_previewImage = _.cloneDeep(previewImage || []);

    let removed_imageFile = clone_imageFile.filter(
      (file, index) => index !== idx
    );
    let removed_imageObj = clone_imageObj.filter((obj, index) => index !== idx);
    let removed_previewImage = clone_previewImage.filter(
      (preview, index) => index !== idx
    );

    setImageFile(removed_imageFile);
    setImageObj(removed_imageObj);
    setPreviewImage(removed_previewImage);
  };

  const sendNotesToSeller = () => {
    const note_value = _.cloneDeep(noteValue || "");
    const imageExtString = _.cloneDeep(imageFile);
    const imageString = _.cloneDeep(imageObj);
    let postData = composeSendMessageData(
      OrderId,
      imageExtString,
      imageString,
      note_value
    );
    SendOrderMessage(postData);
    setIsShowNoteBox(false);
  };
  return [
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
  ];
}
