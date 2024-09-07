import { useState } from 'react';
import './Coin.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
    const { coinId } = useParams();
    const [coinData, setCoinData] = useState();
    const [historicalData, setHistoricalCoinData] = useState();
    const { currency } = useContext(CoinContext);

    const fetchCoinData = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-DPUoQDAo6sdNY3nVkR6fqdwD' }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(response => response.json())
            .then(response => setCoinData(response))
            .catch(err => console.error(err));
    };

    const fetchHistoricalData = async params => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-DPUoQDAo6sdNY3nVkR6fqdwD' }
        };

        fetch(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=1&interval=daily`,
            options
        )
            .then(response => response.json())
            .then(response => setHistoricalCoinData(response))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchCoinData();
        fetchHistoricalData();
    }, [currency]);

    return (
        <section className='coin'>
            {coinData && historicalData ? (
                <>
                    <div className='coin-name'>
                        <img src={coinData.image?.large} alt={coinData.name} />
                        <p>
                            <b>
                                {coinData.name} ({coinData.symbol?.toUpperCase()})
                            </b>
                        </p>
                    </div>
                    <div className='coin-chart'>
                        <LineChart historicalData={historicalData} />
                    </div>
                    <div className='coin-info'>
                        <ul>
                            <li>Crypto Market Rank</li>
                            <li>{coinData.market_cap_rank}</li>
                        </ul>
                        <ul>
                            <li>Crypto price</li>
                            <li>
                                {currency.symbol}
                                {coinData.market_data.current_price[currency.name].toLocaleString()}
                            </li>
                        </ul>
                        <ul>
                            <li>Market cap</li>
                            <li>
                                {currency.symbol}
                                {coinData.market_data.market_cap[currency.name].toLocaleString()}
                            </li>
                        </ul>
                        <ul>
                            <li>24 Hour High</li>
                            <li>
                                {currency.symbol}
                                {coinData.market_data.high_24h[currency.name].toLocaleString()}
                            </li>
                        </ul>
                        <ul>
                            <li>24 Hour Low</li>
                            <li>
                                {currency.symbol}
                                {coinData.market_data.low_24h[currency.name].toLocaleString()}
                            </li>
                        </ul>
                    </div>
                </>
            ) : (
                <div className='spinner'>
                    <div className='spin'></div>
                </div>
            )}
        </section>
    );
};

export default Coin;
