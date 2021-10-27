import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { Card, Spinner, Form, Button } from 'react-bootstrap';

function App() {
  // set bot name
  const [name, setName] = useState('');
  // set bot type
  const [type, setType] = useState('');

  // If isCreate is true, bot can be created. If false, it cannot be created
  // controls exclamation of bot name and bot type created
  // controls the display of task cards. If true, cards are displayed. If false, cards are not displayed.
  const [isCreate, setCreate] = useState(false);

  // array of booleans. If true, task card is displayed. If false, it is not displayed.
  const [disable, setDisable] = useState([]);

  // array of tasks displayed. 
  const [pertask, setPertask] = useState([]);

  // controls the task progress animation and statement
  // also disables all buttons when one task is in progress
  const [doingTask, setDoingTask] = useState(false);

  // store the task description so that it can be displayed while the task is in progress
  const [tasque, setTasque] = useState('');

  const tasks = [
    {
      description: 'do the dishes',
      eta: 1000,
      kie: 0
    }, {
      description: 'sweep the house',
      eta: 3000,
      kie: 1
    }, {
      description: 'do the laundry',
      eta: 10000,
      kie: 2
    }, {
      description: 'take out the recycling',
      eta: 4000,
      kie: 3
    }, {
      description: 'make a sammich',
      eta: 7000,
      kie: 4
    }, {
      description: 'mow the lawn',
      eta: 20000,
      kie: 5
    }, {
      description: 'rake the leaves',
      eta: 18000,
      kie: 6
    }, {
      description: 'give the dog a bath',
      eta: 14500,
      kie: 7
    }, {
      description: 'bake some cookies',
      eta: 8000,
      kie: 8
    }, {
      description: 'wash the car',
      eta: 20000,
      kie: 9
    },
  ];

  // create object with bot name and bot type
  const botO = { name, type };

  // triggers after create button is clicked
  const createSubmit = (e) => {
    e.preventDefault();
    // setting every element in the disable array to true
    const clone = [...disable];
    for (var i = 0; i < 10; i++) {
      clone[i] = true;
    }
    setDisable(clone);
    console.log(botO);
    // only allow bot to be created if both fields are complete
    if (botO.name === '' || botO.type === '') {
      setCreate(false);
      if (botO.name === '' && botO.type === '') alert('Please enter a bot name and select a bot type!');
      if (botO.name === '' && botO.type !== '') alert('Plase enter a bot name!');
      if (botO.name !== '' && botO.type === '') alert('Please select a bot type!');
    } else {
      setCreate(true);
    }
  }

  // takes in the original task array with 10 tasks and n=5
  // handles creating new task array to be displayed with 5 random tasks
  const loadTasks = (arr, n) => {
    console.log("call loadtask");
    var ptask = [];
    // shuffle original array of tasks
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    // add first 5 of shuffled array to displayed array
    for (var b = 0; b < n; b++) {
      ptask.push(arr[b]);
    }
    setPertask(ptask);
    console.log(pertask);
  }

  // triggers after Do Task button is clicked, removes the task card after the duration of the eta
  function DoTask(desc, kie, eta, e) {
    e.preventDefault();
    console.log(eta);
    // handles the strenghts and weaknesses for each bot type and stores the new modified eta into modEta
    var modEta = eta;
    if (botO.type === 'Unipedal') {
      if (desc === 'do the dishes') modEta = eta - 1000;
      if (desc === 'give the dog a bath') modEta = eta + 1000;
    }
    if (botO.type === 'Bipedal') {
      if (desc === 'sweep the house') modEta = eta - 1000;
      if (desc === 'bake some cookies') modEta = eta + 1000;
    }
    if (botO.type === 'Quadrupedal') {
      if (desc === 'mow the lawn') modEta = eta - 1000;
      if (desc === 'wash the car') modEta = eta + 1000;
    }
    if (botO.type === 'Arachnid') {
      if (desc === 'wash the car') modEta = eta - 1000;
      if (desc === 'do the dishes') modEta = eta + 1000;
    }
    if (botO.type === 'Radial') {
      if (desc === 'make a sammich') modEta = eta - 1000;
      if (desc === 'sweep the house') modEta = eta + 1000;
    }
    if (botO.type === 'Aeronautical') {
      if (desc === 'take out the recycling') modEta = eta - 1000;
      if (desc === 'do the dishes') modEta = eta + 1000;
    }

    setTasque(desc);
    setDoingTask(true);
    // sets disable to false for the task done after the duration of modEta
    const timer = setTimeout(() => {
      alert(desc + ' took ' + modEta / 1000 + ' seconds');
      const clone = [...disable];
      clone[kie] = false;
      setDisable(clone);
      setDoingTask(false);
    }, modEta);
  }

  // call loadTasks if isCreate is true
  useEffect(() => {
    loadTasks(tasks, 5);
  }, [isCreate])


  return (
    <div className="App container">
      <header className="text-center">
        <img style={{ width: '90px' }} src="/robotEmoji.png" alt="Robot" />
        <h1>
          BOT-O-MAT
        </h1>
      </header>

      <div>
        <Form>
          <Form.Group className="mb-3" controlId="botName">
            <Form.Label className="h2">Create Your Bot!</Form.Label>
            <Form.Control
              name="botname"
              type="text"
              placeholder="Bot Name"
              size="lg"
              required
              value={name}
              onChange={(e) => { setName(e.target.value); setCreate(false) }} />
          </Form.Group>
        </Form>
      </div>

      <div className="btn-toolbar" role="toolbar">
        <div className="btn-group mr-2" role="group">
          <select
            defaultValue="Select Type"
            onChange={(e) => { setType(e.target.value); setCreate(false) }}
          >
            <option value="Select Type" disabled>Select Type</option>
            <option value="Unipedal">Unipedal</option>
            <option value="Bipedal">Bipedal</option>
            <option value="Quadrupedal">Quadrupedal</option>
            <option value="Arachnid">Arachnid</option>
            <option value="Radial">Radial</option>
            <option value="Aeronautical">Aeronautical</option>
          </select>
        </div>
        <div className="btn-group mr-2" role="group" aria-label="second group">
          <div className="d-grip gap-2">
            <Button onClick={createSubmit} variant="primary" size="lg">
              Create!
            </Button>
          </div>
        </div>
      </div>
      <hr />
      <p><b>Bot Type Information:</b> <i>(<b className="text-success">Strength:</b> -1 second, <b className="text-danger">Weakness:</b> +1 second) </i></p>
      <li><b>Unipedal:</b> <b className="text-success">Strength:</b> do the dishes, <b className="text-danger">Weakness: </b>give the dog a bath</li>
      <li><b>Bipedal:</b> <b className="text-success">Strength:</b> sweep the house, <b className="text-danger">Weakness: </b> bake some cookies</li>
      <li><b>Quadrupedal:</b> <b className="text-success">Strength:</b> mow the lawn, <b className="text-danger">Weakness: </b> wash the car</li>
      <li><b>Arachnid:</b> <b className="text-success">Strength:</b> wash the car, <b className="text-danger">Weakness: </b> do the dishes</li>
      <li><b>Radial:</b> <b className="text-success">Strength:</b> make a sammich, <b className="text-danger">Weakness: </b> sweep the house</li>
      <li><b>Aeronautical:</b> <b className="text-success">Strength:</b> take out the recycling, <b className="text-danger">Weakness: </b> do the dishes</li>
      <hr />
      <div className="d-flex justify-content-center">
        {isCreate && <h2>You created {name} of type {type}!</h2>} </div>
        {doingTask && <div className="text-center" style={{ 'marginTop': '1rem', 'marginBottom': '1rem' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <br />
        <p>Task {tasque} in progress</p>
      </div>}
      <div className="d-flex justify-content-center">
        {(isCreate === false) ? <></> :
          <ol>
            {pertask.map((ta) => (
              <div key={ta.kie}>
                <form onSubmit={(e) => DoTask(ta.description, ta.kie, ta.eta, e)}>
                  {disable[ta.kie] &&
                    <Card>
                      <Card.Body>
                        <Card.Title>{ta.description}</Card.Title>
                        <Card.Text>ETA: {ta.eta / 1000} seconds</Card.Text>
                        <Button type="submit" disabled={doingTask} size="sm">Do Task</Button>
                      </Card.Body>
                    </Card>}
                </form>
              </div>
            ))}
          </ol>}
      </div>
    </div>

  );
}

export default App;
