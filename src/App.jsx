import { useState, useEffect } from 'react'
import Rates from './components/Rates'
import Pairs from './components/Pairs'
import './App.css'

function App() {
  const [rates, setRates] = useState({})

  useEffect(() => {
    let ratesHandler = setInterval(() => {
      fetch('https://api.coingecko.com/api/v3/exchange_rates')
        .then(r => r.json())
        .then(d => setRates(d.rates))
        .catch(e => console.error(e))
    }, 1000) // auto-refresh

    return () => clearInterval(ratesHandler)
  })

  // all crypto-type minus BTC, bits and satoshis
  const crypto = []
  for (let ticker in rates) {
    if (rates[ticker].type === 'crypto' && !['btc', 'sats', 'bits'].includes(ticker)) {
      crypto.push({
        ...rates[ticker],
        ticker,
      })
    }
  }

  const [pairs, setPairs] = useState([])

  useEffect(() => {
    fetch('https://api.exchange.coinbase.com/products')
      .then(r => r.json())
      .then(d => setPairs(d))
      .catch(e => console.error(e))
  }, [])

  const [matches, setMatches] = useState(null)

  function onClick(c) {
    const ticker = c.ticker.toUpperCase()

    setMatches(pairs.filter(pair => {
      return pair.base_currency === ticker || pair.quote_currency === ticker
    }))
  }

  return (
    <div className="App">
      <div className="App-left">
        <h1>Bitcoin Exchange Rate</h1>
        <Rates crypto={crypto}
               onClick={onClick} />
      </div>
      <div className="App-right">
        <h1>Currency Pair Trade</h1>
        <Pairs matches={matches} />
      </div>
    </div>
  )
}

export default App
