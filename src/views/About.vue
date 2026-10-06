<template>
    <div class="container">
        <div class="general-title">
            <h1 class="title">About me</h1>
        </div>
        <div class="about" v-outline-effect>
            <div class="columns">
                <div class="column is-7 about__text">
                    <p>
                        I'm Jeff, a web developer based in Bucharest. I got into programming by breaking the family computer and trying to fix it
                        before anyone noticed, and somewhere along the way fixing things turned into building them.
                    </p>
                    <p>
                        These days I mostly work with Vue and Node, turning designs into interfaces that load fast and work for everyone, keyboard
                        and screen reader users included. When a project needs to live outside the browser, I pack it into an Electron app.
                    </p>
                    <p>
                        I like small teams, clear briefs and code that the next person can read without swearing. Outside of work I'm usually
                        walking my dog, tinkering with side projects or writing about them on the blog.
                    </p>
                </div>
                <div class="column about__facts">
                    <dl>
                        <div class="about__fact" v-for="fact of facts" :key="fact.label">
                            <dt>{{ fact.label }}</dt>
                            <dd>{{ fact.value }}</dd>
                        </div>
                    </dl>
                    <router-link :to="{ name: 'contact' }" class="general-button about__button">
                        <ion-icon class="icon" name="paper-plane-outline" aria-hidden="true"></ion-icon>
                        <span class="text">Get in touch</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="general-title about__experience-title" id="experience">
            <h2 class="h1 title">Experience</h2>
        </div>
        <Experience />
    </div>
</template>

<script setup>
import Experience from "../components/Experience.vue";

const facts = [
    { label: "Based in", value: "Bucharest, Romania" },
    { label: "Focus", value: "Frontend, APIs and desktop apps" },
    { label: "Stack", value: "Vue, Node, Electron, SCSS" },
    { label: "Status", value: "Open to new projects" },
];
</script>

<style scoped lang="scss">
.about {
    padding: 1.5rem;
    margin-bottom: 3rem;
    --border-radius: 16px;
    border-radius: var(--border-radius);
    background-color: var(--secondary-color);
    @media screen and (max-width: 767px) {
        padding: 1.25rem 1rem;
    }
    &__text {
        font-size: 1.1rem;
        p {
            margin: 0 0 1rem 0;
            opacity: 0.8;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    &__facts {
        dl {
            margin: 0 0 1.5rem 0;
        }
    }
    &__fact {
        padding: 0.65rem 0;
        border-bottom: 1px dashed var(--tertiary-color);
        &:first-child {
            padding-top: 0;
        }
        dt {
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            opacity: 0.6;
        }
        dd {
            margin: 0;
        }
    }
    &__button {
        display: inline-flex;
    }
    &__experience-title {
        scroll-margin-top: 8rem;
    }
}
</style>
