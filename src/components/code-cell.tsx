import {useState, useEffect } from 'react'
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler/index';
import Resizable from './resizable';


const CodeCell = () =>{
    const [code, setCode] = useState('')
    const [err, setErr] = useState('');
    const [input, setInput] = useState('');
  
    useEffect(()=>{
const timer = setTimeout (async () =>{
    const output = await bundle(input);
       setCode(output.code); 
       setErr(output.err);
}, 1000);
return (()=>{
    clearTimeout(timer)
})
    }, [input])




    return (
    <Resizable direction = "vertical">
         <div style={{height: '100%', display:'flex', flexDirection:'row'}}>
       <Resizable direction ="horizontal">
            <CodeEditor initialValue="Type code here" 
        onChange={(value)=> setInput(value)} 
        />
         </Resizable>
       <Preview code={code} err={err}/>
         </div>
         </Resizable>
         );
};

export default CodeCell;