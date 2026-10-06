<template>
    <div class="article-container" v-if="articleDetails">
        <div class="general-title">
            <h1 class="title">{{ articleDetails.title }}</h1>
        </div>
        <div class="article-date" v-if="articleDetails.date">
            <ion-icon class="icon" name="calendar-outline" aria-hidden="true"></ion-icon><span>{{ articleDetails.date }}</span>
        </div>
        <p class="article-content">{{ articleDetails.content }}</p>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { modalStore } from "../store/modal";
import SamplePosts from "../config/sample-articles.json";

// Get article ID from parameters
const route = useRoute();
const modal = modalStore();
const articleID = route.params.id;
const articleDetails = ref({});

const getArticleDetails = () => {
    const article = SamplePosts.find((article) => article.slug == articleID || article.id == articleID);
    if (article) {
        articleDetails.value = article;
        modal.setPayload(article);
    } else {
        console.error(`Article with id/slug ${articleID} not found.`);
    }
};

onMounted(() => {
    getArticleDetails();
});
</script>

<style scoped lang="scss">
.article-container {
    .article-date {
        display: flex;
        align-items: center;
        opacity: 0.6;
        .icon {
            margin-right: 0.25rem;
        }
    }
    .article-content {
        max-width: 50rem;
        margin: 1.5rem 0 0 0;
    }
}
</style>
