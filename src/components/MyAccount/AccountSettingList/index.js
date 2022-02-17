/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';

//components
import { Hook } from './hook';
import SettingItems from './items';
import LogoutItem from './logout_item';
import { DEFAULT_TOWNSHIP } from '../../../constant/defaultTownship';
import {
  CHANGE_ADDRESS,
  CHOOSE_LANGUAGE,
  TERMS_CONDITION,
  WISH_LIST,
  CHANGE_PASSWORD_BY_MY_ACCOUNT,
  CHANGE_EMAIL_OR_PHONE_BY_MY_ACCOUNT,
  CHANGE_ADDRESS_V2,
} from '../../../constant/locationPathName';
//images
import WishIcon from '../../../assets/myaccount/wish_icon.svg';
import PhoneIcon from '../../../assets/myaccount/phone_icon.svg';
import AddressIcon from '../../../assets/myaccount/address_icon.svg';
import PasswordIcon from '../../../assets/myaccount/password_icon.svg';
import RulesAndTermOfUseIcon from '../../../assets/myaccount/rules_icon.svg';
import LogoutIcon from '../../../assets/myaccount/log_out_icon.svg';
import ChooseLanguageIcon from '../../../assets/myaccount/choose_language.svg';

const AccountSettingList = ({
  account_info = {},
  deliveryAddress = [],
  /**
   * action
   */
  GoTo,
}) => {
  const [
    /**
     * action
     */
    goTo,
    isShowLogoutBox,
    setIsShowLogoutBox,
    clickingLogout,
    confirmLogout,
  ] = Hook();

  const { t } = useTranslation();

  let full_address = '';
  // alert (deliveryAddress?selected)
  if (deliveryAddress.length > 0) {
    let filterAddress = deliveryAddress.filter((data) => data.selected);
    if (filterAddress.length > 0) {
      let delAddress = filterAddress[0];
      // let delAddress = deliveryAddress[0];
      full_address = `${delAddress?.address}${
        delAddress?.townshipName === DEFAULT_TOWNSHIP
          ? ''
          : `, ${delAddress?.townshipName}`
      }, ${delAddress?.cityName}`;
    }
  }
  let address_info;
  if (account_info.cityId > 0) {
    address_info = {
      city: {
        id: account_info.cityId,
        name: account_info.cityName,
      },
      township: {
        id: account_info.townId,
        name: account_info.townName,
      },
      address: account_info.address,
    };
  }

  return (
    <>
      <SettingItems
        Icon={WishIcon}
        Label={t('MyAccount.wishlist')}
        clickingItem={() => goTo(WISH_LIST)}
      />
      <SettingItems
        Icon={PhoneIcon}
        Label={account_info.phoneNo}
        clickingItem={() => goTo(CHANGE_EMAIL_OR_PHONE_BY_MY_ACCOUNT)}
      />
      <SettingItems
        Icon={AddressIcon}
        Label={full_address}
        LabelNoData={t('MyAccount.add-address')}
        clickingItem={() => goTo(CHANGE_ADDRESS_V2, address_info)}
      />

      <SettingItems
        Icon={PasswordIcon}
        Label={t('MyAccount.change-password')}
        clickingItem={() => goTo(CHANGE_PASSWORD_BY_MY_ACCOUNT)}
      />

      <SettingItems
        Icon={RulesAndTermOfUseIcon}
        Label={t('MyAccount.rules-and-terms-of-use')}
        clickingItem={() => goTo(TERMS_CONDITION)}
      />
      <SettingItems
        Icon={ChooseLanguageIcon}
        Label={t('MyAccount.language')}
        clickingItem={() => goTo(CHOOSE_LANGUAGE)}
      />
      <LogoutItem
        Icon={LogoutIcon}
        Label={t('MyAccount.logout')}
        confirmLogout={confirmLogout}
        isShowLogoutBox={isShowLogoutBox}
        setIsShowLogoutBox={setIsShowLogoutBox}
        clickingLogout={clickingLogout}
      />
    </>
  );
};

export default AccountSettingList;
