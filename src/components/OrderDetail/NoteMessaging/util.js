export const composeSendMessageData = (
  OrderId = 0,
  ExtArray = [],
  StringArray = [],
  NoteValue = ""
) => {
  let image_list = [];
  let temp_list = {
    imageContent: "",
    extension: "",
  };
  for (let i = 0; i < StringArray.length; i++) {
    temp_list.extension = ExtArray[i].slice(6, ExtArray[i].length);
    temp_list.imageContent = StringArray[i].slice(
      temp_list.extension.length + 19,
      StringArray[i].length
    );
    image_list.push(temp_list);
  }

  return {
    orderId: OrderId,
    content: NoteValue,
    label: "",
    imageList: image_list,
  };
};
