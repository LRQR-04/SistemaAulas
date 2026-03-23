import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Reservaciones from '../views/Reservaciones.vue'
import Espacios from '../views/Espacios.vue'
import Registro from '../views/Registro.vue'
import MainLayout from '../layouts/MainLayout.vue'

const rutas = [
  { path: '/', component: Login },
  { path: '/registro', component: Registro },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      {
        path: 'reservaciones',
        component: Reservaciones,
        meta: { roles: ['estudiante', 'profesor'] },
      },
      { path: 'espacios', component: Espacios, meta: { tipo: 'admin' } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: rutas,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  const rutasPublicas = ['/', '/registro']
  const esPublica = rutasPublicas.includes(to.path)

  // Usuaario no autenticado
  if (!esPublica && !auth.token) {
    return '/'
  }

  // Ya logueado => evitar volver a login
  if (esPublica && auth.token) {
    return '/dashboard'
  }

  // Validación por roles
  if (to.meta.roles) {
    const tipoUsuario = auth.usuario?.tipo

    if (!to.meta.roles.includes(tipoUsuario)) {
      return '/dashboard'
    }
  }

  return true
})

export default router
