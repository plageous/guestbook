document.getElementById("contact-form").onsubmit = () => {
    clearErrors();
    let isValid = true;

    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let email = document.getElementById("email").value.trim();
    let linkedin = document.getElementById("linkedin").value.trim();
    let how_we_met = document.getElementById("meeting").value;
    let mailing_list = document.getElementById("mailing");
    let other = document.getElementById("other-field");

    // first name
    if (!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    // last name
    if (!lname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    // email
    if (!(email.includes("@") && email.includes(".")) && email) {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    // email w/ mailing list
    if (!email && mailing_list.checked) {
        document.getElementById("err-email-mailing").style.display = "block";
        isValid = false;
    }

    // linkedin (hurts my brain)
    if (!(linkedin.startsWith("https://linkedin.com/in/") ||
          linkedin.startsWith("https://www.linkedin.com/in/")) && linkedin) {
        document.getElementById("err-linkedin").style.display = "block";
        isValid = false;
    }

    // how we met
    if (how_we_met == "none") {
        document.getElementById("err-how-we-met").style.display = "block";
        isValid = false;
    }

    if (how_we_met == "other") {
        other.style.display = "block";
    } else {
        other.style.display = "none";
    }

    if (!isValid) {
        window.scrollTo({top: 0, left: 0, behavior:'smooth'});
    }
    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("err")
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}