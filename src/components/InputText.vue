<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
  
<script lang="ts" setup>
import { PropType, computed, reactive, watch } from 'vue';

const props = defineProps({
    label: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    required: {
        type: Boolean,
        default: false,
    },
    validationMessage: {
        type: String || (Array as PropType<string[]>),
        required: false,
    },
    modelValue: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        required: false,
    },
});

const emits = defineEmits(['update:modelValue', 'isValid']);

const validation = reactive({
    isValid: false,
    message: '',
});

const errorMessage = computed(() => {
    return Array.isArray(props.validationMessage)
        ? props.validationMessage[0]
        : props.validationMessage || validation.message;
});

const validate = (value: string | null | undefined, showMessage = true) => {
    if (!props.required) return;

    if (value) {
        validation.isValid = true;
        if (showMessage) {
            validation.message = '';
        }
    } else {
        validation.isValid = false;
        if (showMessage) {
            validation.message = 'This field is required.';
        }
    }

    emits('isValid', validation.isValid);
};

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emits('update:modelValue', target.value);
    validate(target.value);
};

watch(
    () => props.modelValue,
    (_newValue, oldValue) => {
        validate(props.modelValue, oldValue === undefined ? false : true);
    },
    { immediate: true },
);
</script>

<template>
    <div class="form-group">
        <label :for="props.id || `${props.name}Input`" class="form-label"
            :class="{ 'form-label--required': props.required }" v-if="props.label">
            {{ props.label }}
        </label>

        <input class="form-control" type="text" v-bind="$attrs" :id="props.id || `${props.name}Input`"
            :placeholder="props.label" :name="props.name" :required="props.required" :value="props.modelValue" :class="{
                'is-invalid': !!errorMessage,
            }" @input="onInput" />

        <div class="invalid-feedback mb-3" v-if="!!errorMessage">
            {{ errorMessage }}
        </div>
    </div>
</template>
  
<style scoped>
.form-label--required::after {
    content: '*';
    margin-left: 0.35rem;
}
</style>
  