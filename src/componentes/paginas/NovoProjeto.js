import styles from './NovoProjeto.module.css';

import { useNavigate } from 'react-router-dom';



import ProjetoForm from '../projeto/ProjetoForm';

function NovoProjeto() {

    const navigate = useNavigate();

    function createPost(projeto) {
        projeto.cost = 0;
        projeto.services = [];

        fetch('http://localhost:5000/projetos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projeto)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                navigate('/projetos', { state: { message: 'Projeto criado com sucesso!' } });
            })
            .catch((err) => console.log(err))

    }

    return (
        <div className={styles.novo_projeto_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjetoForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}
export default NovoProjeto;