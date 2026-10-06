<template>
    <footer id="mainFooter" v-outline-effect class="outline-top">
        <div class="container footer__content">
            <div class="footer__social">
                <Social />
            </div>
            <div class="footer__copyright">&copy; {{ new Date().getFullYear() }} Jeff</div>
        </div>
    </footer>
</template>
<script setup>
import Social from "../components/Social.vue";
</script>
<style scoped lang="scss">
#mainFooter {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--primary-color);
    z-index: 1;
    .footer__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        text-align: center;
        padding-top: 2rem;
        padding-bottom: 2rem;
        @media screen and (min-width: 768px) {
            flex-direction: row;
            align-items: flex-end;
            text-align: left;
        }
        .footer__copyright {
            opacity: 0.6;
        }
    }
}
</style>
