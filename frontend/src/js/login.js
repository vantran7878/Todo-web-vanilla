import { submitLogin } from '../js/api.js'
const login = document.getElementById('login-form');


login.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  let email = formData.get('email'); 
  let password = formData.get('password'); 
  console.log(email);
  console.log(password);

  //localStorage.setItem('user', JSON.stringify(data.user));

  const data = await submitLogin(email, password);

  console.log(data);
  if (data.success) {
    localStorage.setItem('user', JSON.stringify(data.user));
    alert("Successfully login");
    window.location.href = "/"
  }
  else alert("Login failed");

});