import React, { useEffect, useState } from 'react';

import Eth from "assets/images/ethereum.svg";
import Dropdown from "assets/images/dropdown.svg";
import SelectModal from 'components/SelectModal/index';

import './home.scss';

const Form = () => {
    const [openSelectDropdown, setOpenSelectDropdown] = useState(false);
    const [tokenCurrentValue, setTokenCurrentValue] = useState({});
    const [cryptoAsset, setCryptoAsset] = useState("Ethereum")
    const [cryptoQouteAsset, setCryptoQouteAsset] = useState("BTC")
    const [ethereumPrice, setEthereumPrice] = useState("");
    const [INR, setINR] = useState(null);

    useEffect(() => {
        async function fetchPrice() {
            try {
              const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHBTC');
              const data = await response.json();
              const price = parseFloat(data.lastPrice);
              setEthereumPrice(price/INR);
            } catch (error) {
              console.error(error);
            }
          }
          fetchPrice();

    }, [INR])
    
    useEffect(() => {
        const BinanceWebSocket = new WebSocket('wss://stream.binance.com:9443/ws');
            BinanceWebSocket.onopen = () => {
            BinanceWebSocket.send(`{"method": "SUBSCRIBE","params":["${cryptoQouteAsset.toLowerCase()}usdt@trade"],"id": 1}`);
        };
    
        BinanceWebSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setTokenCurrentValue(message)
        };

        return () => {
            BinanceWebSocket.close()
        }
    }, [cryptoQouteAsset])


  return (
    <section className='form'>
        <div className="formBorder">
            <div className="formContent">
                <div className="formLogo">
                    <div className="formLogoBg">
                        <div className="formLogoPlaceholder"></div>
                    </div>
                    <div className="formLogoContainer">
                        <img src={Eth} alt="form logo" />
                    </div>
                </div>
                <div className="formGroup">
                    <div className="formElement">
                        <label>Current value</label>
                        <span>₹{Math.round(tokenCurrentValue?.p) || ""}</span>
                    </div>
                    <div className="formSelect" onClick={() => setOpenSelectDropdown(true)}>
                        <div>
                            <img src={Eth} alt="Ethereum" />
                            <p>{cryptoAsset}</p>
                        </div>
                        <img src={Dropdown} alt="dropdown" />
                    </div>
                </div>

                <div className="formGroup">
                    <label>Amount you want to invest</label>
                    <div className='formAmountInput'>
                        <input type="number" name="amount" id="amount" placeholder='0.00' onChange={(e) => setINR(e.target.value)}/>
                        <p>INR</p>
                    </div>
                </div>

                <div className="formGroup">
                    <label>Estimate Number of ETH You will Get</label>
                    <input type="number" name="eth" id="eth" placeholder='0.00' value={ethereumPrice} disabled/>
                </div>

                <div className="formGroup">
                    <button type='submit'>Buy</button>
                </div>
            </div>
        </div>

        {
            openSelectDropdown ? <SelectModal setOpenSelectDropdown={setOpenSelectDropdown} setCryptoAsset={setCryptoAsset} setCryptoQouteAsset={setCryptoQouteAsset}  /> : ""
        }
    </section>
  )
}

export default Form