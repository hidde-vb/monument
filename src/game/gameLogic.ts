import { INVALID_MOVE } from "boardgame.io/core";

import { Card, CardPrototype, GameState } from "./types";

import cardPrototypes from '../data/cards';
import { Ctx } from "boardgame.io";


const CARD_DUPLICATES = 3; // Testing

const loadCards = (): Card[] => {
    let cardId = 0;
    const cards: Card[] = [];

    cardPrototypes.forEach((proto: CardPrototype) => {
        for (let i = 0; i < CARD_DUPLICATES; i++) {
            cards.push({
                id: cardId++,
                proto,
            });
        }
    });

    return cards;
};

export const getInitialState = (): GameState => {
    const cards = loadCards();

    return Object.freeze({
        cards,
        playerOne: {
            deck: cards.slice(0, 4
            ),
            hand: [],
            field: [],
            resources: {
                silver: 0,
                gold: 0,
                virtue: 0,
                power: 0,
            },
        },
        playerTwo: {
            deck: cards.slice(4, 7),
            hand: [],
            field: [],
            resources: {
                silver: 0,
                gold: 0,
                virtue: 0,
                power: 0,
            },
        },
    });
};

/* Turn Logic */

type TurnArgs = {
    G: GameState;
    ctx: Ctx
};

type MoveArgs = {
    G: GameState;
    playerID: string;
};

const getCurrentPlayer = (G: GameState, playerID: string) => {
    const player = playerID === "0" ? "playerOne" : "playerTwo";
    return G[player];
};

export const onTurnBegin = ({ G, ctx }: TurnArgs) => {
    const player = getCurrentPlayer(G, ctx.currentPlayer);

    player.resources.silver += 2;
    drawCard({ G, playerID: ctx.currentPlayer });
};

/* Moves */

export const drawCard = ({ G, playerID }: MoveArgs) => {
    const player = getCurrentPlayer(G, playerID);

    if (player.deck.length === 0) return INVALID_MOVE;

    const card = player.deck.shift();
    if (card !== undefined) {
        player.hand.push(card);
    }
};

export const playCard = ({ G, playerID }: MoveArgs, cardId: number) => {
    const player = getCurrentPlayer(G, playerID);

    if (player.hand.length === 0) return INVALID_MOVE;


    const card = player.hand.splice(cardId, 1)[0];

    if (card.proto.cost > player.resources.silver) return INVALID_MOVE;

    if (card !== undefined) {
        player.field.push(card);
        player.resources.silver -= card.proto.cost;
    }
};