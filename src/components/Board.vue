<script setup lang="ts">
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { setGame, setPiece } from './../services/game';
import { EPlayers, IPlayer } from '../store/state';
import { MutationTypes } from '../store/mutation-types';
import BoardTile from './BoardTile.vue';
import InputText from './InputText.vue';

interface IBoardState {
    columns: number;
    rows: number;
    board: Array<string | EPlayers[]>;
    winner: IPlayer | null;
    isGameOver: boolean;
    playerOneName: string;
    playerTwoName: string;
}

const state = reactive<IBoardState>({
    columns: 7,
    rows: 6,
    board: [],
    winner: null,
    isGameOver: false,
    playerOneName: '',
    playerTwoName: '',
});

const store = useStore();
const boardEl = ref(null);
const size = computed(() => boardEl.value?.clientWidth / state.columns ?? 0);

const clickHandler = (value: string) => {
    if (!value) return;

    const coords = value.split('-');
    const row = Number(coords[0]);
    const col = Number(coords[1]);
    setPiece(row, col);
};

const resetGame = () => {
    store.comit(MutationTypes.RESET_STORE);
};

onMounted(() => {
    setGame(state.rows, state.columns);
    state.board = store.getters.board;
});

watchEffect(() => {
    if (store.getters.isGameOver) {
        state.isGameOver = true;
    }
});
</script>

<template>
    <form class="row">
        <div class="col-xs-12 col-sm-6 mb-3 d-flex justify-content-center align-items-center">
            <div class="color-idicator player-one me-3"></div>
            <input-text
                :label="'Player One Name: '"
                :name="'playerOneName'"
                :required="true"
                v-model="state.playerOneName"
            />
        </div>

        <div class="col-xs-12 col-sm-6 mb-3 d-flex justify-content-center align-items-center">
            <div class="color-idicator player-two me-3"></div>
            <input-text
                :label="'Player Two Name: '"
                :name="'playerOneName'"
                :required="true"
                v-model="state.playerTwoName"
            />
        </div>

        <div class="col-12 mb-3  d-flex justify-content-center">
            <button type="submit" class="btn btn-primary">Start Game</button>
        </div>
    </form>

    <div class="row">
        <div class="col-12 d-flex justify-content-center">
            <div class="board" ref="boardEl">
                <div v-for="(row, rindex) in state.board" :key="`row-${rindex}`" class="board-row">
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
.color-idicator {
    width: 3em;
    height: 3em;
    display: block;
    border-radius: 50%;
}

.player-one {
    background-color: var(--player-one-color);
}

.player-two {
    background-color: var(--player-two-color);
}

.board {
    display: flex;
    flex-direction: column;
    width: 70vh;
    height: 60vh;
    background-color: blueviolet;
    border: 10px silid rebeccapurple;
}

.board-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
</style>