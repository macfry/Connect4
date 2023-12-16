
import { GetterTree } from 'vuex';
import { EPlayers, IPlayer, State } from './state';

export type Getters = {
  columns(state): number;
  rows(state): number;
  board(state: State): Array<EPlayers[]>;
  currentColumns(state: State): number[];
  playerOne(state: State): IPlayer;
  playerTwo(state: State): IPlayer;
  currentPlayer(state: State): EPlayers;
  isGameOver(sate: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  columns: (state) => state.columns,
  rows: (state) => state.rows,
  board: (state) => state.board,
  currentColumns: (state) => state.currentColumns,
  playerOne: (state) => state.playerOne,
  playerTwo: (state) => state.playerTwo,
  currentPlayer: (state) => state.currentPlayer,
  isGameOver: (state) => state.isGameOver,
};
