import { INVALID_MOVE } from "boardgame.io/core";

import { GameArgs } from "./types";

/* Turns */

export const getCurrentPlayer = ({ G, ctx }: GameArgs) => {
    const player = ctx.currentPlayer === "0" ? "playerOne" : "playerTwo";
    return G[player];
};

export const onTurnBegin = ({ G, ctx }: GameArgs) => {
    const player = getCurrentPlayer({G, ctx});

    player.resources.silver += 2;
    drawCard({ G, ctx });

    // TODO test this
    player.field.forEach(card => {
        card.exhausted = false;
    });
};

/* Moves */

export const drawCard = ({ G, ctx }: GameArgs) => {
    const player = getCurrentPlayer({G, ctx});

    if (player.deck.length === 0) return INVALID_MOVE;

    const card = player.deck.shift();
    if (card !== undefined) {
        player.hand.push(card);
    }
};

export const playCard = ({ G, ctx }: GameArgs, cardId: number) => {
    const player = getCurrentPlayer({G, ctx});

    if (player.hand.length === 0) return INVALID_MOVE;

    const card = player.hand.splice(cardId, 1)[0];

    if (card !== undefined) {
        if (card.proto.cost > player.resources.silver) return INVALID_MOVE;

        player.field.push(card);
        player.resources.silver -= card.proto.cost;

        if(card.proto.category === "unit") {
            card.exhausted = true;
        }
    }
};