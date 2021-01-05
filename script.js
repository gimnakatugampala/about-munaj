const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
const title = document.getElementById('title');
const wrapper = document.querySelector('.wrapper');
const questionCounter = document.getElementById('questionCounter');
const score = document.getElementById('score');
const loader = document.getElementById('loader');
const container = document.getElementById('container');
const domScore = document.getElementById('dom-score');
const hud = document.getElementById('hud-item');

//CONSTANTS
let scoretext = 0;
const CORRECT_BONUS = 10/2;
const MAX_QUESTIONS = 20;

let shuffleQuestions
let currentQuestionIndex = 0;

document.addEventListener('DOMContentLoaded',() =>{
    setTimeout(() =>{
        loader.classList.add('hide');
        container.classList.remove('hide')
    },2000)
})

startButton.addEventListener('click',startGame);
nextButton.addEventListener('click',() =>{
    currentQuestionIndex++
    questionCounter.innerText = `${currentQuestionIndex}/${MAX_QUESTIONS}`;
    setNextQuestion()
    
})

function startGame(){
    console.log('started');
    startButton.classList.add('hide');
    title.classList.add('hide');
    wrapper.style.display = 'block';
    shuffleQuestions = question.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide');
    questionCounter.innerText = `${currentQuestionIndex}/${MAX_QUESTIONS}`;
    setNextQuestion();
    
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex]);

}

function showQuestion(question){
    questionElement.innerText = question.questions
    question.answers.forEach(answer =>{
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct
        }

        button.addEventListener('click',selectAnswer);
        answerButtonElement.appendChild(button);
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body,correct)
    Array.from(answerButtonElement.children).forEach(button =>{
        setStatusClass(button,button.dataset.correct)
    })

    if(shuffleQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }else{  
            startButton.innerText = 'Finish & Restart';
            domScore.innerText = `Your Score : ${scoretext}`;
            startButton.onclick = function(){
                setTimeout(() =>{
                    loader.classList.remove('hide')
                    container.classList.add('hide');
                    hud.classList.add('hide');
                },1)
                window.location.reload();
                    domScore.innerText = ''
            }
            startButton.classList.remove('hide')
            
            // setTimeout(() =>{
            //     window.location.reload();
            //     domScore.innerText = ''
            // },3000)
    }

}

function setStatusClass(element,correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct')
        incrementScore(CORRECT_BONUS);
         Array.from(answerButtonElement.children).forEach(button =>{
             button.classList.add('disable')
         })
    }else{
        element.classList.add('wrong')
        Array.from(answerButtonElement.children).forEach(button =>{
            button.classList.add('disable')
        })
    }
}

function incrementScore(num){
    scoretext += num;
    score.innerText = scoretext; 
   
};


function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const question = [
    {
        questions:"Where does he hope to be in 10 years?",
        answers:[
            {text:'Starting a Bussiness',correct:false},
            {text:'Place where he could help everyone',correct:true},
            {text:'Getting Married',correct:false},
            {text:'In Another Country',correct:false}
        ]
    },
    {
        questions:"Best gift he ever recieved?",
        answers:[
            {text:'A New Phone',correct:false},
            {text:'An Earphone',correct:true},
            {text:'A Laptop',correct:false},
            {text:'A Bike',correct:false},
        ]
    },
    {
        questions:"His dream job?",
        answers:[
            {text:'COB',correct:false},
            {text:'COO',correct:false},
            {text:'CEO',correct:false},
            {text:'CFO',correct:true}
        ]
    },
    {
        questions:"His current job?",
        answers:[
            {text:'Receptionist',correct:false},
            {text:'Clerk',correct:true},
            {text:'An Acoountant',correct:false},
            {text:'A Student',correct:false}
        ]
    },
    {
        questions:"3 words that describe him?",
        answers:[
            {text:'Simple , Hardworking , Creative',correct:false},
            {text:'Energetic , Flexible , Honest',correct:false},
            {text:'Experienced , Able , Dependable',correct:false},
            {text:'Simple , Classic , Hungry',correct:true}
        ]
    },
    {
        questions:"If he had a superpower what would it be?",
        answers:[
            {text:'Photographic Memory',correct:true},
            {text:'Time Travel',correct:false},
            {text:'Teleportation',correct:false},
            {text:'Super Speed',correct:false}
        ]
    },
    {
        questions:"A schoolmate he lookup to?",
        answers:[
            {text:'Migara',correct:false},
            {text:'Bryan',correct:true},
            {text:'Sandro',correct:false},
            {text:'Roshan',correct:false}
        ]
    },
    {
        questions:"A schoolmate that advice him?",
        answers:[
            {text:'Teran and Akash',correct:false},
            {text:'Sandro and Sahasra',correct:false},
            {text:'Azmi and Roshan',correct:false},
            {text:'Bryan and Migara',correct:true}
        ]
    },
    {
        questions:"A schoolmate that makes him laugh?",
        answers:[
            {text:'Migara',correct:true},
            {text:'Roshan',correct:false},
            {text:'Azmi',correct:false},
            {text:'Akash',correct:false}
        ]
    },
    {
        questions:"A schoolmate that inspire him?",
        answers:[
            {text:'Roshan',correct:false},
            {text:'Migara',correct:false},
            {text:'Bryan',correct:false},
            {text:'Sandro',correct:true},
        ]
    },
    {
        questions:"A famous person he look up to",
        answers:[
            {text:'Cristiano Ronaldo',correct:true},
            {text:'Lionel Messi',correct:false},
            {text:'Neymar',correct:false},
            {text:'Kylian Mbappé',correct:false}
        ]
    },
    {
        questions:"Best advice he ever recieved?",
        answers:[
            {text:'Think before you speak. Read before you think',correct:false},
            {text:'A lecture that drove him to Studying',correct:false},
            {text:'Do not pray for an easy life, pray for the strength to endure a difficult one',correct:true},
            {text:'To handle yourself, use your head; to handle others, use your heart',correct:false}
        ]
    },
    {
        questions:"An industry he is passinate about?",
        answers:[
            {text:'Agriculture & Space',correct:false},
            {text:'Food & Nuclear Energy',correct:false},
            {text:'Science & Technology',correct:false},
            {text:'Finance & Healthcare',correct:true}
        ]
    },
    {
        questions:"A moment that changed his life?",
        answers:[
            {text:'First heartbreak',correct:false},
            {text:'Getting a Job',correct:true},
            {text:'Stepping into his parents’ childhood',correct:false},
            {text:'Read a Great Book',correct:false}
        ]
    },
    {
        questions:"His proudest momet?",
        answers:[
            {text:'Paid All Family Expenses',correct:false},
            {text:'Took his family to on a Trip',correct:false},
            {text:"Able to buy a cake for mother's bday by his own money",correct:true},
            {text:'Getting a Job',correct:false}
        ]
    },
    {
        questions:"Best mentors he ever had?",
        answers:[
            {text:'His Father & Kapila Sir',correct:true},
            {text:'His Mother & Father',correct:false},
            {text:'Sajjid & Ahammad',correct:false},
            {text:'Maneesha Teacher & His Mother',correct:false}
        ]
    },
    {
        questions:"A person he can't live without ?",
        answers:[
            {text:'Brother',correct:false},
            {text:'Father',correct:false},
            {text:'Himself',correct:true},
            {text:'Mother',correct:false}
        ]
    },
    {
        questions:"A bad habbits he still have?",
        answers:[
            {text:'Swearing & Watching reality TV',correct:false},
            {text:'Anger & Overthinking',correct:true},
            {text:'Fast food & Alcohol',correct:false},
            {text:'Smoking & Biting your fingernails',correct:false}
        ]
    },
    {
        questions:"A good habbits he still have?",
        answers:[
            {text:'Giving anything to everyone without judging anyone',correct:true},
            {text:'Good Discipline',correct:false},
            {text:'Eat a healthy diet',correct:false},
            {text:'Never give up',correct:false}
        ]
    },
    {
        questions:"One thing that he has that others don't have?",
        answers:[
            {text:'Good Health',correct:false},
            {text:'Well discipline',correct:false},
            {text:'Mindset',correct:true},
            {text:'Never Give Up',correct:false}
        ]
    },
]
