// 환율 정보를 가져오는 api
export const fetchExchangeRates = async (baseCurrency, getSymbols) => {
    try {
        const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${getSymbols()}&base=${baseCurrency}`, {
            headers: {
                "apikey": "API_KEY"
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        throw error;
    }
};
