// Activity 5: Dynamic project content (projects stored in an array, Load More)
// Later additions: category filters, live search, clickable skill tags, expandable details
//
// To add a project: copy one { ... } block below, paste it into the list, and edit the text.
//   categories: which filter buttons show it ("ai", "software", "hardware")
//   metrics:    key results shown as small badges
//   details:    bullet points shown when "Details" is opened
//   link:       optional

const projects = [
  {
    title: "Dementia Care Support Chatbot",
    role: "RAG service & evaluation · University of Toronto",
    categories: ["ai", "software"],
    description: "A RAG-based AI chatbot that gives grounded, citation-backed dementia caregiving guidance. Developed with doctors' input for ongoing professional dementia-care use.",
    metrics: ["0.87 faithfulness", "~83% success on 100+ queries", "< 10 s latency"],
    details: [
      "Delivers grounded, citation-backed caregiving guidance with actionable responses.",
      "Reliable multi-turn conversations with session-based memory and consistent formatting (4–6 key recommendations).",
      "Brought system latency under 10 seconds through model and pipeline optimization.",
      "Evaluated on 100+ caregiver queries: ~83% response success and a 0.87 faithfulness score.",
      "Applied prompt engineering, response tuning, and safety guardrails to improve accuracy and control outputs."
    ],
    tools: ["Python", "FastAPI", "AWS Bedrock", "RAG", "Prompt Engineering", "LLM Evaluation"],
    dates: "Sep 2025 - Apr 2026"
  },
  {
    title: "Video Quality Automation",
    role: "Technical lead · AMD",
    categories: ["software"],
    description: "A test-automation tool for multimedia-driver validation, selected as a top-50 project for AMD Canada's 2024 Innovation Showcase.",
    metrics: ["Top-50, AMD Canada 2024 Innovation Showcase", "Tech lead"],
    details: [
      "Implemented Jenkins job triggers that reduced manual execution steps.",
      "Set up a MySQL-backed test-farm pipeline for automated job management, quality-score processing, and results visualization.",
      "Optimized quality-score evaluation by analyzing and comparing multiple calculation methods for scalability."
    ],
    tools: ["Python", "Jenkins", "MySQL", "Test Automation", "CI/CD"],
    dates: "May 2023 - Apr 2024"
  },
  {
    title: "Ancient Ceramic Classification",
    role: "Deep learning course project · University of Toronto",
    categories: ["ai"],
    description: "A PyTorch CNN that classifies ancient ceramics into 10 stylistic categories, from raw images to evaluated model.",
    metrics: ["11,000+ images", "10 classes", "3-block CNN"],
    details: [
      "Built a preprocessing pipeline for 11,000+ images: cleaning, normalization, augmentation, and train/validation/test splits.",
      "Designed a three-block CNN with BatchNorm, SiLU, MaxPooling, dropout, and Adam optimization.",
      "Evaluated generalization with held-out test data, confusion matrices, and baseline comparisons."
    ],
    tools: ["Python", "PyTorch", "CNNs", "Computer Vision"],
    dates: "Sep 2025 - Jan 2026"
  },
  {
    title: "MergeLens",
    role: "Team project (Team Lumify) · ECE444 Software Engineering",
    categories: ["software"],
    description: "A group-photo editor where each person controls the edits to their own face.",
    metrics: ["Team of 4", "Scrum", "In progress"],
    details: [
      "Represent the face-subject (participant) user group in requirements.",
      "Wrote the project goal for the team's requirements document.",
      "Authored the requirements for face claiming (confirmed by the photo owner) and face-detection speed.",
      "Review teammates' requirements and close issues after merge in a GitHub-based Scrum workflow."
    ],
    tools: ["Requirements Engineering", "User Stories", "Agile / Scrum", "GitHub"],
    dates: "Fall 2026"
  },
  {
    title: "Interactive Map (GIS)",
    role: "Team leader & contact person · University of Toronto",
    categories: ["software"],
    description: "A Geographic Information System map application in C++, built by a team of three that I led.",
    metrics: ["~85% faster load & run time", "Team lead"],
    details: [
      "Led a team of three to develop an interactive GIS application.",
      "Implemented the map UI with Day/Night display modes.",
      "Launched search algorithms and optimization features in C++ that cut load and run time by about 85%."
    ],
    tools: ["C++", "Linux", "Git", "Algorithms"],
    dates: "Feb 2022 - May 2022"
  },
  {
    title: "FPGA Game: Dodge the Light",
    role: "Project manager · University of Toronto",
    categories: ["hardware"],
    description: "A three-mode \"dodge the light\" game running on FPGA hardware, written in C with Verilog and Assembly.",
    metrics: ["150% faster response", "3 game modes"],
    details: [
      "Designed the game rules and implemented them in C on the FPGA board.",
      "Built the UI and the interrupt handling between input signals and the FPGA control logic.",
      "Improved game response functions, raising execution speed by 150% while keeping accuracy."
    ],
    tools: ["Verilog", "Assembly", "C", "FPGA"],
    dates: "Jan 2022 - May 2022"
  },
  {
    title: "This Portfolio Website",
    role: "Personal project",
    categories: ["software"],
    description: "The site you are on: a responsive portfolio with dark mode, project filters and search, and an interactive travel map.",
    metrics: ["Dark mode", "Live search", "WCAG AA contrast"],
    details: [
      "Colour palette built from traditional Chinese colours, defined once as CSS variables.",
      "Dark mode that follows the system setting and remembers the visitor's choice.",
      "Projects rendered from a JavaScript array with Load More, category filters, and search.",
      "Deployed with GitHub Pages."
    ],
    tools: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    dates: "Sep 2026",
    link: "https://github.com/flora319/flora319.github.io"
  }
];

const CATEGORY_NAMES = { all: "All", ai: "AI / ML", software: "Software", hardware: "Hardware & Embedded" };

const INITIAL_COUNT = 2;          // how many projects to show at first
let visibleCount = INITIAL_COUNT; // how many are showing right now (with no filter or search)
let activeCategory = "all";       // which filter button is selected

const projectList = document.getElementById("project-list");
const loadMoreBtn = document.getElementById("load-more-btn");
const searchInput = document.getElementById("project-search");
const clearBtn = document.getElementById("clear-search");
const countText = document.getElementById("project-count");
const filterButtons = document.querySelectorAll(".filter-chip");

// Turn one project object into the HTML for one card
function createProjectCard(project) {
  const metrics = project.metrics
    .map(function (m) { return `<span class="metric">${m}</span>`; })
    .join("");
  const details = project.details
    .map(function (d) { return `<li>${d}</li>`; })
    .join("");
  const tools = project.tools
    .map(function (t) { return `<button type="button" class="tag tag-btn" data-tag="${t}">${t}</button>`; })
    .join("");
  const link = project.link
    ? `<a href="${project.link}" target="_blank" rel="noopener" class="right">View code</a>`
    : "";

  return `
    <div class="col s12 m6">
      <div class="card project-card">
        <div class="card-content">
          <span class="card-title theme-text">${project.title}</span>
          <p class="project-role">${project.role}</p>
          <div class="metric-list">${metrics}</div>
          <p>${project.description}</p>
          <details class="project-details">
            <summary>Details</summary>
            <ul>${details}</ul>
          </details>
          <div class="tag-list">${tools}</div>
        </div>
        <div class="card-action"><span>${project.dates}</span>${link}</div>
      </div>
    </div>`;
}

// Does this project mention the search text anywhere?
function matchesSearch(project, query) {
  const searchable = [project.title, project.role, project.description]
    .concat(project.tools, project.details)
    .join(" ")
    .toLowerCase();
  return searchable.includes(query);
}

// Decide which projects to show, then insert them into the page
function renderProjects() {
  const query = searchInput.value.trim().toLowerCase();
  const filtering = query !== "" || activeCategory !== "all";

  let shown = projects.filter(function (p) {
    const inCategory = activeCategory === "all" || p.categories.includes(activeCategory);
    return inCategory && (query === "" || matchesSearch(p, query));
  });

  // With no filter or search, show only the first visibleCount (Load More reveals the rest)
  if (!filtering) {
    shown = shown.slice(0, visibleCount);
  }

  projectList.innerHTML = shown.length
    ? shown.map(createProjectCard).join("")
    : '<p class="col s12 no-results">No projects match that yet. Try "Python" or another filter.</p>';

  // Load More only makes sense with no filter/search and some projects still hidden
  loadMoreBtn.style.display = filtering || visibleCount >= projects.length ? "none" : "";
  clearBtn.hidden = query === "";

  // textContent (not innerHTML) so typed text is never treated as HTML
  if (!filtering) {
    countText.textContent = `Showing ${shown.length} of ${projects.length} projects`;
  } else {
    let message = `${shown.length} ${shown.length === 1 ? "project" : "projects"}`;
    if (activeCategory !== "all") message += ` in ${CATEGORY_NAMES[activeCategory]}`;
    if (query) message += ` matching "${searchInput.value.trim()}"`;
    countText.textContent = message;
  }
}

// Load More: show the remaining projects without reloading the page
loadMoreBtn.addEventListener("click", function () {
  visibleCount = projects.length;
  renderProjects();
});

// Filter buttons: highlight the clicked one and show only that category
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    activeCategory = button.dataset.category;
    filterButtons.forEach(function (b) {
      b.classList.toggle("active", b === button);
      b.setAttribute("aria-pressed", String(b === button));
    });
    renderProjects();
  });
});

// Search updates on every keystroke; Escape clears it
searchInput.addEventListener("input", renderProjects);
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    searchInput.value = "";
    renderProjects();
  }
});

clearBtn.addEventListener("click", function () {
  searchInput.value = "";
  renderProjects();
  searchInput.focus();
});

// Clicking a skill tag on a card searches for that skill.
// One listener on the list handles every tag, even ones added later (event delegation).
projectList.addEventListener("click", function (event) {
  const tag = event.target.closest(".tag-btn");
  if (!tag) return;
  searchInput.value = tag.dataset.tag;
  renderProjects();
  searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
});

renderProjects(); // show the first two when the page loads
