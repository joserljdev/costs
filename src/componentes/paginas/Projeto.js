import { parse, v4 as uuidv4 } from 'uuid';

import styles from './Projeto.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjetoForm from '../projeto/ProjetoForm';
import Mensagem from '../layout/Mensagem';
import ServicoForm from '../servico/ServicoForm';
import ServicoCard from '../servico/ServicoCard';

function Projeto() {
    const { id } = useParams();
    console.log(id);

    const [projeto, setProjeto] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [showProjetoForm, setShowProjetoForm] = useState(false);
    const [showServicoForm, setShowServicoForm] = useState(false);
    const [mensagem, setMensagem] = useState();
    //Tipo da mensagem
    const [tipo, setTipo] = useState();

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projetos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json())
                .then(data => {
                    setProjeto(data);
                    setServicos(data.services);
                })
                .catch(err => console.log(err))
        }, 1000);
    }, [id])

    function editPost(projeto) {

        setMensagem('');

        if (projeto.budget < projeto.cost) {
            //setTimeout(() => {
            setMensagem('O orçamento não pode ser menor que o custo do projeto!');
            setTipo('error');
            //}, 100);

            return false;
        }

        fetch(`http://localhost:5000/projetos/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projeto)
        }).then(resp => resp.json())
            .then(data => {
                setProjeto(data);
                setShowProjetoForm(false);
                setMensagem('Projeto atualizado!');
                setTipo('success');
            })
            .catch(err => console.log(err))
    }

    function criaServico(projeto) {
        setMensagem('');
        setTipo('');

        const ultimoServico = projeto.services[projeto.services.length - 1];

        ultimoServico.id = uuidv4();

        const ultimoCusto = ultimoServico.cost;

        const novoCusto = parseFloat(projeto.cost) + parseFloat(ultimoCusto);

        if (novoCusto > parseFloat(projeto.budget)) {
            setTimeout(() => {
                setMensagem('Orçamento ultrapassado! Verifique o valor do serviço.');
                setTipo('error');
            }, 100);
            projeto.services.pop();

            return false;
        }

        projeto.cost = novoCusto;

        fetch(`http://localhost:5000/projetos/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projeto)
        }).then(resp => resp.json())
            .then((data) => {
                setServicos(data.services);
                setShowServicoForm(false);
                setMensagem('Serviço criado com sucesso!');
                setTipo('success');
            })
            .catch(err => console.log(err))
    }

    function removeServico(id, cost) {
        setMensagem('');
        
        const servicosUpdated = projeto.services.filter(
            (servico) => servico.id !== id
        )

        const projetoUpdated = projeto;

        projetoUpdated.services = servicosUpdated;
        projetoUpdated.cost = parseFloat(projetoUpdated.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projetos/${projetoUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projetoUpdated)
        }).then(resp => resp.json())
            .then(() => {
                setProjeto(projetoUpdated);
                setServicos(servicosUpdated);
                setMensagem('Serviço removido com sucesso!');
            })
            .catch(err => console.log(err))

    }

    function toggleProjetoForm() {
        setShowProjetoForm(!showProjetoForm);
    }

    function toggleServicoForm() {
        setShowServicoForm(!showServicoForm);
    }

    return (
        <>
            {projeto.name ? (
                <div className={styles.projeto_detalhes}>
                    <Container customClass="column">
                        {mensagem && <Mensagem tipo={tipo} msg={mensagem} />}
                        <div className={styles.detalhes_container}>
                            <h1>Projeto: {projeto.name}</h1>
                            <button className={styles.btn} onClick={toggleProjetoForm}>
                                {!showProjetoForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjetoForm ? (
                                <div className={styles.projeto_info}>
                                    <p>
                                        <span>Categoria:</span> {projeto.categorias.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${projeto.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${projeto.cost}
                                    </p>
                                </div>

                            ) : (
                                    <div className={styles.projeto_info}>
                                        <ProjetoForm
                                            handleSubmit={editPost}
                                            btnText="Concluir edição"
                                            dados={projeto}
                                        />
                                    </div>
                                )}
                        </div>
                        <div className={styles.servico_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServicoForm}>
                                {!showServicoForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.projeto_info}>
                                {showServicoForm && (
                                    <ServicoForm
                                        handleSubmit={criaServico}
                                        btnText="Adicionar Serviço"
                                        dados={projeto}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {servicos.length > 0 &&
                                servicos.map((servico) => (
                                    <ServicoCard
                                        id={servico.id}
                                        name={servico.name}
                                        cost={servico.cost}
                                        description={servico.description}
                                        key={servico.id}
                                        handleRemove={removeServico}
                                    />
                                ))
                            }

                            {servicos.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                    </Container>
                </div>)
                : (
                    <Loading />
                )}
        </>
    )
}
export default Projeto;