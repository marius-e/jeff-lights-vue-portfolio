<template>
    <div class="tiles">
        <Tile
            v-for="experience of experiences"
            :key="experience.id"
            :title="experience.title"
            :description="experience.description"
            size="medium"
            class="experience-tile"
            aria-haspopup="dialog"
            @click="openExperience(experience)"
        />
    </div>
</template>

<script setup>
import Tile from "./Tile.vue";
import ExperienceDetails from "./ExperienceDetails.vue";
import SampleExperience from "../config/sample-experience.json";
import { modalStore } from "../store/modal";

const modal = modalStore();
const currentYear = new Date().getFullYear();
const experiences = SampleExperience.map((experience) => ({
    ...experience,
    title: `${currentYear - experience.startYear} years`,
    period: `${experience.startYear} - present`,
}));

const openExperience = (experience) => {
    modal.open(ExperienceDetails, "50rem", [], null, { experience });
};
</script>
