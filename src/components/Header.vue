<template>
    <header v-outline-effect id="mainHeader" class="header outline-bottom">
        <div class="container">
            <div id="mainMenu" class="header__content" @keydown.esc="isMenuOpen = false">
                <router-link :to="{ name: 'homepage' }" class="header__logo">
                    <div class="header__logo-image"></div>
                    <div class="header__logo-text">Jeff Lights</div>
                </router-link>
                <nav id="mainNavigation" class="header__navbar" :class="{ 'is-open': isMenuOpen }" aria-label="Main" @click="isMenuOpen = false">
                    <router-link :to="{ name: 'homepage' }" class="header__navbar-item">Homepage</router-link>
                    <router-link :to="{ name: 'projects' }" class="header__navbar-item">Projects</router-link>
                    <router-link :to="{ name: 'blog' }" class="header__navbar-item">Blog</router-link>
                    <router-link :to="{ name: 'about' }" class="header__navbar-item">About</router-link>
                    <router-link :to="{ name: 'contact' }" class="header__navbar-item">Contact</router-link>
                </nav>
                <div class="header__misc">
                    <div class="color-controller" tabindex="0" role="group" aria-label="Color theme">
                        <div class="color-select-item current-color" :style="{ backgroundColor: currentColor?.preview }"></div>
                        <div class="color-select">
                            <button
                                class="color-select-item"
                                v-for="color of colors"
                                :key="color.id"
                                :title="color.name"
                                :aria-label="`${color.name} theme`"
                                :aria-pressed="theme.theme === color.id"
                                :style="{ background: color.preview }"
                                @click="theme.setTheme(color.id)"
                            ></button>
                        </div>
                    </div>
                    <button
                        type="button"
                        class="header__burger"
                        :class="{ 'is-open': isMenuOpen }"
                        aria-label="Menu"
                        aria-controls="mainNavigation"
                        :aria-expanded="isMenuOpen"
                        @click="isMenuOpen = !isMenuOpen"
                    >
                        <span class="header__burger-line"></span>
                        <span class="header__burger-line"></span>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { colors } from "@/config/config.json";
import { computed, ref } from "vue";
import { themeStore } from "@/store/theme";
const theme = themeStore();
const isMenuOpen = ref(false);
const currentColor = computed(() => {
    return colors.find((color) => color.id === theme.theme);
});
</script>

<style scoped lang="scss">
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background-color: var(--primary-color);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s ease-in-out;
    will-change: border-color;
    &.scrolled {
        background-color: var(--header-bg);
        border-color: var(--header-border-color);
    }
    &:hover {
        border-color: var(--header-border-color);
    }
    &__content {
        position: relative;
        padding: 1rem 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        @media screen and (min-width: 1024px) {
            padding: 2rem 0;
            flex-wrap: nowrap;
        }
    }
    &__logo {
        text-transform: uppercase;
        font-weight: bold;
        background-color: var(--logo-background);
        color: var(--logo-color);
        padding: 0.45rem 1rem;
    }
    &__misc {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .header__navbar {
        order: 3;
        width: 100%;
        display: flex;
        flex-direction: column;
        max-height: 0;
        overflow: hidden;
        visibility: hidden;
        transition: max-height 0.3s ease-in-out, visibility 0s linear 0.3s;
        &.is-open {
            max-height: 20rem;
            visibility: visible;
            transition: max-height 0.3s ease-in-out;
        }
        @media screen and (min-width: 1024px) {
            order: 0;
            width: auto;
            flex-direction: row;
            justify-content: space-between;
            max-height: none;
            overflow: visible;
            visibility: visible;
            transition: none;
        }
        &-item {
            position: relative;
            align-self: flex-start;
            font-weight: 600;
            font-size: 1.15rem;
            color: var(--menu-color);
            margin: 0.65rem 0 0 0;
            padding-bottom: 0.25rem;
            box-sizing: content-box;
            transition: color 0.2s ease-in-out;
            will-change: color;
            &:first-of-type {
                margin-top: 1.5rem;
            }
            &:last-of-type {
                margin-bottom: 0.5rem;
            }
            @media screen and (min-width: 1024px) {
                font-size: 1rem;
                margin: 0 1.8rem 0 0;
                &:first-of-type {
                    margin-top: 0;
                }
                &:last-of-type {
                    margin-right: 0;
                    margin-bottom: 0;
                }
            }
            &:hover,
            &:focus,
            &.router-link-active,
            &.active {
                color: var(--font-color);
            }
            &:last-of-type::after {
                display: none;
            }
            &::before {
                content: "";
                display: block;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                transform: scaleX(0);
                --border-radius: 12px;
                border-radius: var(--border-radius);
                background: repeating-linear-gradient(to right, transparent, var(--font-color) 2px, var(--font-color) 6px, var(--font-color) 6px);
                transform-origin: right center;
                transition: transform 0.2s cubic-bezier(0.42, 0, 0.58, 1);
                will-change: transform;
                opacity: 0.6;
            }
            &:hover::before,
            &.router-link-active::before {
                transform-origin: left center;
                transform: scale(1);
            }
            &::after {
                content: "/";
                display: none;
                position: absolute;
                right: -1.5rem;
                margin: 0 0.25rem;
                color: var(--font-color);
                opacity: 0.3;
                pointer-events: none;
                @media screen and (min-width: 1024px) {
                    display: inline;
                }
            }
        }
    }
    &__burger {
        position: relative;
        width: 2.5rem;
        height: 2.5rem;
        border: 1px dashed var(--tertiary-color);
        border-radius: 50%;
        flex-shrink: 0;
        @media screen and (min-width: 1024px) {
            display: none;
        }
        &-line {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 1.1rem;
            height: 2px;
            border-radius: 2px;
            background-color: var(--font-color);
            transition: transform 0.3s ease-in-out;
            &:first-child {
                transform: translate(-50%, calc(-50% - 3px)) rotate(0);
            }
            &:last-child {
                transform: translate(-50%, calc(-50% + 3px)) rotate(0);
            }
        }
        &.is-open {
            .header__burger-line:first-child {
                transform: translate(-50%, -50%) rotate(45deg);
            }
            .header__burger-line:last-child {
                transform: translate(-50%, -50%) rotate(-45deg);
            }
        }
    }
    .color-controller {
        position: relative;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed var(--tertiary-color);
        border-radius: 50%;
        .color-select-item {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            display: block;
            overflow: hidden;
            padding: 0;
            cursor: pointer;
            border: 1px solid var(--accent-color);
            transition: transform 0.2s ease-in-out;
            &:hover {
                transform: scale(1.2);
            }
        }
        .color-select {
            display: flex;
            align-items: center;
            background-color: var(--primary-color);
            border: 1px dashed var(--tertiary-color);
            padding: 0.45rem;
            right: -2px;
            top: 50%;
            position: absolute;
            overflow: hidden;
            white-space: nowrap;
            transform-origin: center right;
            opacity: 0;
            transform: scaleX(0) translateY(-50%);
            transition: all 0.2s ease-in-out;
            border-radius: 2rem;
            .color-select-item {
                margin: 0 0.25rem;
                border: 1px solid var(--secondary-color);
            }
        }
        &:hover,
        &:focus,
        &:focus-within {
            .color-select {
                transform: scaleX(1) translateY(-50%);
                opacity: 1;
            }
        }
    }
}
</style>
