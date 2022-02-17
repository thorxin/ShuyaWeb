import React, {useEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export function Hook({
    isLoading,
    posVoucher,
    Message,
    /**
     * action
     */
    fetchPOSVoucher
}) {
    const history = useHistory();
    const Location = useLocation();
    const OrderID = Location.state;
    
    const goBack = () => {
       history.goBack();
    }

    useEffect(() => {
        if(OrderID) {
            fetchPOSVoucher(OrderID);
        }
    }, [OrderID])

    return [
        isLoading,
        posVoucher,
        /**
         * action
         */
        goBack
    ]
}
