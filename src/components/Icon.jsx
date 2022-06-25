function Icon(props) {
  return (
    <img width="18"
         height="18"
         src={`/node_modules/cryptocurrency-icons/32/color/${props.ticker}.png`} />
  )
}

export default Icon