import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

import Search from 'assets/images/searchIcon.svg';
import Eth from 'assets/images/ethereum.svg';
import Close from 'assets/images/close.svg';

import './style.scss';

const SelectModal = ({setOpenSelectDropdown, setCryptoAsset, setCryptoQouteAsset }) => {

  const [tokens, setTokens] = useState([]);
  const [constantTokens, setConstantTokens] = useState([]);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
        const data = await response.json();
        const symbolsArray = data.symbols.slice(0, 20)
        setTokens(symbolsArray);
        setConstantTokens(symbolsArray);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTokens();
  }, []);

  const GetSearchData = (searchVal) => { 
    if(searchVal){
      const filteredArray = constantTokens.filter((e) => e?.baseAsset.toLowerCase().includes(searchVal.toLowerCase()))
      setTokens(filteredArray)
    }else{
      setTokens(constantTokens)
    }
  }

  

  return (
    <section className='modal'>
        <div className="modalContainer">
            <div className="modalContent">
                <div className="modalSearch">
                    <img src={Search} alt="search" />
                    <input type="text" name="search" id="search" placeholder='Search chains' onChange={(e) => GetSearchData(e.target.value)}/>
                </div>
                <ul>
                  {tokens.map((token, index) => (
                    <li key={index} onClick={() => {
                      setCryptoAsset(token?.baseAsset)
                      setCryptoQouteAsset(token?.quoteAsset)
                      setOpenSelectDropdown()
                    }} ><img src={Eth} alt="crypto" /> <span> {token?.baseAsset}</span></li>
                  ))}
                </ul>
                <img src={Close} alt="Close" className='close' onClick={() => setOpenSelectDropdown()}/>
            </div>
        </div>
    </section>
  )
}

SelectModal.propTypes = {
    setOpenSelectDropdown : PropTypes.any,
    setCryptoAsset : PropTypes.any,
    setCryptoQouteAsset : PropTypes.any,
}

export default SelectModal