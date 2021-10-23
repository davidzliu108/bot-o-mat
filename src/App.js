import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';

function App() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [isCreate, setCreate] = useState(false);

  const tasks = [
    {
      description: 'do the dishes',
      eta: 1000,
    },{
      description: 'sweep the house',
      eta: 3000,
    },{
      description: 'do the laundry',
      eta: 10000,
    },{
      description: 'take out the recycling',
      eta: 4000,
    },{
      description: 'make a sammich',
      eta: 7000,
    },{
      description: 'mow the lawn',
      eta: 20000,
    },{
      description: 'rake the leaves',
      eta: 18000,
    },{
      description: 'give the dog a bath',
      eta: 14500,
    },{
      description: 'bake some cookies',
      eta: 8000,
    },{
      description: 'wash the car',
      eta: 20000,
    },
  ];  

  const createSubmit = (e) => {
    e.preventDefault();
    const botO = { name, type };
    console.log(botO);
    if (botO.name==='' || botO.type==='') {
      setCreate(false);
      if (botO.name===''&& botO.type==='') alert('Please enter a bot name and select a bot type!');
      if (botO.name===''&& botO.type!=='') alert('Plase enter a bot name!');
      if (botO.name!==''&& botO.type==='') alert('Please select a bot type!');
    } else {
      setCreate(true);
    }
  }

  const loadTasks = (arr, n) => {
    var pertask = [];

    // shuffle array of tasks
    for (var i = arr.length-1; i>0; i--) {
      var j = Math.floor(Math.random()*(i+1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    // add first 5 of shuffled array to displayed array
    for (var b = 0; b < n; b++) {
      pertask.push(arr[b]);
    }
    console.log(pertask);
    return (
      <ol>
        {pertask.map((ta) => (
          <li key={ta.description}>{ta.description}  ETA:{ta.eta}</li>
        ))}
      </ol>
    );
  }

  return (
    <div className="App">
      <header className="d-flex justify-content-center">
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
              onChange={(e) => {setName(e.target.value); setCreate(false)}}/>
          </Form.Group>
        </Form>
      </div>

      <div className="btn-toolbar" role="toolbar">
        <div className="btn-group mr-2" role="group">
          <select 
            value={type}
            onChange={(e)=> {setType(e.target.value); setCreate(false)}}
          >
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
      <div className="d-flex justify-content-center">
        {isCreate && <h2>You created {name} of bot type {type}!</h2>}
      </div>
      <div className="d-flex justify-content-center">
        {isCreate && loadTasks(tasks, 5)}
      </div>

    

    </div>

    
  );
}

export default App;
