
const Button = ({onClick, type, label, bool}) => {
  return (
    <button
    type={type}
    onClick={onClick}
    disabled={bool}  // true or false
    >
        {label}
    </button>
  )
}

export default Button