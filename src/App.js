import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, {useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'

function App() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [isCreate, setCreate] = useState(false);
  const [disable, setDisable] = useState([]);

  const tasks = [
    {
      description: 'do the dishes',
      eta: 1000,
      kie: 0
    },{
      description: 'sweep the house',
      eta: 3000,
      kie: 1
    },{
      description: 'do the laundry',
      eta: 10000,
      kie: 2
    },{
      description: 'take out the recycling',
      eta: 4000,
      kie: 3
    },{
      description: 'make a sammich',
      eta: 7000,
      kie: 4
    },{
      description: 'mow the lawn',
      eta: 20000,
      kie: 5
    },{
      description: 'rake the leaves',
      eta: 18000,
      kie: 6
    },{
      description: 'give the dog a bath',
      eta: 14500,
      kie: 7
    },{
      description: 'bake some cookies',
      eta: 8000,
      kie: 8
    },{
      description: 'wash the car',
      eta: 20000,
      kie: 9
    },
  ];  

  // create object with bot name and bot type
  const createSubmit = (e) => {
    e.preventDefault();
    const clone = [...disable];
        for (var i = 0; i < 10; i++) {
          clone[i] = false;
        }
        setDisable(clone);
    const botO = { name, type };
    console.log(botO);
    // only allow bot to be created if both fields are complete
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
      // set disabled to array of false
      for (var b = 0; b < n; b++) {
        pertask.push(arr[b]);
      }
      // const tempDisable = [];
      // for (var j = 0; j < arr.length; j++) {
      //   tempDisable[j]=false;
      // }
      // setDisable(tempDisable);
      console.log(pertask);
      

    return (
      <ol>
        {pertask.map((ta) => (
          <div>
            <form onSubmit={(e) => DoTask(ta.description, ta.kie, ta.eta, e)}>
              <Card key={ta.kie}>
                <Card.Body>
                  <Card.Title>{ta.description}</Card.Title>
                  <Card.Text>ETA: {ta.eta}ms</Card.Text>
                  <Button type="submit" key={ta.kie} disabled={disable[ta.kie]} size="sm">Do Task</Button>
                </Card.Body>
              </Card>
            </form>
          </div>
        ))}
      </ol>
    );
  }

  function DoTask(desc, kie, eta, e) {
    e.preventDefault();
    console.log(eta);
    //set timeout
      const timer = setTimeout(() => {
        alert(desc+ ' took '+eta+' ms');
        const clone = [...disable];
        clone[kie] = true;
        setDisable(clone);


      }, eta);
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
            defaultValue="Select Type"
            onChange={(e)=> {setType(e.target.value); setCreate(false)}}
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
      <div className="d-flex justify-content-center">
        {isCreate && <h2>You created {name} of type {type}!</h2>}
      </div>
      <div className="d-flex justify-content-center">
        {isCreate && loadTasks(tasks, 5)}
      </div>

    

    </div>

    
  );
}

export default App;
