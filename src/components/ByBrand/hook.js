/** @format */
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export function Hook({
  resetProduct,
  fetch_ProductByBrand,
  page
}) {
  const history = useHistory();
  let { id } = useParams();
  const goBack = () => {
    history.goBack();
  };
  useEffect(() => {
    fetch_ProductByBrand(id, page);
    window.scrollTo(0, 0);
  }, [id, page]);

  useEffect(() => {
    resetProduct();
  }, [id])

  return [
    goBack
  ];
}
