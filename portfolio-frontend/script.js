const API_BASE_URL = (window.PORTFOLIO_CONFIG?.API_BASE_URL || "http://localhost:8081").replace(/\/$/, "");

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

const projectList = document.getElementById("project-list");
const projectStatus = document.getElementById("project-status");

function renderProjects(projects) {
  projectList.replaceChildren();
  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const top = document.createElement("div");
    top.className = "project-top";
    const number = document.createElement("span");
    number.textContent = String(index + 1).padStart(2, "0");
    const symbol = document.createElement("span");
    symbol.textContent = "✧";
    top.append(number, symbol);

    const title = document.createElement("h3");
    title.textContent = project.name;
    const description = document.createElement("p");
    description.textContent = project.description;

    const tags = document.createElement("div");
    tags.className = "tags";
    (project.technologies || []).forEach(technology => {
      const tag = document.createElement("span");
      tag.textContent = technology;
      tags.appendChild(tag);
    });

    const link = document.createElement("a");
    link.className = "inline-link";
    link.href = project.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "View project on GitHub ↗";

    card.append(top, title, description, tags, link);
    projectList.appendChild(card);
  });
}

async function loadProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/portfolio`);
    if (!response.ok) throw new Error("Portfolio API returned an error");
    const data = await response.json();
    renderProjects(data.projects || []);
    projectStatus.textContent = "Project details loaded from the Spring Boot backend.";
  } catch (error) {
    projectList.innerHTML = `
      <article class="project-card">
        <h3>AI Smart Job Portal</h3>
        <p>Job portal backend with JWT authentication, role-based access and job management.</p>
        <div class="tags"><span>Java</span><span>Spring Boot</span><span>JWT</span><span>MySQL</span></div>
        <a class="inline-link" href="https://github.com/pritykumarimca01-glitch" target="_blank" rel="noopener">GitHub Profile ↗</a>
      </article>
      <article class="project-card">
        <h3>CineVerse API</h3>
        <p>Movie REST API with CRUD, validation, pagination, sorting and exception handling.</p>
        <div class="tags"><span>Java</span><span>Spring Boot</span><span>MySQL</span><span>Swagger</span></div>
        <a class="inline-link" href="https://github.com/pritykumarimca01-glitch" target="_blank" rel="noopener">GitHub Profile ↗</a>
      </article>`;
    projectStatus.textContent = "Showing project details saved in the frontend. Start the backend to load them through the API.";
  }
}

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async event => {
  event.preventDefault();
  formStatus.textContent = "Sending…";
  const formData = new FormData(contactForm);
  const payload = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    message: String(formData.get("message") || "").trim()
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || "Unable to send your message. Please try again.");
    formStatus.textContent = result.message || "Thank you! Your message has been sent.";
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = "Could not reach the backend. Check that Spring Boot is running and the API URL/CORS settings are correct.";
  }
});

loadProjects();
