import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';

function App() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const createSubmit = (e) => {
    e.preventDefault();
    const botO = { name, type };
    console.log(botO);
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
              onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
        </Form>
      </div>

      <div className="btn-toolbar" role="toolbar">
        <div className="btn-group mr-2" role="group">
          <select 
            value={type}
            onChange={(e)=> setType(e.target.value)}
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

    </div>

    
  );
}

export default App;
