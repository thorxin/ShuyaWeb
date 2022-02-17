import React from "react";

//components
import DialogBox from "../../CommonComponent/DialogBox/dialog_box";
import CrossSign from "../../../assets/common/cancel_cross_icon.svg";

export const PaymentServiceBox = ({
  isOpenBox,
  GateWay,
  /**
   * action
   */
  closeBox,
  clickServiceGateWay
}) => {

  return (
    <DialogBox isOpen={isOpenBox} closeModal={closeBox}>
      <div className="w-10/12 h-auto max-w-sm mx-auto">
        <div className="bg-white rounded-lg shadow-lg bg-opacity-0 backdrop-filter backdrop-blur-sm">
          <div className="default-margin-layout space-y-8 py-3">
            <div className="space-y-2">
              {Array.isArray(GateWay) &&
                GateWay.length > 0 &&
                GateWay.map((gateway) => (
                  <div key={gateway.id} onClick={() => clickServiceGateWay(gateway.isPaymentGateWay, gateway.id)}>
                    <img
                      src={gateway.url}
                      className="w-full h-auto cursor-pointer"
                      alt="PaymentServiceGateWayImage"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </DialogBox>
  );
};
