export default function addMouseoverEffect() {
    const elements = document.querySelectorAll(".outlined-element");

    elements.forEach((element) => {
        const lightEffect = document.createElement("div");
        lightEffect.classList.add("outline-glow");
        element.appendChild(lightEffect);
    });

    document.addEventListener("mousemove", (e) => {
        elements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const distanceX = Math.abs(e.clientX - (rect.left + rect.width / 2));
            const distanceY = Math.abs(e.clientY - (rect.top + rect.height / 2));
            const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

            let maxDistance = Math.max(rect.width, rect.height);
            if (maxDistance < 200) maxDistance = 200;

            // If close enough, show and move light effect for the element
            // if (distanceX < maxDistance && distanceY < maxDistance) {
            if (distance < maxDistance) {
                moveLightEffect(element, e.clientX, e.clientY);
            } else {
                element.querySelector(".outline-glow").style.opacity = "0";
            }
        });
    });
}

// Move with transform, but keep it centered at the same time
function moveLightEffect(element, clientX, clientY) {
    const lightEffect = element.querySelector(".outline-glow");
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    lightEffect.style.opacity = "1";
    lightEffect.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0)`;
}

// Move with top and left
// function moveLightEffect(element, clientX, clientY) {
//     const lightEffect = element.querySelector(".outline-glow");
//     const rect = element.getBoundingClientRect();
//     const x = clientX - rect.left;
//     const y = clientY - rect.top;

//     lightEffect.style.opacity = "1";
//     lightEffect.style.left = `${x}px`;
//     lightEffect.style.top = `${y}px`;
// }
