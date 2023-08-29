function App() {

    const [state, setState] = React.useState({
        num1: 2,
        num2: 4,
        response: "",
        score: 0,
        incorrect: false,
        operation: '+'
    })

    React.useEffect(() => {
        // Generate a random operator each time num1 or num2 changes
        const operations = ['+', '-', '*', '/'];
        const randomOperation = operations[Math.floor(Math.random() * operations.length)];
        setState((prevState) => ({ ...prevState, operation: randomOperation }));
    }, [state.num1, state.num2]);

    function roundNumber(number, decimals = 9) {
        return Number(number.toFixed(decimals));
    }

    function checkAnswer(event) {
        
        const answer = roundNumber(parseFloat(state.response));
        let correctAnswer;

        switch(state.operation) {
            case '+': correctAnswer = state.num1 + state.num2; break;
            case '-': correctAnswer = state.num1 - state.num2; break;
            case '*': correctAnswer = state.num1 * state.num2; break;
            case '/': correctAnswer = state.num1 / state.num2; break;         
        }

        correctAnswer = roundNumber(correctAnswer);

        if (Math.abs(correctAnswer - answer) < 1e-9) {

        // User got the question right
        setState({
            ...state,
            num1: Math.ceil(Math.random() * 10),
            num2: Math.ceil(Math.random() * 10),
            score: state.score +1,
            response: "",
            incorrect: false,
            
        });

           } else {
            // User got the question wrong
            setState({
                ...state,
                score: state.score - 1,
                response: "",
                incorrect: true
            });

           }
        }
    


    function inputKeyPress(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    }

    function updateResponse(event) {
        setState({
            ...state,
            response: event.target.value
        })
    }

    if (state.score === 10) {
        return (
            <div id="winner">
                You won!
            </div>
        );
    }


    return (
        <div>
            <div className={state.incorrect ? "incorrect" : ""} id="problem">{state.num1} {state.operation} {state.num2}</div>
            <input autoFocus={true} onKeyPress={inputKeyPress} onChange={updateResponse} value={state.response} />
            <button onClick={checkAnswer}>Enter</button>
            <div>Score: {state.score}</div>
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector("#app"));