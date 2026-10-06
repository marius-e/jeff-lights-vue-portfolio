import { createRouter, createWebHashHistory } from "vue-router";
import Homepage from "./views/Homepage.vue";
import Projects from "./views/Projects.vue";
import Project from "./views/Project.vue";
import About from "./views/About.vue";
import Contact from "./views/Contact.vue";
import Blog from "./views/Blog.vue";
import NotFound from "./views/404.vue";
import Article from "./views/Article.vue";
import { modalStore } from "./store/modal";
import { settings } from "./config/config.json";
import { nextTick } from "vue";

const routes = [
    {
        path: "/",
        name: "homepage",
        component: Homepage,
    },
    {
        path: "/projects",
        name: "projects",
        component: Projects,
    },
    {
        path: "/projects/:id",
        name: "project",
        component: settings.openProjectsInModal ? Projects : Project,
    },
    {
        path: "/about",
        name: "about",
        component: About,
    },
    {
        path: "/contact",
        name: "contact",
        component: Contact,
    },
    {
        path: "/blog",
        name: "blog",
        component: Blog,
    },
    {
        path: "/blog/:id",
        name: "article",
        component: settings.openArticlesInModal ? Blog : Article,
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from) {
        return new Promise((resolve) => {
            if (to.hash) {
                if (from.name) {
                    setTimeout(() => {
                        resolve({ el: to.hash, behavior: "smooth" });
                    }, 300);
                } else {
                    resolve({ el: to.hash, behavior: "smooth" });
                }
            } else {
                resolve({ left: 0, top: 0, behavior: "smooth" });
            }
        });
    },
});

router.beforeResolve((to, from, next) => {
    const modal = modalStore();
    if (modal.isOpen) {
        modal.close();
        // Modals with parameters/url should navigate back/forwards
        if (from.params.id || to.params.id) {
            next();
        } else {
            // Prevent navigating when closing a modal with no parameters
            next(false);
        }
    } else {
        next();
    }
});

router.afterEach((to, from) => {
    const modal = modalStore();

    if (settings.openProjectsInModal && to.name === "project") {
        nextTick(() => {
            modal.open(Project);
        });
    }
    if (settings.openArticlesInModal && to.name === "article") {
        nextTick(() => {
            modal.open(Article);
        });
    }
});

export default router;
