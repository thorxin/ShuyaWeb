import React from 'react'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//components
import { Hook } from './hook'
import NavigationWeb from '../../CommonComponent/Navigation/NavigationWeb'
import FooterWeb from '../../CommonComponent/Footer/web_footer'
import FooterMobile from '../../CommonComponent/Footer/mobile_footer'
import OrderHistoryItems from './order_history_items'
import OrderHistoryItemFrame from './order_history_items_frame'
import OrderStatusDropDownItems from './order_status_drop_down_items'
import VoucherNoSuggestionDropDownItems from './voucher_no_drop_down_items'
import { DELETED } from '../../../constant/order'
import { VOUCHER_NO, ORDER_STATUS, PAYMENT_STATUS } from './util'

//images
import DownArrowIcon from '../../../assets/common/down_arrow.svg'
import CrossSignIcon from '../../../assets/common/cancel_cross_icon.svg'
import SearchIcon from '../../../assets/productSearch/search_gray_icon.svg'
import NoResultFoundIcon from '../../../assets/common/result_not_found_icon.png'
import TrashIcon from '../../../assets/common/trash_icon_white.svg'
import LoadMoreButton from '../../CommonComponent/LoadMoreButton'

export default function OrderHistory(props) {
  const [
    isLoading,
    isSecondaryLoading,
    orderHistoryList,
    selectedPaymentDate,
    selectedOrderDate,
    isShowOrderStatusList,
    isShowPaymentStatusList,
    OrderStatus,
    PaymentStatus,
    selectedOrderStatus,
    selectedPaymentStatus,
    voucherNoSuggestion,
    isFocusTextBox,
    voucherInputValue,
    isLoadMore,
    statusCode,
    voucherSuggestionBox,
    orderDropDown,
    paymentDropdown,
    /**
     * action
     */
    searchOnOrderStatus,
    searchOnPaymentStatus,
    clearOrderStatusDropDown,
    clearPaymentStatusDropDown,
    searchOnVoucherNo,
    onChangeOrderNo,
    clearAllVoucherInput,
    searchOnPaymentDate,
    searchOnOrderDate,
    onKeyPressEnter,
    clickOnLoadMoreBtn,
    openBox,
  ] = Hook(props)

  const { t } = useTranslation()

  return (
    <>
      <div className="bg-gray-200 w-full h-auto min-h-screen md:space-y-5">
        <NavigationWeb />
        <div className=" mx-auto space-y-5 md:pt-20">
          <div className="default-margin-layout">
            <div className="sticky top-0 z-10 md:relative">
              <div className="bg-white py-3">
                <p className="mx-4 md:mx-8 primary-font font-semibold text-color-primary">
                  {t('OrderHistory.order-history')}
                </p>
              </div>
              <div className="bg-white py-4 md:py-5 md:mt-1 -mt-4">
                <div className="mx-4 md:mx-8">
                  <div className="grid grid-cols-1 gap-y-3">
                    {/* Search By Voucher No */}
                    <div className="relative">
                      <div className="relative">
                        <input
                          type="tel"
                          id="voucherInput"
                          className="secondary-text-box py-2 pl-3 pr-10 appearance-none"
                          placeholder={t('OrderHistory.search-voucher-no')}
                          value={voucherInputValue}
                          onChange={(e) => onChangeOrderNo(e.target.value)}
                          onClick={() => openBox(VOUCHER_NO)}
                          onKeyPress={onKeyPressEnter}
                          // onBlur={() => setIsFocusTextBox(false)}
                        />
                        <div className="absolute top-3 right-4">
                          {voucherInputValue ? (
                            <img
                              src={CrossSignIcon}
                              className="w-3 h-auto cursor-pointer"
                              alt="ClearAllIcon"
                              onClick={clearAllVoucherInput}
                            />
                          ) : (
                            <img
                              src={SearchIcon}
                              className="w-3 h-auto"
                              alt="Search Icon"
                            />
                          )}
                        </div>
                      </div>
                      <div
                        ref={voucherSuggestionBox}
                        className={`${isFocusTextBox ? 'block' : 'hidden'}`}
                      >
                        <VoucherNoSuggestionDropDownItems
                          Loading={isSecondaryLoading}
                          VoucherNoArrayList={voucherNoSuggestion}
                          /**
                           * action
                           */
                          clickOnVoucherNo={searchOnVoucherNo}
                        />
                      </div>
                    </div>
                    {/* End Search By Voucher No */}
                    <div className="grid grid-cols-2 gap-x-3 md:col-span-4">
                      {/* Payment Status */}
                      <div className="relative cursor-pointer">
                        <div
                          className={`${
                            isShowPaymentStatusList ? 'ring-2' : 'ring-0'
                          } secondary-text-box py-2 px-3 flex justify-between items-center`}
                          onClick={() => openBox(PAYMENT_STATUS)}
                        >
                          {selectedPaymentStatus ? (
                            <>
                              <p className="text-left text-default-secondary">
                                {selectedPaymentStatus.name}
                              </p>
                              <div onClick={clearPaymentStatusDropDown}>
                                <img
                                  src={CrossSignIcon}
                                  className="w-3 h-auto"
                                  alt="DownArrowIcon"
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="text-left text-color-secondary">
                                {t('OrderHistory.payment-status')}
                              </p>
                              <div>
                                <img
                                  src={DownArrowIcon}
                                  className="w-3 h-auto"
                                  alt="DownArrowIcon"
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <div
                          ref={paymentDropdown}
                          className={`${
                            isShowPaymentStatusList ? 'block' : 'hidden'
                          }`}
                        >
                          <OrderStatusDropDownItems
                            DropDownItemArray={PaymentStatus}
                            SelectedOrderStatus={selectedPaymentStatus}
                            /**
                             * action
                             */
                            onClickItem={searchOnPaymentStatus}
                          />
                        </div>
                      </div>
                      {/* End Payment Status */}
                      {/* Order Status Drop Down */}
                      <div className="relative cursor-pointer">
                        <div
                          className={`${
                            isShowOrderStatusList ? 'ring-2' : 'ring-0'
                          } secondary-text-box py-2 px-3 flex justify-between items-center`}
                          onClick={() => openBox(ORDER_STATUS)}
                        >
                          {selectedOrderStatus ? (
                            <>
                              <p className="text-left text-default-secondary">
                                {selectedOrderStatus.name}
                              </p>
                              <div onClick={clearOrderStatusDropDown}>
                                <img
                                  src={CrossSignIcon}
                                  className="w-3 h-auto"
                                  alt="DownArrowIcon"
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="text-left text-color-secondary">
                                {t('OrderHistory.order-status')}
                              </p>
                              <div>
                                <img
                                  src={DownArrowIcon}
                                  className="w-3 h-auto"
                                  alt="DownArrowIcon"
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <div
                          ref={orderDropDown}
                          className={`${
                            isShowOrderStatusList ? 'block' : 'hidden'
                          }`}
                        >
                          <OrderStatusDropDownItems
                            DropDownItemArray={OrderStatus}
                            SelectedOrderStatus={selectedOrderStatus}
                            /**
                             * action
                             */
                            onClickItem={searchOnOrderStatus}
                          />
                        </div>
                      </div>
                      {/* End Order Status Drop Down */}
                    </div>

                    <div className="grid grid-cols-2 gap-x-3 md:col-span-4">
                      <DatePicker
                        selected={selectedPaymentDate}
                        onChange={(date) => searchOnPaymentDate(date)}
                        placeholderText={t('OrderHistory.payment-date')}
                        className="secondary-text-box py-2 px-3 cursor-pointer"
                        withPortal
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />

                      <DatePicker
                        selected={selectedOrderDate}
                        onChange={(date) => searchOnOrderDate(date)}
                        placeholderText={t('OrderHistory.order-date')}
                        className="secondary-text-box py-2 px-3 cursor-pointer"
                        withPortal
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <OrderHistoryItemFrame loading={isLoading} isLoadMore={isLoadMore}>
              {orderHistoryList.length > 0 ? (
                <>
                  {orderHistoryList.map((order, index) => (
                    <div key={index}>
                      {order.orderStatusId === DELETED && (
                        <div className="bg-red-500 w-11/12 md:w-full h-auto mx-auto py-1">
                          <div className="flex space-x-3 justify-center items-center">
                            <div>
                              <img
                                src={TrashIcon}
                                className="w-3 h-auto"
                                alt="Trash Icon"
                              />
                            </div>
                            <p className="tertiary-font text-color-white">
                              {t('OrderDetail.order-deleted')}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="w-11/12 md:w-full h-auto mx-auto bg-white py-4 md:py-5 cursor-pointer hover:bg-gray-100">
                        <div className="mx-4 md:mx-8">
                          <OrderHistoryItems Order={order} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="w-full h-auto">
                    {statusCode === 400 || orderHistoryList.length < 10 ? (
                      <p className="caption-font text-color-secondary text-center">
                        No More Data
                      </p>
                    ) : (
                      <LoadMoreButton
                        IsLoading={isLoading}
                        IsLoadMore={isLoadMore}
                        /**
                         * action
                         */
                        ClickingOnLoadMoreBtn={clickOnLoadMoreBtn}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="flex justify-center mt-20">
                  <div>
                    <img
                      src={NoResultFoundIcon}
                      className="w-28 h-auto"
                      alt="NoResultFound"
                    />
                  </div>
                </div>
              )}
            </OrderHistoryItemFrame>
          </div>
        </div>
      </div>
      <FooterWeb />
      <FooterMobile />
    </>
  )
}
