<template>
    <div class="home-container">
        <div class="tiles">
            <div v-outline-effect class="custom-tile tile tile--large">
                <div class="tile__content">
                    <div class="tile__text">
                        <div class="hello">
                            <div class="hello__text">
                                <h1 class="h1">
                                    Hello there,<br />
                                    I'm Jeff
                                </h1>
                                <p class="description">
                                    A web developer from Bucharest who has spent the last few years building fast, accessible interfaces with Vue,
                                    the APIs behind them and the occasional desktop app. When I'm not coding I'm probably out walking my dog.
                                </p>
                            </div>
                            <div v-outline-effect class="avatar"><img class="avatar-image" src="/avatar.jpg" alt="" /></div>
                        </div>
                    </div>
                </div>
            </div>

            <Tile
                title="About"
                description="A bit about me and the years I've spent building things for the web."
                link="/about"
            />
            <Tile
                title="Experience"
                description="Frontends, APIs and desktop apps, and how long I've been doing each of them."
                link="/about#experience"
            />
            <Tile
                title="Contact"
                description="Have a project in mind, a question about my work or just want to talk code? Drop me a message."
                link="/contact"
            />
            <Tile
                title="My Projects"
                description="Calendars, sync tools and other apps I built, some for clients and some just because I wanted them to exist."
                size="large"
                link="/projects"
            />

            <router-link title="Latest news" :to="{ name: 'blog' }" class="tile" v-outline-effect>
                <div class="tile__content no-image">
                    <div class="tile__text">
                        <div class="tile__text-title">Latest updates</div>
                        <p class="tile__text-description">Latest news about my projects, about me, and maybe my dog.</p>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import Tile from "../components/Tile.vue";
</script>

<style scoped lang="scss">
.tiles .tile {
    max-height: none;
}
.custom-tile {
    container-type: inline-size;
    &:active {
        transform: none;
    }
    .tile__text {
        padding: 1rem;
        text-align: center;
        .hello {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
        }
        .h1 {
            font-size: 2rem;
            @media screen and (min-width: 1024px) {
                font-size: 2.85rem;
            }
        }
        .description {
            max-width: 32rem;
            margin: 1rem auto 0 auto;
            line-height: 1.5;
            opacity: 0.6;
        }
    }
    .avatar {
        flex-shrink: 0;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        overflow: hidden;
        @media screen and (min-width: 768px) {
            width: 12rem;
            height: 12rem;
        }
        &-image {
            max-width: 100%;
            max-height: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            border-radius: inherit;
        }
    }
}

// Side by side only when the tile itself has room, it's half width on tablets
@container (min-width: 36rem) {
    .custom-tile .tile__text .hello {
        flex-direction: row;
        justify-content: space-around;
    }
}
</style>
