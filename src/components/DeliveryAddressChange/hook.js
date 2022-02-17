import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export function Hook({
    deliveryAddress = [],
    /* action */
    fetchDeliveryAddress,
    updateSelectedDeliveryAddress,
    delete_address
}) {
    let history = useHistory();
    const [selectedVal, setSelectedVal] = useState(0);
    const [originVal, setOriginVal] = useState(0);
    const goBack = () => {
        history.goBack();
    };

    useEffect(() => {
        fetchDeliveryAddress();
    }, []);

    useEffect(() => {
        if (deliveryAddress.length > 0) {
            let filterVal = deliveryAddress.filter(data => data.selected);
            if (filterVal.length === 0) return;
            setSelectedVal(filterVal[0].id);
            setOriginVal(filterVal[0].id);
        }
    }, [deliveryAddress])

    const changedSelectedDeliveryAddress = async () => {
        await updateSelectedDeliveryAddress({
            productCarts: [],
            deliveryAddressId: parseInt(selectedVal)
        });
        goBack();
    }

    return [
        selectedVal,
        setSelectedVal,
        originVal,
        /**
         * action
         */
        goBack,
        changedSelectedDeliveryAddress,
        delete_address
    ];
}
