import { INVALID_MOVE } from "boardgame.io/core";

import { getNumberProp } from "./abilities/attack";

import { GameArgs } from "./types";

/* Turns */

export const getCurrentPlayer = ({ G, ctx }: GameArgs) => {
    const player = ctx.currentPlayer === "0" ? "playerOne" : "playerTwo";
    return G[player];
};

export const getPlayer = ({ G }: GameArgs, playerId: string) => {
    const player = playerId === "0" ? "playerOne" : "playerTwo";
    return G[player];
};

export const onTurnBegin = ({ G, ctx }: GameArgs) => {
    const player = getCurrentPlayer({ G, ctx });

    player.resources.silver += 2;
    drawCard({ G, ctx });

    player.field.forEach(card => {
        card.exhausted = false;
    });
};

/*
 * Post move cleanup.
 */
export const onMove = ({ G, ctx }: GameArgs) => {

    // Move cards on the field to the discard pile if their health is 0 or less
    for (let i = 0; i < ctx.numPlayers; i++) {
        const playerId = i.toString();
        const player = getPlayer({ G, ctx }, playerId);

        player.field.forEach((card, index) => {
            if (getNumberProp(card, 'health') <= 0) {
                trashCard({ G, ctx }, playerId, index);
            }
        });
    }
};

/* Moves */

/*
 * Move the card from the top of the deck to the current player's hand.
 */
export const drawCard = ({ G, ctx }: GameArgs) => {
    const player = getCurrentPlayer({ G, ctx });

    if (player.deck.length === 0) return INVALID_MOVE;

    const card = player.deck.shift();
    if (card !== undefined) {
        player.hand.push(card);
    }
};

/*
 * Move the card from the current player's hand to their field and pay the cost.
 */
export const playCard = ({ G, ctx }: GameArgs, cardId: number) => {
    const player = getCurrentPlayer({ G, ctx });

    if (player.hand.length === 0) return INVALID_MOVE;

    const card = player.hand.splice(cardId, 1)[0];

    if (card !== undefined) {
        if (card.proto.cost > player.resources.silver) return INVALID_MOVE;

        player.field.push(card);
        player.resources.silver -= card.proto.cost;

        if (card.proto.category === "unit") {
            card.exhausted = true;
        }
    }
};

/*
 * Move the card from a player's field to their discard pile.
 */
export const trashCard = ({ G, ctx }: GameArgs, playerId: string, cardId: number) => {
    const player = getPlayer({ G, ctx }, playerId);

    if (player.field.length === 0) return INVALID_MOVE;

    const card = player.field.splice(cardId, 1)[0];

    if (card !== undefined) {
        player.discard.push(card);
    }
};
