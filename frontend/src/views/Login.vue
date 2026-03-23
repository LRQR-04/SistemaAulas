<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const correo = ref('')
const contrasenia = ref('')
const error = ref('')

const auth = useAuthStore()
const router = useRouter()

const login = async () => {
  error.value = ''

  try {
    const res = await api.post('/auth/login', {
      correo: correo.value,
      contrasenia: contrasenia.value,
    })

    auth.setAuth(res.data.usuario, res.data.token)
    router.push('/dashboard')
  } catch (e) {
    error.value = 'Credenciales incorrectas'
  }
}
</script>

<template>
  <div class="container">
    <h2>Login</h2>

    <!-- Email -->
    <input v-model="correo" :class="{ error: error }" placeholder="Correo" />
    <!-- Password -->
    <input v-model="contrasenia" type="password" placeholder="Contraseña" />

    <span v-if="error" class="error-text">
      {{ error }}
    </span>

    <button @click="login">Entrar</button>

    <p>
      ¿No tienes cuenta?
      <router-link to="/registro">Regístrate</router-link>
    </p>
  </div>
</template>

<style scoped>
.container {
  max-width: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error-text {
  color: red;
  font-size: 13px;
  text-align: center;
}

button {
  padding: 10px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

input.error {
  border: 2px solid red;
}
</style>
