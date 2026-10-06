<template>
    <router-link :title="title" :to="link" class="card" :class="{ 'has-tags': tags && tags.length > 0 }">
        <div v-outline-effect class="card-inside">
            <div class="card-image" v-if="image"><img class="image" :src="image" alt="" /></div>
            <div class="card-content">
                <div class="card-text" v-if="title || description">
                    <div class="card-text-title" v-if="title">{{ title }}</div>
                    <p class="card-text-description" v-if="description">{{ description }}</p>
                </div>
                <div class="card-tags" v-if="cardTags && cardTags.length > 0">
                    <div class="card-tags-item" :class="{ [tag]: tag }" v-for="tag of cardTags" :key="tag">
                        {{ tag }}
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
    link: { type: [Object, String], default: "" },
    image: String,
    title: String,
    description: String,
    tags: {
        type: [String, Array],
    },
});
const cardTags = computed(() => {
    if (!props.tags) return [];
    return Array.isArray(props.tags) ? props.tags : props.tags.split(",").map((item) => item.trim());
});
</script>

<style scoped lang="scss">
.card {
    width: 100%;
    .card-inside {
        display: flex;
        flex-direction: column;
        padding: 4px;
        --border-radius: 16px;
        border-radius: var(--border-radius);
        background: var(--secondary-color);
        box-sizing: border-box;
        text-align: center;
        flex-shrink: 0;
        min-height: 5rem;
        .card-content {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            overflow-y: auto;
            padding: 1rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            margin-top: 1rem;
            text-align: left;
            .card-text {
                opacity: 0;
                transform: scaleY(0);
                transform-origin: center bottom;
                transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
                will-change: opacity, transform;
                &-title {
                    font-size: 1.45rem;
                    margin: 0;
                }
                &-description {
                    margin: 0;
                }
            }
            .card-tags {
                display: flex;
                flex-wrap: wrap;
                box-sizing: border-box;
                margin-top: 1rem;
                &-item {
                    background-color: var(--accent-color);
                    text-align: center;
                    padding: 0.25rem 0.85rem;
                    color: var(--font-color);
                    border-radius: 30px;
                    font-size: 0.85rem;
                    box-sizing: border-box;
                    text-transform: uppercase;
                    font-weight: 600;
                    margin-right: 0.25rem;
                    border: 1px dashed var(--tertiary-color);
                }
            }
        }

        .card-image {
            width: 100%;
            height: 15rem;
            margin: 0 auto;
            border-radius: 14px;
            overflow: hidden;
            transition: opacity 0.2s ease-in-out;
            will-change: opacity;
            .image {
                max-width: 100%;
                max-height: 100%;
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }
    }
    &:hover,
    &:focus-visible {
        .card-content {
            .card-text {
                opacity: 1;
                transform: scaleY(1);
            }
        }
        .card-image {
            opacity: 0.4;
        }
    }
    @media (hover: none) {
        .card-inside {
            .card-content .card-text {
                opacity: 1;
                transform: scaleY(1);
            }
            .card-image {
                opacity: 0.4;
            }
        }
    }
}
</style>
