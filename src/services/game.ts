import { store } from '../store';
import { MutationTypes } from '../store/mutation-types';
import { EPlayers } from '../store/state';

export interface TileDetails {
    row: number;
    col: number;
    class: EPlayers;
}

export const setGame = (rows: number, columns: number) => {
    store.commit(MutationTypes.SET_COLUMNS, columns);
    store.commit(MutationTypes.SET_ROWS, rows);
    const arr = Array.from(Array(columns), () => rows - 1);
    store.commit(MutationTypes.SET_CURRENT_COLUMNS, arr);

    const board = []
  
    for (let r = 0; r < rows; r++) {
        let row = [];

        for (let c = 0; c < columns; c++) {
            row.push('');
        }

        board.push(row);
    }

    store.commit(MutationTypes.SET_BOARD, board);
};

export const setWinner = (row: number, column: number) => {
    const board = store.getters.getBoard;
    const playerOne = store.getters.getPlayerOne;
    const playerTwo = store.getters.getPlayerTwo;

    if (board[row][column] === playerOne.color) {  
        store.commit(MutationTypes.SET_WINNER, playerOne);         
    } else {
        store.commit(MutationTypes.SET_WINNER, playerTwo); 
    }

    store.commit(MutationTypes.SET_IS_GAME_OVER, true);
};

export const checkWhoWin = () => {
    const rows = store.getters.getRows;
    const columns = store.getters.getColumns;
    const board = store.getters.getBoard;

    // horizontal
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] !== '') {
                if (board[row][col] === board[row][col + 1] && 
                    board[row][col + 1] === board[row][col + 2] && 
                    board[row][col + 2] === board[row][col + 3]
                ) {
                    setWinner(row, col);
                    return;
                }
            }
        }
    }

    // vertical
    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows - 3; row++) {
            if (board[row][col] !== '') {
                if (board[row][col] === board[row + 1][col] && 
                    board[row + 1][col] === board[row + 2][col] && 
                    board[row + 2][col] === board[row + 3][col]
                ) {
                    setWinner(row, col);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let row = 0; row < rows - 3; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] !== '') {
                if (board[row][col] === board[row + 1][col + 1] && 
                    board[row + 1][col + 1] === board[row + 2][col + 2] && 
                    board[row + 2][col + 2] === board[row + 3][col + 3]
                ) {
                    setWinner(row, col);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let row = 3; row < rows; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] !== '') {
                if (board[row][col] === board[row - 1][col + 1] && 
                    board[row - 1][col + 1] === board[row - 2][col + 2] && 
                    board[row - 2][col + 2] === board[row - 3][col + 3]
                ) {
                    setWinner(row, col);
                    return;
                }
            }
        }
    }
};

export const isBoardFull = () => {
    const board: Array<EPlayers[]> = store.getters.getBoard;
    const spacesInRows = board.map((row) => row.filter((item) => item === '').length);
    const sum = spacesInRows.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    if (sum === 0) {
        store.commit(MutationTypes.SET_IS_GAME_OVER, true);
    } else {
        checkWhoWin();
    }
};

export const setPiece = (rowIndex: number, colIndex: number) => {
    if (store.getters.getIsGameOver) {
        return
    }

    let row = rowIndex;
    let col = colIndex;

    row = store.getters.getCurrentColumns[col];

    if (row < 0) {
        return;
    }

    const currentBoard = [...store.getters.getBoard];
    currentBoard[row][col] = store.getters.getCurrentPlayer;
    store.commit(MutationTypes.SET_BOARD, currentBoard);

    if (store.getters.getCurrentPlayer == EPlayers.RED) {
        store.commit(MutationTypes.SET_CURRENT_PLAYER, EPlayers.YELLOW);
        
    } else {
        store.commit(MutationTypes.SET_CURRENT_PLAYER, EPlayers.RED);
    }

    row -= 1;

    const newCurrentColumnsData = [...store.getters.getCurrentColumns];
    newCurrentColumnsData[col] = row;
    store.commit(MutationTypes.SET_CURRENT_COLUMNS, newCurrentColumnsData);

    // checkWhoWin();
    isBoardFull();
};
