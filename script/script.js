const loadLessons = async () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())  //promise of json data
        .then((json) => displayLessons(json.data)) //json / data jekono kisho
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
          <button class="btn btn-outline btn-primary "> <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `
        levelContainer.appendChild(btnDiv);
    }
}

loadLessons();