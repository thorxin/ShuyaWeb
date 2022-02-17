import React from 'react'
import { useTranslation } from 'react-i18next';

//images
import NoQuestionImage from "../../../assets/common/result_not_found_icon.png"; 

const NoQuestion = () => {
    const {t} = useTranslation();
    return (
        <>
            <div className="w-full h-auto space-y-2">
              <img src={NoQuestionImage} className="w-20 h-auto mx-auto" alt="No Question Image" />
              <p className="caption-font text-center text-color-secondary">{t("ProductDetails.no-question")}</p>
            </div>
        </>
    )
}

export default NoQuestion;
