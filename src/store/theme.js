import { defineStore } from "pinia";

export const themeStore = defineStore({
    id: "theme",
    state: () => ({
        currentTheme: localStorage.getItem("theme") || "dark",
    }),
    getters: {
        theme(state) {
            return state.currentTheme;
        },
    },
    actions: {
        setTheme(theme) {
            this.currentTheme = theme;
            localStorage.setItem("theme", theme);
        },
    },
});
