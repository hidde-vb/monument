import { Ctx } from 'boardgame.io';
import { BoardProps } from 'boardgame.io/react';
import { Card, GameState } from '../game/types';

import styles from './Board.module.css';
import HandCard from './hand/HandCard';
import EndTurnButton from './EndTurnButton';

interface context extends Ctx {
    gameover: {
        draw: boolean,
        winner: string,
    }
}

const getWinner = (ctx: context): string | null => {
    if (!ctx.gameover) return null;

    if (ctx.gameover.draw) return 'Draw!';

    if (ctx.gameover.winner) return 'Winner: ' + ctx.gameover.winner;

    return null;
};

const GameBoard = ({ G, ctx, events }: BoardProps<GameState>): JSX.Element => {
    const winner = getWinner(ctx as context);

    const onEndButtonClick = () => {
        console.log('End Turn');
        events?.endTurn?.();
    };

    return (
        <main>
            {winner && <p>{winner}</p>}
            <div className={styles.hand}>
                {G.playerOne.hand.map((card: Card, i) => (
                    <HandCard key={i} card={card} />
                ))}
            </div>
            <EndTurnButton onClick={onEndButtonClick} />
        </main>
    );
};

export default GameBoard;