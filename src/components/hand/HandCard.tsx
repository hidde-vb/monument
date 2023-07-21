import { Card } from '../../game/types';
import styles from './HandCard.module.css';

interface HandCardProps {
    key: number;
    card: Card;
}

const HandCard = ({ key, card }: HandCardProps): JSX.Element => (
    <div key={key} className={styles.card}>
        <p>{card.proto.name}</p>
    </div>
);

export default HandCard;