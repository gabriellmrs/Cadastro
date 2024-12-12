import { useEffect, useState } from 'react';
import './style.css';
import api from '../../services/api';

function Consultar() {
    const [usuarios, setUsuarios] = useState([]);

    async function getUsuarios() {
        try {
            const response = await api.get('/usuarios');
            setUsuarios(response.data); // Atualiza a lista de usuários
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
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
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.ID}>
                                    <td>{usuario.ID}</td>
                                    <td>{usuario.NOME}</td>
                                    <td>{usuario.IDADE}</td>
                                    <td>{usuario.EMAIL}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Nenhum usuário encontrado.</p>
            )}
        </div>
    );
}

export default Consultar;
