function initLineInfo() {
    document.querySelectorAll(".line-info-page h2").forEach(title => {
        title.addEventListener("click", () => {
            const grid = title.nextElementSibling;

            if (!grid.classList.contains("cards-grid")) return;

            if (grid.classList.contains("active")) {
                grid.style.height = grid.scrollHeight + "px";

                requestAnimationFrame(() => {
                    grid.style.height = "0px";
                });

                grid.classList.remove("active");
            } else {
                grid.classList.add("active");
                grid.style.height = grid.scrollHeight + "px";

                grid.addEventListener("transitionend", () => {
                    grid.style.height = "auto";
                }, { once: true });
            }
        });
    });

    document.querySelectorAll(".line-info-page h2").forEach(h2 => {
        h2.addEventListener("click", () => {
            h2.classList.toggle("active");
        });
    });
}