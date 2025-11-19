// ===========================
// HOME PAGE SLIDESHOW
// ===========================
let slideIndex = 0;

function showSlides() {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;

  slides.forEach((s) => (s.style.display = "none"));

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".slide")) showSlides();
});

// ==============================================
// LIGHTBOX
// ==============================================
let galleryImages = [];
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  galleryImages = Array.from(document.querySelectorAll("main img"));
});

document.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.closest("main")) {
    currentIndex = galleryImages.indexOf(e.target);
    openLightbox(currentIndex);
  }
});

function openLightbox(index) {
  const overlay = document.createElement("div");
  overlay.id = "lightbox-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
  });

  const bigImg = document.createElement("img");
  bigImg.src = galleryImages[index].src;
  bigImg.id = "lightbox-img";
  Object.assign(bigImg.style, {
    maxWidth: "80%",
    maxHeight: "80%",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(255,255,255,0.4)",
  });

  const createButton = (innerHTML, left, right, onclick) => {
    const btn = document.createElement("div");
    btn.innerHTML = innerHTML;
    Object.assign(btn.style, {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "60px",
      color: "white",
      cursor: "pointer",
    });
    if (left !== null) btn.style.left = left;
    if (right !== null) btn.style.right = right;
    btn.onclick = onclick;
    return btn;
  };

  const prevBtn = createButton("&#10094;", "40px", null, () => changeImage(-1));
  const nextBtn = createButton("&#10095;", null, "40px", () => changeImage(1));

  const closeBtn = document.createElement("div");
  closeBtn.innerHTML = "&times;";
  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "20px",
    right: "30px",
    fontSize: "45px",
    color: "white",
    cursor: "pointer",
  });
  closeBtn.onclick = closeLightbox;

  overlay.appendChild(bigImg);
  overlay.appendChild(prevBtn);
  overlay.appendChild(nextBtn);
  overlay.appendChild(closeBtn);

  document.body.appendChild(overlay);
}

function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = galleryImages.length - 1;
  if (currentIndex >= galleryImages.length) currentIndex = 0;
  const img = document.getElementById("lightbox-img");
  if (img) img.src = galleryImages[currentIndex].src;
}

function closeLightbox() {
  const overlay = document.getElementById("lightbox-overlay");
  if (overlay) document.body.removeChild(overlay);
}

// ===========================
// ENQUIRY FORM
// ===========================
const enquiryForm = document.querySelector("#enquiryForm");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.querySelector("#responseMessage");
    msg.textContent = "Thank you! Your enquiry has been submitted.";
    msg.style.display = "block";
    enquiryForm.reset();
  });
}

// ===========================
// REGISTER USER FORM + EMAILJS
// ===========================
emailjs.init("ig9uYTGPOSa9ekCQd"); // EmailJS PUBLIC KEY

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const msg = document.getElementById("responseMessage");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let valid = true;

    document.getElementById("nameError").textContent =
      name.value.length < 2 ? "Name must be at least 2 characters." : "";

    document.getElementById("emailError").textContent =
      email.validity.valid ? "" : "Enter a valid email.";

    document.getElementById("passwordError").textContent =
      password.value.length < 8 ? "Password must be at least 8 characters." : "";

    if (!email.validity.valid || name.value.length < 2 || password.value.length < 8)
      valid = false;

    if (!valid) return;

    // Correct template name: no spaces
    emailjs.send("service_dnhi0ka", "template_ns63n88", {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    .then(() => {
      msg.textContent = "Thank you! Your registration has been submitted.";
      msg.style.display = "block";
      form.reset();
    })
    .catch((error) => {
      alert("Failed to send email: " + JSON.stringify(error));
    });
  });
});

// ===========================
// FOOTER DATE & TIME
// ===========================
function updateFooterDateTime() {
  const footerText = document.getElementById("footerDateTime");
  if (!footerText) return;
  footerText.textContent = new Date().toLocaleString();
}

setInterval(updateFooterDateTime, 1000);
updateFooterDateTime();
