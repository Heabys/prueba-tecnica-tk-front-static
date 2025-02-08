<script setup>
import { ref } from 'vue'
const minDate = ref('1980-01-01')
const maxDate = ref('2010-12-31')
// eslint-disable-next-line no-undef
defineProps({
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: false,
    },
    modelValue: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        default: 'text',
    },
    required: {
        type: Boolean,
        default: false,
    },
    error: {
        type: String,
        required: false,
    },
    min: {
        type: String,
        required: false,
    },
    max: {
        type: String,
        required: false,
    },
})

// eslint-disable-next-line no-undef, no-unused-vars
const emit = defineEmits(['update:modelValue'])

</script>

<template>
    <div class="item-form">
        <label v-if="label" :for="id">{{ label }}<span v-if="required">*</span></label>
        <div class="input-container">
            <div class="input-container-inner">
                <input :id="id" :type="type" :value="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder"
                    :required="required" autocomplete="off" :min="type === 'date' ? minDate : null"
                    :max="type === 'date' ? maxDate : null">
            </div>
            <div v-if="error" class="error-message">{{ error }}</div>
        </div>


    </div>
</template>



<style lang="scss" scoped></style>