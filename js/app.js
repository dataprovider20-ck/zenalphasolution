document.addEventListener("DOMContentLoaded", function() {
    if (!sessionStorage.getItem("popupShown")) {
        setTimeout(function() {
            var popup = document.getElementById('servicePopup');
            if (popup) {
                popup.style.display = 'flex';
                sessionStorage.setItem("popupShown", "true");
            }
        }, 10000);
    }

    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});

function closePopup() {
    document.getElementById('servicePopup').style.display = 'none';
}

function openPopup() {
    document.getElementById('servicePopup').style.display = 'flex';
}

function handleAjaxForm(event, formId, thankYouId) {
    event.preventDefault();
    var form = document.getElementById(formId);
    var formData = new FormData(form);

    fetch("https://formsubmit.co/ajax/chandrakar@zenalphasolution.com", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        form.style.display = 'none';
        document.getElementById(thankYouId).style.display = 'block';
    })
    .catch(error => {
        alert("Oops! Something went wrong. Please try again later.");
    });
}