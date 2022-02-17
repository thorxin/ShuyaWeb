import React from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import { Hook } from "./hook";
import NavigationWeb from "../CommonComponent/Navigation/NavigationWeb";
import { SubHeadingWithBackArrow } from "../CommonComponent/SubHeading/sub_heading_with_back_arrow";
import FooterWeb from "../CommonComponent/Footer/web_footer";
import QuestionList from "./QuestionList";
import Loading from "../CommonComponent/Loading/main_loading";

//images
import BackArrowIcon from "../../assets/common/left_arrow_image.png";
import SendNoActiveIcon from "../../assets/productDetail/send_gray_icon.svg";
import SendActiveIcon from "../../assets/productDetail/send_blue_icon.svg";

const QuestionAndAnswer = (props) => {
  const [
    isLoading,
    isSecondaryLoading,
    isSuccess,
    questionAndAnswerList,
    questionAndAnswerListByUser,
    textValue,
    tempUploadQuestion,
    userName,
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
    loadMoreQuestions
  ] = Hook(props);

  const { t } = useTranslation();
  if (isLoading && !isLoadMore) return <Loading />;

  return (
    <>
      <div className="bg-gray-200 md:bg-white w-full h-auto min-h-screen md:space-y-5">
        <NavigationWeb />
        <div className=" mx-auto">
          <div className="default-margin-layout md:space-y-5">
            <div
              className="hidden md:flex space-x-2 items-center cursor-pointer"
              onClick={goBackTo}
            >
              <div className="w-3 h-auto ">
                <img
                  src={BackArrowIcon}
                  className="w-full h-full"
                  alt="Back Arrow Icon"
                />
              </div>
              <p className="tertiary-font text-color-secondary">
                {t("Common.back")}
              </p>
            </div>
            <div className="sticky top-0 z-50">
            <SubHeadingWithBackArrow goTo={goBackTo} >
              <p className="text-color-default sub-heading-font ">
                {t("ProductDetails.QuestionAndAnswer")} ( {questionCount.ref} )
              </p>
              </SubHeadingWithBackArrow>
              </div>
            {/* For wev view question */}
          <div className=" hidden md:block fixed  bottom-0 z-10 md:relative bg-white w-full md:w-9/12 md:mx-auto h-auto py-4 md:py-0 border-t md:border-t-0">
          <form className="flex space-x-2 items-center mx-4 md:mx-0">
            <textarea
              id="textBox"
              rows="1"
              className="py-3 shadow-md bg-gray-100 w-full h-auto px-5 rounded-full focus:outline-none focus:ring focus:border-blue-300 primary-font font-normal"
              placeholder={t("ProductDetails.ask-question")}
              value={textValue}
              onInput={(e) => onChangeSendTextBox(e)}
              autoFocus
            />
            <div>
              <div className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-100">
                {textValue ? (
                  <img
                    src={SendActiveIcon}
                    className="w-4 h-auto cursor-pointer"
                    alt="Send Active Icon"
                    onClick={uploadQuestion}
                  />
                ) : (
                  <img
                    src={SendNoActiveIcon}
                    className="w-4 h-auto"
                    alt="Send No Active Icon"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
            {/* End for web view question */}
            <div className="w-full h-screen overflow-y-auto relative">
              <div className="bg-white md:py-4">
                <div className="">
                  <p className="text-color-default sub-heading-font font-semibold hidden md:block">
                    {t("ProductDetails.QuestionAndAnswer")} {" "}(
                    {parseInt(questionCount.ref) + tempQACount})
                  </p>
                </div>
              </div>
              <QuestionList
                IsSecondaryLoading={isSecondaryLoading}
                IsSuccess={isSuccess}
                QList={questionAndAnswerList}
                QListByBuyer={questionAndAnswerListByUser}
                TempUploadedQuestion={tempUploadQuestion}
                UserName={userName}
                IsLoadMore={isLoadMore}
                QuestionCount={questionCount.ref || 0}
                /**
                 * action
                 */
                confirmingDeleteQuestion={deleteQuestion}
                clickOnLoadMore={loadMoreQuestions}
              />
            </div>
          </div>
        </div>
        {/* For mobile question */}
        <div className="block md:hidden fixed bottom-0 z-10 md:relative bg-white w-full md:w-9/12 md:mx-auto h-auto py-4 md:py-0 border-t md:border-t-0">
          <form className="flex space-x-2 items-center mx-4 md:mx-0">
            <textarea
              id="textBox"
              rows="1"
              className="py-3 shadow-md bg-gray-100 w-full h-auto px-5 rounded-full focus:outline-none focus:ring focus:border-blue-300 primary-font font-normal"
              placeholder={t("ProductDetails.ask-question")}
              value={textValue}
              onInput={(e) => onChangeSendTextBox(e)}
              autoFocus
            />
            <div>
              <div className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-100">
                {textValue ? (
                  <img
                    src={SendActiveIcon}
                    className="w-4 h-auto cursor-pointer"
                    alt="Send Active Icon"
                    onClick={uploadQuestion}
                  />
                ) : (
                  <img
                    src={SendNoActiveIcon}
                    className="w-4 h-auto"
                    alt="Send No Active Icon"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
        {/* End mobile question */}
        <FooterWeb />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        limit={3}
        closeOnClick
        draggable
        hideProgressBar={true}
      />
    </>
  );
};

export default QuestionAndAnswer;
