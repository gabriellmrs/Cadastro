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
                usuarios.map((usuario) => (
                    <div key={usuario.ID} className='card'>
                        <div>
                            <p>ID: <span>{usuario.ID}</span></p>
                            <p>Nome: <span>{usuario.NOME}</span></p>
                            <p>Idade: <span>{usuario.IDADE}</span></p>
                            <p>Email: <span>{usuario.EMAIL}</span></p>
                        </div>
                    </div>
                ))
            ) : (
                <p>Nenhum usuário encontrado.</p>
            )}
        </div>
    );
}

export default Consultar;
