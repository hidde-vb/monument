import { Ctx } from 'boardgame.io';
import { BoardProps } from 'boardgame.io/react';
import { GameState } from '../game/types';

import styles from './Board.module.css';

interface context extends Ctx {
    gameover: {
        draw: boolean,
        winner: string,
    }
}

const getWinner = (ctx: context): string | null => {
    if(!ctx.gameover) return null;

    if (ctx.gameover.draw) return 'Draw!';

    if (ctx.gameover.winner) return 'Winner: ' + ctx.gameover.winner;

    return null;
};

const GameBoard = ({ ctx }: BoardProps<GameState>): JSX.Element => {
    const winner = getWinner(ctx as context);

    return (
        <main>
            <h1>Monument</h1>
            {winner && <p>{winner}</p>}
            <div className={styles.grid}>
                
            </div>
        </main>
    );
};

export default GameBoard;