import {
  isEmailValid,
  isPassValid,
  inputInvalid,
  inputValid,
  initialInputStyles,
  isTextFieldEmpty,
  url,
  showAlert,
  btnLoading,
  errorHandler,
  fetchHandler,
} from '../util.js';

const signupForm = document.querySelector('.sign-up-form');
const formElements = signupForm.elements;

const name = formElements['name'];
const email = formElements['email'];
const password = formElements['password'];
const confirmPassword = formElements['confirmPassword'];
const btn = formElements['signup-btn'];

name.addEventListener('focus', (e) => {
  if (!isTextFieldEmpty(name.value)) {
    inputInvalid(name);
  } else {
    inputValid(name);
  }
});

name.addEventListener('input', (e) => {
  if (!isTextFieldEmpty(name.value)) {
    inputInvalid(name);
  } else {
    inputValid(name);
  }
});

name.addEventListener('blur', (e) => {
  if (name.value < 1) {
    initialInputStyles(name);
  } else if (!isTextFieldEmpty(name.value)) {
    inputInvalid(name);
  }
});

email?.addEventListener('input', (e) => {
  if (!isEmailValid(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

email?.addEventListener('focus', (e) => {
  if (!isEmailValid(e.target.value) || e.target.value.length === 0) {
    inputInvalid(e.target);
  }
});

email?.addEventListener('blur', (e) => {
  if (e.target.value < 1) {
    initialInputStyles(e.target);
  } else if (!isEmailValid(email.value)) {
    inputInvalid(email);
  }
});

password.addEventListener('focus', (e) => {
  if (!isPassValid(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

password.addEventListener('input', (e) => {
  if (!isPassValid(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

password.addEventListener('blur', (e) => {
  if (e.target.value < 1) {
    initialInputStyles(e.target);
  } else if (!isPassValid(e.target.value)) {
    inputInvalid(e.target.value);
  }
});

confirmPassword.addEventListener('focus', (e) => {
  if (!isPassValid(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

confirmPassword.addEventListener('input', (e) => {
  if (!isPassValid(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

confirmPassword.addEventListener('blur', (e) => {
  if (e.target.value < 1) {
    initialInputStyles(e.target);
  } else if (!isPassValid(e.target.value)) {
    inputInvalid(e.target.value);
  } else {
    inputValid(e.target);
  }
});

// ***** SIGNING UP ******
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const reqBody = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    btnLoading(btn, 'addLoading');
    if (reqBody.password !== reqBody.confirmPassword) {
      alert('Paswords do not match');
      btnLoading(btn, 'removeLoading', 'Sign up');
      return false;
    }

    const res = await fetchHandler('POST', 'auth/signup', null, reqBody);

    if (res.status === 'fail') {
      btnLoading(btn, 'removeLoading', 'Login');
      throw Error(res.message);
    }

    btnLoading(btn, 'removeLoading', 'Login');

    window.localStorage.setItem('token', JSON.stringify(res.token));

    location.assign('/dashboard.html');
  } catch (err) {
    btnLoading(btn, 'removeLoading', 'Login');
    errorHandler(err);
  }
});
