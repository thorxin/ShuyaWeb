import React from 'react'
import { useTranslation } from 'react-i18next'

//components
import moneyFormatter from '../../../util/moneyFormatter'
import PlaceHolder from '../../../assets/Images/Asset17.svg'
import { DEFAULT } from '../../../constant/address'

const Item = ({ item = {}, DiscountPrice }) => {
  const { t } = useTranslation()

  console.log(item)

  let PriceLabel = (
    <>
      <p className="price-font">
        <span className="text-color-default">{item.qty} &nbsp; x &nbsp;</span>
        <span className="text-color-primary custom-font-bold">
          {moneyFormatter(item.originalPrice)} {t('Common.kyats')}
        </span>
      </p>
    </>
  )
  if (item.promotePercent > 0)
    PriceLabel = (
      <>
        <div className="flex items-center space-x-2">
          <p className="price-font">
            <span className="text-color-default">
              {item.qty} &nbsp; x &nbsp;
            </span>
            <span className="text-color-primary custom-font-bold">
              {moneyFormatter(item.promotePrice)} {t('Common.kyats')}
              {/* {moneyFormatter(((100 - item.promotePercent)/100)*(item.originalPrice))} {t("Common.kyats")} */}
            </span>
          </p>
          <p className="primary-font text-color-secondary line-through">
            {moneyFormatter(item.originalPrice)} {t('Common.kyats')}
          </p>
        </div>
      </>
    )

  return (
    <>
      <div className="flex space-x-3">
        <div className="w-2/12 md:w-2/12 h-auto">
          <img
            src={item.url}
            className="w-full border-2 border-gray-200"
            alt="Display"
          />
        </div>
        <div className="w-9/12 h-auto space-y-1">
          <p className="primary-font text-color-default custom-font-bold">
            {item.name}
          </p>
          <div className="grid grid-cols-1">
            <div>
              <p className="primary-font text-color-default">
                {item.skuValue === 'Default' ? '' : item.skuValue}
                {/* {item.isGetOne === true ? <div className="bg-custom-orange-light w-20 h-5 md:mt-2 mt-1 text-color-white tertiary-font px-1">Buy 1 Get 1</div> :<p></p>} */}
              </p>
              <div>
                {item.isGetOne && (
                  <div className="flex  gap-2 items-center mt-1">
                    <img
                      src={item?.promotionGetOne.url}
                      className="w-7 h-full object-contain"
                      alt="ItemImage"
                    />
                    <article>
                      <p>Get Product</p>
                      <p className="tertiary-font text-base text-color-secondary">
                        {item.promotionGetOne?.getOneProductName}
                      </p>
                      <p>
                        {
                          item.promotionGetOne.getProductDetailSkuValueForGetOne
                            .value
                        }{' '}
                        / 1 item
                      </p>
                    </article>
                  </div>
                )}
              </div>
            </div>

            <div className="justify-self-end space-y-1">{PriceLabel}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item
