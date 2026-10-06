<template>
    <a href="#mainContent" class="skip-link" @click.prevent="contentElement.focus()">Skip to content</a>
    <Header ref="headerElement" :class="{ scrolled: isScrolled }" />
    <main
        ref="contentElement"
        id="mainContent"
        tabindex="-1"
        :style="{ paddingTop: headerHeight + 'px', marginBottom: footerHeight + 'px' }"
    >
        <router-view v-slot="{ Component }">
            <transition name="slide-down" mode="out-in">
                <Component class="container main-container" :is="Component" />
            </transition>
        </router-view>
    </main>
    <Footer ref="footerElement" />
    <Modal />
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch, ref, nextTick } from "vue";
import { themeStore } from "./store/theme";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Modal from "./components/Modal.vue";

const theme = themeStore();
const headerElement = ref(null);
const footerElement = ref(null);
const contentElement = ref(null);
const headerHeight = ref(0);
const footerHeight = ref(0);
const isScrolled = ref(false);

// Set class and header/footer height
onMounted(() => {
    nextTick(() => {
        // Check scroll
        window.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkWidth);
        // Set theme
        document.body.className = theme.theme;
        setElementHeights();
        // Set header scrolled status
        isScrolled.value = window.scrollY > 25;
    });
});
// Update body class on theme change
watch(
    () => theme.theme,
    (newVal) => {
        document.body.className = newVal;
    }
);
onBeforeUnmount(() => {
    document.body.className = "";
});

const checkScroll = () => {
    isScrolled.value = window.scrollY > 25;
};

const setElementHeights = () => {
    headerHeight.value = headerElement.value.$el.offsetHeight + 50;
    footerHeight.value = footerElement.value.$el.offsetHeight;
};

// Mobile browsers fire resize when the toolbar hides, only the width matters here
let lastWidth = window.innerWidth;
const checkWidth = () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    setElementHeights();
};
</script>

<style scoped>
#mainContent {
    position: relative;
    z-index: 2;
    padding: 1rem 0 3rem 0;
    &:focus {
        outline: none;
    }
    .main-container {
        background-color: var(--primary-color);
    }
}

.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(1rem);
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: 0.2s ease-out;
}
</style>
