const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("wordsound");
const btn = document.getElementById("search_btn");

btn.addEventListener("click", ()=>{
    let input = document.getElementById("input").value;
    fetch(`${url}${input}`)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        result.innerHTML=`
             <div class="word">
                <h3>${input}</h3>
                <button onclick="playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p class="wordmeaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="example">
               ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;
            // sound.setAttribute("src",`https:${data[0].phonetics[0].audio}`);

            const audioUrl = data[0].phonetics.find(p => p.audio)?.audio;
            if (audioUrl) {
                sound.setAttribute("src", audioUrl);
            } else {
                sound.removeAttribute("src");
                alert("Audio not available for this word.");
            }
        })
        .catch(() => {
          result.innerHTML = `<h2 class="error">Oops!Couldn't find the word</h2>`
    });
});
function playSound() {
    if (sound.getAttribute("src")) {
        sound.play();
    } else {
        alert("No audio available to play.");
    }
}
