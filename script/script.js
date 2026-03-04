const loadLessons = async () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())  //promise of json data
        .then((json) => displayLessons(json.data)) //json / data jekono kisho
}

const loadLevelWords = (id) => {
    // console.log(id);
    url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWords(data.data))
}

const displayLevelWords = (words) => {
    // console.log(words);
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = " "; //inner html empty

    words.forEach(word => {
        console.log(word);
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <p>Cat</p>

        `;
        wordContainer.appendChild(cardDiv);
    });
    

}


const displayLessons = (lessons) => {
    // 1. Get the container and empty 
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = " ";
    // 2. get into every lessons 3. create Element 4. append child
    for (let lesson of lessons) {
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
          <button onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary "> <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `
        levelContainer.appendChild(btnDiv);
    }
}

loadLessons();