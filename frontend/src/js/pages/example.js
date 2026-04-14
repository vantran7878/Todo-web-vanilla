import { getHello } from './api.js';

const btn = document.getElementById('btn');
const result = document.getElementById('result');

//btn.addEventListener('click', async () => {
//  const res = await fetch("/api/hello");
//  console.log(res);
//  const data = await res.json();
//  result.textContent = data.message;
//})

btn.addEventListener('click', async () => {
  const data = await getHello();
  result.textContent = data.message;
})