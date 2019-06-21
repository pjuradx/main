document.addEventListener('DOMContentLoaded', function() {
  var randomNumber = Math.floor((Math.random() * 221) + 1);
  var randomBackground = randomNumber + ".jpg";
  console.log(randomNumber);

  document.querySelector("div#picture").style.backgroundImage = "url(src/a/" + randomBackground + ")";
  document.querySelector("div.background").style.backgroundImage = "url(src/a/" + randomBackground + ")";
});