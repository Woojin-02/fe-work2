export const SET_BASE_CURRENCY = 'SET_BASE_CURRENCY';
export const SET_AMOUNT = 'SET_AMOUNT';


// redux 액션 관리
export const setBaseCurrency = currency => ({
  type: SET_BASE_CURRENCY,
  payload: currency,
});

export const setAmount = amount => ({
  type: SET_AMOUNT,
  payload: amount,
});
