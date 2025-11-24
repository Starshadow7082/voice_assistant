let btn1 = document.querySelector("#btn");
let btn2 = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US"; // Adjusted to more commonly used English variant
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon sir");
    } else {
        speak("Good Evening Sir");
    }
}



window.addEventListener('load', () => {
    wishMe(); // Call the function to wish when the page loads
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    btn2.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn1.addEventListener("click", () => {
    recognition.start();
    btn1.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("how are you")) {
        speak("I am fine, I am a virtual assistant.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("weather in lucknow")) {
        speak("Fetching weather information for Lucknow...");
        getWeatherForCity("Lucknow");
    } else if (message.includes("what is the time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else {
        let finalText = "This is what I found on " + message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}

