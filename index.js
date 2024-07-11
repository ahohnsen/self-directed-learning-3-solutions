// Task 1: Generate an email address

function generateEmail(user) {
  return `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}@example.com`;
}

const newUser = {
  firstName: "Jane",
  lastName: "Doe",
};

const email = generateEmail(newUser);
console.log(email);

// ----------------------------------------------------

// Task 2: Guess the first and last name from the email

function getUserFromEmail(email) {
  if (!email.includes("@")) {
    return null;
  }

  const firstPartofEmail = email.split("@")[0];

  if (!firstPartofEmail.includes(".")) {
    return null;
  }

  const fullname = firstPartofEmail.split(".");

  return {
    firstName: capitalizeFirstLetter(fullname[0]),
    lastName: capitalizeFirstLetter(fullname[1]),
  };

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}

// logs null
console.log(getUserFromEmail("not an email address"));

// logs null
console.log(getUserFromEmail("nodots@example.com"));

// logs { firstName: 'Jane', lastName: 'Doe' }
console.log(getUserFromEmail("jane.doe@example.com"));

// ----------------------------------------------------

// Task 3: Bring it online

const formToGenerateEmail = document.querySelector('[data-js="generate-email-form"]');
const formToGuessName = document.querySelector('[data-js="guess-name-form"]');
const outputGeneratedEmail = document.querySelector('[data-js="generated-email"]');
const outputGuessedName = document.querySelector('[data-js="guessed-name"]');

formToGenerateEmail.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const user = Object.fromEntries(formData);

  outputGeneratedEmail.textContent = generateEmail(user);

  event.target.reset();
});

formToGuessName.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = event.target.elements.email.value;

  const user = getUserFromEmail(email);

  if (user) {
    outputGuessedName.textContent = `${user.firstName} ${user.lastName}`;
  } else {
    outputGuessedName.textContent = "Please enter a valid email address.";
  }

  event.target.reset();
});
