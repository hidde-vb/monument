import { Ctx } from "boardgame.io";

export type Resources = {
    silver: number;
    gold: number;
    virtue: number;
    power: number;
};

export type CardPrototype = {
    cardId: string;
    name: string;
    category: string;
    cost: number; // TODO migrate to Resources
    effect: string;
    artist: string;
    strength?: number;
    health?: number;
    flavor?: string;
};

// The prototype is the card template, which can be overwritten by values in the root
export type Card = Partial<CardPrototype> & {
    id: number;
    exhausted?: boolean;
    proto: CardPrototype;
};

export type Player = {
    deck: Card[];
    hand: Card[];
    field: Card[]; // TODO migrate to Entity (unit or building)
    discard: Card[];
    resources: Resources
};

export type GameState = {
    cards: Card[];
    playerOne: Player;
    playerTwo: Player;
};

export type GameArgs = {
    G: GameState;
    ctx: Ctx
};

