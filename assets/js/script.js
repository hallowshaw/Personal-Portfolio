'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}



/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}


/**
 * Email JS Integration
 */
var script = document.createElement('script');
script.src = 'https://cdn.emailjs.com/dist/email.min.js';
document.head.appendChild(script);

script.onload = function () {
  emailjs.init("cqX_71OsKL2Z9K_Ew");

  function sendEmail(event) {
    event.preventDefault();

    // Show loader
    document.getElementById('custom-loader-wrapper').style.display = 'block';

    var formData = {
      from_name: document.getElementById('name').value,
      from_email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      to_name: "Rhitam Chaudhury",
      reply_to: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    emailjs.send("service_eijduq7", "template_ve2scxs", formData)
      .then(function (response) {
        console.log("Email sent successfully!", response);
        document.getElementById('contact-form').reset();
        // Hide loader on success
        document.getElementById('custom-loader-wrapper').style.display = 'none';
        // Display success alert after a short delay
        setTimeout(function () {
          alert("Email sent successfully!");
        }, 100);
        // Clear URL parameters
        history.replaceState({}, document.title, window.location.pathname);
      }, function (error) {
        console.error("Email send failed:", error);
        // Hide loader on error
        document.getElementById('custom-loader-wrapper').style.display = 'none';
        // Display error alert
        alert("Email send failed. Please try again later.");
      });
  }

  document.getElementById('contact-form').addEventListener('submit', sendEmail);
};


/**
 * Profile Visits
 */
window.onload = async function () {
  try {
    const response = await fetch('https://personal-portfolio-ssmq.onrender.com/api/get-views', {
      mode: 'cors' // Ensure mode is set to 'cors'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    document.getElementById('viewCount').textContent = data.views;
  } catch (error) {
    console.error('Error fetching views:', error);
    if (error.name === 'TypeError') {
      console.error('Likely a CORS error or network issue:', error.message);
    }
  }
}



