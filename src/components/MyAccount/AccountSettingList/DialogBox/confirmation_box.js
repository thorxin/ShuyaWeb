import React from 'react'
import { useTranslation } from 'react-i18next'
import DialogBox from './dialog_box'

const ConfirmationBox = ({
  isOpenBox,
  Icon = '',
  ConfirmationMessage = '',
  /**
   * action
   */
  cancelBox,
  confirmBox,
}) => {
  const { t } = useTranslation()
  return (
    <>
      <DialogBox isOpen={isOpenBox} closeModal={cancelBox}>
        <div className="md:w-4/12 w-10/12 h-auto mx-auto">
          <div className="bg-white rounded-lg shadow-lg backdrop-filter backdrop-blur-sm py-10">
            <div className="default-margin-layout space-y-10">
              {Icon && (
                <div>
                  <img
                    src={Icon}
                    className="w-10 h-auto mx-auto"
                    alt="Confirm Icon"
                  />
                </div>
              )}
              <p className="tertiary-font text-center text-color-default">
                {ConfirmationMessage}
              </p>
              <div className="grid grid-cols-2 gap-x-2 mx-4">
                <div>
                  <button
                    className="secondary-btn tertiary-font py-2 border-custom-primary"
                    onClick={cancelBox}
                  >
                    {t('AddFixed.not-do')}
                  </button>
                </div>
                <div>
                  <button
                    className="primary-btn bg-custom-primary tertiary-font py-2"
                    onClick={confirmBox}
                  >
                    {t('AddFixed.do')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogBox>
    </>
  )
}

export default ConfirmationBox
