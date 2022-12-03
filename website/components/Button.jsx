
const Button = ({ styles, btnName, handleClick }) => (
  <button
    type="button"
    className={`gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${styles} `}
    onClick={handleClick}
  >
    {btnName}
  </button>
);

export default Button;
