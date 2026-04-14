import {register} from "../api/auth.api.js"
const e_register = document.getElementById('register-form');
const submitBtn = document.getElementById('reg-submit-btn');


e_register.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get('email'); 
  const password = formData.get('password'); 
  const displayName= formData.get('displayName'); 

  try {
    await register({email, password, displayName});
    window.location.href = "/login"
  } catch(error) {
    alert(error.message)
  }
});

function checkMatch(){
  const pass = document.getElementById('password');
  const repass = document.getElementById('re-password');

  const message = document.createElement('p');
  message.style.color = "red";
  repass.parentElement.appendChild(message);

  
  if (password === repass && password !== "") {
    message.textContent = "Passwords match";
    message.style.color = "green";
  }
  else {
    message.textContent = "Passwords do not match";
    message.style.color = "red";
  }
}
//password.addEventListener("input", checkMatch);
//rePassword.addEventListener("input", checkMatch);