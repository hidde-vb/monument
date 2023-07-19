import { INVALID_MOVE } from "boardgame.io/core";
import { getCurrentPlayer } from "../gameLogic";
import { Card, CardPrototype, GameArgs } from "../types";

export const getNumberProp = (card: Card, prop: keyof CardPrototype): number => {
    const value = card[prop] ?? card.proto[prop];

    if (typeof value === "number") return value;

    return 0;
};

const performAttack = (attacker: Card, target: Card): void => {
    let targetHealth = getNumberProp(target, 'health');
    targetHealth -= getNumberProp(attacker, 'strength');

    target.health = targetHealth;
};

export const getOpponent = ({ G, ctx }: GameArgs) => {
    const player = ctx.currentPlayer === "1" ? "playerOne" : "playerTwo";
    return G[player];
};

export const attack = ({ G, ctx }: GameArgs, attackerId: number, targetId: number) => {
    const player = getCurrentPlayer({ G, ctx });
    const opponent = getOpponent({ G, ctx });

    const attacker = player.field[attackerId];
    const target = opponent.field[targetId];

    if (attacker === undefined || target === undefined) return INVALID_MOVE;

    if (attacker.proto.category !== "unit" || attacker.exhausted === true) return INVALID_MOVE;

    attacker.exhausted = true;
    performAttack(attacker, target);
    performAttack(target, attacker);
};