import { SET_BASE_CURRENCY, SET_AMOUNT } from './actions';

// 초기 상태
const initialState = {
  baseCurrency: 'USD',
  amount: '',
};

// 액션 발생 시
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 통화를 변경했을 때
    case SET_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.payload,
      };
    // 금액을 변경했을 때
    case SET_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
