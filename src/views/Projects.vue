<template>
    <div class="projects-container">
        <div class="general-title">
            <h1 class="title">My Projects</h1>
            <div class="projects-container-actions">
                <Filters label="Filter by:" @filterBy="filterProjects" tags="NodeJS, Electron, VueJS, ReactJS" />
            </div>
        </div>
        <div class="projects-list">
            <TransitionGroup name="projects">
                <Card
                    v-for="project in filteredProjects"
                    :key="project.id"
                    class="projects-list-item"
                    :tags="project.tags"
                    :title="project.title"
                    :description="project.description"
                    :image="project.image"
                    :link="{ name: 'project', params: { id: settings.useSlugs ? project.slug || project.id : project.id } }"
                />
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Card from "../components/Card.vue";
import Filters from "../components/Filters.vue";
import SampleProjects from "../config/sample-projects.json";
import { settings } from "../config/config.json";

const filteredProjects = ref([...SampleProjects]);

// Filter by tag, case insensitive
const filterProjects = (tag) => {
    if (!tag) {
        filteredProjects.value = SampleProjects;
        return;
    }
    const normalizedTag = tag.toLowerCase().trim();
    filteredProjects.value = SampleProjects.filter((project) => {
        return project.tags.toLowerCase().split(", ").includes(normalizedTag);
    });
};
</script>

<style scoped lang="scss">
.projects-container {
    &-actions {
        display: flex;
        flex-shrink: 0;
        max-width: 100%;
    }
    .projects-list {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        margin-top: 2rem;
        margin-left: -0.5rem;
        margin-right: -0.5rem;
        backface-visibility: hidden;
        &-item {
            position: relative;
            width: calc(100% - 1rem);
            box-sizing: border-box;
            margin-bottom: 1rem;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            transform-origin: center;
            @media screen and (min-width: 768px) {
                width: calc(50% - 1rem);
            }
            @media screen and (min-width: 1024px) {
                width: calc(33.33333333% - 1rem);
            }
        }
    }
    .projects-move,
    .projects-enter-active,
    .projects-leave-active {
        transition: all 0.4s ease;
    }

    .projects-enter-from,
    .projects-leave-to {
        opacity: 0;
    }

    .projects-leave-active {
        position: absolute;
    }
}
</style>
