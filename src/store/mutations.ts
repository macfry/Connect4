
import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { EPlayers, IPlayer, State, defaultState } from './state';

export type Mutations<S = State> = {
    [MutationTypes.SET_COLUMNS](state: S, columns: number): void
    [MutationTypes.SET_ROWS](state: S, rows: number): void;
    [MutationTypes.SET_IS_GAME_OVER](state: S, isGameOver: boolean): void
    [MutationTypes.SET_CURRENT_PLAYER](state: S, currentPlayer: EPlayers): void;
    [MutationTypes.SET_BOARD](state: S, board: Array<EPlayers[]>): void;
    [MutationTypes.SET_CURRENT_COLUMNS](state: S, currentColumns: number[]): void;
    [MutationTypes.SET_PLAYER](state: S, payload: { playerName: string, number: number}): void;
    [MutationTypes.SET_WINNER](state: S, winner: IPlayer): void;
    [MutationTypes.RESET_STORE](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_COLUMNS](state: State, columns: number) {
        state.columns = columns;
    },
    [MutationTypes.SET_ROWS](state: State, rows: number) {
        state.rows = rows;
    },
    [MutationTypes.SET_IS_GAME_OVER](state: State, isGameOver: boolean) {
        state.isGameOver = isGameOver;
    },
    [MutationTypes.SET_CURRENT_PLAYER](state: State, currentPlayer: EPlayers) {
        state.currentPlayer = currentPlayer;
    },
    [MutationTypes.SET_BOARD](state: State, board: Array<EPlayers[]>) {
        state.board = board;
    },
    [MutationTypes.SET_CURRENT_COLUMNS](state: State, currentColumns: number[]) {
        state.currentColumns = currentColumns;
    },
    [MutationTypes.SET_PLAYER](state: State, payload: { playerName: string, number: number}) {
        if (payload.number === 1) {
            state.playerOne = {
                name: payload.playerName,
                color: EPlayers.RED,
            };
        } else if (payload.number === 2) {
            state.playerTwo = {
                name: payload.playerName,
                color: EPlayers.YELLOW,
            };
        }
    },
    [MutationTypes.SET_WINNER](state: State, winner: IPlayer) {
        state.winner = winner;
    },
    [MutationTypes.RESET_STORE](state: State) {
        state.columns = defaultState.columns;
        state.rows = defaultState.rows;
        state.board = defaultState.board;
        state.currentColumns = defaultState.currentColumns;
        state.playerOne = defaultState.playerOne
        state.playerTwo = defaultState.playerTwo;
        state.currentPlayer = defaultState.currentPlayer;
        state.isGameOver = defaultState.isGameOver;
        state.winner = defaultState.winner;
    },
};
