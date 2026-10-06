<template>
    <component
        :is="link ? RouterLink : 'button'"
        v-bind="link ? { to: link } : { type: 'button' }"
        :title="title"
        class="tile"
        v-outline-effect
        :class="{ [`tile--${size}`]: true, 'has-image': image }"
    >
        <div class="tile__image" v-if="image"><img class="image" :src="image" alt="" /></div>
        <div class="tile__content" :class="{ 'no-image': !image }">
            <div class="tile__text" v-if="title || description">
                <div class="tile__text-title" v-if="title">{{ title }}</div>
                <p class="tile__text-description" v-if="description">{{ description }}</p>
            </div>
        </div>
    </component>
</template>

<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
    link: { type: String, default: "" },
    image: String,
    title: String,
    description: String,
    size: { type: String, default: "small" },
});
</script>

<style lang="scss">
.tiles {
    display: flex;
    flex-wrap: wrap;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
}
.tile {
    padding: 4px;
    background: var(--secondary-color);
    box-sizing: border-box;
    text-align: center;
    color: inherit;
    font: inherit;
    container-type: inline-size;
    width: calc(100% - 1rem);
    max-height: 22rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    --border-radius: 16px;
    border-radius: var(--border-radius);
    transition: transform 0.2s ease-in-out;
    &:active {
        transform: scale(0.98);
    }
    .tile__content {
        width: 100%;
        max-height: 100%;
        overflow-y: auto;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        text-align: left;
        .tile__text {
            display: flex;
            flex-direction: column;
            height: 100%;
            &-description {
                margin: 0;
                opacity: 0.6;
            }
            &-title {
                display: block;
                line-height: normal;
                margin-bottom: 0.45rem;
            }
        }
        &.no-image {
            text-align: center;
            .tile__text {
                &-title {
                    font-size: 2rem;
                    font-family: "Codystar", "Raleway Dots", cursive;
                    @media screen and (min-width: 768px) {
                        font-size: clamp(1.6rem, 13cqi, 2.45rem);
                    }
                }
            }
        }
    }

    .tile__image {
        width: 100%;
        height: 15rem;
        margin: 0 auto;
        overflow: hidden;
        --border-radius: 14px;
        border-radius: var(--border-radius);
        transition: opacity 0.2s ease-in-out;
        .image {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }

    &.has-image {
        justify-content: flex-start;
    }

    @media screen and (min-width: 768px) {
        width: calc(50% - 1rem);
    }
    @media screen and (min-width: 1024px) {
        width: calc(25% - 1rem);
        min-height: 24rem;
        &--medium {
            width: calc(33.333% - 1rem);
        }
        &--large {
            width: calc(50% - 1rem);
        }
    }
}
</style>
