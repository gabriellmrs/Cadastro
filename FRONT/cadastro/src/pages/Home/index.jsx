import './style.css'
import api from '../../services/api'
import { useRef, useState } from 'react'

function Home() {

  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()

  const [notification, setNotification] = useState(''); // Estado para a notificação
  const [showNotification, setShowNotification] = useState(false); // Controle da visibilidade
  const [notificationType, setNotificationType] = useState('success'); // Tipo de notificação (success, error)

  async function createUsers() {
    await api.post("/cadastrar", {
      NOME: inputNome.current.value,
      IDADE: inputIdade.current.value,
      EMAIL: inputEmail.current.value
    })

    setNotification("USUÁRIO CADASTRADO COM SUCESSO!")
    setNotificationType('success')
    setShowNotification(true)

    setTimeout(() => {
      setShowNotification(false)
    }, 3000)

    inputNome.current.value = ''
    inputIdade.current.value = ''
    inputEmail.current.value = ''
  }


  return (
    <div className='container'>
      <form action="#">
        <h1>CADASTRO</h1>
        <input type="text" name='Nome' placeholder='Nome' ref={inputNome} />
        <input type="number" name='Idade' placeholder='Idade' ref={inputIdade} />
        <input type="email" name='Email' placeholder='Email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
      {showNotification && (
        <div className={`notification-overlay ${notificationType}`}>
          <div className='notification'>
            {notification}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
