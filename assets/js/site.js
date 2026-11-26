// Informe o número oficial com código do país e DDD, usando apenas dígitos.
const whatsappNumber = "5586994149235";

if (whatsappNumber) {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = `https://wa.me/${whatsappNumber}`;
    link.setAttribute("aria-label", "Conversar pelo WhatsApp");
    link.hidden = false;
  });
}

const profileModal = document.querySelector("#modalPerfil");

profileModal?.addEventListener("show.bs.modal", (event) => {
  const trigger = event.relatedTarget;
  const profile = trigger.closest(".profile-card");
  const portrait = document.querySelector("#fotoModal");

  document.querySelector("#nomeModal").textContent = profile.querySelector(".profile-name").textContent;
  document.querySelector("#cargoModal").textContent = profile.querySelector(".profile-role").textContent;
  document.querySelector("#formacaoModal").textContent = profile.querySelector(".profile-formation").textContent;
  document.querySelector("#experienciaModal").textContent = profile.dataset.experiencia;
  portrait.replaceChildren(...Array.from(profile.querySelector(".profile-photo").childNodes, (node) => node.cloneNode(true)));
});

document.querySelectorAll("[data-project-carousel]").forEach((projectModal) => {
  const projectSlides = [...document.querySelectorAll(`${projectModal.dataset.projectCarousel} .carousel-item`)];
  const expandedCarousel = projectModal.querySelector(".project-carousel-expanded");
  const expandedSlides = projectSlides.map((slide) => {
    const expandedSlide = slide.cloneNode(false);
    expandedSlide.append(slide.querySelector("img").cloneNode(true));
    return expandedSlide;
  });

  expandedCarousel.querySelector(".carousel-inner").append(...expandedSlides);

  projectModal.addEventListener("show.bs.modal", (event) => {
    const selectedSlide = event.relatedTarget?.closest(".carousel-item")
      ?? projectSlides.find((slide) => slide.classList.contains("active"));
    bootstrap.Carousel.getOrCreateInstance(expandedCarousel).to(projectSlides.indexOf(selectedSlide));
  });
});
