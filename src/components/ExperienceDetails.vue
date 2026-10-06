<template>
    <div class="experience-details">
        <div class="general-title">
            <h2 class="h1 title">{{ experience.title }}</h2>
        </div>
        <div class="experience-details__meta">
            <span class="experience-details__role">{{ experience.role }}</span>
            <span class="experience-details__period">{{ experience.period }}</span>
        </div>
        <p class="experience-details__content">{{ experience.content }}</p>
        <ul class="experience-details__highlights" v-if="experience.highlights?.length > 0">
            <li v-for="highlight of experience.highlights">{{ highlight }}</li>
        </ul>
        <ul class="general-tags" v-if="tags.length > 0">
            <li class="general-tags-item" v-for="tag of tags">{{ tag }}</li>
        </ul>
    </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
    experience: { type: Object, required: true },
});
const tags = computed(() => {
    if (!props.experience.tags) return [];
    return props.experience.tags.split(",").map((tag) => tag.trim());
});
</script>

<style scoped lang="scss">
.experience-details {
    padding: 0.5rem;
    &__meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem 1rem;
        font-weight: 600;
    }
    &__period {
        opacity: 0.6;
    }
    &__content {
        margin: 1.5rem 0;
        opacity: 0.8;
    }
    &__highlights {
        margin: 0 0 1.5rem 0;
        padding: 0;
        list-style: none;
        li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.65rem;
            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0.6em;
                width: 0.75rem;
                border-top: 1px dashed var(--font-color);
                opacity: 0.6;
            }
        }
    }
}
</style>
