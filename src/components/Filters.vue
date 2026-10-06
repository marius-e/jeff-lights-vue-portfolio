<template>
    <div class="filters-container" v-if="tagsArray && tagsArray.length > 0">
        <div class="filters-content" v-outline-effect role="group" :aria-label="label || 'Filters'">
            <div class="filters-title" v-if="label">{{ label }}</div>
            <div class="filters-list">
                <button
                    class="filters-list-item general-button filter-all"
                    :class="{ active: activeFilter == '' }"
                    :aria-pressed="activeFilter == ''"
                    @click="selectFilter('')"
                >
                    All
                </button>
                <button
                    class="filters-list-item general-button"
                    :class="{ active: activeFilter == tag }"
                    :aria-pressed="activeFilter == tag"
                    v-for="(tag, index) in tagsArray"
                    :key="index"
                    @click="selectFilter(tag)"
                >
                    {{ tag }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["filterBy"]);

const props = defineProps({
    label: {
        type: String,
    },
    tags: {
        type: [String, Array],
        required: true,
    },
});

// Tags can come as a comma separated string or an array, keep them unique
const allTags = typeof props.tags === "string" ? props.tags.split(",").map((tag) => tag.trim()) : props.tags;
const tagsArray = ref([...new Set(allTags)]);
const activeFilter = ref("");

const selectFilter = (tag) => {
    emit("filterBy", tag);
    activeFilter.value = tag;
};
</script>

<style scoped lang="scss">
.filters-container {
    display: flex;
    justify-content: center;
}
.filters-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    background-color: var(--secondary-color);
    padding: 0.6rem;
    box-sizing: border-box;
    --border-radius: 12px;
    border-radius: var(--border-radius);
    align-items: center;
    justify-content: center;
    .filters-title {
        flex-shrink: 0;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 0.85rem;
        padding-left: 0.6rem;
        margin-right: 0.5rem;
    }
    .filters-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 0.25rem 0;
        &-item {
            color: var(--font-color);
            padding: 0.35rem 0.65rem;
            font-size: 0.85rem;
            background: transparent;
            border-color: transparent;
            margin-left: 0.25rem;
            &.active {
                background-color: var(--tertiary-color);
                border: 1px dashed;
                border-color: var(--font-color);
            }
            &:hover,
            &:focus {
                background-color: var(--tertiary-color);
            }
        }
    }
}
</style>
