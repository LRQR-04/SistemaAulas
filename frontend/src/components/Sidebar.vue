<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

import { LayoutDashboard, Users, CalendarDays, Building2, BarChart3, LogOut } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()

const tipo = computed(() => auth.usuario?.tipo)

const menu = computed(() => {
  if (tipo.value === 'admin') {
    return [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Usuarios', path: '/usuarios', icon: Users },
      { name: 'Espacios', path: '/espacios', icon: Building2 },
      { name: 'Reservaciones', path: '/reservaciones', icon: CalendarDays },
      { name: 'Reportes', path: '/reportes', icon: BarChart3 },
    ]
  }

  if (tipo.value === 'profesor' || tipo.value === 'estudiante') {
    return [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Reservaciones', path: '/reservaciones', icon: CalendarDays },
      { name: 'Ver espacios', path: '/espacios', icon: Building2 },
    ]
  }
})

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <aside class="sidebar">
    <div class="logo">Sistema</div>

    <nav>
      <router-link v-for="item in menu" :key="item.path" :to="item.path" class="link">
        <component :is="item.icon" size="18" />
        <span>{{ item.name }}</span>
      </router-link>
    </nav>

    <div class="footer">
      <div class="user">
        {{ auth.usuario?.nombre }}
        <small>{{ tipo }}</small>
      </div>

      <button @click="logout">
        <LogOut size="16" />
        Salir
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 160px;
  height: 100vh;
  background: #1f2937;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
}

.logo {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  text-decoration: none;
  padding: 8px;
  border-radius: 6px;
  transition: 0.2s;
}

.link:hover {
  background: #374151;
}

.link.router-link-active {
  background: #42b883;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user {
  font-size: 14px;
}

small {
  display: block;
  opacity: 0.7;
}

button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #e74c3c;
  border: none;
  padding: 8px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
</style>
