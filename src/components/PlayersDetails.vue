<script setup lang="ts">
import { computed, reactive } from 'vue';
import InputText from './InputText.vue';
import { useStore } from '../store';
import { MutationTypes } from '../store/mutation-types';

interface IRequiredFields {
    playerOneName: boolean;
    playerTwoName: boolean;
}

interface IPlayersDetailsState {
    playerOneName: string;
    playerTwoName: string;
}

const state = reactive<IPlayersDetailsState>({
    playerOneName: '',
    playerTwoName: '',
})

const requiredFieldsValid = reactive<IRequiredFields>({
    playerOneName: false,
    playerTwoName: false,
});

const ifFormValid = computed<boolean>(() => requiredFieldsValid.playerOneName && requiredFieldsValid.playerTwoName);
const validate = (valid: boolean, field: keyof IRequiredFields) => {
  requiredFieldsValid[field] = valid;
};

const store = useStore();
const emits = defineEmits(['startGame']);

const startGame = () => {
    store.commit(MutationTypes.SET_PLAYER, { playerName: state.playerOneName, number: 1 });
    store.commit(MutationTypes.SET_PLAYER, { playerName: state.playerTwoName, number: 2 });
    emits('startGame', ifFormValid);
};
</script>

<template>
    <div class="row">
        <div class="col-xs-12 col-sm-6 mb-3 d-flex justify-content-center align-items-center p-4">
            <div class="color-idicator player-one me-3"></div>
            <input-text
                :label="'Player One Name'"
                :name="'playerOneName'"
                :required="true"
                v-model="state.playerOneName"
                @is-valid="(e) => validate(e, 'playerOneName')"
            />
        </div>

        <div class="col-xs-12 col-sm-6 mb-3 d-flex justify-content-center align-items-center p-4">
            <div class="color-idicator player-two me-3"></div>
            <input-text
                :label="'Player Two Name'"
                :name="'playerTwoName'"
                :required="true"
                v-model="state.playerTwoName"
                @is-valid="(e) => validate(e, 'playerTwoName')"
            />
        </div>

        <div class="col-12 mb-3  d-flex justify-content-center mt-3">
            <button 
                class="btn btn-primary" 
                :disabled="!ifFormValid" 
                @click="startGame"
            >Start Game</button>
        </div>
    </div>
</template>

<style scoped>
.color-idicator {
    width: 3em;
    height: 3em;
    display: block;
    border-radius: 50%;
    flex-shrink: 0;
    flex-grow: 1;
}

.player-one {
    background-color: var(--player-one-color);
}

.player-two {
    background-color: var(--player-two-color);
}
</style>
