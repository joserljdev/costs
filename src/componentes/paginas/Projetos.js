import styles from './Projetos.module.css';

import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Mensagem from '../layout/Mensagem';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import ProjetoCard from '../projeto/ProjetoCard';
import Loading from '../layout/Loading';

function Projetos() {
    const [projetos, setProjetos] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projetoMessage, setProjetoMessage] = useState('');

    const location = useLocation();

    let message = '';

    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projetos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                    setProjetos(data);
                    setRemoveLoading(true);
                })
                .catch((err) => console.log(err))
        }, 1000);
    }, [])

    function removeProjeto(id) {
        fetch(`http://localhost:5000/projetos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
            .then(() => {
                setProjetos(projetos.filter((projeto) => projeto.id !== id));
                setProjetoMessage('Projeto removido com sucesso!');
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/novoProjeto" text="Criar Projeto" />
            </div>
            {message && <Mensagem msg={message} tipo="success" />}
            {projetoMessage && <Mensagem msg={projetoMessage} tipo="success" />}
            <Container customClass="start">
                {projetos.length > 0 &&
                    projetos.map((projeto) => (
                        <ProjetoCard
                            id={projeto.id}
                            name={projeto.name}
                            budget={projeto.budget}
                            category={projeto.categorias.name}
                            key={projeto.id}
                            handleRemove={removeProjeto}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && projetos.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}
export default Projetos;