// -------------------------------
// ABOUT ME OBJECTS
// -------------------------------

const aboutObjects = document.querySelectorAll(".about-object");

const aboutInfoPanel = document.getElementById("aboutInfoPanel");
const aboutInfoContent = document.getElementById("aboutInfoContent");


const aboutContent = {

  // ---------------- CAMERA ----------------

  camera: `
    <div class="visual-info-panel">

      <span class="about-eyebrow">01 — MY VISUAL SIDE</span>

      <h3>
        I notice the<br>
        little things.
      </h3>

      <p class="about-description">
        I'm always collecting visual references: compositions, interiors,
        colours, websites, films and random details I find interesting.
        Most of my projects start with building a strong visual direction.
      </p>

      <div class="about-tags">
        <span>Web Design</span>
        <span>Interiors</span>
        <span>Photography</span>
        <span>Visual Research</span>
      </div>

    </div>
  `,


  // ---------------- TAPE / SPOTIFY ----------------

  tape: `
    <div class="spotify-panel">

      <span class="about-eyebrow">02 — WHAT I'M LISTENING TO</span>

      <h3>
        My soundtrack.
      </h3>

      <p class="about-description">
        This is probably playing while I'm designing, organising a project
        or pretending I don't have 18 tabs open.
      </p>

      <div class="spotify-embed">

        <iframe
          data-testid="embed-iframe"
          style="border-radius:12px"
          src="https://open.spotify.com/embed/playlist/14IatnY7Y8fv0CO29TohoP?utm_source=generator&theme=0&si=16b31a0131c54365"
          width="100%"
          height="352"
          frameborder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy">
        </iframe>

      </div>

    </div>
  `,


  // ---------------- CV ----------------

  cv: `
    <div class="cv-panel">

      <div class="panel-top">

        <span class="about-eyebrow">
          03 — EXPERIENCE
        </span>

        <a
          href="assets/Alejandra-Cortes-CV.pdf"
          download
          class="download-cv"
        >
          Download CV ↓
        </a>

      </div>

      <div class="cv-preview">

        <img
          src="assets/cvinfo.png"
          alt="Alejandra Cortés Reyero CV"
        >

      </div>

    </div>
  `,


  // ---------------- GUM ----------------

  gum: `
    <div class="visual-info-panel">

      <span class="about-eyebrow">
        04 — A LITTLE MORE ME
      </span>

      <h3>
        Serious about work.<br>
        Not so serious otherwise.
      </h3>

      <p class="about-description">
        I love playful ideas, unexpected details and designs that feel
        personal instead of overly polished or corporate.
      </p>

      <div class="about-tags">
        <span>Curious</span>
        <span>Organised</span>
        <span>Creative</span>
        <span>Detail obsessed</span>
      </div>

    </div>
  `,


  // ---------------- LAPTOP ----------------

  laptop: `
    <div class="visual-info-panel">

      <span class="about-eyebrow">
        05 — WHAT I DO
      </span>

      <h3>
        Design it.<br>
        Organise it.<br>
        Make it happen.
      </h3>

      <p class="about-description">
        I move between design and production, which means I enjoy both
        creating the idea and figuring out how to actually make it happen.
      </p>

      <div class="skills-grid">

        <div>
          <strong>01</strong>
          <span>Web Design</span>
        </div>

        <div>
          <strong>02</strong>
          <span>Production</span>
        </div>

        <div>
          <strong>03</strong>
          <span>Project Management</span>
        </div>

        <div>
          <strong>04</strong>
          <span>3D & Visuals</span>
        </div>

      </div>

    </div>
  `
};


// -------------------------------
// CLICK EN OBJETOS
// -------------------------------

aboutObjects.forEach((object) => {

  object.addEventListener("click", () => {

    const type = object.dataset.info;

    if (!aboutContent[type]) return;


    // Quitar selección anterior
    aboutObjects.forEach((item) => {
      item.classList.remove("is-active");
    });


    // Activar objeto seleccionado
    object.classList.add("is-active");


    // Animación de salida
    aboutInfoPanel.classList.add("is-changing");


    setTimeout(() => {

      // Cambiar todo el contenido del panel derecho
      aboutInfoContent.innerHTML = aboutContent[type];

      // Animación de entrada
      aboutInfoPanel.classList.remove("is-changing");

    }, 200);

  });

});

// -------------------------------
// DRAGGABLE PROJECTS BOARD
// -------------------------------

const projectsViewport = document.getElementById("projectsViewport");
const projectsWorld = document.getElementById("projectsWorld");
const projectsSection = document.getElementById("projects");
const projectFilters = document.querySelectorAll(".project-filter");
const projectsStatus = document.getElementById("projectsStatus");

if (projectsViewport && projectsWorld && projectsSection) {
  const categoryNames = {
    web: "Web Design",
    archviz: "Arch-Viz",
    models: "3D Models"
  };

    // Crea imágenes temporales para los proyectos que todavía
  // no tienen imágenes reales dentro de la carpeta assets.
  function createPlaceholder(label, background, textColor = "#ffffff") {
    const svg = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1100"
        height="700"
        viewBox="0 0 1100 700"
      >
        <rect
          width="1100"
          height="700"
          fill="${background}"
        />

        <circle
          cx="930"
          cy="120"
          r="170"
          fill="rgba(255,255,255,0.12)"
        />

        <circle
          cx="150"
          cy="610"
          r="230"
          fill="rgba(255,255,255,0.08)"
        />

        <text
          x="550"
          y="350"
          fill="${textColor}"
          font-family="Arial, Helvetica, sans-serif"
          font-size="58"
          font-weight="700"
          text-anchor="middle"
          dominant-baseline="middle"
        >
          ${label}
        </text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }


  // Posición de los cuatro proyectos dentro de la esterilla.
  const projectLayouts = [
    {
      x: 670,
      y: 360,
      scale: 1,
      rotation: -0.3
    },
    {
      x: 1910,
      y: 260,
      scale: 0.84,
      rotation: 0.8
    },
    {
      x: 470,
      y: 1290,
      scale: 0.82,
      rotation: 0.5
    },
    {
      x: 1740,
      y: 1210,
      scale: 0.94,
      rotation: -0.7
    }
  ];
  const mobileProjectLayouts = [
    {
      x: 650,
      y: 300,
      scale: 1,
      rotation: -2
    },
    {
      x: 1250,
      y: 330,
      scale: 1,
      rotation: 2
    },
    {
      x: 680,
      y: 650,
      scale: 1,
      rotation: 1
    },
    {
      x: 1280,
      y: 680,
      scale: 1,
      rotation: -2
    }
  ];

  // Cuatro proyectos diferentes para cada categoría.
  const projectsByCategory = {
    web: [
      {
        title: "IKEA Re-creations Concept:",

        main: "assets/ikea-main.gif",

        thumbs: [
          "assets/ikea-01.png",
          "assets/ikea-02.png",
          "assets/ikea-03.png"
        ],

        clip: "assets/red-clip.png",

        paragraphs: [
          "This project is a concept for IKEA called Re-Creations, designed as a new section of their website.",

          "Re-Creations allows users to customise existing IKEA furniture by changing colours, patterns, or paint finishes for an additional $5.99.",

          "The main focus of this Figma prototype was to make the experience fun and playful, especially when switching between different colour and design suggestions. I wanted those transitions to feel dynamic and entertaining, making the customisation process enjoyable to watch."
        ]
      },

      {
        title: "Olipop Website:",

        main: "assets/olipop-main.gif",

        thumbs: [
          "assets/olipop-01.png",
          "assets/olipop-02.png",
          "assets/olipop-03.png"
        ],

        clip: "assets/red-clip.png",

        paragraphs: [
          "I created this project as a UI/UX design exercise in Figma. The goal was to translate the brand’s colourful and playful identity into a digital experience where the product remains the main focus.",

          "The concept is built around the different soda flavours, with each product having its own colour palette and visual identity inspired by its ingredients.",

          "I also designed the prototype so users can move between flavours through interactive transitions, making the experience feel more dynamic than a traditional product page.",

          "The full interface and interactive prototype were designed by me in Figma."
        ]
      },

      {
        title: "Pringles Flavour Selector:",

        main: "assets/pringles-main.gif",

        thumbs: [
          "assets/pringles-01.png",
          "assets/pringles-02.png",
          "assets/pringles-03.png"
        ],

        clip: "assets/red-clip.png",

        paragraphs: [
          "The main idea was to turn the traditional product page into a flavour selector, allowing users to switch between products directly from the same interface.",

          "Each flavour has its own visual identity, with the product, accent colours and surrounding elements changing dynamically depending on the selected option.",

          "The large product imagery and animated transitions were designed to make switching between flavours feel more engaging and responsive."
        ]
      },

      {
        title: "Creative Portfolio:",

        main: "assets/portfolio-main.gif",

        thumbs: [
          "assets/portfolio-01.png",
          "assets/portfolio-02.png",
          "assets/portfolio-03.png"
        ],

        clip: "assets/red-clip.png",

        paragraphs: [
          "A calm and minimal tracking experience for people who need to register migraine episodes quickly.",

          "The flow prioritises only the most useful information: duration, pain location, medication and whether the treatment helped.",

          "The visual system avoids clinical overload and uses soft illustrations to make repeated tracking feel less exhausting."
        ]
      }
    ],


    archviz: [
      {
        title: "Kitchen Arch Concept:",

        main:"assets/KitchenTop.png",

        thumbs: [
          "assets/KitchenTop-01.png",
          "assets/KitchenTop-02.png",
          "assets/KitchenTop-03.png"
        ],

        clip: "assets/red-clip.png",

        paragraphs: [
          "It's been a while since I worked on an interior design project, so I decided to spend some of my free time creating this scene. Now that classes are finally over, it feels great to have a bit more time to work on the things I enjoy.",
          "I designed this warm and minimalist kitchen area concept built around a large arch that frames the workspace.",
          "I combined dark wood, neutral tones, organic textures and soft lighting to create a calm, welcoming and visually balanced space.",
        ]
      },

      {
        title: "Japandi Living Room:",

        main:"assets/Japandi.png",

        thumbs: [
          "assets/Japandi-01.png",
          "assets/Japandi-02.png",
          "assets/Japandi-03.png"
        ],

        clip: "assets/red-clip.png",

        paragraphs: [
          "I first saw a table like this in a house and was immediately drawn to its raw, sculptural shape. I liked it so much that I decided to recreate it and design an entire room around it.",

          "From there, I built a calm, Japandi-inspired space using natural materials, soft neutral tones and warm sunlight.",

          "The simple furniture, textured wood and minimal decoration keep the focus on the table while making the room feel peaceful, balanced and lived-in."
        ]
      },

      {
        title: "Pilates Studio:",

        main:"assets/Pilates.png",

        thumbs: [
          "assets/Pilates.png",
          "assets/Pilates-02.png",
          "assets/Pilates-03.png"
        ],

        clip: "assets/red-clip.png",

        paragraphs: [
          "This project explores the design of a minimalist Pilates studio, with a focus on creating a space that feels calm, warm and connected to the practice itself.",

          "I chose a soft, neutral colour palette combined with natural wood, light fabrics and subtle textures to make the studio feel peaceful without becoming too cold or empty.",

          "The layout was designed to keep the room open and functional, with dedicated areas for practice and integrated storage for Pilates equipment."
        ]
      },

      {
        title: "Open Bathroom Concept:",

        main:"assets/bañomain.png",

        thumbs: [
          "assets/baño-01.png",
          "assets/baño-02.png",
          "assets/baño-03.png"
        ],

        clip: "assets/red-clip.png",

        paragraphs: [
          "The main idea was to move away from the traditional feeling of a bathroom and create a space that feels more like a place to slow down and relax.",

          "The freestanding rounded bathtub acts as the main focal point, while the circular mirrors and arched opening introduce softer shapes that contrast with the clean architectural lines of the room.",

          "Lighting was also an important part of the concept. I used indirect lighting around the mirrors and vanity to create depth without adding unnecessary visual elements, while natural light is softened through the curtains."
        ]
      }
    ],

/*
    models: [
      {
        title: "Retro Telephone Model:",

        main: createPlaceholder(
          "Retro Telephone",
          "#c84e42"
        ),

        thumbs: [
          createPlaceholder(
            "Wireframe",
            "#2d2d2d"
          ),

          createPlaceholder(
            "Materials",
            "#e6b8a9",
            "#5a2c26"
          ),

          createPlaceholder(
            "Final Render",
            "#8e332d"
          )
        ],

        clip: "assets/red-clip.png",

        paragraphs: [
          "A stylised 3D telephone inspired by colourful domestic objects from the 1970s.",

          "The model combines simple hard-surface forms with slightly exaggerated proportions to give it a playful silhouette.",

          "The project covered modelling, UVs, materials and a final product-style lighting setup."
        ]
      },

      {
        title: "Robot Mascot:",

        main: createPlaceholder(
          "Robot Mascot",
          "#f0b84f",
          "#45320e"
        ),

        thumbs: [
          createPlaceholder(
            "Character Sheet",
            "#ffe08f",
            "#45320e"
          ),

          createPlaceholder(
            "Expression Test",
            "#75a4d8",
            "#17324f"
          ),

          createPlaceholder(
            "Turnaround",
            "#d98e42",
            "#45320e"
          )
        ],

        clip: "assets/red-clip.png",

        paragraphs: [
          "A friendly robot mascot created for a fictional creative software brand.",

          "Its shapes were kept simple and readable so the character could work in both 3D scenes and small interface illustrations.",

          "Several face states and poses were developed to make the model expressive without requiring complex facial rigging."
        ]
      },

      {
        title: "Pastry Display Set:",

        main: createPlaceholder(
          "Pastry Display",
          "#e8b6b0",
          "#583a35"
        ),

        thumbs: [
          createPlaceholder(
            "Croissant",
            "#dca56d",
            "#4d321c"
          ),

          createPlaceholder(
            "Cake Slice",
            "#f0cfca",
            "#583a35"
          ),

          createPlaceholder(
            "Display Case",
            "#9d766f"
          )
        ],

        clip: "assets/red-clip.png",

        paragraphs: [
          "A small collection of stylised bakery assets for use in a cosy game environment.",

          "Each item was designed with a low-poly structure and soft materials so the set could remain lightweight while still looking appealing up close.",

          "The assets share the same proportions and colour language, making them easy to combine into different shop displays."
        ]
      },

      {
        title: "Modular Desk Kit:",

        main: createPlaceholder(
          "Modular Desk Kit",
          "#59756c"
        ),

        thumbs: [
          createPlaceholder(
            "Desk Pieces",
            "#77958b"
          ),

          createPlaceholder(
            "Accessories",
            "#d4c2a4",
            "#4b3b28"
          ),

          createPlaceholder(
            "Scene Test",
            "#384d47"
          )
        ],

        clip: "assets/red-clip.png",

        paragraphs: [
          "A modular set of desk furniture and accessories designed for fast environment building.",

          "The pieces can be rearranged into study rooms, offices or creative workspaces without requiring unique geometry for every scene.",

          "The project focused on consistent scale, reusable materials and clean topology suitable for real-time use."
        ]
      }
    ] */
  };




  function projectMarkup(project, layout, index) {
    const paragraphs = project.paragraphs
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");

    const thumbs = project.thumbs
      .map(
        (src, thumbIndex) => `
          <img
            src="${src}"
            alt="${project.title} process image ${thumbIndex + 1}"
            draggable="false"
          >
        `
      )
      .join("");

    return `
      <article
        class="project-piece"
        aria-label="${project.title}"
        style="
          left: ${layout.x}px;
          top: ${layout.y}px;
          --project-scale: ${layout.scale};
          --project-rotation: ${layout.rotation}deg;
        "
      >
        <div class="project-gallery">
          <img
            class="project-main-media"
            src="${project.main}"
            alt="${project.title} main visual"
            draggable="false"
            ${index === 0
              ? 'fetchpriority="high"'
              : 'loading="lazy"'
            }
          >

          <div class="project-thumbnails">
            ${thumbs}
          </div>
        </div>

        <div class="project-note">
          <img
            class="project-clip"
            src="${project.clip}"
            alt=""
            aria-hidden="true"
            draggable="false"
          >

          <h3>${project.title}</h3>

          ${paragraphs}
        </div>
      </article>
    `;
  }


  function renderProjects(category = "web") {
    projectsWorld.classList.add("is-changing");

    window.setTimeout(() => {
      const selectedProjects =
        projectsByCategory[category] || projectsByCategory.web;

      projectsWorld.innerHTML = selectedProjects
        .map((project, index) => {
          const layouts =
          window.innerWidth <= 650
            ? mobileProjectLayouts
            : projectLayouts;

        return projectMarkup(
          project,
          layouts[index],
          index
        );
        })
        .join("");

      projectsWorld.dataset.category = category;
      projectsWorld.classList.remove("is-changing");

      if (projectsStatus) {
        projectsStatus.textContent =
          `${categoryNames[category]} projects selected.`;
      }
    }, 120);
  }

  const position = {
    x: -500,
    y: -170
  };

  const velocity = {
    x: 0,
    y: 0
  };

  let activePointerId = null;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let lastPointerTime = 0;
  let inertiaFrame = null;
  let hasMoved = false;

  function getBounds() {
    const isMobile = window.matchMedia("(max-width: 650px)").matches;

    if (isMobile) {
      return {
        minX: projectsViewport.clientWidth - 1800,
        maxX: -450,

        minY: projectsViewport.clientHeight - 1050,
        maxY: -120
      };
    }

    return {
      minX: Math.min(
        0,
        projectsViewport.clientWidth - projectsWorld.offsetWidth
      ),

      maxX: 0,

      minY: Math.min(
        0,
        projectsViewport.clientHeight - projectsWorld.offsetHeight
      ),

      maxY: 0
    };
  }

  function clampPosition() {
    const bounds = getBounds();

    position.x = Math.max(bounds.minX, Math.min(bounds.maxX, position.x));
    position.y = Math.max(bounds.minY, Math.min(bounds.maxY, position.y));
  }

  function paintWorld() {
    projectsWorld.style.transform =
      `translate3d(${position.x}px, ${position.y}px, 0)`;
  }

  function stopInertia() {
    if (inertiaFrame) {
      cancelAnimationFrame(inertiaFrame);
      inertiaFrame = null;
    }
  }

  function startInertia() {
    stopInertia();

    let previousTime = performance.now();

    function animate(now) {
      const deltaTime = Math.min(32, now - previousTime);
      previousTime = now;

      position.x += velocity.x * deltaTime;
      position.y += velocity.y * deltaTime;

      const beforeClampX = position.x;
      const beforeClampY = position.y;

      clampPosition();

      if (position.x !== beforeClampX) velocity.x = 0;
      if (position.y !== beforeClampY) velocity.y = 0;

      velocity.x *= 0.92;
      velocity.y *= 0.92;

      paintWorld();

      if (Math.abs(velocity.x) > 0.015 || Math.abs(velocity.y) > 0.015) {
        inertiaFrame = requestAnimationFrame(animate);
      } else {
        inertiaFrame = null;
      }
    }

    inertiaFrame = requestAnimationFrame(animate);
  }

  function resetProjectsBoard() {
    stopInertia();

    position.x = window.innerWidth <= 650 ? -585 : -500;
    position.y = window.innerWidth <= 650 ? -190 : -170;

    velocity.x = 0;
    velocity.y = 0;

    clampPosition();
    paintWorld();
  }

  function startProjectsPan(event) {
    if (event.button !== undefined && event.button !== 0) return;

    stopInertia();

    activePointerId = event.pointerId;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    lastPointerTime = performance.now();
    hasMoved = false;

    projectsViewport.setPointerCapture(event.pointerId);
    projectsViewport.classList.add("is-panning");
    projectsSection.classList.add("is-grabbing");
  }

  function moveProjectsPan(event) {
    if (event.pointerId !== activePointerId) return;

    const now = performance.now();
    const deltaTime = Math.max(1, now - lastPointerTime);
    const deltaX = event.clientX - lastPointerX;
    const deltaY = event.clientY - lastPointerY;

    if (Math.abs(deltaX) + Math.abs(deltaY) > 2) {
      hasMoved = true;
    }

    position.x += deltaX;
    position.y += deltaY;

    velocity.x = deltaX / deltaTime;
    velocity.y = deltaY / deltaTime;

    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    lastPointerTime = now;

    clampPosition();
    paintWorld();

    event.preventDefault();
  }

  function endProjectsPan(event) {
    if (event.pointerId !== activePointerId) return;

    activePointerId = null;
    projectsViewport.classList.remove("is-panning");
    projectsSection.classList.remove("is-grabbing");

    if (projectsViewport.hasPointerCapture(event.pointerId)) {
      projectsViewport.releasePointerCapture(event.pointerId);
    }

    if (hasMoved) {
      startInertia();
    }
  }

  projectsViewport.addEventListener("pointerdown", startProjectsPan);
  projectsViewport.addEventListener("pointermove", moveProjectsPan);
  projectsViewport.addEventListener("pointerup", endProjectsPan);
  projectsViewport.addEventListener("pointercancel", endProjectsPan);

  projectFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.category;

      projectFilters.forEach((button) => {
        const isActive = button === filter;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      renderProjects(category);
      resetProjectsBoard();
    });
  });

  window.addEventListener("resize", () => {
    clampPosition();
    paintWorld();
  });

  renderProjects("web");
  resetProjectsBoard();
}


// -------------------------------
// SCROLL REVEAL
// -------------------------------

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// -------------------------------
// ID CARD SWING ANIMATION
// -------------------------------

const idHolder = document.querySelector(".id-holder");
const idCard = document.querySelector(".id-card");

let isSwinging = false;

idHolder.addEventListener("mouseenter", () => {
  // Si ya está animándose, no hace nada
  if (isSwinging) return;

  isSwinging = true;
  idCard.classList.add("is-swinging");
});

idCard.addEventListener("animationend", () => {
  idCard.classList.remove("is-swinging");
  isSwinging = false;
});



