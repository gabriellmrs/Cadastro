import './style.css'
import api from '../../services/api'

function Home() {
  

  return (
    <div className='container'>
      <form action="#">
        <h1>CADASTRO</h1>
        <input type="text" name='Nome' placeholder='Nome' />
        <input type="number" name='Idade' placeholder='Idade' />
        <input type="email" name='Email' placeholder='Email' />
        <button type='button'>Cadastrar</button>
      </form>
      
    </div>
  )
}

export default Home
