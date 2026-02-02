export async function getHello() {
  const res = await fetch("/api/hello");
  return res.json();
}

export async function submitLogin(email, password){
  console.log('/api/login');
  const res = await fetch('/api/login', {
    method:  'POST',
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (res.success === false) {
    let error = await res.json();
    console.log("Login failed: ", error);
    alert(error.message);
    return;
  }

  return res.json();
}

export async function submitRegister(email, password, displayName){
  const res = await fetch('/api/register', {
    method:  'POST',
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({ email, password, displayName })
  });
  return res.json();
}


