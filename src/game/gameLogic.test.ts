import { Ctx } from 'boardgame.io';
import { describe, test, expect } from 'vitest';

import { drawCard, playCard, onTurnBegin } from './gameLogic';
import { getInitialState } from './setup';

const ctx = {
    currentPlayer: '0',
} as Ctx;

describe('Moves', () => {
    describe('drawCard', () => {
        test('It removes the first card from the deck and adds it to the hand', () => {
            const G = getInitialState();
            const initialDeck = [...G.playerOne.deck];

            drawCard({ G, ctx });

            expect(G.playerOne.deck.length).toEqual(initialDeck.length - 1);
            expect(G.playerOne.hand).toEqual([initialDeck[0]]);
        });
    });

    describe('playCard', () => {
        test('It removes the card from the hand and adds it to the field', () => {
            const G = getInitialState();
            G.playerOne.resources.silver = 6;

            drawCard({ G, ctx });
            playCard({ G, ctx }, 0);

            expect(G.playerOne.hand).toEqual([]);
            expect(G.playerOne.field).toEqual([G.cards[0]]);
        });

        test('It enters the field exhausted when the card category is a "unit"', () => {
            const G = getInitialState();
            G.playerOne.resources.silver = 6;
            G.playerOne.hand = [G.cards[4]];

            expect(G.playerOne.hand[0].proto.category).toEqual('unit');

            playCard({ G, ctx }, 0);

            expect(G.playerOne.field[0].exhausted).toEqual(true);
        });

        test('It returns INVALID MOVE when no cards in hand', () => {
            const G = getInitialState();
            G.playerOne.resources.silver = 6;

            const result = playCard({ G, ctx }, 0);

            expect(result).toEqual("INVALID_MOVE");
        });

        test('It returns INVALID MOVE when not enough resources', () => {
            const G = getInitialState();
            G.playerOne.resources.silver = 0;

            drawCard({ G, ctx });
            const result = playCard({ G, ctx }, 0);

            expect(result).toEqual("INVALID_MOVE");
        });
    });
});

describe('Turn Logic', () => {
    describe('onTurnBegin', () => {
        test('The current player adds 2 silver to its resources', () => {
            const G = getInitialState();

            expect(G.playerOne.resources.silver).toEqual(0);

            onTurnBegin({ G, ctx });

            expect(G.playerOne.resources.silver).toEqual(2);
        });

        test('The current player draws a card', () => {
            const G = getInitialState();

            expect(G.playerOne.hand.length).toEqual(0);

            onTurnBegin({ G, ctx });

            expect(G.playerOne.hand.length).toEqual(1);
        });

        test('The current player\'s units on the board become unexhausted', () => {
            const G = getInitialState();

            G.playerOne.field[0] = G.cards[0];
            G.playerOne.field[0].exhausted = true;

            expect(G.playerOne.field[0].exhausted).toEqual(true);

            onTurnBegin({ G, ctx });

            expect(G.playerOne.field[0].exhausted).toEqual(false);
        });
    });
});