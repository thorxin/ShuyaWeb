import React from 'react';

// Components
import POSInvoice from './POSInvoice';
import { Hook } from './Hook';
import Loading from "../CommonComponent/Loading/main_loading";
import { useTranslation } from 'react-i18next';

export default function VoucherPrint(props) {
    const [
        isLoading,
        posVoucher,
        /**
         * action
         */
        goBack
    ] = Hook(props)

    const { t } = useTranslation();

    if (isLoading || !posVoucher) return (
        <Loading />
    )

    return (
        <>
            <POSInvoice posVoucher={posVoucher} back={goBack}/>
        </>
    )
}