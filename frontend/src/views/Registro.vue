<script setup>
import { ref, watch } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const nombre = ref('')
const correo = ref('')
const contrasenia = ref('')
const tipo = ref('estudiante')

const errores = ref({
  nombre: '',
  correo: '',
  contrasenia: '',
})

const router = useRouter()

const validar = () => {
  errores.value = {
    nombre: '',
    correo: '',
    contrasenia: '',
  }

  // Nombre
  if (!nombre.value) {
    errores.value.nombre = 'El campo es obligatorio'
  } else if (nombre.value.length < 3 || nombre.value.length > 100) {
    errores.value.nombre = 'Debe tener entre 3 y 100 caracteres'
  }

  // Correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!correo.value) {
    errores.value.correo = 'El campo es obligatorio'
  } else if (!emailRegex.test(correo.value)) {
    errores.value.correo = 'Correo inválido'
  }

  // Password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-]).{8,}$/

  if (!contrasenia.value) {
    errores.value.contrasenia = 'El campo es obligatoria'
  } else if (!passwordRegex.test(contrasenia.value)) {
    errores.value.contrasenia = 'Debe tener 8 caracteres, mayúscula, minúscula, número y símbolo'
  }

  return !errores.value.nombre && !errores.value.correo && !errores.value.contrasenia
}

// Validación en tiempo real
watch([nombre, correo, contrasenia], () => {
  validar()
})

const registro = async () => {
  if (!validar()) return

  try {
    await api.post('/auth/registro', {
      nombre: nombre.value,
      correo: correo.value,
      contrasenia: contrasenia.value,
      tipo: tipo.value,
    })

    alert('Registro exitoso')
    router.push('/')
  } catch (error) {
    errores.value.correo = 'Error al realizar el registro'
  }
}
</script>

<template>
  <div class="container">
    <h2>Registro</h2>

    <!-- Nombre -->
    <div class="field">
      <input v-model="nombre" placeholder="Nombre" :class="{ error: errores.nombre }" />
      <span class="error-text">{{ errores.nombre }}</span>
    </div>

    <!-- Correo -->
    <div class="field">
      <input v-model="correo" placeholder="Correo" :class="{ error: errores.correo }" />
      <span class="error-text">{{ errores.correo }}</span>
    </div>

    <!-- Password -->
    <div class="field">
      <input
        v-model="contrasenia"
        type="password"
        placeholder="Contraseña"
        :class="{ error: errores.contrasenia }"
      />
      <span class="error-text">{{ errores.contrasenia }}</span>
    </div>

    <!-- Tipo -->
    <select v-model="tipo">
      <option value="estudiante">Estudiante</option>
      <option value="profesor">Profesor</option>
    </select>

    <button @click="registro">Registrarse</button>

    <p>
      ¿Ya tienes cuenta?
      <router-link to="/">Inicia sesión</router-link>
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

.field {
  display: flex;
  flex-direction: column;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input.error {
  border: 2px solid red;
}

.error-text {
  color: red;
  font-size: 12px;
}

button {
  padding: 10px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
