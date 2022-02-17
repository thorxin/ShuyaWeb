/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';

//components
import moneyFormatter from '../../../util/moneyFormatter';

export const AmountLabel = ({ Label, Amount, currency, color }) => {
  return (
    <>
      <div>
        <p className='primary-font text-color-secondary custom-font-bold'>
          {Label}
        </p>
      </div>
      <div>
        <p className={`primary-font text-color-default text-right ${color}`}>
          {moneyFormatter(Amount)} {currency}
        </p>
      </div>
    </>
  );
};

const PaymentInfo = ({
  FromDeliveryDay,
  ToDeliveryDay,
  TotalAmt,
  SubAmt,
  DeliveryFee,
  CommercialTax,
  Discount,
}) => {
  const { t } = useTranslation();
  return (
    <div className='grid grid-cols-2 gap-y-3'>
      <AmountLabel
        Label={t('ShoppingCart.delivery-time')}
        Amount={`${FromDeliveryDay > 0 ? FromDeliveryDay : '-'} ${t(
          'Common.day'
        )} - ${ToDeliveryDay > 0 ? ToDeliveryDay : ''} ${t('Common.day')}`}
      />
      <AmountLabel
        Label={t('ShoppingCart.sub-total')}
        Amount={SubAmt}
        currency={t('Common.kyats')}
      />
      <AmountLabel
        Label={t('ShoppingCart.delivery-fee')}
        Amount={DeliveryFee > 0 ? DeliveryFee : '-'}
        currency={t('Common.kyats')}
      />
      {/* <AmountLabel
        Label={t("ShoppingCart.discount")}
        Amount={Discount > 0 ? Discount : "-"}
        currency={t("Common.kyats")}
      /> */}
      {/* <AmountLabel
        Label={t("ShoppingCart.commarcial-tax")}
        Amount={CommercialTax > 0 ? CommercialTax : "-"}
        currency={t("Common.kyats")}
      /> */}
      <AmountLabel
        Label={t('ShoppingCart.total')}
        Amount={DeliveryFee + SubAmt}
        currency={t('Common.kyats')}
        color={'text-color-primary'}
      />
    </div>
  );
};

export default PaymentInfo;
