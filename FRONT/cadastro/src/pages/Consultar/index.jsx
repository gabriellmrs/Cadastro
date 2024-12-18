import { useEffect, useState } from 'react';
import './style.css';
import api from '../../services/api';
import Trash from '../../assets/trash.svg'



function Consultar() {
    const [usuarios, setUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false); // Controla o modal
    const [selectedUser, setSelectedUser] = useState(null); // Usuário selecionado


    async function getUsuarios() {
        try {
            const response = await api.get('/usuarios');
            setUsuarios(response.data); // Atualiza a lista de usuários
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    }

    // Abre o modal de confirmação
    function openDeleteModal(usuario) {
        setSelectedUser(usuario); // Guarda o usuário selecionado
        setShowModal(true);
    }

    // Fecha o modal
    function closeModal() {
        setShowModal(false);
        setSelectedUser(null);
    }

    async function deleteUsers(ID) {

        await api.delete(`/usuarios/${selectedUser.ID}`)
        closeModal();
        getUsuarios(); // Atualiza a lista de usuários
    }

    useEffect(() => {
        getUsuarios(); // Chama a função ao carregar o componente
    }, []);

    return (
        <div className='container'>
            <h1>CONSULTAR</h1>
            {usuarios.length > 0 ? (
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>IDADE</th>
                                <th>EMAIL</th>
                                <th>  </th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.ID}>
                                    <td>{usuario.ID}</td>
                                    <td>{usuario.NOME}</td>
                                    <td>{usuario.IDADE}</td>
                                    <td>{usuario.EMAIL}</td>
                                    <td>
                                        <button className='trash' onClick={() => openDeleteModal(usuario)}>
                                            <img src={Trash} alt='Delete' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Nenhum usuário encontrado.</p>
            )}
             {/* Modal de Confirmação */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>
              Você deseja deletar o usuário <strong>{selectedUser.NOME}</strong>?
            </p>
            <div className="modal-buttons">
              <button onClick={deleteUsers}>OK</button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
        </div>
    );
}

export default Consultar;
