import _ from "lodash";
import { useEffect, useState } from "react";

//components
import { clearHistory, getHistory } from "../../../util/storage";
import { goToProductSearchResult } from "../../../util/goToSpecificPathName";
import { useHistory } from "react-router";

export function Hook() {
  const history = useHistory();
  const [searchHistory, setSearchHistory] = useState([]);

  /**
   * Life Cycle
   */
  useEffect(() => {
    const arr = getHistory() || [];
    arr.reverse();
    setSearchHistory(arr);
  }, []);

  /**
   * Clear History one or all
   */
  const clearSearchHistory = (idx) => {
    const clone_searchHistory = _.cloneDeep(searchHistory || []);
    if (idx >= 0) {
      clearHistory(idx);
      if (searchHistory.length > 0) {
        let removed_history = clone_searchHistory.filter(
          (list, index) => index !== idx
        );
        setSearchHistory(removed_history);
      }
      return;
    }
    clearHistory();
    setSearchHistory([]);
  };

  /**
   * click on History Item
   * @param {obj} item_data
   */
  const clickingOnHistory = (item_data) => {
    let propsData = {
      searchType: item_data.search_type,
      categoryId: item_data.category_id,
      productName: item_data.item_name,
      categoryName: item_data.item_name,
    };
    goToProductSearchResult(history, propsData);
  };

  return [
    searchHistory,
    /**
     * action
     */
    clearSearchHistory,
    clickingOnHistory,
  ];
}
