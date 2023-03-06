import styles from '../projeto/ProjetoForm.module.css';

import { useState } from 'react';

import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

function ServicoForm({ handleSubmit, btnText, dados }) {

    const [servico, setServico] = useState({});

    function submit(e) {
        e.preventDefault();
        dados.services.push(servico);
        handleSubmit(dados);
    }

    function handleChange(e) {
        setServico({ ...servico, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição de serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}
export default ServicoForm;