`use strict`;
//Register
const registerContainer = document.querySelector(".register-container");
const regNickname = document.querySelector("#name");
const regEmail = document.querySelector("#email");
const regPasswordFirst = document.querySelector("#password-first");
const regPasswordRepeat = document.querySelector("#password-second");
const regSubmitBtn = document.querySelector(".btn.submit-register");
const haveAccountBtn = document.querySelector(".btn.account-have");
//Login
const loggingContainer = document.querySelector(".logging-container");
const login = document.querySelector("#login");
const passwordLogin = document.querySelector("#login-password");
const resetPasswordBtn = document.querySelector(".btn.reset");
const loginSubmit = document.querySelector(".btn.submit-logging");
const resetBtn = document.querySelector(".btn.reset");
//Reset password
const resetPasswordContainer = document.querySelector(
  ".reset-password-container"
);
const changePasswordBtn = document.querySelector(".btn.change");
const loginToReset = document.querySelector("#reset-login");
const resetPassword = document.querySelector("#reset-password");
const resetAgainPassword = document.querySelector("#reset-again");
const comeBackToLoginBtn = document.querySelector(".btn.come-back-log");
//Final message
const finalMessage = document.querySelector(".final-msg");
const finalTitle = document.querySelector(".final-title");
const finalText = document.querySelector(".final-text");
const againBtn = document.querySelector(".btn.again");
let registrated = [];

class User {
  constructor(nickname, email, password) {
    this.nickname = nickname;
    this.email = email;
    this.password = password;
  }

  addNewUser(user) {
    registrated.push(user);
  }
}

const testUser = new User("Kacper", "Kacperito@gmail.com", "Dzik_JTCNW100%");
registrated.push(testUser);

function removeAllClasses(element) {
  element.classList = ``;
}

function showWrong(element, message) {
  const controlContainer = element.parentElement;
  const small = controlContainer.querySelector(".info");

  element.classList.add("wrong");
  small.innerText = `${message}`;
}

function showGood(element, message) {
  const controlContainer = element.parentElement;
  const small = controlContainer.querySelector(".info");

  element.classList.add("good");
  small.innerText = `${message}`;
}

function showPassword(e) {
  if (e.target.classList.contains("eye-on")) {
    e.target.style.display = `none`;
    //
    e.target.nextElementSibling.style.display = "flex";
    //
    e.target.previousElementSibling.type = "text";
  }
}

function vanishPassword(e) {
  if (e.target.classList.contains("eye-off")) {
    e.target.style.display = `none`;
    //
    e.target.previousElementSibling.style.display = "flex";
    //
    e.target.previousElementSibling.previousElementSibling.type = "password";
  }
}

function validateStuff(element, name, min, max) {
  if (element.value.length < min) {
    removeAllClasses(element);
    showWrong(element, `Your ${name} to short, please change it.`);
  } else if (element.value.lenght > max) {
    removeAllClasses(element);
    showWrong(
      element,
      `Damn Dude, your ${name}a little bit too long, please shorten it.`
    );
  } else {
    removeAllClasses(element);
    showGood(element, "");
  }
}

function validateEmail() {
  if (
    regEmail.value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    removeAllClasses(regEmail);
    showGood(regEmail, "");
  } else {
    removeAllClasses(regEmail);
    showWrong(regEmail, "Sorry, your email is invalid, please change it.");
  }
}

function checkPasswords(firstPassword, secondPassword) {
  if (firstPassword.value === secondPassword.value) {
    validateStuff(firstPassword, "Password", 8, 20);
    validateStuff(secondPassword, "Repeated Password", 8, 20);
  } else {
    removeAllClasses(firstPassword);
    removeAllClasses(secondPassword);

    showWrong(firstPassword, "");
    showWrong(secondPassword, "Passwords are not equal");
  }
}

registerContainer.addEventListener("click", showPassword);
registerContainer.addEventListener("click", vanishPassword);

regSubmitBtn.addEventListener("click", () => {
  validateStuff(regNickname, "Nickname", 6, 25);
  validateEmail();
  checkPasswords(regPasswordFirst, regPasswordRepeat);

  if (regNickname.value.trim("") === "") {
    showWrong(regNickname, "This field is empty");
  }
  if (regEmail.value.trim("") === "") {
    showWrong(regEmail, "This field is empty");
  }
  if (regPasswordFirst.value.trim("") === "") {
    showWrong(regPasswordFirst, "This field is empty");
  }
  if (regPasswordRepeat.value.trim("") === "") {
    showWrong(regPasswordRepeat, "This field is empty");
  } else if (
    regNickname.classList.contains("wrong") ||
    regEmail.classList.contains("wrong") ||
    regPasswordFirst.classList.contains("wrong") ||
    regPasswordRepeat.classList.contains("wrong")
  ) {
    return;
  } else {
    const user = new User(
      regNickname.value,
      regEmail.value,
      regPasswordFirst.value
    );

    console.log(user);

    user.addNewUser(user);
    console.log(registrated);

    registerContainer.style.display = `none`;
    loggingContainer.style.display = `flex`;
  }
});

haveAccountBtn.addEventListener("click", () => {
  registerContainer.style.display = `none`;
  loggingContainer.style.display = `flex`;
});

function showFinalMessage(username) {
  loggingContainer.style.display = `none`;
  finalMessage.style.display = `flex`;
  finalTitle.innerText = `Thank you, ${username}`;
  finalText.innerText = `For opening and trying my project, I appreciate it. If you want, you
  can do it again😁`;
}

function loggingIn() {
  let enteredLogin = login.value;
  let enteredPassword = passwordLogin.value;

  registrated.forEach((user) => {
    if (
      enteredLogin === user.nickname ||
      (enteredLogin === user.email && enteredPassword === user.password)
    ) {
      showFinalMessage(user.nickname);
      removeAllClasses(login);
      removeAllClasses(passwordLogin);
    } else {
      if (enteredLogin !== user.nickname) {
        removeAllClasses(login);
        showWrong(login, "Check your login, it might be wrong");
      } else if (enteredPassword !== user.password) {
        removeAllClasses(passwordLogin);
        showWrong(passwordLogin, "Password is wrong, maybe change it?");
      }
    }
  });
}

function openResetForm() {
  loggingContainer.style.display = `none`;
  resetPasswordContainer.style.display = "flex";
}
resetPasswordBtn.addEventListener("click", openResetForm);

function backToLogin() {
  resetPasswordContainer.style.display = `none`;
  loggingContainer.style.display = `flex`;
}

comeBackToLoginBtn.addEventListener("click", backToLogin);

loginSubmit.addEventListener("click", loggingIn);
againBtn.addEventListener("click", () => {
  window.location.reload();
});

function getUser() {
  checkPasswords(resetPassword, resetAgainPassword);
  registrated.forEach((user, i) => {
    if (
      loginToReset.value === user.nickname &&
      resetPassword.value === resetAgainPassword.value &&
      resetPassword.classList.contains("good") &&
      resetAgainPassword.classList.contains("good")
    ) {
      user.password = resetPassword.value;

      registrated.splice(i, 1, user);

      loggingContainer.style.display = `flex`;
      resetPasswordContainer.style.display = "none";

      loginToReset.value = ``;
      resetPassword.value = ``;
      resetAgainPassword.value = ``;

      removeAllClasses(resetPassword);
      removeAllClasses(resetAgainPassword);
    } else {
      console.log("NO");
      console.log(registrated);
    }
  });
}

changePasswordBtn.addEventListener("click", getUser);
