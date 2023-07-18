import { Ctx } from 'boardgame.io';
import { describe, test, expect } from 'vitest';

import { getInitialState, drawCard, playCard, onTurnBegin } from './gameLogic';

const playerID = "0";

describe('Moves', () => {
    describe('drawCard', () => {
        test('It removes the first card from the deck and adds it to the hand', () => {
            const G = getInitialState();
            const initialDeck = [...G.playerOne.deck];

            drawCard({ G, playerID });

            expect(G.playerOne.deck.length).toEqual(initialDeck.length - 1);
            expect(G.playerOne.hand).toEqual([initialDeck[0]]);
        });
    });

    describe('playCard', () => {
        test('It removes the card from the hand and adds it to the field', () => {
            const G = getInitialState();
            G.playerOne.resources.silver = 6;

            drawCard({ G, playerID });
            playCard({ G, playerID }, 0);

            expect(G.playerOne.hand).toEqual([]);
            expect(G.playerOne.field).toEqual([G.cards[0]]);
        });

        test('It returns INVALID MOVE when no cards in hand', () => {
            const G = getInitialState();
            G.playerOne.resources.silver = 6;

            const result = playCard({ G, playerID }, 0);

            expect(result).toEqual("INVALID_MOVE");
        });

        test('It returns INVALID MOVE when not enough resources', () => {
            const G = getInitialState();
            G.playerOne.resources.silver = 0;

            drawCard({ G, playerID });
            const result = playCard({ G, playerID }, 0);

            expect(result).toEqual("INVALID_MOVE");
        });
    });
});

describe('Turn Logic', () => {
    describe('onTurnBegin', () => {
        test('The current player adds 2 silver to its resources', () => {
            const G = getInitialState();

            expect(G.playerOne.resources.silver).toEqual(0);

            onTurnBegin({ G, ctx: { currentPlayer: playerID } as Ctx });

            expect(G.playerOne.resources.silver).toEqual(2);
        });

        test('The current player draws a card', () => {
            const G = getInitialState();

            expect(G.playerOne.hand.length).toEqual(0);

            onTurnBegin({ G, ctx: { currentPlayer: playerID } as Ctx });

            expect(G.playerOne.hand.length).toEqual(1);
        });
    });
});