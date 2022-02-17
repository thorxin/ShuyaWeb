import { useLocation } from "react-router-dom";

//components
import {HOME_DEFAULT, HOME, ORDER_HISTORY, NOTIFICATION, MY_ACCOUNT} from "../constant/locationPathName";

const RoutingLocationPath = () => {

    const location = useLocation();
    const pathName = (location.pathname).toLowerCase() || '';

    const IS_LANDING = (pathName === HOME_DEFAULT || pathName === HOME);
    const IS_ORDER_HISTORY = (pathName === ORDER_HISTORY);
    const IS_NOTIFICATION = (pathName === NOTIFICATION);
    const IS_MY_ACCOUNT = (pathName === MY_ACCOUNT);

    return {
        IS_LANDING,
        IS_ORDER_HISTORY,
        IS_NOTIFICATION,
        IS_MY_ACCOUNT
    };
    
}
export default RoutingLocationPath;