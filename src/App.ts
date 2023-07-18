import { Game } from "boardgame.io";
import { Client } from "boardgame.io/react";
import GameBoard from "./components/Board";
import { getInitialState, drawCard, playCard, onTurnBegin } from "./game/gameLogic";
import { GameState } from "./game/types";


const MonumentGame: Game<GameState> = {
    setup: getInitialState,
    moves: {
        drawCard,
        playCard,
    },
    turn: {
        onBegin: onTurnBegin,
    }
};

const App = Client({ game: MonumentGame, board: GameBoard });

export default App;