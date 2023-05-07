import React from "react";
import PropTypes from 'prop-types';
import './CurrencyInput.css';


export default function CurrencyInput(props) {
    return (
        <div className='input-container'>
            <input type="text" value={props.amount} onChange={(e) => props.onAmountChange(e.target.value)} />
            <select value={props.currency} onChange={(e) => props.onCurrencyChange(e.target.value)}>
                {props.listOfCurrencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>
        </div>
    )
}

// Install 'prop-types': Command - yarn add prop-types
CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    listOfCurrencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
}
