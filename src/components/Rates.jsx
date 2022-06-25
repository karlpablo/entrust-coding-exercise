import Icon from './Icon'

function Rates(props) {
  if (props.crypto.length) {
    return props.crypto.map(c => (
      <div key={c.ticker}
           onClick={() => props.onClick(c)}>
        <Icon ticker={c.ticker} />
        <code>
          {c.unit} {c.value}
        </code>
      </div>
    ))
  } else {
    return (
      <code>Loading..</code>
    )
  }
}

export default Rates