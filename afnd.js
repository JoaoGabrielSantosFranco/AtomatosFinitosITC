class AFND {
  constructor(transitions, startState, acceptStates) {
    this.transitions = transitions;
    this.startState = startState;
    this.acceptStates = acceptStates;
  }

  execute(input) {
    let currentStates = new Set([this.startState]);

    for (let symbol of input) {
      const nextStates = new Set();

      for (let state of currentStates) {
        const transitions = this.transitions[state] || {};
        const symbolTransitions = transitions[symbol] || [];

        for (let nextState of symbolTransitions) {
          nextStates.add(nextState);
        }
      }

      currentStates = nextStates;
    }

    for (let state of currentStates) {
      if (this.acceptStates.includes(state)) {
        return 'ACEITA';
      }
    }

    return 'RECUSA';
  }
}

const transitions = {
  q0: { '0': ['q0'], '1': ['q0', 'q1'] },
  q1: { '0': ['q2'], '1': ['q2'] },
  q2: { '0': ['q2'], '1': ['q2'] }
};

const startState = 'q0';
const acceptStates = ['q2'];

const afnd = new AFND(transitions, startState, acceptStates);

function solicitarCadeias() {
  const numInputs = parseInt(document.getElementById('num-inputs').value);
  const inputList = document.getElementById('input-list');

  inputList.innerHTML = '';

  for (let i = 0; i < numInputs; i++) {
    const listItem = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Cadeia de entrada ${i + 1}`;
    listItem.appendChild(input);
    inputList.appendChild(listItem);
  }

  document.getElementById('input-form').style.display = 'none';
  document.getElementById('inputs-container').style.display = 'block';
}

function executarAFND() {
  const inputElements = document.querySelectorAll('#input-list input');
  const resultList = document.getElementById('result-list');

  resultList.innerHTML = '';

  for (let inputElement of inputElements) {
    const input = inputElement.value;
    const result = afnd.execute(input);
    const listItem = document.createElement('li');
    listItem.textContent = `Entrada '${input}': ${result}`;
    resultList.appendChild(listItem);
  }

  document.getElementById('inputs-container').style.display = 'none';
  document.getElementById('results-container').style.display = 'block';
}
