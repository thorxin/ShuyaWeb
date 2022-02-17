export const INITIAL_TEMP_Q = {
  name: "",
  text: "",
  createdDateTime: "",
  anserResponse: {
    answerId: 0,
    text: "",
  },
};

export const composeTemQuestion = (questioner, question_text, date, save_qa_id) => {
  let data = {
    questionId: save_qa_id,
    name: questioner,
    text: question_text,
    createdDateTime: date,
    anserResponse: {
      answerId: 0,
      text: "",
    },
  };

  return data;
};
