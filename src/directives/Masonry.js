export default {
    mounted(el) {
        // Add the classes to the elements
        addClassToElements(el);
        initMasonry(el);
        window.addEventListener("resize", () => initMasonry(el));
    },
    updated(el) {
        // Add the classes to the elements
        addClassToElements(el);
        initMasonry(el);
    },
    unmounted(el) {
        window.removeEventListener("resize", () => initMasonry(el));
    },
};

function addClassToElements(el) {
    el.classList.add("masonry");
    Array.from(el.children).forEach((child) => {
        child.classList.add("masonry-item");
    });
}

function initMasonry(container) {
    const items = Array.from(container.children);
    if (items.length === 0) return;

    const columns = [];

    items.forEach((item) => {
        const itemWidth = item.offsetWidth;

        let column = columns.find((column) => column.width === itemWidth);
        if (!column) {
            column = { top: 0, left: columns.length * itemWidth, width: itemWidth };
            columns.push(column);
        }

        // Position the item at the top of the column
        item.style.position = "absolute";
        item.style.left = `${column.left}px`;
        item.style.top = `${column.top}px`;

        // Update the column's top
        column.top += item.offsetHeight;
    });

    // Set the height of the container to match the height of the tallest column
    container.style.height = `${Math.max(...columns.map((column) => column.top))}px`;
}
