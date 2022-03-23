import React, { useState } from 'react'

//images
import PlaceHolderImage from '../../../../assets/common/placeholder_icon.svg'

/**
 * Common component
 */
import DialogBox from '../../../CommonComponent/DialogBox/dialog_box'

const SizeChart = ({ ChartArray = [] }) => {
  let arr = [0, 1, 2, 3, 4]
  const [isSizeChartShow, setIsSizeChartShow] = useState(true)

  const handleOnClose = () => {
    setIsSizeChartShow(!isSizeChartShow)
  }

  if (ChartArray.length > 0)
    return (
      <>
        <div className="bg-white py-4  border-b-2 border-gray-200">
          <div className="mx-4 space-y-4">
            <p className="primary-font custom-font-bold text-color-secondary">
              Size Chart
            </p>
            <div className="grid grid-cols-5 gap-x-2">
              {ChartArray.map((item, index) => (
                <>
                  <div key="index">
                    <button onClick={handleOnClose}>
                      <img
                        key={index}
                        src={item.url}
                        className="w-20 m-auto"
                        alt="Size Chart Image"
                      />
                    </button>
                    <DialogBox
                      isOpen={isSizeChartShow}
                      closeModal={handleOnClose}
                    >
                      <img
                        key={index}
                        src={item.url}
                        className="w-80 m-auto"
                        alt="Size Chart Image"
                      />
                    </DialogBox>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </>
    )

  return null
}

export default SizeChart
