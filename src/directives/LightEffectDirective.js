export default {
    install: (app) => {
        app.directive("outline-effect", {
            mounted(element) {
                element.classList.add("outlined-element");
                addLightEffect(element);
                element._onMouseMove = (e) => handleMouseMove(element, e);
                document.addEventListener("mousemove", element._onMouseMove);
            },
            updated(element) {
                // Vue can drop the glow while patching the children, so put it back
                addLightEffect(element);
            },
            unmounted(element) {
                document.removeEventListener("mousemove", element._onMouseMove);
            },
        });
    },
};

const canHover = window.matchMedia("(hover: hover)");

function addLightEffect(element) {
    const hasLightEffect = Array.from(element.children).some((child) => child.classList.contains("outline-glow"));
    if (!hasLightEffect) {
        const lightEffect = document.createElement("div");
        lightEffect.classList.add("outline-glow");
        element.appendChild(lightEffect);
    }
}

function handleMouseMove(element, e) {
    if (!canHover.matches) return;
    const rect = element.getBoundingClientRect();
    const distanceX = Math.abs(e.clientX - (rect.left + rect.width / 2));
    const distanceY = Math.abs(e.clientY - (rect.top + rect.height / 2));
    const distanceFromElement = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    const maxDistance = Math.max(rect.width, rect.height, 200);
    const maxDistanceY = Math.max(rect.height * 3, 200);

    // If close enough, show and move light effect for the element
    if (distanceFromElement < maxDistance && distanceY < maxDistanceY) {
        // Disable when a modal is open
        if (!document.body.classList.contains("modal-open")) {
            moveLightEffect(element, e.clientX, e.clientY);
        }
    } else {
        element.querySelectorAll(".outline-glow").forEach((light) => {
            light.style.opacity = "0";
        });
    }
}

function moveLightEffect(element, clientX, clientY) {
    const lightEffect = element.querySelectorAll(".outline-glow");
    lightEffect.forEach((light) => {
        const rect = light.parentNode.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        light.style.opacity = "1";
        light.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0)`;
    });
}
