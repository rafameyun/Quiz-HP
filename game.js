const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Name the killing curse.',
        choice1: 'Cruciatus',
        choice2: 'Avada Kedavra',
        choice3: 'Imperius',
        choice4: 'Stupefy',
        answer: 2,
    },
    {
        question: 'How would you spell the spell you would use to disarm someone?',
        choice1: 'Expelliarmus',
        choice2: 'Sectumsempra',
        choice3: ' Morsmordre',
        choice4: 'Tarantallegra',
        answer: 1,
    },
    {
        question: 'What spell would you use to light the tip of your wand?',
        choice1: 'Petrificus Totalus',
        choice2: 'Deletrius',
        choice3: 'Rictusempra',
        choice4: 'Lumos',
        answer: 4,
    },
    {
        question: 'What spell would you use to open a door?',
        choice1: 'Incarcarous',
        choice2: 'Confringo',
        choice3: 'Alohomora',
        choice4: 'Densaugeo',
        answer: 3,
    },
    {
        question: 'What spell would you use to get rid of a nasty boggart?',
        choice1: 'Deprimo',
        choice2: 'Riddikulus',
        choice3: 'Sonorus',
        choice4: 'Duro',
        answer: 2,
    },
    {
        question: 'What spell would you use to conjure a patronus?',
        choice1: 'Expulso',
        choice2: 'Aparecium',
        choice3: 'Defodio',
        choice4: 'Expecto Patronum',
        answer: 4,
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question 

    choices.forEach(choice => {
        const number  = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()