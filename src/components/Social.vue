<template>
    <div class="social-container">
        <div>You can find me on:</div>
        <div class="social-links">
            <a class="link" href="https://github.com" target="_blank" rel="noopener" aria-label="GitHub"><ion-icon name="logo-github" aria-hidden="true"></ion-icon></a>
            <a class="link" href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><ion-icon name="logo-facebook" aria-hidden="true"></ion-icon></a>
            <a class="link" href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube"><ion-icon name="logo-youtube" aria-hidden="true"></ion-icon></a>
            <a class="link" href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><ion-icon name="logo-instagram" aria-hidden="true"></ion-icon></a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.social-links {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.65rem;
    .link {
        display: flex;
        font-size: 1.25rem;
        ion-icon {
            display: block;
            width: 1em;
            height: 1em;
        }
        opacity: 0.5;
        transition: opacity 0.2s ease-in-out;
        &:hover,
        &:focus {
            opacity: 1;
        }
    }
}
</style>
