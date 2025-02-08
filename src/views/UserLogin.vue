<template>
    <section class="login-section">
        <div class="login-container">
            <form class="login-form" @submit.prevent="handleLogin">
                <h1 class="title-login">Iniciar Sesión</h1>
                <InputText id="login-email" label="Correo Electrónico:" v-model="form.email" type="email"
                    placeholder="ejemplo@correo.com" required :error="errors.email" />
                <InputText id="login-password" label="Contraseña:" v-model="form.password" type="password"
                    placeholder="******" required :error="errors.password" />
                <div class="btn-container">
                    <button type="submit" class="btn">
                        <span>Iniciar Sesión</span>
                    </button>

                </div>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router'
import InputText from '../components/inputs/InputText.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
    email: '',
    password: ''
})

const errors = ref({
    email: '',
    password: ''
})

const errorMessage = ref('')

const handleLogin = async () => {
    try {
        errors.value = {
            email: '',
            password: ''
        }
        errorMessage.value = ''

        await authStore.login(form.value)
        router.push('/')
    } catch (error) {
        errorMessage.value = 'Credenciales inválidas'
    }
}
</script>

<style lang="scss" scoped>
@import url("@/styles/pages/_login.scss");
</style>