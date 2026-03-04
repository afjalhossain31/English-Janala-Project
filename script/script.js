const loadLessons = async () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())  //promise of json data
        .then((json) => displayLessons(json.data)) //json / data jekono kisho
}

const loadLevelWords = (id) => {
    // console.log(id); //Dynamic id 
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

    // {
    //     "id":54,
    //     "word":"Eager",
    //     "meaning":"আগ্রহী",
    //     "pronunciation":"ইগার",
    //     "level_no":1
    // }

    words.forEach(word => {
        console.log(word);
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold ">Meaning / Pronunciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>

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