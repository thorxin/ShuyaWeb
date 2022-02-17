import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

// images
import leftArrow from '../../../assets/Images/leftArrow.png'

//components
import NavigationWeb from '../../CommonComponent/Navigation/NavigationWeb'
import FooterWeb from '../../CommonComponent/Footer/web_footer'
import FooterMobile from '../../CommonComponent/Footer/mobile_footer'
import moneyFormatter from '../../../util/moneyFormatter'
import { APP_NAME } from '../../../constant/appName'

const Index = ({ posVoucher = {}, back }) => {
  const { t } = useTranslation()
  const ItemList = _.cloneDeep(posVoucher && posVoucher.itemList)

  return (
    <>
      <div className="bg-gray-200 w-full h-auto min-h-screen md:space-y-5">
        <NavigationWeb />
        <div className=" mx-auto space-y-5">
          <div className="w-full md:w-7/12 2xl:w-7/12 h-auto mx-auto">
            <div className="bg-white">
              <div
                className="visible sm:invisible my-3 mb-3 ml-4"
                onClick={back}
              >
                <div className="flex justify-between items-center default-margin-layout md:my-2 custom-font-regular">
                  <img
                    className="object-scale-down float-left h-5 w-5"
                    src={leftArrow}
                    alt="Display"
                  />
                  <div className="font-medium">{t('AddFixed.get-voucher')}</div>
                  <div></div>
                </div>
                <hr className="bg-gray-200 mt-2" />
              </div>
              <div className="text-center space-y-2 pt-4 custom-font-regular">
                <div className="custom-font-bold sub-heading-font">
                  {posVoucher.shopName}
                </div>
                <div className="lg:mx-80">
                  {posVoucher.address
                    ? posVoucher.address.split(',').join(', ')
                    : ''}
                </div>
                <div>{posVoucher.phoneNo.replace(/(\d{2})/, '$1-')}</div>
                <div>Voucher ID: {posVoucher.voucherNo}</div>
              </div>
              <div className="mx-6 space-y-2 mt-4">
                <div className="flow-root ">
                  <div className="float-left">
                    Order ID: {posVoucher.voucherNo}
                  </div>
                  <div className="float-right">
                    {moment(posVoucher.orderDate)
                      .format('DD/MM/YYYY h:mm a')
                      .toUpperCase()}
                  </div>
                </div>
                <div className="flow-root ">
                  <div className="float-left">
                    Counter: {posVoucher.counter ? posVoucher.counter : ''}
                  </div>
                  <div className="float-right">
                    Cashier: {posVoucher.cashier}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-none w-8">Qty</div>
                  <div className="flex-grow pt-3">
                    <p className="border-dashed border border-gray-600"></p>
                  </div>
                  <div className="flex-none w-4 ml-2">Ks</div>
                </div>
                {Array.isArray(ItemList) &&
                  ItemList.length > 0 &&
                  ItemList.map((item, index) => (
                    <div key={index}>
                      <div className="flow-root ">
                        <div className="float-left">
                          {item.qty} &nbsp; &nbsp; {item.name}
                        </div>
                        <div className="float-right">
                          {moneyFormatter(item.originalPrice)}
                        </div>
                      </div>
                      {item.isGetOne && (
                        <div className="flow-root ">
                          <div className="float-left">
                            {item.qty} &nbsp; &nbsp;{' '}
                            {item?.promotionGetOne.getOneProductName} (Buy 1 Get
                            1)
                          </div>
                          <div className="float-right">
                            {moneyFormatter(
                              item?.promotionGetOne.getOneOriginalPrice,
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                <p className="border-dashed border border-gray-600"></p>
                <div className="flow-root ">
                  <p className="float-left">Sub Total</p>
                  <div className="float-right">
                    {moneyFormatter(posVoucher.totalAmount)}
                  </div>
                </div>
                <div className="flow-root ">
                  <div className="float-left">Delivery</div>
                  <div className="float-right">
                    {posVoucher.deliveryAmount > 0
                      ? moneyFormatter(posVoucher.deliveryAmount)
                      : '-'}
                  </div>
                </div>
                <div className="flow-root ">
                  <div className="float-left">Discount</div>
                  <div className="float-right">
                    {posVoucher.discount > 0
                      ? moneyFormatter(posVoucher.discount)
                      : '-'}
                  </div>
                </div>
                <p className="border-dashed border border-gray-600"></p>
                <div className="flow-root ">
                  <div className="float-left">Total</div>
                  <div className="float-right">
                    Ks {moneyFormatter(posVoucher.netAmount)}
                  </div>
                </div>
                <p className="border-dashed border border-gray-600"></p>
                <div className="flow-root ">
                  <div className="float-left">Paid By</div>
                  <div className="float-right">{posVoucher.paymentType}</div>
                </div>
                <p className="border-dashed border border-gray-600"></p>
                <div className="text-center">
                  <img
                    src={posVoucher.qrCode}
                    alt="QR Code"
                    className="d-block mx-auto w-1/4"
                  />
                  <div className="text-center font-weight-bold pb-4">
                    {' '}
                    Thank you for buying with {APP_NAME}{' '}
                  </div>
                </div>
              </div>
              <div className="lg:bg-gray-200 lg:h-5"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
