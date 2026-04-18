const hamBtn = document.querySelector(".hamburger-btn");


hamBtn.addEventListener('click', () => {
  console.log("trigger button");
  hamBtn.classList.toggle('open');
})
