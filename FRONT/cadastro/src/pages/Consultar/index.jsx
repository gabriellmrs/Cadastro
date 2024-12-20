import { useEffect, useState } from 'react';
import './style.css';
import api from '../../services/api';
import Trash from '../../assets/trash.svg'
import Lapis from '../../assets/lapis.svg'
import Lupa from '../../assets/lupa.svg'



function Consultar() {
    const [usuarios, setUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false); // Controla o modal
    const [selectedUser, setSelectedUser] = useState(null); // Usuário selecionado

    const [showEditModal, setShowEditModal] = useState(false); // Controla o modal de edição
    const [editedUser, setEditedUser] = useState({ NOME: "", IDADE: "", EMAIL: "" }); // Armazena o usuário sendo editado

    const [showNotification, setShowNotification] = useState(false);

    const [searchText, setSearchText] = useState("")

    async function getUsuarios() {
        try {
            const response = await api.get('/usuarios');
            setUsuarios(response.data); // Atualiza a lista de usuários
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    }

    // Abre o modal de edição
    function openEditModal(usuario) {
        setEditedUser(usuario); // Preenche os dados do usuário no modal
        setShowEditModal(true);
    }

    // Fecha o modal de edição
    function closeEditModal() {
        setShowEditModal(false);
        setEditedUser({ NOME: "", IDADE: "", EMAIL: "" }); // Limpa os dados
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

    // Atualiza o usuário
    async function updateUser() {
        try {
            await api.put(`/usuarios/${editedUser.ID}`, editedUser); // Atualiza no back-end
            setShowNotification(true);

            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            closeEditModal();
            getUsuarios(); // Atualiza a lista de usuários
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            alert("Erro ao atualizar usuário.");
        }
    }

    // Função para buscar usuários pelo nome
    async function searchUser(nome) {
        try {
            const response = await api.get(`/usuarios/${nome}`); // Faz a requisição com o nome
            setUsuarios(response.data); // Atualiza a lista de usuários com os resultados
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setUsuarios([]); // Limpa a lista caso não encontre resultados
            } else {
                console.error("Erro ao buscar usuário:", error);
                alert("Erro ao buscar usuário.");
            }
        }
    }

    useEffect(() => {
        getUsuarios(); // Chama a função ao carregar o componente
    }, []);

    return (
        <div className='container'>
            <h1>CONSULTAR</h1>
            <div className='search-box'>
                <input type="text" placeholder='Pesquisar' className='search-txt'
                    value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button onClick={() => searchUser(searchText)}>
                    <img src={Lupa} alt="Pesquisar" />
                </button>
            </div>
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
                        <tbody >
                            {usuarios.map((usuario) => (
                                <tr key={usuario.ID}>
                                    <td>{usuario.ID}</td>
                                    <td>{usuario.NOME}</td>
                                    <td>{usuario.IDADE}</td>
                                    <td>{usuario.EMAIL}</td>
                                    <td className='opcoes'>
                                        <button className='lapis' onClick={() => openEditModal(usuario)}>
                                            <img src={Lapis} alt="Editar" />
                                        </button>
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
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Editar Usuário</p>
                        <form className="edit-form">
                            <label>
                                Nome:
                                <input
                                    type="text"
                                    value={editedUser.NOME}
                                    onChange={(e) => setEditedUser({ ...editedUser, NOME: e.target.value })}
                                />
                            </label>
                            <label>
                                Idade:
                                <input
                                    type="number"
                                    value={editedUser.IDADE}
                                    onChange={(e) => setEditedUser({ ...editedUser, IDADE: e.target.value })}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={editedUser.EMAIL}
                                    onChange={(e) => setEditedUser({ ...editedUser, EMAIL: e.target.value })}
                                />
                            </label>
                            <div className="modal-buttons">
                                <button type="button" onClick={updateUser}>
                                    Alterar
                                </button>
                                <button type="button" onClick={closeEditModal}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showNotification && (
                <div className="modal-show">
                    <div className="modal-show-edit">
                        <p>USUÁRIO EDITADO COM SUCESSO!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Consultar;
