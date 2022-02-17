import { connect } from "react-redux";

import QuestionAndAnswer from "../../components/QuestionAndAnswer/question_and_answer";

import {
  delete_Question,
  fetch_GetQAndAByUserId,
  fetch_QuestionAndAnswerList,
  fetch_SaveQuestion,
  fetch_questionCount,
} from "../../modules/action.productdetails";

export default connect(
  (state) => ({
    isLoading: state.productDetails.isLoading,
    isSecondaryLoading: state.productDetails.isSecondaryLoading,
    isSuccess: state.productDetails.isSuccess,
    questionAndAnswerList: state.productDetails.questionAndAnswerList,
    questionAndAnswerListByUser:
      state.productDetails.questionAndAnswerListByUser,
    questionCount: state.productDetails.questionCount,
    save_qa_id: state.productDetails.save_qa_id
  }),
  (dispatch) => ({
    fetchQuestionAndAnswerList: (
      product_id,
      page_number,
      page_size,
      isRemove
    ) =>
      dispatch(
        fetch_QuestionAndAnswerList(
          product_id,
          page_number,
          page_size,
          isRemove
        )
      ),
    fetchGetQAndAByUserId: (productId = 0) =>
      dispatch(fetch_GetQAndAByUserId(productId)),
    fetchSaveQuestion: (propsData) => dispatch(fetch_SaveQuestion(propsData)),
    fetchDeleteQuestion: (propsData) => dispatch(delete_Question(propsData)),
    fetchQuestionCount: (productId) => dispatch(fetch_questionCount(productId)),
  })
)(QuestionAndAnswer);
