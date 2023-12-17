
import { GetterTree } from 'vuex';
import { EPlayers, IPlayer, State } from './state';

export type Getters = {
  getColumns(state: State): number;
  getRows(state: State): number;
  getBoard(state: State): Array<EPlayers[]>;
  getCurrentColumns(state: State): number[];
  getPlayerOne(state: State): IPlayer;
  getPlayerTwo(state: State): IPlayer;
  getCurrentPlayer(state: State): EPlayers;
  getIsGameOver(sate: State): boolean;
  getWinner(state: State): IPlayer | null;
};

export const getters: GetterTree<State, State> & Getters = {
  getColumns: (state) => state.columns,
  getRows: (state) => state.rows,
  getBoard: (state) => state.board,
  getCurrentColumns: (state) => state.currentColumns,
  getPlayerOne: (state) => state.playerOne,
  getPlayerTwo: (state) => state.playerTwo,
  getCurrentPlayer: (state) => state.currentPlayer,
  getIsGameOver: (state) => state.isGameOver,
  getWinner: (state) => state.winner,
};
