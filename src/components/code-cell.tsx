

import {useState } from 'react'
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler/index';


const CodeCell = () =>{
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

export default CodeCell;