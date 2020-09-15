import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import NoteApp from './components/NoteApp';

// const App = (props) => {
//   const [count, setCount] = useState(props.count);
//   const [text, setText] = useState('');

//   useEffect(() => {
//     console.log('This should only run once!');
//   }, []);

//   useEffect(() => {
//     console.log('useEffect ran');
//     document.title = count;
//   }, [count]);

//   return (
//     <div>
//       <p>
//         The current {text || 'count'} is {count}.
//       </p>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <button onClick={() => setCount(0)}>reset</button>
//       <button onClick={() => setCount(count - 1)}>-1</button>

//       <input
//         type="text"
//         value={text}
//         onChange={(e) => {
//           setText(e.target.value);
//         }}
//       />
//     </div>
//   );
// };

// App.defaultProps = {
//   count: 0,
// };

ReactDOM.render(
  <React.StrictMode>
    <NoteApp />
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
