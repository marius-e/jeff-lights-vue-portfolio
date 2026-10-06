<template>
    <div class="project-container" v-if="projectDetails">
        <div class="general-title">
            <h1 class="title">{{ projectDetails.title }}</h1>
        </div>
        <div class="project-details">
            <p class="project-details__description">{{ projectDetails.description }}</p>
            <p class="project-details__content" v-if="projectDetails.content">{{ projectDetails.content }}</p>
            <ul class="general-tags" v-if="tags.length > 0">
                <li class="general-tags-item" v-for="tag of tags">{{ tag }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { modalStore } from "../store/modal";
import SampleProjects from "../config/sample-projects.json";

// Get project ID from parameters
const route = useRoute();
const modal = modalStore();
const projectID = route.params.id;
const projectDetails = ref({});
const tags = computed(() => {
    if (!projectDetails.value.tags) return [];
    return projectDetails.value.tags.split(",").map((tag) => tag.trim());
});

const getProjectDetails = () => {
    const project = SampleProjects.find((project) => project.id == projectID || project.slug == projectID);
    if (project) {
        projectDetails.value = project;
        modal.setPayload(project);
    } else {
        console.error(`Project with id/slug ${projectID} not found.`);
    }
};

onMounted(() => {
    getProjectDetails();
});
</script>

<style scoped lang="scss">
.project-container {
    .project-details {
        max-width: 50rem;
        box-sizing: border-box;
        margin-top: 1.5rem;
        &__description {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 1rem 0;
        }
        &__content {
            margin: 0 0 1.5rem 0;
            opacity: 0.8;
        }
    }
}
</style>
