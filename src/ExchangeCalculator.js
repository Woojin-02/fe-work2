import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBaseCurrency, setAmount } from './actions';
import { fetchExchangeRates } from './api';
import './ExchangeCalculator.css';

const ExchangeCalculator = () => {
    const baseCurrency = useSelector(state => state.baseCurrency); // redux에 저장된 데이터 호출
    const [amount, setAmount] = useState('');
    const [exchangeRates, setExchangeRates] = useState(null);
    const [selectedTab, setSelectedTab] = useState(baseCurrency);
    const dispatch = useDispatch();

    // api 호출
    useEffect(() => {
        const fetchData = async () => {
            if (baseCurrency) {
                try {
                    const data = await fetchExchangeRates(baseCurrency, getSymbols);
                    setExchangeRates(data);
                } catch (error) {
                    console.error('Error fetching exchange rates:', error);
                }
            }
        };
        fetchData();
    }, [baseCurrency]);

    const getSymbols = () => {
        const currencies = ['USD', 'CAD', 'KRW', 'HKD', 'JPY', 'CNY'];
        const symbols = currencies.filter(currency => currency !== baseCurrency);
        return symbols.join(',');
    };

    // 통화 변경 이벤트 처리
    const handleChangeCurrency = event => {
        const selectedCurrency = event.target.value;
        dispatch(setBaseCurrency(selectedCurrency));
        // redux에 업데이트
        setSelectedTab(selectedCurrency);
    };

    // 사용자가 입력한 금액 처리
    const handleChangeAmount = event => {
        let value = event.target.value.replace(/\D/g, '');
        if (value >= 1000) {
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        // redux에 업데이트
        setAmount(value);
    };

    // 탭 이벤트 처리
    const handleTabClick = currency => {
        setSelectedTab(currency);
    };

    // 기준일 출력 함수
    const convertMonth = (month) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[parseInt(month) - 1];
      };

    return (
        <div className="exchange-calculator">
            <div className="container">
                <input type="text" value={amount} onChange={handleChangeAmount} />
                <select value={baseCurrency} onChange={handleChangeCurrency}>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                    <option value="KRW">KRW</option>
                    <option value="HKD">HKD</option>
                    <option value="JPY">JPY</option>
                    <option value="CNY">CNY</option>
                </select>
            </div>
            <div className="exchange-rates-container">
                {exchangeRates && (
                    <>
                        <div className="tabs">
                            {Object.keys(exchangeRates.rates).filter(currency => currency !== baseCurrency).map(currency => (
                                <div key={currency} className={selectedTab === currency ? 'tab active' : 'tab'} onClick={() => handleTabClick(currency)}>
                                    {currency}
                                </div>
                            ))}
                        </div>
                        <div className="exchange-rates">
                            {Object.entries(exchangeRates.rates).map(([currency, rate]) => (
                                <div key={currency} className="rate" style={{ display: selectedTab === currency ? 'block' : 'none' }}>
                                    <div className="currency">
                                        <span className="currency-text">{currency}</span>
                                        <span className="amount">{amount ? (parseFloat(amount.replace(/,/g, '')) * rate).toFixed(2) : ''}</span>
                                    </div>
                                    <div className="date">
                                        기준일 : <br />
                                        {exchangeRates ? exchangeRates.date.split('-')[0] + '-' + convertMonth(exchangeRates.date.split('-')[1]) + '-' + exchangeRates.date.split('-')[2] : ''}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ExchangeCalculator;
