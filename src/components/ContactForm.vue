<template>
    <form class="contact-form" action="#" method="post">
        <div class="contact-form__row">
            <div class="input-container">
                <label class="sr-only" for="contactName">Name</label>
                <input id="contactName" placeholder="Name" type="text" name="name" autocomplete="name" required />
            </div>
            <div class="input-container">
                <label class="sr-only" for="contactEmail">Email</label>
                <input id="contactEmail" placeholder="Email" type="email" name="email" autocomplete="email" required />
            </div>
        </div>
        <div class="input-container">
            <label class="sr-only" for="contactMessage">Message</label>
            <textarea id="contactMessage" placeholder="Message" name="message" rows="6" required></textarea>
        </div>
        <button type="submit" class="action general-button">
            <ion-icon class="icon" name="paper-plane-outline" aria-hidden="true"></ion-icon>
            <span class="text">Send</span>
        </button>
    </form>
</template>

<style scoped lang="scss">
.contact-form {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    &__row {
        display: grid;
        gap: 0 1rem;
        @media screen and (min-width: 1024px) {
            grid-template-columns: 1fr 1fr;
        }
    }
    .general-button {
        align-self: flex-start;
        margin-top: auto;
    }
}
</style>
