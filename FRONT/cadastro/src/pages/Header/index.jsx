import './style.css'
import { Link } from "react-router-dom";

function Header() {
  

  return (
    <div className='header'>
       <Link to="/cadastrar">Cadastrar</Link>
       <Link to="/consultar">Consultar</Link>
    </div>
  )
}

export default Header