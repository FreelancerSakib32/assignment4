let jobs = [
  {
    id: crypto.randomUUID(),
    company: "Mobile First Corp", 
    role: "React Native Developer",
    meta: "Remote • Full-time • $130,000 - $175,000",
    status: "NOT APPLIED",
    desc: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
  },
  {
    id: crypto.randomUUID(),
    company: "WebFlow Agency",
    role: "Web Designer & Developer",
    meta: "Los Angeles, CA • Part-time • $80,000 - $120,000",
    status: "NOT APPLIED",
    desc: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
  },
  {
    id: crypto.randomUUID(),
    company: "DataViz Solutions",
    role: "Data Visualization Specialist",
    meta: "Boston, MA • Full-time • $125,000 - $165,000",
    status: "NOT APPLIED",
    desc: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
  },
  {
    id: crypto.randomUUID(),
    company: "CloudFirst Inc",
    role: "Backend Developer",
    meta: "Seattle, WA • Full-time • $140,000 - $190,000",
    status: "NOT APPLIED",
    desc: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
  },
  {
    id: crypto.randomUUID(),
    company: "DataViz Solutions",
    role: "Data Visualization Specialist",
    meta: "Boston, MA • Full-time • $125,000 - $165,000",
    status: "NOT APPLIED",
    desc: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
  },
  {
    id: crypto.randomUUID(),
    company: "Innovation Labs",
    role: "Data Visualization Specialist",
    meta: "Boston, MA • Full-time • $125,000 - $165,000",
    status: "NOT APPLIED",
    desc: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
  },
  {
    id: crypto.randomUUID(),
    company: "MegaCorp Solutions",
    role: "Data Visualization Specialist",
    meta: "Boston, MA • Full-time • $125,000 - $165,000",
    status: "NOT APPLIED",
    desc: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
  },
  {
    id: crypto.randomUUID(),
    company: "StartupXYZ ",
    role: "Senior Frontend Developer",
    meta: "Boston, MA • Full-time • $125,000 - $165,000",
    status: "NOT APPLIED",
    desc: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
  },
];

// ----- State -----
let interviewList = []; // store job ids
let rejectedList = [];  // store job ids
let currentStatus = "all-filter-btn";

// ----- DOM -----
const totalEl = document.getElementById("total");
const interviewCountEl = document.getElementById("interviewCount");
const rejectedCountEl = document.getElementById("rejectedCount");
const jobsCountText = document.getElementById("jobsCountText");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardSection = document.getElementById("allCards");
const filterSection = document.getElementById("filtered-section");
const emptyState = document.getElementById("emptyState");
const mainContainer = document.querySelector("main");

// ----- Helpers -----
function calculateCount() {
  // Total jobs remaining
  totalEl.innerText = jobs.length;
  jobsCountText.innerText = jobs.length;

  // Interview/Rejected count = id list length (but ensure job exists)
  interviewList = interviewList.filter((id) => jobs.some((j) => j.id === id));
  rejectedList = rejectedList.filter((id) => jobs.some((j) => j.id === id));

  interviewCountEl.innerText = interviewList.length;
  rejectedCountEl.innerText = rejectedList.length;

  // Empty state show/hide
  if (jobs.length === 0) {
    emptyState.classList.remove("hidden");
    allCardSection.classList.add("hidden");
    filterSection.classList.add("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

function setActiveButton(activeBtn) {
  // reset all
  const btns = [allFilterBtn, interviewFilterBtn, rejectedFilterBtn];
  btns.forEach((b) => {
    b.classList.remove("bg-blue-600", "text-white");
    b.classList.add("text-slate-600");
  });

  // active
  activeBtn.classList.add("bg-blue-600", "text-white");
  activeBtn.classList.remove("text-slate-600");
}

function getStatusBadge(status) {
  if (status === "INTERVIEW") {
    return `<span class="inline-flex items-center rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">INTERVIEW</span>`;
  }
  if (status === "REJECTED") {
    return `<span class="inline-flex items-center rounded-md bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 border border-red-200">REJECTED</span>`;
  }
  return `<span class="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">NOT APPLIED</span>`;
}

function renderCard(job) {
  const statusBadge = getStatusBadge(job.status);

  return `
  <div class="card bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex justify-between gap-6" data-id="${job.id}">
    <div class="space-y-4">
      <div>
        <p class="company text-lg font-semibold">${job.company}</p>
        <p class="role text-sm text-slate-600">${job.role}</p>
        <p class="meta mt-2 text-xs text-slate-500">${job.meta}</p>
      </div>

      <div class="status">${statusBadge}</div>

      <p class="desc text-sm text-slate-600 leading-relaxed max-w-2xl">${job.desc}</p>

      <div class="flex gap-3">
        <button class="interview-btn px-4 py-2 text-xs font-semibold rounded-md border-2 border-green-500 text-green-500  ">
          INTERVIEW
        </button>
        <button class="rejected-btn px-4 py-2 text-xs font-semibold rounded-md border-2 border-red-400 text-red-400 ">
          REJECTED
        </button>
      </div>
    </div>

    <div class="shrink-0">
      <button class="btn-delete px-4 bg-red-200 text-red-500 py-2 text-xs font-semibold rounded-md border border-slate-200 ">
        Delete <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
  </div>
  `;
}

function renderAll() {
  allCardSection.innerHTML = "";
  jobs.forEach((job) => (allCardSection.innerHTML += renderCard(job)));
}

function renderFiltered(type) {
  filterSection.innerHTML = "";

  let listIds = [];
  if (type === "interview-filter-btn") listIds = interviewList;
  if (type === "rejected-filter-btn") listIds = rejectedList;

  const filteredJobs = jobs.filter((j) => listIds.includes(j.id));
  filteredJobs.forEach((job) => (filterSection.innerHTML += renderCard(job)));
}

// ----- Filter Toggle -----
function toggleStyle(id) {
  currentStatus = id;

  if (jobs.length === 0) {
    calculateCount();
    return;
  }

  if (id === "all-filter-btn") {
    setActiveButton(allFilterBtn);
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
    renderAll();
  } else if (id === "interview-filter-btn") {
    setActiveButton(interviewFilterBtn);
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderFiltered(id);
  } else if (id === "rejected-filter-btn") {
    setActiveButton(rejectedFilterBtn);
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderFiltered(id);
  }

  calculateCount();
}

// ----- Click delegation -----
mainContainer.addEventListener("click", function (event) {
  const card = event.target.closest(".card");
  if (!card) return;

  const id = card.getAttribute("data-id");
  const job = jobs.find((j) => j.id === id);
  if (!job) return;

  // Interview
  if (event.target.classList.contains("interview-btn")) {
    job.status = "INTERVIEW";

    if (!interviewList.includes(id)) interviewList.push(id);
    rejectedList = rejectedList.filter((x) => x !== id);

    // current filter view update
    if (currentStatus === "rejected-filter-btn") renderFiltered(currentStatus);
    if (currentStatus === "interview-filter-btn") renderFiltered(currentStatus);
    if (currentStatus === "all-filter-btn") renderAll();

    calculateCount();
  }

  // Rejected
  if (event.target.classList.contains("rejected-btn")) {
    job.status = "REJECTED";

    if (!rejectedList.includes(id)) rejectedList.push(id);
    interviewList = interviewList.filter((x) => x !== id);

    if (currentStatus === "interview-filter-btn") renderFiltered(currentStatus);
    if (currentStatus === "rejected-filter-btn") renderFiltered(currentStatus);
    if (currentStatus === "all-filter-btn") renderAll();

    calculateCount();
  }

  // Delete
  if (event.target.classList.contains("btn-delete")) {
    jobs = jobs.filter((j) => j.id !== id);
    interviewList = interviewList.filter((x) => x !== id);
    rejectedList = rejectedList.filter((x) => x !== id);

    // re-render based on filter
    if (jobs.length === 0) {
      calculateCount();
      return;
    }

    if (currentStatus === "all-filter-btn") renderAll();
    else renderFiltered(currentStatus);

    calculateCount();
  }
});

// ----- Initial render -----
renderAll();
calculateCount();