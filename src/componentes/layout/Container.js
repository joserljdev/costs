import styles from './Container.module.css';

function Container(props) {
    return (
        <div className={`${styles.container} ${styles[props.classCustomizada]}`}>
            {props.children}
        </div>
    )
}
export default Container;