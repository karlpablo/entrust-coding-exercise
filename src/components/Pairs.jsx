function Pairs(props) {
  if (props.matches === null) {
    return (
      <code>
        &larr; Select a currency from the left
      </code>
    )
  } else if (props.matches.length) {
    return props.matches.map(m => (
      <div key={m.id}>
        <code>{m.base_currency}-{m.quote_currency}</code>
      </div>
    ))
  } else {
    return (
      <code>
        No matches
      </code>
    )
  }
}

export default Pairs