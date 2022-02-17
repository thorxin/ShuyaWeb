import React from "react";
import { useTranslation } from "react-i18next";

import ListItem from "../../ProductDetails/QuestionAndAnswer/ListItem";

//images
import QuestionIcon from "../../../assets/productDetail/question_icon.svg";
import AnswerIcon from "../../../assets/productDetail/answer_icon.svg";
import NoQuestion from "../CommonUI/no_question";
import LoadMoreButton from "../../CommonComponent/LoadMoreButton";

const QuestionList = ({
  IsSecondaryLoading,
  IsSuccess,
  QList = [],
  QListByBuyer = [],
  TempUploadedQuestion,
  UserName,
  IsLoadMore,
  QuestionCount,
  /**
   * action
   */
  confirmingDeleteQuestion,
  clickOnLoadMore,
}) => {
  const { t } = useTranslation();

  if (QList.length <= 0 && TempUploadedQuestion.length <= 0)
    return (
      <div className="bg-white  pt-10">
        <NoQuestion />
      </div>
    );

  return (
    <>
      <div className="mb-10 md:mb-0">
        <div className="bg-white">
          <div className="mx-2 md:mx-auto space-y-5">
            {/* My Questions */}
            {(QListByBuyer.length > 0 || TempUploadedQuestion.length > 0) && (
              <>
                <p className="sub-heading-font pt-2 mx-4 md:mx-0">
                  {t("ProductDetails.my-question")}
                </p>
                {TempUploadedQuestion.length > 0 &&
                  TempUploadedQuestion.map((temp_q, index) => (
                    <div
                      key={index}
                      className={`${IsSecondaryLoading && "animate-pulse"
                        } py-4 px-3 bg-gray-100 space-y-5`}
                    >
                      <ListItem
                        Image={QuestionIcon}
                        Text={temp_q.text}
                        Name={temp_q.name}
                        Date={temp_q.createdDateTime}
                        IsMyQuestion={temp_q.name === UserName}
                        IsValid={IsSuccess}
                        /**
                          * action
                          */
                        confirmDeleteQuestion={() =>
                          confirmingDeleteQuestion(temp_q.questionId)
                        }
                      />
                      {/* <div className="w-full h-0.5 bg-gray-200" /> */}
                    </div>
                  ))}
                {QListByBuyer.map((list, index) => (
                  <div key={index} className="bg-gray-100 py-4 px-3 space-y-5">
                    <ListItem
                      Image={QuestionIcon}
                      Text={list.text}
                      Name={list.name}
                      Date={list.createdDateTime}
                      IsMyQuestion={list.name === UserName}
                      /**
                       * action
                       */
                      confirmDeleteQuestion={() =>
                        confirmingDeleteQuestion(list.questionId)
                      }
                    />
                    <ListItem
                      Image={AnswerIcon}
                      Text={list.anserResponse.text}
                      Name={"ShopDoora | answered"}
                      Date={list.anserResponse.createdDateTime}
                    />
                    {/* {QListByBuyer.length - 1 !== index && (
                      <div className="w-full h-0.5 bg-gray-200" />
                    )} */}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="bg-white py-3 mt-2 mb-20 md:mb-0">
          {/* All Question */}
          <div className="md:mx-auto mx-2 space-y-5">
            <>
              <p className="sub-heading-font mx-4 md:mx-0">
                {t("ProductDetails.all-questions")}
              </p>
              {TempUploadedQuestion.length > 0 &&
                TempUploadedQuestion.map((temp_q, index) => (
                  <div
                    key={index}
                    className={`${IsSecondaryLoading && "animate-pulse"
                      } py-4 px-3 bg-gray-100 space-y-5`}
                  >
                    <ListItem
                      Image={QuestionIcon}
                      Text={temp_q.text}
                      Name={temp_q.name}
                      Date={temp_q.createdDateTime}
                      IsMyQuestion={temp_q.name === UserName}
                      IsValid={IsSuccess}
                       /**
                      * action
                      */
                        confirmDeleteQuestion={() =>
                          confirmingDeleteQuestion(temp_q.questionId)
                        }
                    />
                    {/* <div className="w-full h-0.5 bg-gray-200" /> */}
                  </div>
                ))}
              {QList.map((list, index) => (
                <div key={index} className="py-4 px-3 bg-gray-100">
                  <ListItem
                    Image={QuestionIcon}
                    Text={list.text}
                    Name={list.name}
                    Date={list.createdDateTime}
                    IsMyQuestion={list.name === UserName}
                    /**
                     * action
                     */
                    confirmDeleteQuestion={() =>
                      confirmingDeleteQuestion(list.questionId)
                    }
                  />
                  <ListItem
                    Image={AnswerIcon}
                    Text={list.anserResponse.text}
                    Name={"ShopDoora | answered"}
                    Date={list.anserResponse.createdDateTime}
                  />
                  {/* {QList.length - 1 !== index && (
                    <div className="w-full h-0.5 bg-gray-200" />
                  )} */}
                </div>
              ))}
            </>
            {Number(QuestionCount) === QList.length ? (
              <p className="caption-font text-color-secondary text-center">
                No More Data
              </p>
            ) : (
              <LoadMoreButton
                IsLoading={IsSecondaryLoading}
                IsLoadMore={IsLoadMore}
                /**
                 * action
                 */
                ClickingOnLoadMoreBtn={clickOnLoadMore}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionList;
