const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

document.getElementById('registerForm').addEventListener('submit', (event) => {
  event.preventDefault();

  console.log("click", document.getElementsByName('username'))

  const username = document.getElementsByName('username')[1].value;
  const email = document.getElementsByName('email')[0].value;
  const password = document.getElementsByName('password')[1].value;

  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'mode': 'no-cors',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username,email, password }),
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    if (data === 'Login successful') {
      // Redirect to the home page upon successful registration
      window.location.href = '/login/admin.html'; // Change '/' to the actual URL of your home page
    } 
  })
  .catch(error => console.error('Error:', error));
});

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementsByName('username')[0].value;
  const password = document.getElementsByName('password')[0].value;

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    if (data === 'Login successful') {
      // Redirect to the home page upon successful registration
      window.location.href = '/login/admin.html'; // Change '/' to the actual URL of your home page
    } 
  })
  .catch(error => console.error('Error:', error));
});
