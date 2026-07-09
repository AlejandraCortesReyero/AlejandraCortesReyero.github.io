// -------------------------------
// POPUP CONTENT
// -------------------------------

const modalContent = {
  tape: {
    title: "My references",
    text:
      "I love collecting visual references, music, film moments and tiny details that help me build a mood before starting a project."
  },

  camera: {
    title: "My visual side",
    text:
      "I enjoy creating visuals that feel personal, clean and memorable. I care a lot about mood, composition and the little things that make a design feel alive."
  },

  cv: {
    title: "My experience",
    text:
      "I currently work in UDIT's Research Department as a Producer and Team Manager, coordinating creative teams and helping projects move forward."
  },

  gum: {
    title: "My personality",
    text:
      "I like playful ideas, bold visuals and projects that do not feel too serious. I enjoy mixing clean design with unexpected details."
  },

  laptop: {
    title: "What I do",
    text:
      "I work across web design, production, project management, UI ideas, 3D visuals and creative direction. Basically, I like making things happen."
  }
};


// -------------------------------
// MODAL
// -------------------------------

const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

function openModal(type) {
  const content = modalContent[type];

  if (!content) return;

  modalTitle.textContent = content.title;
  modalText.textContent = content.text;

  modalOverlay.classList.add("is-open");
}

function closeModal() {
  modalOverlay.classList.remove("is-open");
}

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});


// -------------------------------
// DRAG & DROP
// -------------------------------

const dragItems = document.querySelectorAll(".drag-item");
const dropZone = document.getElementById("basketDropZone");
const dragStage = document.querySelector(".drag-stage");

let activeDrag = null;

dragItems.forEach((item) => {
  item.addEventListener("pointerdown", startDrag);
});

function startDrag(event) {
  const item = event.currentTarget;

  item.setPointerCapture(event.pointerId);

  const itemRect = item.getBoundingClientRect();

  activeDrag = {
    item,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    startLeft: item.offsetLeft,
    startTop: item.offsetTop,
    width: itemRect.width,
    height: itemRect.height,
    originalLeft: item.dataset.originalLeft || item.offsetLeft,
    originalTop: item.dataset.originalTop || item.offsetTop
  };

  if (!item.dataset.originalLeft) {
    item.dataset.originalLeft = item.offsetLeft;
    item.dataset.originalTop = item.offsetTop;
  }

  item.classList.add("dragging");

  window.addEventListener("pointermove", moveDrag);
  window.addEventListener("pointerup", endDrag);
}

function moveDrag(event) {
  if (!activeDrag) return;

  const { item, startX, startY, startLeft, startTop } = activeDrag;

  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;

  item.style.left = `${startLeft + deltaX}px`;
  item.style.top = `${startTop + deltaY}px`;

  if (isInsideDropZone(event.clientX, event.clientY)) {
    dropZone.classList.add("is-active");
  } else {
    dropZone.classList.remove("is-active");
  }
}

function endDrag(event) {
  if (!activeDrag) return;

  const { item } = activeDrag;

  item.classList.remove("dragging");
  dropZone.classList.remove("is-active");

  const droppedCorrectly = isInsideDropZone(event.clientX, event.clientY);

  if (droppedCorrectly) {
    placeInsideBasket(item, event.clientX, event.clientY);
    item.classList.add("dropped");

    setTimeout(() => {
      item.classList.remove("dropped");
    }, 500);

    openModal(item.dataset.modal);
  } else {
    sendBackHome(item);
  }

  window.removeEventListener("pointermove", moveDrag);
  window.removeEventListener("pointerup", endDrag);

  activeDrag = null;
}

function isInsideDropZone(x, y) {
  const rect = dropZone.getBoundingClientRect();

  return (
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom
  );
}

function placeInsideBasket(item, pointerX, pointerY) {
  const stageRect = dragStage.getBoundingClientRect();

  const newLeft = pointerX - stageRect.left - item.offsetWidth / 2;
  const newTop = pointerY - stageRect.top - item.offsetHeight / 2;

  item.style.left = `${newLeft}px`;
  item.style.top = `${newTop}px`;
  item.style.zIndex = "20";
}

function sendBackHome(item) {
  item.style.transition = "left 0.35s ease, top 0.35s ease, transform 0.25s ease";

  item.style.left = `${item.dataset.originalLeft}px`;
  item.style.top = `${item.dataset.originalTop}px`;

  setTimeout(() => {
    item.style.transition = "";
  }, 360);
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



