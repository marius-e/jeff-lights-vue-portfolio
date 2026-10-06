<template>
    <div class="blog__container">
        <div class="blog columns">
            <aside class="column blog__sidebar" v-if="!fromModal">
                <h1 class="title">Personal Blog</h1>
                <Filters @filterBy="filterArticles" :tags="allTags" />
                <p class="description">
                    Notes from building my own projects: what worked, what broke and what I would do differently next time. Mostly about web
                    development, sometimes about Electron and once in a while about whatever I couldn't stop thinking about that week.
                </p>
            </aside>
            <div class="column blog__articles">
                <TransitionGroup name="articles">
                    <div v-for="article of filteredArticles" :key="article.id" class="blog__post">
                        <div class="blog__post-date">
                            <ion-icon class="icon" name="calendar-outline" aria-hidden="true"></ion-icon><span>{{ article.date }}</span>
                        </div>
                        <router-link
                            :to="{ name: 'article', params: { id: settings.useSlugs ? article.slug || article.id : article.id } }"
                            class="blog__post-title multi-underline"
                            >{{ article.title }}</router-link
                        >
                        <div class="blog__post-description">{{ article.short_description }}</div>
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Filters from "../components/Filters.vue";
import SampleArticles from "../config/sample-articles.json";
import { settings } from "../config/config.json";
const props = defineProps({
    fromModal: { type: Boolean, default: false },
    modalFilterTag: { type: [String, Array] },
});

const splitTags = (tags) => (typeof tags === "string" ? tags.split(",").map((tag) => tag.trim()) : tags);

// Get all the tags from articles
const allTags = props.fromModal ? [] : SampleArticles.flatMap((article) => splitTags(article.tags));

// Filter by tag
const filteredArticles = ref([...SampleArticles]);
const filterArticles = (filterBy) => {
    const tags = filterBy ? splitTags(filterBy) : [];
    if (tags.length === 0) {
        filteredArticles.value = SampleArticles;
        return;
    }
    filteredArticles.value = SampleArticles.filter((article) => splitTags(article.tags).some((tag) => tags.includes(tag)));
};

onMounted(() => {
    if (props.fromModal && props.modalFilterTag) {
        filterArticles(props.modalFilterTag);
    }
});
</script>

<style scoped lang="scss">
.blog {
    &__articles {
        .blog__post {
            display: block;
            margin-bottom: 2rem;
            transform-origin: top center;
            &:last-child {
                margin-bottom: 0;
            }
            &-title {
                font-size: 1.45rem;
            }
            &-description,
            &-date {
                opacity: 0.6;
            }
            &-date {
                display: flex;
                align-items: center;
                margin-bottom: 0.25rem;
                .icon {
                    margin-right: 0.25rem;
                }
            }
        }
    }
    &__sidebar {
        @media screen and (min-width: 769px) {
            position: sticky;
            top: 7.5rem;
            align-self: flex-start;
        }
        .filters-container {
            justify-content: flex-start;
            margin: 1.5rem 0;
        }
        .description {
            margin: 0;
            opacity: 0.6;
        }
    }
}

// Modal style
.modal-content {
    .blog {
        width: 100%;
        margin: 0;
        &__articles {
            width: 100%;
        }
    }
}

.articles-move,
.articles-enter-active,
.articles-leave-active {
    transition: all 0.4s ease;
}

.articles-enter-from,
.articles-leave-to {
    opacity: 0;
}

.articles-leave-active {
    position: absolute;
}
</style>
