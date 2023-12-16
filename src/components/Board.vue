<script setup lang="ts">
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { setGame, setPiece } from './../services/game';
import { EPlayers, IPlayer } from '../store/state';
import BoardTile from './BoardTile.vue';
import { MutationTypes } from '../store/mutation-types';

interface IBoardState {
    columns: number;
    rows: number;
    board: Array<string | EPlayers[]>;
    winner: IPlayer | null;
    isGameOver: boolean;
}

const state = reactive<IBoardState>({
    columns: 7,
    rows: 6,
    board: [],
    winner: null,
    isGameOver: false,
});

const store = useStore();
const boardEl = ref(null);
const size = computed(() => boardEl.value?.clientWidth / state.columns ?? 0);

const clickHandler = (value: string) => {
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
    <div class="row">
        <div class="col">
            <form>
                <div class="mb-3">
                    <label for="playerOneName" class="form-label">Player one name:</label>
                    <input type="text" class="form-control" id="playerOneName">
                </div>

                <div class="mb-3">
                    <label for="playerTwoName" class="form-label">Player two name:</label>
                    <input type="text" class="form-control" id="playerTwoName">
                </div>

                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div class="board" ref="boardEl">
                <div v-for="(row, rindex) in state.board" :key="`row-${rindex}`" class="board-row">
                    <template v-for="(col, cindex) in row" :key="`col-${cindex}`">
                        <BoardTile
                            :col-id="cindex"
                            :row-id="rindex"
                            :size="size"
                            :col-val="(col as EPlayers)"
                            @tile-selected="clickHandler"
                        />
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