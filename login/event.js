document.getElementById('eventForm').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const title = document.getElementsByName('title')[0].value;
    const description = document.getElementsByName('description')[0].value;
    const venue = document.getElementsByName('venue')[0].value;
    const date = document.getElementsByName('date')[0].value;
    const time = document.getElementsByName('time')[0].value;
  
    console.log(title, description, venue, date, time)
  
    fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, venue, date, time }),
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      if (data === 'Event Added successfully') {
        // Redirect to the home page upon successful registration
        window.location.href = '/login/admin.html'; // Change '/' to the actual URL of your home page
      } 
    })
    .catch(error => console.error('Error:', error));
  });
