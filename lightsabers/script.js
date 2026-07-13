let starContainer = document.getElementsByClassName('stars')[0];
let prototype_star = document.getElementById('prototype');
let screen1 = document.getElementsByClassName('screen-1')[0];
let screen2 = document.getElementsByClassName('screen-2')[0];
let screen3 = document.getElementsByClassName('screen-3')[0];
let lightsabers = document.getElementsByClassName('lightsaber');
let blades = document.getElementsByClassName('blade');
let wishesContainer = document.getElementsByClassName('wishes')[0];
let image = document.getElementById('darthvaderimg');
let spinner = document.getElementsByClassName('lds-ripple')[0];
let music = new Audio('music.mp3');
let voice = new Audio('darthvadervoice.mp3');
let breathing = new Audio('breathing.mp3');

function blink() {

  let new_opacity = 0.3;
  let temp;

  const intervalID = setInterval(() => {

    temp = parseFloat(window.getComputedStyle(wishesContainer).getPropertyValue("opacity"));
    wishesContainer.style.opacity = new_opacity.toString();
    new_opacity = temp;

  }, 500);

}

function lightsaber_reveal() {

  setTimeout(() => {
    for (let i = 0; i < lightsabers.length; i++) {

      let lightsaber_sound = new Audio('lightsaber.mp3');

      setTimeout(() => {
        lightsabers[i].style.animation = "fade_in 0.2s ease-in forwards";
      }, (i + 1) * 50);

      setTimeout(() => {

        lightsaber_sound.play();
        blades[i].style.animation = "openBlade 1s forwards";

      }, ((i + 1) ** 2) * 80 + 400);
    }

  }, 1000);

}

window.onload = () => {

  for (let i = 0; i < 1000; i++) {
    let star = prototype_star.cloneNode(true);
    star.style.top = Math.floor(Math.random() * 101).toString() + "%";
    star.style.right = Math.floor(Math.random() * 101).toString() + "%";
    star.style.fontSize = Math.floor(Math.random() * 11).toString() + "px";
    starContainer.appendChild(star);
  }

  spinner.style.animation = "fade_out 1s forwards";

  setTimeout(() => {

    music.play();

    spinner.style.display = "none";
    screen1.style.display = "block";
    screen1.getElementsByTagName('img')[0].style.animation = "logo 12s cubic-bezier(0, 0, .1, .99)";

    starContainer.style.animation = "fade_out 1s linear 12s forwards";

    setTimeout(() => {
      screen1.style.display = "none";
      screen2.style.display = "flex";
      lightsaber_reveal();
      blink();

      setTimeout(() => {
        music.pause();
        voice.play();

        setTimeout(() => {
          breathing.play();
          image.style.animation = "fade_out 20s linear forwards";

          setTimeout(() => {
            breathing.pause();
          }, 23000)
        }, 7500);

        screen2.style.display = "none";
        screen3.style.display = "block";
        image.style.animation = "fade_in 7s linear forwards";
      }, 18000);

    }, 16000);

  }, 3000);

};