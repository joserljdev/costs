import styles from './Mensagem.module.css';

import { useState, useEffect } from 'react';

function Mensagem({ tipo, msg }) {

    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        if (!msg) {
            setVisivel(false);
            return;
        }
        setVisivel(true);

        const timer = setTimeout(() => {
            setVisivel(false);
        }, 3000);

        return () => clearTimeout(timer);

    }, [msg])


    return (
        <>
            {visivel && (
                <div className={`${styles.mensagem} ${styles[tipo]}`}>{msg}</div>
            )}
        </>
    )
}
export default Mensagem;