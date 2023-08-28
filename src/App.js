import './App.css';
import {useState} from 'react';

const isOperator = /[/·+-]/;
const endsWithOperator = /[·+-/]$/;
const endsWithNegativeSign = /\d[·/+-]{1}-$/;

function App() {
  const [display, setDisplay] = useState('0')

  const handleNumber = (event) => {
    const number = event.target.textContent;
    if (display === '0') {
      setDisplay(number)
    } else {
      setDisplay(display+number)
    }
  }

  const handleOperator = (event) => {
    const operator = event.target.textContent;
    
    switch (operator) {
      case '\u00D7': 
        if (endsWithNegativeSign.test(display)) {
          setDisplay(display.slice(0,-2) + '\u00B7');
        } else if (endsWithOperator.test(display)) {
          setDisplay(display.slice(0,-1) + '\u00B7');
        } else {
          setDisplay(display + '\u00B7');
        }
        break;
      case '-':
        if (!endsWithNegativeSign.test(display)) {
          setDisplay(display + operator);
        }
        break;
      default: 
      if (endsWithNegativeSign.test(display)) {
        setDisplay(display.slice(0,-2) + operator);
      } else if (endsWithOperator.test(display)) {
        setDisplay(display.slice(0,-1) + operator);
      } else {
        setDisplay(display + operator);
      }
    }
  }

  const handleEquals = () => {
    if (endsWithNegativeSign.test(display)) {
      setDisplay(String(eval(display.slice(0,-2).replaceAll('\u00B7','*'))))
    } else if (endsWithOperator.test(display)) {
      setDisplay(String(eval(display.slice(0,-1).replaceAll('\u00B7','*'))))
    } else {
      setDisplay(String(eval(display.replaceAll('\u00B7','*'))))
    }
  }

  const handleClear = () => {
    setDisplay('0')
  }

  const handleDecimal = () => {
    const numberArray = display.split(isOperator)
    const lastNumber = numberArray[numberArray.length-1]
    const lastChar = display[display.length-1]
    if (!lastNumber.includes('.') && !(isOperator.test(lastChar))) {
      setDisplay(display+'.')
    }
  }

  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="row">{display}</div>
        <button id="clear" className="row" onClick={handleClear}>AC</button>
        <button id="seven" onClick={handleNumber}>7</button>
        <button id="eight" onClick={handleNumber}>8</button>
        <button id="nine" onClick={handleNumber}>9</button>
        <button className="operator" id="multiply" onClick={handleOperator}>{'\u00D7'}</button>
        <button id="four" onClick={handleNumber}>4</button>
        <button id="five" onClick={handleNumber}>5</button>
        <button id="six" onClick={handleNumber}>6</button>
        <button className="operator" id="divide" onClick={handleOperator}>/</button>
        <button id="one" onClick={handleNumber}>1</button>
        <button id="two" onClick={handleNumber}>2</button>
        <button id="three" onClick={handleNumber}>3</button>
        <button className="operator" id="add" onClick={handleOperator}>+</button>
        <button id="zero" onClick={handleNumber}>0</button>
        <button id="decimal" onClick={handleDecimal}>.</button>
        <button id="equals" onClick={handleEquals}>=</button>
        <button className="operator" id="subtract" onClick={handleOperator}>-</button>
      </div>
    </div>
  );
}

export default App;
