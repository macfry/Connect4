<script setup lang="ts">
import { PropType } from 'vue';
import { EPlayers } from '../store/state';

const props = defineProps({
    rowId: {
        type: Number,
        required: true,
    },
    colId: {
        type: Number,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    colVal: {
        type: String as PropType<EPlayers>,
        required: true,
    },
});

const emits = defineEmits(['tileSelected']);

const setTile = (event: Event) => {
    emits('tileSelected', event.target.id);
};
</script>

<template>
    <div 
        :id="`${rowId}-${colId}`" 
        class="tile" 
        :style="{ width: `calc(${props.size}px - 0.5em)`, height: `calc(${props.size}px - 0.5em)` }"
        :class="{
            'red': props.colVal === EPlayers.RED,
            'yellow': props.colVal === EPlayers.YELLOW,
        }"
        @click="setTile"
    ></div>
</template>

<style>
.tile {
    display: block;
    margin: 0.25em;
    background-color: var(--bg-color);
    border-radius: 50%;
}

.red {
    background-color: red;
}

.yellow {
    background-color: yellow;
}
</style>
