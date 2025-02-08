<template>
    <div class="header-container">
        <img src="/prueba-tecnica-tk-front-static/logo.png" alt="logo">

    </div>
    <div class="report-container">
        <div class="table-header">
            <h1>Generador de reportes TK</h1>
        </div>

        <div class="table-container">
            <table class="report-table">
                <thead>
                    <tr>
                        <th class="text-left">Título</th>
                        <th class="text-center">Fecha de Creación</th>
                        <th class="text-right">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="report in reports" :key="report.id">
                        <td class="text-left title">{{ report.title }}</td>
                        <td class="text-center date">{{ formatDate(report.created_at) }}</td>
                        <td class="text-right" action>
                            <button class="btn-download" @click="downloadReport(report)">
                                <span>Descargar</span>
                                <div class="download-icon">
                                    <img src="/prueba-tecnica-tk-front-static/download_vector.png" alt="descargar">
                                </div>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>



        </div>
        <div class="btn-container">
            <button class="btn" @click="openModal"><span>Crear Reporte</span></button>
        </div>
        <ReportFormModal :show="showModal" @close="closeModal" @submit="submitReport" />
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import ReportFormModal from '../components/ReportFormModal.vue'
import { reportService } from '../services/report'


const showModal = ref(false)
const reports = ref([])
const isLoading = ref(true)
const error = ref(null)
// eslint-disable-next-line no-unused-vars
let reportChannel = null;

onMounted(async () => {
    try {
        const data = await reportService.getReports()
        reports.value = data.data ?? [];
    } catch (err) {
        error.value = 'Error al cargar los reportes'
        console.error('Error:', err)
    } finally {
        isLoading.value = false
    }

    // reportChannel = echo.channel('report')
    // reportChannel.listen('.ReportCreated', (e) => {
    //     if (!reports.value.some(report => report.id === e.data.report.id)) {
    //         alert('Nuevo reporte creado')
    //         reports.value.push(e.data.report)
    //     }
    // })


})




const openModal = () => showModal.value = true
const closeModal = () => showModal.value = false

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
}

const downloadReport = (report) => {
    const rawReport = { ...report }
    const url = rawReport.report_link;
    window.open(url, '_blank');
}

const submitReport = async (report) => {
    await new Promise(resolve => setTimeout(resolve, 5000))

    reports.value.push({
        id: reports.value.length + 1,
        title: report.title,
        created_at: new Date(),
        report_link: reports.value[0].report_link,
    })
    alert('Nuevo reporte creado')
}

</script>

<style lang="scss" scoped>
@import "@/styles/pages/_report.scss";
@import "@/styles/components/_modals.scss";
</style>