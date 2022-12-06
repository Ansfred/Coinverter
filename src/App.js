// API Access Key (data.fixer.io) = 0ce522574c9b9c51f85813161ed6c284

import React from 'react';
import './App.css';
import CurrencyInput from './CurrencyInput';

// Install 'axios': Command - yarn add axios
import axios from 'axios';


export default function App() {
  const [amountInInputBox1, setAmountInInputBox1] = React.useState(1);
  const [amountInInputBox2, setAmountInInputBox2] = React.useState(1);
  const [currencyInDropDown1, setCurrencyInDropDown1] = React.useState('USD');
  const [currencyInDropDown2, setCurrencyInDropDown2] = React.useState('EUR');
  const [rates, setRates] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://data.fixer.io/api/latest?access_key=0ce522574c9b9c51f85813161ed6c284')
      .then(response => {
        setRates(response.data.rates);
      })
  }, [])

  // For the initial conversion; each time the page is loaded
  React.useEffect(() => {
    if (!!rates) {
      handleAmountInInputBox1Change(1);
    }
  }, [rates])


  function trimInputBox(number) {
    return number.toFixed(5);
  }

  function handleAmountInInputBox1Change(amountInInputBox1) {
    setAmountInInputBox1(amountInInputBox1);
    setAmountInInputBox2(trimInputBox(amountInInputBox1 * (rates[currencyInDropDown2] / rates[currencyInDropDown1])));
  }

  function handleCurrencyInDropDown1Change(currencyInDropDown1) {
    setCurrencyInDropDown1(currencyInDropDown1);
    setAmountInInputBox2(trimInputBox(amountInInputBox1 * (rates[currencyInDropDown2] / rates[currencyInDropDown1])));
  }

  function handleAmountInInputBox2Change(amountInInputBox2) {
    setAmountInInputBox2(amountInInputBox2);
    setAmountInInputBox1(trimInputBox(amountInInputBox2 * (rates[currencyInDropDown1] / rates[currencyInDropDown2])));
  }

  function handleCurrencyInDropDown2Change(currencyInDropDown2) {
    setCurrencyInDropDown2(currencyInDropDown2);
    setAmountInInputBox1(trimInputBox(amountInInputBox2 * (rates[currencyInDropDown1] / rates[currencyInDropDown2])));
  }

  return (
    <div className='main-container'>
      <h1>Coinverter</h1>
      <CurrencyInput 
        listOfCurrencies={Object.keys(rates)}
        amount={amountInInputBox1}
        currency={currencyInDropDown1}
        onAmountChange={handleAmountInInputBox1Change}
        onCurrencyChange={handleCurrencyInDropDown1Change}
      />
      <CurrencyInput 
        listOfCurrencies={Object.keys(rates)}
        amount={amountInInputBox2}
        currency={currencyInDropDown2}
        onAmountChange={handleAmountInInputBox2Change}
        onCurrencyChange={handleCurrencyInDropDown2Change}
      />
    </div>
  );
}