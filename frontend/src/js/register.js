import { submitRegister } from '../js/api.js'
const register = document.getElementById('register-form');
const submitBtn = document.getElementById('reg-submit-btn');


register.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  let email = formData.get('email'); 
  let password = formData.get('password'); 
  let displayName= formData.get('displayName'); 
  console.log(email);
  console.log(password);
  console.log(displayName);


  const data = await submitRegister(email, password, displayName);

  console.log(data);
  if (!data.success) {
    alert(data.message);
    return;
  }
  window.location.href = "/login"
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