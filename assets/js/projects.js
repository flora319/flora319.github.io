// Activity 5: Dynamic project content
// The project data lives in this array. renderProjects() turns it into HTML.

const projects = [
  {
    title: "Dementia Care Support Chatbot",
    description: "A RAG-based AI chatbot that gives grounded, citation-backed dementia caregiving guidance, developed with doctors' input.",
    tools: ["Python", "FastAPI", "AWS Bedrock", "RAG"],
    dates: "Sep 2025 - Apr 2026"
  },
  {
    title: "Ancient Ceramic Classification",
    description: "A PyTorch CNN that classifies ancient ceramics into 10 stylistic categories, trained on 11,000+ preprocessed images.",
    tools: ["Python", "PyTorch", "CNNs", "Computer Vision"],
    dates: "Sep 2025 - Jan 2026"
  },
  {
    title: "Video Quality Automation (AMD)",
    description: "Led a test-automation tool using Jenkins job triggers and a MySQL-backed pipeline for quality-score processing and visualization.",
    tools: ["Python", "Jenkins", "MySQL"],
    dates: "May 2023 - Apr 2024"
  },
  {
    title: "Interactive Map (GIS)",
    description: "Led a team of three to build a GIS map application with Day/Night modes, cutting load and run time by about 85%.",
    tools: ["C++", "Linux", "Git"],
    dates: "Feb 2022 - May 2022"
  }
];

const INITIAL_COUNT = 2;          // how many projects to show at first
let visibleCount = INITIAL_COUNT; // how many are showing right now

const projectList = document.getElementById("project-list");
const loadMoreBtn = document.getElementById("load-more-btn");

// Turn one project object into the HTML for one card
function createProjectCard(project) {
  return `
    <div class="col s12 m6">
      <div class="card">
        <div class="card-content">
          <span class="card-title theme-text">${project.title}</span>
          <p>${project.description}</p>
          <p class="grey-text"><b>Tools:</b> ${project.tools.join(", ")}</p>
        </div>
        <div class="card-action"><span>${project.dates}</span></div>
      </div>
    </div>`;
}

// Insert the currently visible projects into the page
function renderProjects() {
  const visibleProjects = projects.slice(0, visibleCount);
  projectList.innerHTML = visibleProjects.map(createProjectCard).join("");

  // Hide the button once every project is on screen
  if (visibleCount >= projects.length) {
    loadMoreBtn.style.display = "none";
  }
}

// Load More: show the remaining projects without reloading the page
loadMoreBtn.addEventListener("click", function () {
  visibleCount = projects.length;
  renderProjects();
});

renderProjects(); // show the first two when the page loads
