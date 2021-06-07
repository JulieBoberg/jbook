import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import CodeCell from './components/code-cell';



const App = () =>{
    

    return (
    <div className="editor-wrapper">
        <CodeCell />
         </div>
         );
};

ReactDOM.render(
    <App />, document.querySelector('#root')
)