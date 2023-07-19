import { Card, CardPrototype, GameState } from "./types";

import cardPrototypes from '../data/cards';

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