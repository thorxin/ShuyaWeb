/** @format */

import React from 'react'

//components
import { Hook } from './hook'
import NavigationWeb from '../CommonComponent/Navigation/NavigationWeb'
import FooterWeb from '../CommonComponent/Footer/web_footer'
import FooterMobile from '../CommonComponent/Footer/mobile_footer'
import EditAccountInfoSection from './EditAccountInfoSection'
import AccountSettingList from './AccountSettingList'
import MemberLevel from './MemberPointSection/member_level'
import ReceivedPoints from './MemberPointSection/received_point'

export const layout = 'bg-white default-margin-layout-auth'

export default function MyAccount(props) {
  const [userAccountInfo, deliveryAddress] = Hook(props)

  return (
    <>
      <div className="bg-white w-full h-auto md:min-h-screen md:space-y-5 overflow-y-auto mb-20 md:mb-0 md:pt-20">
        <NavigationWeb />
        <div className="space-y-5">
          {/* Change Profile And Name */}
          <>
            <div className={`${layout} py-4 2xl:py-5`}>
              <div className="md:mx-8 mx-4">
                {userAccountInfo && (
                  <EditAccountInfoSection account_info={userAccountInfo} />
                )}
              </div>
            </div>
          </>
          {/* End Change Profile And Name */}

          {/* MemberPointPart */}
          <>
            {/* <div className="layout">
              <div className="default-margin-layout">
                <div className="md:bg-white">
                  <div className="default-margin-layout">
                    <MemberLevel />
                  </div>
                </div>
                <div className="md:bg-white">
                  <div className="default-margin-layout">
                    <ReceivedPoints />
                  </div>
                </div>
              </div>
            </div> */}
          </>
          {/* End MemberPointPart */}

          {/* Account Setting List */}
          <>
            <div className={`${layout}`}>
              <div className="md:mx-8 mx-4 custom-font">
                <AccountSettingList
                  account_info={userAccountInfo}
                  deliveryAddress={deliveryAddress}
                  wishList={props.wishList}
                />
              </div>
            </div>
          </>
          {/* End Account Setting List */}
        </div>
        <FooterWeb />
        <FooterMobile />
      </div>
    </>
  )
}
