import { Game } from "boardgame.io";
import { Client } from "boardgame.io/react";

import { getInitialState } from "./game/setup";
import { GameState } from "./game/types";

import { drawCard, playCard, onTurnBegin } from "./game/gameLogic";
import { attack } from "./game/abilities/attack";


import GameBoard from "./components/Board";

const MonumentGame: Game<GameState> = {
    setup: getInitialState,
    moves: {
        drawCard,
        playCard,
        attack
    },
    turn: {
        onBegin: onTurnBegin,
    }
};

const App = Client({ game: MonumentGame, board: GameBoard });

export default App;