import './style.css'

function Home() {
  

  return (
    <div className='container'>
      <form action="#">
        <input type="text" name='Nome' placeholder='Nome' />
        <input type="number" name='Idade' placeholder='Idade' />
        <input type="email" name='Email' placeholder='Email' />
        <button type='button'>Cadastrar</button>
      </form>
      
    </div>
  )
}

export default Home
