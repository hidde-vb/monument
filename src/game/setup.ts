import { Card, CardPrototype, GameState, Player } from "./types";

import cardPrototypes from '../data/cards';

const CARD_DUPLICATES = 3;

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

const createPlayer = (overwrites?: Partial<Player>) => ({
    deck: [],
    hand: [],
    field: [],
    discard: [],
    resources: {
        silver: 0,
        gold: 0,
        virtue: 0,
        power: 0,
    },
    ...overwrites
});

export const getInitialState = (): GameState => {
    const cards = loadCards();

    return Object.freeze({
        cards,
        playerOne: createPlayer({
            deck: cards.slice(0, 7)
        }),
        playerTwo: createPlayer({  deck: cards.slice(7, 8) }),
    });
};