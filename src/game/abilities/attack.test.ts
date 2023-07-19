import { Ctx } from "boardgame.io";
import { describe, test, expect, beforeEach } from "vitest";

import { getInitialState } from "../setup";
import { GameState } from "../types";
import { attack, getNumberProp } from "./attack";

describe('Attack Ability', () => {
    let G: GameState;

    const ctx = {
        currentPlayer: '0',
    } as Ctx;

    beforeEach(() => {
        G = getInitialState();
        G.playerOne.field = [G.cards[3]];
        G.playerTwo.field = [G.cards[4]];
    });

    test('It deals damage to the target and it returns the damage', () => {
        expect(getNumberProp(G.cards[4], 'health')).toEqual(2);

        attack({ G, ctx} , 0, 0);

        expect(getNumberProp(G.playerTwo.field[0], 'health')).toEqual(0);
        expect(getNumberProp(G.playerOne.field[0], 'health')).toEqual(0);
    });

    test('It returns INVALID_MOVE when the attacker is not a unit', () => {
        G.playerOne.field = [G.cards[0]];

        const result = attack({ G, ctx }, 0, 0);

        expect(result).toEqual("INVALID_MOVE");
    });

    test('It returns INVALID_MOVE when the attacker is exhausted', () => {
        G.playerOne.field[0].exhausted = true;

        const result = attack({ G, ctx }, 0, 0);

        expect(result).toEqual("INVALID_MOVE");
    });
});