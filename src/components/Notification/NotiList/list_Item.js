import React, { useState } from 'react'

//images
import Packed from '../../../assets/notification/packed.png'
import Commanded from '../../../assets/notification/commanded.svg'
import Transported from '../../../assets/notification/transported.svg'
import Removed from '../../../assets/notification/removed.png'
import Payment from '../../../assets/notification/confirmed_payment.svg'
import Default from '../../../assets/notification/default.png'

// components
import dateFormatter from '../../../util/dateFormatter'

import { getLocalStorage } from '../../../util/storage'
import { LANGUAGE_TYPE } from '../../../util/storage'

const ListItem = ({
  noti = {},
  /**
   * action
   */
  clickingOnNotification,
}) => {
  const removed = noti.body.match('ပယ်ဖျက်')
  const transported = noti.body.match('ပို့ဆောင်ပြီး')
  const packed = noti.body.match('ထုပ်ပိုးပြီး')
  const commanded = noti.body.match('ပို့ဆောင်ရန်')
  const payment = noti.body.match('ငွေ')

  const iconSize = 'w-9 md:w-7 h-auto'

  const currentLang = getLocalStorage(LANGUAGE_TYPE)

  const [more, setMore] = useState(false)

  let notiText =
    currentLang === 'en-US'
      ? noti.bodyEng
      : currentLang === 'unicode'
      ? noti.body
      : currentLang === 'zawgyi'
      ? noti.body
      : noti.body

  return (
    <>
      <div
        className="flex space-x-4 items-center"
        onClick={clickingOnNotification}
      >
        <div className="flex flex-shrink-0">
          {(noti.body.includes(packed) && (
            <img src={Packed} alt="notiItem" className={iconSize} />
          )) ||
            (noti.body.includes(commanded) && (
              <img src={Commanded} alt="notiItem" className={iconSize} />
            )) ||
            (noti.body.includes(transported) && (
              <img src={Transported} alt="notiItem" className={iconSize} />
            )) ||
            (noti.body.includes(removed) && (
              <img src={Removed} alt="notiItem" className={iconSize} />
            )) ||
            (noti.body.includes(payment) && (
              <img src={Payment} alt="notiItem" className={iconSize} />
            )) || <img src={Default} alt="notiItem" className={iconSize} />}
        </div>

        <div className="block w-full h-auto space-y-2 md:space-y-0">
          {
            !noti.body.includes(removed) && !noti.body.includes(transported) && !noti.body.includes(packed) && !noti.body.includes(commanded) && !noti.body.includes(payment) &&
            <p className="font-semibold">{noti.title}</p> 
          }
          <p className="tertiary-font text-main-theme-color h-auto break-all">
            {notiText.split('').length > 150 && !more ? (
              <p>
                {notiText.slice(0, 150)} &nbsp;
                <span className="text-color-secondary">
                  ...
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setMore(!more)
                    }}
                  >
                    More
                  </button>
                </span>
              </p>
            ) : (
              <p>
                {notiText} &nbsp;
                {more && (
                  <span className="text-color-secondary">
                    ...
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setMore(!more)
                      }}
                    >
                      Less
                    </button>
                  </span>
                )}
              </p>
            )}
          </p>
          <p className="text-base text-color-secondary h-auto">
            {dateFormatter(noti.notificationDate)}
          </p>
        </div>
      </div>
    </>
  )
}

export default ListItem
