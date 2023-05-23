const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const subjectValue = subjectInput.value.trim();
  const messageValue = messageInput.value.trim();

  clearErrors();

  if (!isValidName(nameValue)) {
    showError("name", "Name must be more than 5 characters long.");
    return;
  }

  if (!isValidEmail(emailValue)) {
    showError("email", "Please enter a valid email address.");
    return;
  }

  if (!isValidSubject(subjectValue)) {
    showError("subject", "Subject must be more than 15 characters long.");
    return;
  }

  if (!isValidMessage(messageValue)) {
    showError("message", "Message content must be more than 25 characters long.");
    return;
  }


  successMessage.textContent = "Thank you for your message.";
  successMessage.style.color = "#1C1C1C";
  form.reset();


  console.log("Form submitted successfully!");
});

function isValidName(name) {
  return name.length > 5;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidSubject(subject) {
  return subject.length > 15;
}

function isValidMessage(message) {
  return message.length > 25;
}

function clearErrors() {
  const errorElements = document.getElementsByClassName("error");
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = "";
  }
}

function showError(inputId, errorMessage) {
  const errorElement = document.getElementById(`${inputId}Error`);
  errorElement.textContent = errorMessage;
}

