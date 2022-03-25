import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
// import parse from "html-react-parser";
// import $ from 'jquery';

/**
 * util functions
 */
import { tagToText } from './../../../../util/tagToText'

const ProductDescription = ({ Description }) => {
  const { t } = useTranslation()
  const [isMore, setIsMore] = useState(false)
  const LimitTextNumber = 200

  const desc = tagToText(Description)

  if (Description)
    return (
      <>
        <div className="py-4">
          <div className="mx-4 space-y-4">
            <p className="text-color-default section-title-font">
              {t('ProductDetails.product-description')}
            </p>
            {Description.length > LimitTextNumber ? (
              <>
                {isMore ? (
                  <>
                    <div className="primary-font text-color-default">
                      {desc}
                    </div>
                    <div className="w-full h-auto flex justify-center">
                      <button
                        className="text-color-secondary tertiary-font"
                        onClick={() => setIsMore(!isMore)}
                      >
                        {t('ProductDetails.read-less')}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="primary-font text-color-default line-clamp-2 page-content.entry-content pre">
                      {desc}
                    </p>
                    <div className="w-full h-auto flex justify-center">
                      <button
                        className="text-color-secondary tertiary-font"
                        onClick={() => setIsMore(!isMore)}
                      >
                        {t('ProductDetails.read-more')}
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="primary-font text-color-default page-content.entry-content pre">
                  {desc}
                </div>
              </>
            )}
          </div>
        </div>
      </>
    )

  return null
}

export default ProductDescription
