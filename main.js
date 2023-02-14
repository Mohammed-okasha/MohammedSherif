// Window Loading Function
const loadingAnimation = document.getElementsByClassName("loading-page")[0];

window.addEventListener("load", function () {
  // //! Hide loading Animation
  loadingAnimation.classList.add("hide");
});
//!===========================================================================
// Switch Icons Mode When Add Active Class To .Mode Btn
const modeBtn = document.querySelector(".mode");

/*
- Switch Icons Mode When Click To Mode Btn
- Set Theme Mode(Dark && Light) In Body When Click To Mode Btn
*/

// Access To Body
const body = document.getElementsByTagName("body")[0];

let moveColor = document.getElementsByClassName("move")[0];
let blueColor = document.getElementsByClassName("blue")[0];

modeBtn.addEventListener("click", function () {
  // Check Mode Btn contains("active class") ?
  if (!this.classList.contains("active")) {
    // Add Active Class To Mode Btn
    this.classList.add("active");

    // Set Mode Btn To localStorage
    localStorage.setItem("mode-btn", this);
  } else {
    // Add Active Class To Mode Btn
    this.classList.remove("active");

    // Remove Mode Btn From localStorage
    localStorage.removeItem("mode-btn");
  }

  // Check Body contains("dark-mode class") ?
  if (!body.classList.contains("dark-mode")) {
    // Add dark-mode Class To Body
    body.classList.add("dark-mode");

    // Set Dark Mode Class In localStorage
    localStorage.setItem("dark-mode", body);
  } else {
    // Add dark-mode Class To Body
    body.classList.remove("dark-mode");

    // Remove Dark Mode Class From localStorage
    localStorage.removeItem("dark-mode", body);
  }
});

// Storage Body Dark Mode And Switch Mode Btn(Moon && Sun) In localStorage
if (localStorage.getItem("dark-mode") && localStorage.getItem("mode-btn")) {
  body.classList.add("dark-mode");

  modeBtn.classList.add("active");
}
//======================================================================
/*
- [When Window Scrolling]
1- Header Formatting
2- Skills Fill Progress
3- Convert Active Class To Current Link(a) When Scrolling To Sections
4- Hide The Social Media Links
5- Active Rocket Btn && Scroll To Top
*/
// Access For Header
const header = document.getElementById("header");

// Access To Social Media Links Element
const socialLinks = document.getElementById("social");

window.addEventListener("scroll", function () {
  if (this.scrollY >= 50) {
    // Add Scroll Class To Header
    header.classList.add("scroll");
  } else {
    // Remove Scroll Class From Header
    header.classList.remove("scroll");
  }

  // Convert Active Class To Current Link(a) When Scrolling To Sections
  const sections = document.querySelectorAll("section");
  const sectionsArray = [...sections];
  // Access For All Links
  const link = document.querySelectorAll("#header .links a");

  // Looping For All Sections
  sectionsArray.forEach((section) => {
    const id = section.getAttribute("id");

    // Looping For All Links
    link.forEach((a) => {
      const dataActive = a.getAttribute("data-active");

      if (window.scrollY >= section.offsetTop - 200) {
        // When id Att === dataActive
        if (dataActive === id) {
          // Add Active Class To Current a
          a.classList.add("active");
        } else {
          // When id Att !== dataActive
          // Remove Active Class Current a
          a.classList.remove("active");
        }
      }
    });
  });

  // Active Rocket Btn && Scroll To Top
  let translateX = 15;

  if (this.scrollY >= 1000) {
    // Access For Rocket Btn
    const rocket = this.document.getElementById("rocket");
    rocket.style.transform = `translateX(-${translateX}px)`;

    rocket.onclick = () => {
      this.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  } else {
    translateX = "70px";
    rocket.style.transform = `translateX(${translateX})`;
  }

  if (this.scrollY >= 600) {
    socialLinks.classList.add("hidden");
  } else {
    socialLinks.classList.remove("hidden");
  }

  // Remove Active Class From Menu Btn
  menuBtn.classList.remove("active");

  // Remove Active Class From Links
  links.classList.remove("active");
});
//======================================================================
/*
- Switch Icons Open && Close Menu When Ckick To Menu Btn
- Open Menu When Ckick To Menu Btn
*/

// Switch Icons Open && Close When Add Open Class To .menu-icon Btn
const menuBtn = document.querySelector(".menu-btn");
// Access To Menu Link(ul)
const links = document.querySelector("#header .links");

menuBtn.addEventListener("click", function () {
  // Add Active Class To menu Btn
  this.classList.toggle("active");

  // Check Links Has Active Class Or No
  if (!links.classList.contains("active")) {
    // Add Active Class To Links
    links.classList.add("active");
  } else {
    // Remove Active Class From Links
    links.classList.remove("active");
  }
});
//!====================================================================
//* My Portfolio Section

// Access To Projects Container Element
// const projectsContainer = document.getElementsByClassName("projects-area")[0];

// projectsSlides
const projectsSlides = document.querySelector(
  ".projects-slides .swiper-wrapper"
);

// Access To filter btns
const filterBtnsContainer = document.getElementsByClassName("filter-btns")[0];

// projectInfo
const projectInfo = document.getElementsByClassName("project-info")[0];

// Project Title
const projectTitle = document.querySelector(".project-modal .project-title");

// Access To Project features List
const featuresList = document.querySelector(".features .list");

// Access To Project features List
const projectTools = document.querySelector(".technologies .tools");

// Access To close Project Modal Btn
const closeModal = document.getElementsByClassName("close-modal")[0];

//* Global Variavles****************
let categories = [];
//?====================================================================
// Fetch My Projects
function fetchProjects(apiurl) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", function () {
    if (this.readyState === 4 && this.status === 200) {
      // Set Data To projects Var
      let projects = JSON.parse(this.responseText);

      //*? Invoke displayProjects
      displayProjects(projects);

      // Get Unique categories
      categories = [
        ...new Set(["all", ...projects.map((project) => project.category)]),
      ];

      //*? Looping On categories
      createFilterBtns(categories);

      //*? Invoke getFilterBtns
      getFilterBtns(projects);

      //*? Invoke projectInfo
      displayProjectInfo(projects);
    } else if (this.readyState === 4) {
      throw new Error("Cannot Fetch Data");
    }
  });

  xhr.open("GET", apiurl, true);
  xhr.send();
}

//*? Invoke fetchProjects
fetchProjects("./projrcts.json");

//* Display Projects Function
function displayProjects(projects) {
  let fullHeight = "";

  //* Looping On Projects
  projects.forEach((project) => {
    const {
      id,
      title,
      img,
      description: desc,
      link,
      category: cat,
      smallReactApp,
    } = project;

    // Project div
    const div = document.createElement("div");
    div.classList.add("project", "swiper-slide");
    div.dataset.id = id;

    if (cat === "various apps" || smallReactApp) {
      fullHeight = "full-height";
    } else {
      fullHeight = "";
    }

    const projectData = `
            <div class="image">
                <img src="${img}" alt="${title}" class="img ${fullHeight}">
            </div>
            <div class="info">
                <strong class="descripe">${title}</strong>
                <p class="p-style">${desc}</p>

                <div class="action-btns">
                    <a href="${link}"
                        class="preview" target="_blank">
                            live preview
                    </a>

                    <button class="info-btn" data-id="${id}">
                        <i class="fas fa-info"></i>
                    </button>
                </div>
            </div>
        `;

    div.innerHTML = projectData;

    // Append Div To projectsContainer
    projectsSlides.appendChild(div);
  });
}

//* Create Filter Btns Function
function createFilterBtns(categories) {
  categories.forEach((cat, index) => {
    const button = document.createElement("li");

    button.className = "filter-btn";

    if (index === 0) {
      button.classList.add("active");
    }

    button.setAttribute("data-cat", cat);

    button.innerText = cat;
    filterBtnsContainer.appendChild(button);
  });
}

//* Filter Projects By Category
function getFilterBtns(projects) {
  // Access To All Filter Btns
  const filterBtns = document.querySelectorAll(".filter-btn");

  //* Looping On filterBtns
  filterBtns.forEach((btn) => {
    const cat = btn.dataset.cat;

    btn.addEventListener("click", (e) => {
      //*? Invoke setActiveFilterBtn Fun
      setActiveFilterBtn(e, filterBtns);

      //*? Invoke filterProjectsByCategory Fun
      filterProjectsByCategory(projects, cat);

      //*? Invoke displayProjectInfo
      displayProjectInfo(projects);
    });
  });
}

//* Set Active Filter Btn
function setActiveFilterBtn(e, filterBtns) {
  filterBtns.forEach((btn) => {
    // Remove Active Class From All Filter Btn
    btn.classList.remove("active");
  });

  //*? Add Active Class To Current Filter Btn
  e.currentTarget.classList.add("active");
}

//* Filter Projects By Category
function filterProjectsByCategory(projects, cat) {
  // if Cat === All return All projects
  if (cat === "all") {
    //! Reset projectsContainer
    // projectsContainer.innerHTML = "";
    projectsSlides.innerHTML = "";

    // Invoke displayProjects Fun
    displayProjects(projects);
  } else {
    // Next Projects
    const nextProjects = projects.filter((project) => project.category === cat);

    //! Reset projectsContainer
    // projectsContainer.innerHTML = "";
    projectsSlides.innerHTML = "";

    // Invoke displayProjects Fun
    displayProjects(nextProjects);
  }
}

// * Display Project Info Functoin
function displayProjectInfo(projects) {
  const infoBtns = document.querySelectorAll(".info-btn");

  // Looping On infoBtns
  infoBtns.forEach((btn) => {
    // Btn ID
    const btnID = Math.trunc(btn.dataset.id);

    btn.addEventListener("click", () => {
      // Find Project Has The Same btnID
      const tempProject = projects.find((project) => project.id === btnID);

      // Reset featuresList
      featuresList.innerHTML = "";
      // Reset projectTools
      projectTools.innerHTML = "";

      // Invoke createProjectInfo
      createProjectInfo(tempProject);

      // Add Show Class To projectInfo
      projectInfo.classList.add("show");
    });
  });
}

//* Cretae Project Info
function createProjectInfo(project) {
  const { info, title } = project;

  // Set Title To projectTitle
  projectTitle.innerHTML = title;

  // Create project features
  info.features.forEach((feat) => {
    const li = document.createElement("li");
    li.className = "list-item";

    // Create li Text
    const liText = document.createTextNode(feat);
    li.appendChild(liText);

    featuresList.appendChild(li);
  });

  // Create project technologies
  info.technologies.forEach((tool) => {
    const span = document.createElement("span");
    span.className = "tool";

    // Create span Text
    const spanText = document.createTextNode(tool);
    span.appendChild(spanText);

    projectTools.appendChild(span);
  });
}

//* Close Project Info Modal
closeModal.addEventListener("click", (_) => {
  // Remove Show Class From projectInfo
  projectInfo.classList.remove("show");
});
//!===================================================================
