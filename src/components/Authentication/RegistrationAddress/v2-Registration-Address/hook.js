/** @format */

import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
//components
import {
  GET_STORED_ACCESS_TOKEN,
  GET_STORED_USER_INFO,
} from '../../../../util/storage';
import { DEFAULT_TOWNSHIP } from '../../../../constant/defaultTownship';
import _ from 'lodash';
import { HOME_LABEL } from '../../../../constant/deliveryLabelConfig';
import { MY_ACCOUNT } from '../../../../constant/locationPathName';

export function Hook({
  isLoading,
  isSecondaryLoading,
  cityList,
  townshipList,
  /**
   * action
   */
  authGetCityList,
  authGetTownshipList,
  createReplaceDeliveryAddress,
  setOpenAddAddress,
  updateSelectedDeliveryAddress,
}) {
  const user_info = JSON.parse(GET_STORED_USER_INFO);
  const { t } = useTranslation();
  const location = useLocation();
  const propsState = location.state;

  const [isSelectedCity, setIsSelectedCity] = useState(false);
  const [isShowConfirmBox, setIsShowConfirmBox] = useState(false);
  const [isRequiredCity, setIsRequiredCity] = useState(false);
  const [isRequiredTownship, setIsRequiredTownship] = useState(false);
  const [labelFilter, setLabelFilter] = useState(HOME_LABEL);

  /**
   * Life Cycle
   */
  useEffect(() => {
    if (GET_STORED_ACCESS_TOKEN) {
      authGetCityList(GET_STORED_ACCESS_TOKEN);
    }
  }, [GET_STORED_ACCESS_TOKEN]);

  useEffect(() => {
    if (propsState?.township?.name === DEFAULT_TOWNSHIP) {
      setSelectedTownship(null);
      setNotHaveTownship(true);
    }
  }, [propsState]);

  useEffect(() => {
    if (propsState?.city?.id > 0) {
      authGetTownshipList(propsState?.city?.id, GET_STORED_ACCESS_TOKEN);
    }
  }, [propsState?.city?.id]);

  /**
   * To filter city or township using searching - BigDaddy
   * @param {*} search_value
   * @param {*} list
   * @returns
   */
  const filterSearchingValue = (search_value = '', list = []) => {
    let result = list.filter((value) =>
      value?.name.toLowerCase().includes(search_value.toLocaleLowerCase())
    );
    return result;
  };

  //#region - City Section
  const [isOpenCityBox, setIsOpenCityBox] = useState(false);
  const [cityArray, setCityArray] = useState([]);
  const [searchCity, setSearchCity] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);

  const openCityBox = () => {
    setIsOpenCityBox(true);
    setCityArray(cityList);
    setSearchCity('');
  };

  const closeCityBox = () => {
    setIsOpenCityBox(false);
  };

  /** on change input search with city - BigDaddy */
  const searchingCity = (e) => {
    delayCityOnChangeHandler(e.target.value);
  };

  /** delay setState when onChangeEvent is firing - BigDaddy */
  const delayCityOnChangeHandler = useCallback(
    _.debounce((value) => {
      setSearchCity(value);
    }, 300),
    []
  );

  /** Filter city name from input value - BigDaddy */
  useEffect(() => {
    if (cityList?.length <= 0) return;

    if (!searchCity) {
      setCityArray(cityList);
      return;
    }
    let result = filterSearchingValue(searchCity, cityList);
    setCityArray(result);
  }, [cityList?.length, searchCity]);

  const delayFetchingTownshipList = useCallback(
    _.debounce((city_id) => {
      authGetTownshipList(city_id, GET_STORED_ACCESS_TOKEN);
    }, 500),
    []
  );

  /**
   *
   * @param {*} city_obj - Select City - BigDaddy
   */
  const onClickCity = (city_obj = {}) => {
    setSelectedCity(city_obj);
    setIsSelectedCity(true);
    delayFetchingTownshipList(city_obj.id);
    closeCityBox();
    setIsRequiredCity(false);
  };
  //#endregion

  //#region - Township Section
  const [isOpenTownshipBox, setIsOpenTownshipBox] = useState(false);
  const [selectedTownship, setSelectedTownship] = useState(null);
  const [notHaveTownship, setNotHaveTownship] = useState(true);
  const [searchTownShip, setSearchTownShip] = useState('');
  const [townshipArray, setTownshipArray] = useState([]);
  const initialCityName = {
    id: 0,
    name: t('Authentication.city'),
  };
  const initialTownshipName = {
    id: 0,
    name: t('Authentication.township'),
  };
  const openTownshipBox = () => {
    setIsOpenTownshipBox(true);
    setTownshipArray(townshipList);
    setSearchTownShip('');
  };
  const closeTownshipBox = () => {
    setIsOpenTownshipBox(false);
  };

  /**
   * After choosing city, fetch township - if city didn't have township, township array have only "All Township (မြိုနယ်အားလုံး)"
   * For Hidden Township DropDown
   */
  useEffect(() => {
    if (townshipList?.length <= 0) return;

    if (isSelectedCity) {
      setSelectedTownship({
        name: t('Authentication.township'),
        id: null,
      });
    }

    if (townshipList[0]?.name === DEFAULT_TOWNSHIP) {
      if (isSelectedCity) {
        setSelectedTownship(townshipList[0]);
      }

      setNotHaveTownship(true);
      return;
    }
    setNotHaveTownship(false);
  }, [townshipList]);

  /** on change input search with township - BigDaddy */
  const searchingTownship = (e) => {
    delayTownshipOnChangeHandler(e.target.value);
  };

  /** delay setState when onChangeEvent is firing - BigDaddy */
  const delayTownshipOnChangeHandler = useCallback(
    _.debounce((value) => {
      setSearchTownShip(value);
    }, 300),
    []
  );

  /** Filter township name from input value - BigDaddy */
  useEffect(() => {
    if (townshipList?.length <= 0) return;

    if (!searchTownShip) {
      setTownshipArray(townshipList);
      return;
    }
    let result = filterSearchingValue(searchTownShip, townshipList);
    setTownshipArray(result);
  }, [townshipList?.length, searchTownShip]);

  /**
   *
   * @param {*} township_obj - Select Township - BigDaddy
   */
  const onClickTownship = (township_obj = {}) => {
    setSelectedTownship(township_obj);
    closeTownshipBox();
  };
  //#endregion

  //#region - address
  const [address, setAddress] = useState('');
  const [landMark, setLandMark] = useState('');
  const [isRequiredAddress, setIsRequiredAddress] = useState(false);

  /**
   * onChange Handler Address
   */
  const onChangeAddress = (value) => {
    setAddress(value);
    if (value) {
      setIsRequiredAddress(false);
      return;
    }
  };
  //#endregion
  const onChangeLandMark = (value) => {
    setLandMark(value);
  };

  const clickingConfirmBtn = () => {
    if (!isSelectedCity) {
      setIsRequiredCity(true);
      return;
    }
    if (!address) {
      setIsRequiredAddress(true);
      return;
    }
    setIsShowConfirmBox(true);
  };

  /**
   * Confirm
   */
  const onSubmit = async () => {
    if (!address) {
      setIsRequiredAddress(true);
      setIsShowConfirmBox(false);
      return;
    }
    if (selectedTownship?.id === null) {
      setIsRequiredTownship(true);
      setIsShowConfirmBox(false);
      return;
    }
    setIsRequiredTownship(false);
    setIsShowConfirmBox(false);
    const reqData = {
      cityId: selectedCity?.id,
      townshipId: selectedTownship?.id,
      labelName: labelFilter,
      landmark: landMark,
      address,
    };
    await createReplaceDeliveryAddress(reqData);
    window.location.href = MY_ACCOUNT;
  };

  const clickedCancel = () => {
    setIsSelectedCity(false);
    setSelectedTownship({
      name: t('Authentication.township'),
      id: null,
    });
    setSelectedCity({
      id: null,
      name: t('Authentication.city'),
    });
    setLandMark('');
    setAddress('');
    setLabelFilter(HOME_LABEL);
  };

  return [
    isRequiredTownship,
    isLoading,
    isSecondaryLoading,
    cityArray,
    initialCityName,
    selectedCity,
    isOpenCityBox,
    isOpenTownshipBox,
    townshipArray,
    initialTownshipName,
    selectedTownship,
    notHaveTownship,
    address,
    landMark,
    isRequiredAddress,
    isRequiredCity,
    isShowConfirmBox,
    labelFilter,
    /**
     * action
     */
    setIsShowConfirmBox,
    openCityBox,
    closeCityBox,
    searchingCity,
    onClickCity,
    openTownshipBox,
    closeTownshipBox,
    searchingTownship,
    onClickTownship,
    onSubmit,
    onChangeAddress,
    clickingConfirmBtn,
    onChangeLandMark,
    clickedCancel,
    setLabelFilter,
  ];
}
