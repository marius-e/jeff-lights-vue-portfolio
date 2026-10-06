<template>
    <Transition name="modal-toggle">
        <div v-if="isOpen" class="modal">
            <div class="modal-background" @click="modal.close(payload ? true : false)"></div>
            <div ref="dialogElement" class="modal-container container" role="dialog" aria-modal="true" tabindex="-1" :style="{ maxWidth: modalWidth }">
                <div class="modal-content">
                    <Transition name="content-toggle" mode="out-in">
                        <Component
                            :is="content"
                            v-model="model"
                            :payload="payload"
                            v-bind="contentProps"
                            v-if="activeModalContent == 'content'"
                        ></Component>
                        <div class="modal-gallery" v-else-if="payload?.images?.length > 0 && activeModalContent == 'gallery'">
                            <div class="modal-slider">
                                <swiper
                                    :modules="modules"
                                    navigation
                                    :pagination="{ clickable: true }"
                                    :scrollbar="{ draggable: true }"
                                    :slides-per-view="1"
                                >
                                    <swiper-slide v-for="(image, index) of payload.images" :key="image.id">
                                        <img class="modal-slider-image" :src="image.src" :alt="image.title || `${payload.title} ${index + 1}`" />
                                    </swiper-slide>
                                </swiper>
                            </div>
                        </div>
                        <div class="modal-articles" v-else-if="payload?.tags?.length > 0 && activeModalContent == 'news'">
                            <Articles :modalFilterTag="payload.tags" :fromModal="true" />
                        </div>
                    </Transition>
                    <div class="modal-action">
                        <button v-for="action in actions" class="btn" @click="action.callback(model)">
                            {{ action.label }}
                        </button>
                    </div>
                </div>
                <div class="modal-pages">
                    <button title="Close" aria-label="Close" class="close-modal general-button action" @click="modal.close()">
                        <ion-icon class="icon" name="close" size="large" aria-hidden="true"></ion-icon>
                    </button>
                    <button
                        title="Details"
                        aria-label="Details"
                        class="general-button action"
                        :class="{ active: activeModalContent == 'content' }"
                        :aria-pressed="activeModalContent == 'content'"
                        @click="toggleContentView('content')"
                        v-if="payload"
                    >
                        <ion-icon name="text-outline" aria-hidden="true"></ion-icon>
                    </button>
                    <button
                        title="News"
                        aria-label="News"
                        class="general-button action"
                        :class="{ active: activeModalContent == 'news' }"
                        :aria-pressed="activeModalContent == 'news'"
                        @click="toggleContentView('news')"
                        v-if="payload?.tags?.length > 0"
                    >
                        <ion-icon name="newspaper-outline" aria-hidden="true"></ion-icon>
                    </button>
                    <button
                        title="Gallery"
                        aria-label="Gallery"
                        class="general-button action"
                        :class="{ active: activeModalContent == 'gallery' }"
                        :aria-pressed="activeModalContent == 'gallery'"
                        @click="toggleContentView('gallery')"
                        v-if="payload?.images?.length > 0"
                    >
                        <ion-icon name="images-outline" aria-hidden="true"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { reactive, watch, ref, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { modalStore } from "../store/modal";
import Articles from "../views/Blog.vue";

const modal = modalStore();
const model = reactive({});
const { isOpen, content, actions, payload, modalWidth, contentProps } = storeToRefs(modal);

// Slider
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const modules = [Navigation, Pagination, Scrollbar, A11y];

// Content toggle
const activeModalContent = ref("content");
const toggleContentView = (type) => {
    activeModalContent.value = type;
};

// Check for content change
watch(payload, () => {
    toggleContentView("content");
});

// Keyboard and focus handling
const dialogElement = ref(null);
let lastFocusedElement = null;
const closeOnEscape = (event) => {
    if (event.key === "Escape") modal.close(payload.value ? true : false);
};
watch(isOpen, (open) => {
    if (open) {
        lastFocusedElement = document.activeElement;
        document.addEventListener("keydown", closeOnEscape);
        nextTick(() => dialogElement.value?.focus());
    } else {
        document.removeEventListener("keydown", closeOnEscape);
        lastFocusedElement?.focus();
    }
});
</script>

<style scoped lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 100%;
    transform: scaleY(1);
    transform-origin: center;
    z-index: 99999;
    --border-radius: 16px;
    border-radius: var(--border-radius);
    &-background {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: var(--modal-background);
        backdrop-filter: blur(10px);
    }
    &-container {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        max-height: 95%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        box-sizing: border-box;
        overflow: hidden;
        &:focus {
            outline: none;
        }
        @media screen and (min-width: 768px) {
            flex-direction: row;
            align-items: center;
        }
        // Containers inside don't need padding
        .container {
            padding: 0;
        }
    }
    &-content {
        position: relative;
        width: 100%;
        max-width: 100%;
        max-height: 95vh;
        background-color: var(--secondary-color);
        border-radius: 1rem;
        padding: 1.25rem;
        box-sizing: border-box;
        overflow: hidden;
        overflow-y: auto;
        transform-origin: top center;
    }
    &-pages {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        align-self: flex-end;
        gap: 0.45rem;
        order: -1;
        margin-bottom: 0.75rem;
        .general-button {
            padding: 0.5rem 1.25rem;
            &.active {
                border-style: solid;
            }
        }
        @media screen and (min-width: 768px) {
            display: block;
            order: 0;
            align-self: flex-start;
            margin: 0 0 0 1rem;
            .general-button {
                padding: 0.65rem 2rem;
                margin-bottom: 0.45rem;
                &.close-modal {
                    margin-bottom: 1rem;
                }
            }
        }
    }
    &-slider {
        --swiper-theme-color: #fff;
        --swiper-pagination-bullet-inactive-color: #fff;
        --swiper-navigation-size: 2rem;
        border-radius: 12px;
        overflow: hidden;
        &-image {
            display: block;
            width: 100%;
            height: auto;
            max-height: 75vh;
            aspect-ratio: 23 / 10;
            object-fit: cover;
        }
        :deep(.swiper-button-prev),
        :deep(.swiper-button-next) {
            filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.6));
        }
    }
}
// Modal enter/exit animation

.modal-toggle-enter-active {
    transition: all 0.3s ease-out;
}

.modal-toggle-leave-active {
    transition: all 0.1s ease-in-out;
}

.modal-toggle-enter-from,
.modal-toggle-leave-to {
    transform: translateY(-1rem);
    opacity: 0;
    border-radius: 0;
}

// Modal content toggle animation
.content-toggle-enter-active {
    transition: all 0.3s ease-out;
}

.content-toggle-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.content-toggle-enter-from,
.content-toggle-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
