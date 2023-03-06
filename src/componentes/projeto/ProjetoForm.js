import { useState, useEffect } from 'react';

import styles from './ProjetoForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjetoForm({ handleSubmit, btnText, dados }) {

    const [categorias, setCategorias] = useState([]);
    const [dadosProjeto, setDadosProjeto] = useState(dados || {});

    useEffect(() => {
        fetch('http://localhost:5000/categorias', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json())
            .then((data) => {
                setCategorias(data);
            })
            .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(dadosProjeto);
    }

    function handleChange(e) {
        setDadosProjeto({ ...dadosProjeto, [e.target.name]: e.target.value });
    }

    function handleCategory(e) {
        setDadosProjeto({
            ...dadosProjeto, categorias: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        });

    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={dadosProjeto.name ? dadosProjeto.name : ''}
            />

            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={dadosProjeto.budget ? dadosProjeto.budget : ''}
            />

            <Select
                name="categoria_id"
                text="Selecione a categoria"
                options={categorias}
                handleOnChange={handleCategory}
                value={dadosProjeto.categorias ? dadosProjeto.categorias.id : ''}
            />

            <SubmitButton text={btnText} />
        </form>
    )
}
export default ProjetoForm;