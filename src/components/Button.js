import theme from "../context/ThemeContext";
import { useContext } from "react";

function Button({ text, className, ...props }) {
  const data = useContext(theme);
  return (
    <button {...props} className={`btn btn-${data} ${className}`}>
      {text}
    </button>
  );
}

export default Button;
