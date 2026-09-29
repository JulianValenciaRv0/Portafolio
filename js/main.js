const data = window.portfolioData;

document.querySelectorAll("[data-personal]").forEach((element) => {
  const value = data.personal[element.dataset.personal];
  if (value) element.textContent = value;
});

document.querySelectorAll("[data-social]").forEach((link) => {
  const key = link.dataset.social;
  if (key === "email") link.href = `mailto:${data.personal.email}`;
  else if (key === "phone") link.href = `tel:${data.personal.phoneLink}`;
  else if (data.social[key] && !data.social[key].includes("_AQUI")) {
    link.href = data.social[key];
    link.hidden = false;
    link.target = "_blank";
    link.rel = "noreferrer";
  }
});

const skillGroups = document.querySelector("#skill-groups");
data.skills.forEach((group, index) => {
  const article = document.createElement("article");
  article.className = "skill-group";
  const heading = document.createElement("h3");
  const number = document.createElement("span");
  number.textContent = `0${index + 1}`;
  const title = document.createElement("span");
  title.textContent = group.title;
  heading.append(number, title);
  const list = document.createElement("ul");
  list.className = "tag-list";
  group.items.forEach((item) => {
    const tag = document.createElement("li");
    tag.textContent = item;
    if (item.startsWith("[")) tag.classList.add("placeholder-tag");
    list.append(tag);
  });
  article.append(heading, list);
  skillGroups.append(article);
});

const projectList = document.querySelector("#project-list");
data.projects.forEach((project, index) => {
  const article = document.createElement("article");
  article.className = "project-card";
  const visual = document.createElement("div");
  visual.className = `project-visual visual-${index + 1}`;
  visual.setAttribute("aria-hidden", "true");
  const visualIndex = document.createElement("span");
  visualIndex.className = "visual-index";
  visualIndex.textContent = `0${index + 1}`;
  const visualTitle = document.createElement("span");
  visualTitle.className = "visual-title";
  visualTitle.textContent = project.name;
  const visualMark = document.createElement("span");
  visualMark.className = "visual-mark";
  visualMark.textContent = ["JS", "NX", "BH"][index] || "↗";
  visual.append(visualIndex, visualTitle, visualMark);
  if (project.image) {
    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.imageAlt || `Captura de ${project.name}`;
    image.loading = "lazy";
    image.decoding = "async";
    visual.prepend(image);
  }
  const content = document.createElement("div");
  content.className = "project-content";
  const top = document.createElement("div");
  top.className = "project-title-row";
  const title = document.createElement("h3");
  title.textContent = project.name;
  const status = document.createElement("span");
  status.className = "project-status";
  status.textContent = project.status;
  top.append(title, status);
  const description = document.createElement("p");
  description.textContent = project.description;
  if (project.description.startsWith("[")) description.classList.add("placeholder-copy");
  const techs = document.createElement("ul");
  techs.className = "project-techs";
  project.technologies.forEach((tech) => {
    const item = document.createElement("li");
    item.textContent = tech;
    techs.append(item);
  });
  const links = document.createElement("div");
  links.className = "project-links";
  [["Código fuente", project.github], ["Ver demo", project.demo]].forEach(([label, href]) => {
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = `${label} ↗`;
    links.append(anchor);
  });
  content.append(top, description, techs, links);
  article.append(visual, content);
  projectList.append(article);
});

const educationList = document.querySelector("#education-list");
data.education.forEach((item, index) => {
  const article = document.createElement("article");
  article.className = "education-item";
  const number = document.createElement("span");
  number.className = "education-number";
  number.textContent = `0${index + 1}`;
  const body = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = item.program;
  const institution = document.createElement("p");
  institution.textContent = item.institution;
  body.append(title, institution);
  const status = document.createElement("span");
  status.className = "education-status";
  status.textContent = item.status;
  if (item.status.startsWith("[")) status.classList.add("placeholder-copy");
  article.append(number, body, status);
  educationList.append(article);
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
  nav.classList.remove("is-open");
};
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  nav.classList.toggle("is-open", !isOpen);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
document.querySelector("#year").textContent = new Date().getFullYear();
