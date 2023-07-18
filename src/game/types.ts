export type Resources = {
    silver: number;
    gold: number;
    virtue: number;
    power: number;
};

export type CardPrototype = {
    id: string;
    name: string;
    category: string;
    cost: number; // TODO migrate to Resources
    effect: string;
    artist: string;
    strength?: number;
    health?: number;
    flavor?: string;
};

export type Card = {
    id: number;
    proto: CardPrototype;
};

export type Player = {
    deck: Card[];
    hand: Card[];
    field: Card[]; // TODO migrate to Entity (unit or building)
    resources: Resources
};

export type GameState = {
    cards: Card[];
    playerOne: Player;
    playerTwo: Player;
};
