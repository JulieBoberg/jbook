import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import {useState } from 'react'
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import bundle from './bundler/index';


const App = () =>{
    const [code, setCode] = useState('')
    const [input, setInput] = useState('');
  
    const onClick = async () =>{
      const output = await bundle(input);
         setCode(output); 
    };


    return (
    <div className="editor-wrapper">
        <CodeEditor initialValue="Type code here" 
        onChange={(value)=> setInput(value)} 
        />
      
        <div>
            <button onClick = {onClick}>
                Submit
            </button>
        </div>
        
       <Preview code={code}/>
         </div>
         );
};

ReactDOM.render(
    <App />, document.querySelector('#root')
)