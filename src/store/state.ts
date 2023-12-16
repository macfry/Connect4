export enum EPlayers {
    RED = 'red',
    YELLOW = 'yellow',
}

export interface IPlayer {
    name: string;
    color: EPlayers;
}

export interface State {
    columns: number;
    rows: number;
    board: Array<EPlayers[]>;
    currentColumns: number[];
    playerOne: IPlayer;
    playerTwo: IPlayer;
    currentPlayer: EPlayers;
    isGameOver: boolean;
    winner: IPlayer | null;
}

export const defaultState: State = {
    columns: 0,
    rows: 0,
    board: [],
    currentColumns: [],
    playerOne: {
        name: '',
        color: EPlayers.RED,
    },
    playerTwo: {
        name: '',
        color: EPlayers.YELLOW,
    },
    currentPlayer: EPlayers.RED,
    isGameOver: false,
    winner: null,
};
  
export const state: State = JSON.parse(JSON.stringify(defaultState));
