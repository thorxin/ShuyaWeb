import React from "react";
import { useTranslation } from "react-i18next";

//components
import ListItem from "./ListItem";
import HeadingLayout from "../Common/HeadingLayout";
import NoQuestion from "../../QuestionAndAnswer/CommonUI/no_question";

//images
import QuestionIcon from "../../../assets/productDetail/question_icon.svg";
import AnswerIcon from "../../../assets/productDetail/answer_icon.svg";

const QuestionAndAnswer = ({
  List = [],
  QuestionCount,
  /**
   * action
   */
  clickingOnAskQuestion,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="bg-white py-4 mt-2 space-y-4">
        <div className="space-y-4">
          {List.length > 0 ?
             <HeadingLayout
            HeadingText={`${t(
              "ProductDetails.QuestionAndAnswer"
            )} (${QuestionCount})`}
            ViewMoreText={t("Common.view-more")}
            clickOnViewMore={clickingOnAskQuestion}
            />
            :
             <HeadingLayout
            HeadingText={`${t(
              "ProductDetails.QuestionAndAnswer"
            )} (${QuestionCount})`}
            ViewMoreText=""
            clickOnViewMore={clickingOnAskQuestion}
            />
          }
         
          {List.length > 0 ? (
            <div className="grid grid-cols-1 gap-y-5 mx-4 md:mx-0">
              {List.map((list, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    Image={QuestionIcon}
                    Text={list.text}
                    Name={list.name}
                    Date={list.createdDateTime}
                  />
                  {list.anserResponse.answerId > 0 && (
                    <ListItem
                      Image={AnswerIcon}
                      Text={list.anserResponse.text}
                      Name={`${list.name} | Answer`}
                      Date={list.anserResponse.createdDateTime}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <NoQuestion />
          )}
        </div>
        <div className="w-full h-0.5 bg-gray-200" />
        <div className="w-6/12 bg-custom-orange rounded-xl py-1 flext justify-center align-middle mx-auto">
          <p
            className="text-center text-color-white cursor-pointer"
            onClick={clickingOnAskQuestion}
          >
            {t("ProductDetails.ask-question")}
          </p>
        </div>
      </div>
    </>
  );
};

export default QuestionAndAnswer;
