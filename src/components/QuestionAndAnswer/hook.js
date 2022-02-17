import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import { composeTemQuestion } from "./util";
import { GET_STORED_USER_INFO } from "../../util/storage";
import { goProductDetails } from "../../util/goToSpecificPathName";
import { useTranslation } from "react-i18next";
import { PAGE_NUMBER, PAGE_SIZE } from "../../constant/search";

// const Testing = {
//   name: "Minn Khant Wunna",
//   text: "Testing Message",
//   createdDateTime: new Date(),
//   anserResponse: {
//     answerId: 0,
//     text: "",
//   },
// };

const Msg = ({ text = "" }) => {
  return (
    <>
      <p className="tertiary-font">{text}</p>
    </>
  );
};

export function Hook({
  isLoading,
  isSecondaryLoading,
  isSuccess,
  questionAndAnswerList,
  questionAndAnswerListByUser,
  questionCount,
  save_qa_id,
  /**
   * action
   */
  fetchQuestionAndAnswerList,
  fetchGetQAndAByUserId,
  fetchSaveQuestion,
  fetchDeleteQuestion,
  fetchQuestionCount,
}) {
  const { t } = useTranslation();
  const history = useHistory();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product_id = Number(urlParams.get("productId"));
  const userInfo = JSON.parse(GET_STORED_USER_INFO);

  const [textValue, setTextValue] = useState("");
  const [tempUploadQuestion, setTempUploadQuestion] = useState([]);
  const [pageNumber, setPageNumber] = useState(PAGE_NUMBER);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [tempQACount, setTempQACount] = useState(0);

  /**
   * Life Cycle
   */
  useEffect(() => {
    if (product_id <= 0) return;
    fetchQuestionAndAnswerList(product_id, PAGE_NUMBER, PAGE_SIZE, true);
    fetchGetQAndAByUserId(product_id);
    fetchQuestionCount(product_id);
  }, [product_id]);

  useEffect(() => {
    if (!isSuccess) return;
    toast.success(
      <Msg text={t("ProductDetails.uploaded-question-success")} />,
      {
        theme: "colored",
      }
    );
    document.getElementById("textBox").value = "";
    setTextValue("");
  }, [isSuccess]);

  const delayedSetState = useCallback(
    _.debounce((text) => setTextValue(text), 500),
    []
  );

  const onChangeSendTextBox = (e) => {
    let txtValue = e.target.value;
    setTextValue(txtValue);
  };

  const goBackTo = () => {
    goProductDetails(history, product_id);
  };

  const uploadQuestion = async () => {
    let text_area_value = document.getElementById("textBox").value;

    let postData = {
      text: text_area_value,
      productId: product_id,
    };
    await fetchSaveQuestion(postData);
  };

  useEffect(() => {
    let clone_tempUploadedQuestion = _.cloneDeep(tempUploadQuestion || []);
    let current_date = new Date();
    let text_area_value = document.getElementById("textBox").value;
    if (save_qa_id !== 0) {
      let composedData = composeTemQuestion(
        userInfo?.name,
        text_area_value,
        current_date,
        save_qa_id
      );
      clone_tempUploadedQuestion = [composedData, ...clone_tempUploadedQuestion];
      setTempQACount(clone_tempUploadedQuestion.length);
      setTempUploadQuestion(clone_tempUploadedQuestion);
    }
  }, [save_qa_id]);

  const deleteQuestion = (question_id = 0) => {
    if (question_id <= 0) return;
    let postData = {
      questionId: question_id,
    };
    fetchDeleteQuestion(postData);
  };

  const loadMoreQuestions = () => {
    let temp_pageNumber = pageNumber + 1;
    fetchQuestionAndAnswerList(product_id, temp_pageNumber, PAGE_SIZE);
    setPageNumber(temp_pageNumber);
    setIsLoadMore(true);
  };

  return [
    isLoading,
    isSecondaryLoading,
    isSuccess,
    questionAndAnswerList,
    questionAndAnswerListByUser,
    textValue,
    tempUploadQuestion,
    userInfo?.name,
    questionCount,
    isLoadMore,
    tempQACount,
    /**
     * action
     */
    goBackTo,
    onChangeSendTextBox,
    uploadQuestion,
    deleteQuestion,
    loadMoreQuestions,
  ];
}
