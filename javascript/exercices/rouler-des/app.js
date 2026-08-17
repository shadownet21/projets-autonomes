let roll = document.querySelector(".dice");
let score = [0, 0]; // index 0 = User, index 1 = Comp
let resetBtn = document.querySelector(".resetBtn");
let reset = document.querySelector(".reset");


roll.addEventListener("click", () => {

    resetBtn.style.display = "none";
    reset.style.display = "none";


    let chiffreUser = Math.ceil(Math.random()*6);
    let chiffreComp = Math.ceil(Math.random()*6);

    let resultUser = document.querySelector(".resultUser");
    let resultComp = document.querySelector(".resultComp");
    resultUser.textContent = chiffreUser;
    resultComp.textContent = chiffreComp;
    
    if(chiffreUser > chiffreComp){
        score[0]++;
        let resMessage = "1 point à User";
        updateScore(resMessage);
        
    } else if (chiffreUser < chiffreComp){
        score[1]++;
        let resMessage = "1 point à l'Ordi";
        updateScore(resMessage);

    } else {
        let resMessage = "Résultat Nul";
        updateScore(resMessage);
    }

    if(score[0] === 3 || score[1] === 3){
        // roll.remove();
        roll.classList.remove("dice");

         resetBtn.style.display = "block";
         reset.style.display = "block";

       
   
        resetBtn.addEventListener("click", () =>{
             
            resultUser.textContent = "0";
            resultComp.textContent = "0";
            roll.classList.add("dice");

            let userScore = document.querySelector(".userScore");
            let compScore = document.querySelector(".compScore");
            
            userScore.innerHTML = "0";
            compScore.innerHTML = "0";

            let message = document.querySelector(".message");
            message.textContent = "";

        })
    
    }

    if(score[0] === 3){
        //user gagne
        let gagnant = document.querySelector(".gagnant");
        gagnant.textContent = "Vous avez Gagné !!";
    } else if (score[1] === 3){
        let gagnant = document.querySelector(".gagnant");
        gagnant.textContent = "L'ordi a Gagné !!";
    }

})

function updateScore(param){
        let message = document.querySelector(".message");
        message.textContent = param;
        let userScore = document.querySelector(".userScore")
        let compScore = document.querySelector(".compScore");
        userScore.textContent = score[0];
        compScore.textContent = score[1];
}
