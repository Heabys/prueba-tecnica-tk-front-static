<template>
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-container">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Reporte por fecha de nacimiento</h2>
                    <p class="modal-subtitle">Ingresa los siguientes datos para generar tu reporte</p>
                </div>


                <form class="modal-form" @submit.prevent="submitForm">
                    <div class="modal-form-inputs">
                        <InputText id="report-title" label="Descripción del reporte" v-model="form.title"
                            placeholder="Ingrese la descripción" />

                        <div class="modal-date-container">
                            <p class="modal-label">Fecha de nacimiento</p>
                            <div class="modal-input-container">
                                <InputText id="start-date" label="Fecha inicio" v-model="form.startDate" type="date" />
                                <InputText id="end-date" label="Fecha fin" v-model="form.endDate" type="date" />
                            </div>
                        </div>
                    </div>

                    <div class="btn-container">
                        <button class="btn" :disabled="!formIsValid" type="submit">
                            <span>
                                Generar Reporte
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
/*eslint-disable */
import { ref, computed, defineEmits } from "vue";
import { reportService } from "../services/report";
import InputText from "./inputs/InputText.vue";



// eslint-disable-next-line no-undef
defineProps({
    show: Boolean,
});

const emit = defineEmits(["close", "submit"]);


const form = ref({
    title: "",
    startDate: "",
    endDate: "",
});

const errors = ref({
    title: "",
    startDate: "",
    endDate: "",
});



const formIsValid = computed(() => {
    errors.value = { title: "", startDate: "", endDate: "" };

    if (!form.value.title) {
        errors.value.title = "La descripción es obligatoria.";
    }

    if (!form.value.startDate) {
        errors.value.startDate = "La fecha de inicio es obligatoria.";
    }

    if (!form.value.endDate) {
        errors.value.endDate = "La fecha de fin es obligatoria.";
    }

    if (form.value.startDate && form.value.endDate && new Date(form.value.startDate) > new Date(form.value.endDate)) {
        errors.value.startDate = "La fecha de inicio no puede ser mayor que la fecha de fin.";
        errors.value.endDate = "La fecha de fin debe ser mayor o igual a la de inicio.";
    }

    return !errors.value.title && !errors.value.startDate && !errors.value.endDate;
});

const submitForm = async () => {
    if (!formIsValid.value) return;


    try {
        const response = await reportService.generateReport({
            title: form.value.title,
            start_date: form.value.startDate,
            end_date: form.value.endDate,
        });
        if (response.message) {
            emit("submit", {
                title: form.value.title,
                start_date: form.value.startDate,
                end_date: form.value.endDate,
            }); emit("close");
            form.value.title = ''
            form.value.startDate = ''
            form.value.endDate = ''
            alert('El reporte se ha generado correctamente')


        }


    } catch (error) {
        console.error("Error al generar el reporte:", error);
    }
};
</script>
