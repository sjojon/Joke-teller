const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'b31008f9708d43d0a76dd369202d4300',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        //Disable button
        toggleButton();
    } catch (error) {
        console.log('Whoops', error);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);