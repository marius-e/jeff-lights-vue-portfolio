import { defineStore } from "pinia";
import { markRaw } from "vue";
import router from "../router";

export const modalStore = defineStore({
    id: "modal",
    state: () => ({
        isOpen: false,
        content: {},
        actions: [],
        payload: {},
        modalWidth: "",
        contentProps: {},
    }),
    actions: {
        open(content, modalWidth, actions, payload, contentProps = {}) {
            this.isOpen = true;
            this.actions = actions;
            this.payload = payload;
            this.modalWidth = modalWidth;
            this.contentProps = contentProps;
            // Reactive not required
            if (content) this.content = markRaw(content);
            document.body.classList.add("modal-open");
        },
        close(goBack = false) {
            this.isOpen = false;
            this.content = {};
            this.actions = [];
            this.payload = {};
            this.contentProps = {};
            document.body.classList.remove("modal-open");
            if (goBack) {
                router.back();
            }
        },
        setPayload(payload) {
            this.payload = payload;
        },
    },
});
