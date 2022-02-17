import React from "react";
import { useTranslation } from "react-i18next";

//components
import moneyFormatter from "../../../util/moneyFormatter";

const CostLabel = ({ OriginalPrice, PromotePrice }) => {

    const {t} = useTranslation();

  if (PromotePrice > 0)
    return (
      <div className="flex items-center space-x-2">
        <p className="primary-font text-color-primary custom-font-bold">
            {moneyFormatter(PromotePrice)} {t('Common.kyats')}
        </p>
        <p className="tertiary-font text-color-secondary line-through">
          {moneyFormatter(OriginalPrice)} {t('Common.kyats')}
        </p>
      </div>
    );

    return (
        <div >
            <p className="primary-font text-color-primary custom-font-bold">
                {moneyFormatter(OriginalPrice)} {t('Common.kyats')}
            </p>
        </div>
    )
};

export default CostLabel;
