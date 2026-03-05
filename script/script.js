// create element for synonym / synonym er jonno element create korar jonno function
const createElement = (Array) => {
    // console.log(Array);
    const htmlElement = Array.map((el) => `<span class="btn">${el}</span>`);
    return(htmlElement.join(" "));
} 

const manageSpinner =(status) => {
    if(status === true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("word-container").classList.add("hidden");
        document.getElementById("spinner").classList.remove("hidden");
    }
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())  //promise of json data
        .then((json) => displayLessons(json.data)) //json / data jekono kisho
}

// load level words and active button / remove active class from all
const loadLevelWords = (id) => {
   manageSpinner(true);
    // console.log(id); //Dynamic id 
    url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();// remove active class from all buttons
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            // console.log(clickBtn);
            clickBtn.classList.add("btn-active"); // add active class to the clicked button
            displayLevelWords(data.data)
        })
}

// remove active class from all buttons
const removeActive = () => {
    const lessonButton = document.querySelectorAll(".lesson-btn");
    // lessonButton.forEach((btn) => btn.classList.remove("btn-active")); //shortcut
    lessonButton.forEach(btn => {
        btn.classList.remove("btn-active");
    });
}



// load word details / then bade async use korlam
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    // console.log(details);
    displayWordDetail(details.data);

}
const displayWordDetail = (word) => {
    console.log(word);
    const detailBox = document.getElementById("details-container");
    // detailBox.innerHTML = " hi i am from js";
    detailBox.innerHTML = `
    
     <div class="">
                    <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
                </div>
                <div class="font-bold">Meaning</div>
                <p>${word.meaning}</p>

                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>

                <div class="">
                    <h2 class="font-bold">Synonym</h2>
                    <div class="flex gap-2 flex-wrap">
                        ${createElement(word.synonyms)}
                    </div>
                </div>

    `;

    document.getElementById("word_modal").showModal();

}



const displayLevelWords = (words) => {
    // console.log(words);
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = " "; //inner html empty

    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl space-y-6 font-bangla py-10 px-5">

        <img src="./assets/alert-error.png" class="w-20 mx-auto" alt="">

            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>

        `;
        manageSpinner(false);
        return;
    }

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
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4 flex flex-col justify-between h-full">
            <div class="space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold ">Meaning / Pronunciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "প্রনুন্সিয়েশন পাওয়া যায়নি"}"</div>
            </div>
            <div class="flex justify-between items-center">

            <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>

        `;
        wordContainer.appendChild(cardDiv);
    });
    manageSpinner(false);
    
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
          <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"> <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>

        `;
        levelContainer.appendChild(btnDiv);
    }
}

loadLessons();