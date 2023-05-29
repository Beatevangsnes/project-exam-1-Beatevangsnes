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

  const errors = [];

  if (!isValidName(nameValue)) {
    errors.push({ inputId: "name", errorMessage: "Name must be more than 5 characters long." });
  }

  if (!isValidEmail(emailValue)) {
    errors.push({ inputId: "email", errorMessage: "Please enter a valid email address." });
  }

  if (!isValidSubject(subjectValue)) {
    errors.push({ inputId: "subject", errorMessage: "Subject must be more than 15 characters long." });
  }

  if (!isValidMessage(messageValue)) {
    errors.push({ inputId: "message", errorMessage: "Message content must be more than 25 characters long." });
  }

  if (errors.length > 0) {
    errors.forEach((error) => {
      showError(error.inputId, error.errorMessage);
    });
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
