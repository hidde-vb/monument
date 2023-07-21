import styles from './EndTurnButton.module.css';

interface EndTurnButtonProps {
    onClick: () => void;
}

const EndTurnButton = ({ onClick }: EndTurnButtonProps): JSX.Element => (
    <button className={styles.button} onClick={() => onClick()}>
        End Turn
    </button>
);


export default EndTurnButton;