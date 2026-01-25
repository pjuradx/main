// Slideshow
const imagePath = 'assets/';
const len = 33;
const images = Array.from({ length: len }, (_, i) => `side${i + 1}.gif`);

function getSeed() {
	const now = new Date();
	return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

function seededRandom(seed) {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

function getDailyDefaultSlideIndex() {
	const seed = getSeed();
	return Math.floor(seededRandom(seed) * len) + 1;
}

let slideIndex = localStorage.getItem('slideIndex');
const dailyDefaultSlideIndex = getDailyDefaultSlideIndex();

if (!slideIndex) {
	slideIndex = dailyDefaultSlideIndex;
	localStorage.setItem('slideIndex', slideIndex);
} else {
	slideIndex = parseInt(slideIndex, 10);
	const lastAccessedDate = localStorage.getItem('lastAccessedDate');
	const currentDate = new Date().toDateString();
	if (lastAccessedDate !== currentDate) {
		slideIndex = dailyDefaultSlideIndex;
		localStorage.setItem('slideIndex', slideIndex);
	}
}

localStorage.setItem('lastAccessedDate', new Date().toDateString());
const slideshow = document.getElementById('slideshow');
images.forEach((img, i) => {
	slideshow.innerHTML += `<div class="mySlides"><img src="${imagePath}${img}" style="cursor:pointer;" onclick="changeSlide(1)"></div>`;
});

function changeSlide(n) {
	setSlide(slideIndex + n);
}

function setSlide(n) {
	const slides = document.getElementsByClassName("mySlides");
	slideIndex = (n > slides.length) ? 1 : (n < 1) ? slides.length : n;
	[...slides].forEach((s, i) => {
		s.style.opacity = i === slideIndex - 1 ? "1" : "0";
		s.style.transition = "opacity .7s";
	});
	localStorage.setItem('slideIndex', slideIndex);
}

setSlide(slideIndex);

// Weather
const apiKey = 'b06472030c3555d99176b6886a19e55c';
const city = 'Madrid,ES';
let weatherString = '';

async function updateWeather() {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`
		);
		const data = await response.json();

		// Temperature and description
		const temp = Math.round(data.main.temp);
		const desc = data.weather[0].description;

		// Formatting the text
		weatherString = ` | ${temp}°C ${desc.charAt(0).toUpperCase() + desc.slice(1)}`;
	} catch (error) {
		console.error("Error al obtener el clima:", error);
		weatherString = ''; // If error, don't show anything
	}
}
updateWeather();

// Clock
function updateClock() {
	const now = new Date();
	const day = now.toLocaleDateString('en-GB', { weekday: 'long' });
	const dayOfMonth = String(now.getDate()).padStart(2, '0');
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const year = now.getFullYear();
	const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

	// Date, time and weather combined
	const dateString = `${day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()} ${dayOfMonth}-${month}-${year} ${time}${weatherString}`;

	document.getElementById('codes').textContent = dateString;
	setTimeout(updateClock, 1000);
}
updateClock();

// Background Animation with Vanta.js
window.addEventListener('DOMContentLoaded', () => {
	VANTA.TOPOLOGY({
		el: "body",
		minHeight: 200.00,
		minWidth: 200.00,
		scale: 1.00,
		scaleMobile: 1.00,
		color: 0x034732,
		backgroundColor: 0x111111
	});
});
