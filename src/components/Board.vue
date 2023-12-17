<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { setGame, setPiece } from './../services/game';
import { EPlayers, IPlayer } from '../store/state';
import { MutationTypes } from '../store/mutation-types';
import BoardTile from './BoardTile.vue';
import PlayersDetails from './PlayersDetails.vue';

interface IBoardState {
    columns: number;
    rows: number;
    board: Array<string | EPlayers[]>;
    winner: IPlayer | null;
    isGameOver: boolean;
    startGame: boolean;
}

const initialGameState: IBoardState = {
    columns: 7,
    rows: 6,
    board: [],
    winner: null,
    isGameOver: false,
    startGame: false,
};
const gameState = ref<IBoardState>({ ...initialGameState });
const resetState = () => gameState.value = { ...initialGameState };

const store = useStore();
const boardEl = ref(null);
const size = computed(() => boardEl.value?.clientWidth / gameState.value.columns ?? 0);
const currentPlayer = computed(() => store.getters.getCurrentPlayer === store.getters.getPlayerOne.color ? store.getters.getPlayerOne : store.getters.getPlayerTwo);

const clickHandler = (value: string) => {
    if (!value) return;

    const coords = value.split('-');
    const row = Number(coords[0]);
    const col = Number(coords[1]);
    setPiece(row, col);
};

const setStartGame = (value: boolean) => {
    gameState.value.startGame = value;
};

const resetGame = () => {
    store.commit(MutationTypes.RESET_STORE);
    resetState();
    setGame(gameState.value.rows, gameState.value.columns);
    gameState.value.board = store.getters.getBoard;
};

const newGame = () => {
    const playerOne = store.getters.getPlayerOne.name;
    const playerTwo = store.getters.getPlayerTwo.name;
    store.commit(MutationTypes.RESET_STORE);
    store.commit(MutationTypes.SET_PLAYER, { playerName: playerOne, number: 1 });
    store.commit(MutationTypes.SET_PLAYER, { playerName: playerTwo, number: 2 });
    gameState.value = { ...initialGameState, startGame: gameState.value.startGame };
    setGame(gameState.value.rows, gameState.value.columns);
    gameState.value.board = store.getters.getBoard;
};

onMounted(() => {
    setGame(gameState.value.rows, gameState.value.columns);
    gameState.value.board = store.getters.getBoard;
});

onBeforeUnmount(() => {
  resetState();
});

watchEffect(() => {
    if (store.getters.getIsGameOver) {
        gameState.value.isGameOver = true;
    }

    if (store.getters.getWinner) {
        gameState.value.winner = store.getters.getWinner;
    }
});
</script>

<template>
    <PlayersDetails @start-game="setStartGame" v-if="!gameState.startGame"/>

    <div class="row" v-else>
        <div class="col-12 mt-4 mb-4 d-flex justify-content-center align-items-center" v-if="!gameState.isGameOver && !gameState.winner">
            <p class="lead mb-0">Current move belongs to <b>{{ currentPlayer.name }}</b></p>
            <span class="small-tile" :class="{
                'red': currentPlayer.color === EPlayers.RED,
                'yellow': currentPlayer.color === EPlayers.YELLOW,
            }"></span>
        </div>

        <div class="col-12 mt-4 mb-4 d-flex justify-content-center align-items-center" v-if="gameState.isGameOver">
            <p class="lead mb-0" v-if="gameState.winner">Congratulation <b>{{ gameState.winner.name }}</b> you won!</p>

            <button
                class="btn btn-primary ms-2" 
                @click="newGame"
            >Start New Game</button>

            <button 
                class="btn btn-secondary ms-2" 
                @click="resetGame"
            >Quit Game</button>
        </div>

        <div class="col-12 d-flex justify-content-center mt-4">
            <div class="board" ref="boardEl">
                <div v-for="(row, rindex) in gameState.board" :key="`row-${rindex}`" class="board-row">
                    <template v-for="(col, cindex) in row" :key="`col-${cindex}`">
                        <BoardTile :col-id="cindex" :row-id="rindex" :size="size" :col-val="(col as EPlayers)"
                            @tile-selected="clickHandler" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.board {
    display: flex;
    flex-direction: column;
    width: 70vh;
    background-color: var(--bg-board);
    border: 10px solid #216582;
    border-radius: 8%;
}

.board-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.small-tile {
    display: block;
    width: 2rem;
    height: 2rem;
    margin-left: 1rem;
    border-radius: 50%;
}
</style>