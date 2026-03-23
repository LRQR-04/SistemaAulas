import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    usuario: JSON.parse(sessionStorage.getItem("usuario")) || null,
    token: sessionStorage.getItem("token") || null,
  }),

  actions: {
    setAuth(usuario, token) {
      this.usuario = usuario;
      this.token = token;

      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      sessionStorage.setItem("token", token);
    },

    logout() {
      this.usuario = null;
      this.token = null;

      sessionStorage.removeItem("usuario");
      sessionStorage.removeItem("token");
    },
  },
});
