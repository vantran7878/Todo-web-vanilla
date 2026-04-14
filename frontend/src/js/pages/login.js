import { login } from '../api/auth.api'
const e_login = document.getElementById('login-form');


e_login.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get('email'); 
  const password = formData.get('password'); 

  try {
    const data = await login(email, password);

    localStorage.setItem("token", data.data.token);

    alert("Login success");
    window.location.href = "/"
  } catch (error) {
    alert(error.message);
  }
});