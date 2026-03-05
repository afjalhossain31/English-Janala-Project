const createElement = (Array) => {
    // console.log(Array);
    const htmlElement = Array.map((el) => `<span class="btn">${el}</span>`);
    console.log(htmlElement.join(" "));
} 

const synonym =["keen", "enthusiastic", "avid", "eager", "passionate", "zealous", "fervent", "ardent", "devoted", "excited"];
createElement(synonym);