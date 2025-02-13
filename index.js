let totalTasks = 5;
let currentTask = 0;
let data = [];

const answered = () => {
    data[currentTask].isCorrect = +document.getElementById('result').value === +data[currentTask].result;
    currentTask++;
    if (currentTask === totalTasks) {
        let correctAnswers = data.filter((task) => task.isCorrect).length;
        currentTask = 0;
        // totalTasks = totalTasks - correctAnswers
        data = data.filter((task) => !task.isCorrect);
        if (data.length === 0) {
            alert('БРАВО! Всички отговори са правилни!');
            localStorage.clear();
            location.reload();
            return;
        } else {
            alert(`Правилни отговори ${correctAnswers} от ${totalTasks}`);
            totalTasks = totalTasks - correctAnswers
        }
    }
    localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('currentTask', JSON.stringify(currentTask));
    localStorage.setItem('totalTasks', JSON.stringify(totalTasks));
    proceed();
}

const division = () => {
    const firstNumberLength = Math.floor(Math.random() * 2) + 1;
    const secondNumberLength = 1;

    let firstNum = '';
    for (let index = 0; index < firstNumberLength; index++) {
        let allowZero = index === 0 ? 1 : 0;
        let newNum = rndNum(allowZero);
        firstNum += newNum;
    }

    let secondNum = '';
    for (let index = 0; index < secondNumberLength; index++) {
        let allowZero = index === 0 ? 1 : 0;
        let newNum = rndNum(allowZero);
        secondNum += newNum;
    }

    if (+firstNum < +secondNum) {
        const temp = firstNum;
        firstNum = secondNum;
        secondNum = temp;
    }

    const result = +firstNum * +secondNum;

    data.push({
        firstNum: result,
        action: '/',
        secondNum,
        equal: '=',
        result: firstNum
    })

    console.log(`${result} / ${secondNum} = ${+firstNum}`);
}

const multiplication = () => {
    const firstNumberLength = Math.floor(Math.random() * 2) + 1;
    const secondNumberLength = 1;

    let firstNum = '';
    for (let index = 0; index < firstNumberLength; index++) {
        let allowZero = index === 0 ? 1 : 0;
        let newNum = rndNum(allowZero);
        firstNum += newNum;
    }

    let secondNum = '';
    for (let index = 0; index < secondNumberLength; index++) {
        let allowZero = index === 0 ? 1 : 0;
        let newNum = rndNum(allowZero);
        secondNum += newNum;
    }

    data.push({
        firstNum,
        action: 'x',
        secondNum,
        equal: '=',
        result: +firstNum * +secondNum
    })

    console.log(`${firstNum} x ${secondNum} = ${+firstNum * +secondNum}`);
}

const substraction = () => {
    const firstNumberLength = Math.floor(Math.random() * 3) + 1;
    const secondNumberLength = Math.floor(Math.random() * 3) + 1;

    let firstNum = '';
    for (let index = 0; index < firstNumberLength; index++) {
        let allowZero = index === 0 ? 1 : 0;
        let newNum = rndNum(allowZero);
        firstNum += newNum;
    }

    let secondNum = '';
    for (let index = 0; index < secondNumberLength; index++) {
        let allowZero = index === 0 ? 1 : 0;
        let newNum = rndNum(allowZero);
        secondNum += newNum;
    }

    if (+firstNum < +secondNum) {
        const temp = firstNum;
        firstNum = secondNum;
        secondNum = temp;
    }

    data.push({
        firstNum,
        action: '-',
        secondNum,
        equal: '=',
        result: +firstNum - +secondNum
    })

    console.log(`${firstNum} - ${secondNum} = ${+firstNum - +secondNum} `);
}

const addition = () => {
    const firstNumberLength = Math.floor(Math.random() * 3) + 1;
    const secondNumberLength = Math.floor(Math.random() * 3) + 1;

    let firstNum = '';
    for (let index = 0; index < firstNumberLength; index++) {
        let allowZero = index === 0 ? 1 : 0;
        let newNum = rndNum(allowZero);
        firstNum += newNum;
    }

    let secondNum = '';
    for (let index = 0; index < secondNumberLength; index++) {
        let allowZero = index === 0 ? 1 : 0;
        let newNum = rndNum(allowZero);
        secondNum += newNum;
    }

    data.push({
        firstNum,
        action: '+',
        secondNum,
        equal: '=',
        result: +firstNum + +secondNum
    })
    console.log(`${firstNum} + ${secondNum} = ${+firstNum + +secondNum} `);
}

const rndNum = (allowZero = 1) => {
    return Math.floor(Math.random() * (10 - allowZero)) + allowZero;
}

const proceed = () => {
    const firestNum = document.getElementById('first-num').innerHTML = data[currentTask].firstNum;
    const action = document.getElementById('action').innerHTML = data[currentTask].action;
    const secondNum = document.getElementById('second-num').innerHTML = data[currentTask].secondNum;
    const equal = document.getElementById('equals').innerHTML = '=';
    const result = document.getElementById('result').value = ''//data[currentTask].result;
    document.getElementById('current').innerHTML = `${+currentTask + 1}/${totalTasks}`;
    document.getElementById('button').style.pointerEvents = 'none';
    document.getElementById('button').style.opacity = 0.5;
}

const checkInput = () => {
    if (document.getElementById('result').value === '') {
        document.getElementById('button').style.pointerEvents = 'none';
        document.getElementById('button').style.opacity = 0.5;
    }
    document.getElementById('button').style.pointerEvents = 'auto';
    document.getElementById('button').style.opacity = 1;
}

(() => {
    if (localStorage.getItem('data')) {
        data = JSON.parse(localStorage.getItem('data'));
        currentTask = JSON.parse(localStorage.getItem('currentTask'));
        totalTasks = JSON.parse(localStorage.getItem('totalTasks'));
    } else {
        for (let index = 0; index < totalTasks; index++) {
            const randomActionType = Math.floor(Math.random() * 4);
            switch (randomActionType) {
                case 0:
                    addition();
                    break;
                case 1:
                    substraction();
                    break;
                case 2:
                    multiplication();
                    break;
                case 3:
                    division();
                    break;
                default:
                    break;
            }
        }

        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('currentTask', JSON.stringify(currentTask));
        localStorage.setItem('totalTasks', JSON.stringify(totalTasks));
    }
    console.table(data);
    proceed();
})();
