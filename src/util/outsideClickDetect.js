import { useEffect } from "react";
const UserOutsideClick = (ref, callBack) => {
    useEffect(() => {
        /**
         * Below functiong will process if end user clicked on outside of element
         */
        function handleOutOfSpaceAction(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callBack();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleOutOfSpaceAction);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleOutOfSpaceAction);
        };
    }, [ref]);
}
export default UserOutsideClick;