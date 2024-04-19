//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');      
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}


var themeToggler = document.querySelector(".theme-toggler");
var themeBtn = document.querySelector(".toggle-btn");

themeBtn.onclick = ()=>{
  themeToggler.classList.toggle("active");
};

document.querySelectorAll(".theme-toggler .theme-btn").forEach((btn) => {
  btn.onclick = () => {
    let color = btn.style.background;
    document.querySelector(":root").style.setProperty("--theme-color", color);
  };
});

var swiper = new Swiper(".home-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
   loop:true,
   autoplay:{
    delay: 4000,
    disableOnInteraction:false,
   }
  });


  var swiper = new Swiper(".review-slider", {
    spaceBetween: 10,
    grabCursor: true,
    slidesPerView: 1,
   loop:true,
   breakpoints: {
0: {
  slidesPerView: 1,
},
700: {
  slidesPerView: 2,
},
1050: {
  slidesPerView: 3,
},
   },
   autoplay:{
    delay: 3000,
    disableOnInteraction:false,
   }
  });




  document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll('.toggle-answer');
  
    toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
        const answer = this.parentNode.nextElementSibling;
        answer.classList.toggle('show');
        this.textContent = answer.classList.contains('show') ? '-' : '+';
      });
    });
  });


  // Function to fetch and display events
function fetchAndDisplayEvents() {
  fetch('http://localhost:3000/events')
  .then(response => response.json())
  .then(events => {
    console.log(events)

    if(events === 'Event not added'){
      const eventsContainer = document.getElementById('upcomingEvents');
      eventsContainer.innerHTML = 'No new event added';
    }else{
      const eventsContainer = document.getElementById('upcomingEvents');
      eventsContainer.innerHTML = ''; // Clear previous events
      let eventsHTML = '';
      
      events.forEach(event => {
          // Create HTML elements for each event and add google form link down
          eventsHTML += `
                        <div class="row">
              <div class="image">
                  <img src="image/logo.jpg" alt="">
              </div>
              <div class="content">
                  <h2>TITLE-</h2>
                  <P>${event.title}</P>
                  <h2>DESCIPTION-</h2>
                  <p>${event.description}</p>
                  <h2>VENUE-</h2>
                  <P>${event.venue}</P>
                  <h2>DATE-</h2>
                  <P>${event.date}</P>
                  <a href="#googlelink" class="btn">enroll now</a>
              </div>
          </div>
            `;
      });

      eventsContainer.innerHTML = eventsHTML;
    }
      
  })
  .catch(error => console.error('Error:', error));
}

window.addEventListener('load', fetchAndDisplayEvents);
  


//email attachment
function sendMessage(){
  (function(){
   emailjs.init("tXicwlNSOY0Ywp5wb");    //acount public key
  })();

  var serviceID ="service_g9g08ep";     //email service id
  var templateID ="template_968hjbh";    //email template id

  var params = {
    sendername: document.querySelector("#name").value,
    senderemail: document.querySelector("#email").value,
   subject: document.querySelector("#subject").value,
    message: document.querySelector("#message").value,
  };

  emailjs.send(serviceID , templateID, params)
  .then( res => {
  alert('thankyou, ' + params['sendername'] + '! Your message has been sent.')  
  })
  .catch();
}