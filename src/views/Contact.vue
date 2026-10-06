<template>
    <div class="contact-container">
        <div class="general-title">
            <h1 class="title">Contact</h1>
        </div>
        <div class="contact columns contact__columns">
            <div class="column">
                <div class="contact__card contact__data" v-outline-effect>
                    <h2 class="contact__title">Contact me on:</h2>
                    <p class="contact__intro">Got a project in mind or just want to say hi? Pick whatever works best for you, I usually answer in a day or two.</p>
                    <ul class="contact__list">
                        <li v-for="item of contactDetails" :key="item.label">
                            <a :href="item.link" :target="item.external ? '_blank' : null" :rel="item.external ? 'noopener' : null" class="contact__item">
                                <span class="contact__item-icon"><ion-icon :name="item.icon" aria-hidden="true"></ion-icon></span>
                                <span class="contact__item-text">
                                    <span class="contact__item-label">{{ item.label }}</span>
                                    <span class="contact__item-value multi-underline">{{ item.value }}</span>
                                </span>
                            </a>
                        </li>
                    </ul>
                    <Social class="contact__social" />
                </div>
            </div>
            <div class="column">
                <div class="contact__card contact__form" v-outline-effect>
                    <h2 class="contact__title">Send me a message</h2>
                    <ContactForm />
                </div>
            </div>
        </div>
        <div class="contact__card contact__map" v-outline-effect>
            <h2 class="contact__title">Find me at:</h2>
            <iframe
                class="contact__map-frame"
                title="Map with my location"
                loading="lazy"
                width="100%"
                height="400"
                src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=Berii%206,%20Bucuresti,%20Sector%207&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
        </div>
    </div>
</template>

<script setup>
import ContactForm from "../components/ContactForm.vue";
import Social from "../components/Social.vue";

const contactDetails = [
    { label: "Email", value: "contact@marius.tech", icon: "mail-outline", link: "mailto:contact@marius.tech" },
    { label: "Phone", value: "+40 000 000 000", icon: "call-outline", link: "tel:+40000000000" },
    {
        label: "Address",
        value: "Berii 6, Bucuresti, Sector 7",
        icon: "location-outline",
        link: "https://maps.google.com/?q=Berii+6,+Bucuresti,+Sector+7",
        external: true,
    },
    { label: "Social", value: "@biggestthereis", icon: "share-social-outline", link: "https://instagram.com/biggestthereis", external: true },
];
</script>

<style scoped lang="scss">
.contact {
    &__columns {
        align-items: stretch;
        margin-top: 0.25rem;
    }
    &__card {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 1.5rem;
        box-sizing: border-box;
        --border-radius: 16px;
        border-radius: var(--border-radius);
        background-color: var(--secondary-color);
        @media screen and (max-width: 767px) {
            padding: 1.25rem 1rem;
        }
    }
    &__title {
        font-size: 1.25rem;
        margin: 0 0 1.25rem 0;
    }
    &__intro {
        margin: -0.5rem 0 1.5rem 0;
        opacity: 0.6;
    }
    &__list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        gap: 1.25rem 1rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }
    &__item {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        &-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 2.75rem;
            height: 2.75rem;
            font-size: 1.25rem;
            border-radius: 50%;
            border: 1px dashed var(--tertiary-color);
            background-color: var(--primary-color);
            transition: border-color 0.2s ease-in-out;
        }
        &-text {
            display: flex;
            flex-direction: column;
            min-width: 0;
        }
        &-label {
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            opacity: 0.6;
        }
        &-value {
            align-self: flex-start;
            overflow-wrap: anywhere;
        }
        &:hover,
        &:focus-visible {
            .contact__item-icon {
                border-color: var(--font-color);
            }
            .contact__item-value {
                background-size: 100% 1px;
            }
        }
    }
    &__social {
        margin-top: auto;
        padding-top: 1.5rem;
        :deep(.social-links) {
            margin-top: 0.5rem;
        }
    }
    &__form {
        :deep(input),
        :deep(textarea) {
            background-color: var(--primary-color);
        }
    }
    &__map {
        height: auto;
        &-frame {
            display: block;
            height: 400px;
            border: 0;
            border-radius: 12px;
            filter: grayscale(1);
            transition: filter 0.3s ease-in-out;
            &:hover {
                filter: none;
            }
            @media screen and (max-width: 767px) {
                height: 300px;
            }
        }
    }
}
</style>
