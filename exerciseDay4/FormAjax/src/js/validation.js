// const { renderDayOfMonth } = require("./index")

const submitBtn = document.getElementById('submit-btn');
const refreshBtn = document.getElementById('refresh-btn');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const datetimeContent = document.getElementById('datetime-btn-content');

const usernameWarning = document.getElementById('username-warning');
const passwordWarning = document.getElementById('password-warning');
const emailWarning = document.getElementById('email-warning');

const resetWarning = () => {
  usernameWarning.classList.remove("active");
  passwordWarning.classList.remove("active");
  emailWarning.classList.remove("active");
}

const handleRefresh = (e) => {
  usernameInput.value = '';
  passwordInput.value = '';
  emailInput.value = '';

  resetWarning(new Date());
}


const mailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
const checkNamePassRegex = /^[a-z0-9_-]{8,30}$/

const handleSubmit = (e) => {
  const nameTest = usernameInput.value.length >= 8;
  const passTest = passwordInput.value.length >= 8;
  const mailTest = mailRegex.test(emailInput.value);
  const dateArg = datetimeContent.value.split('/')
  const dateSubmited = new Date(dateArg[2], dateArg[1], dateArg[0]);

  if (!nameTest) {
    usernameWarning.innerText = "Username length min 8 letter";
    usernameWarning.classList.add('active');
    return;
  }
  if (!passTest) {
    passwordWarning.innerHTML = "Password length min 8 letter";
    passwordWarning.classList.add('active');
    return;
  }
  if (!mailTest) {
    emailWarning.innerHTML = "Email wrong format";
    emailWarning.classList.add('active');
    return;
  }

  alert("Submit success");
}

refreshBtn.addEventListener("click", handleRefresh);
submitBtn.addEventListener("click", handleSubmit);