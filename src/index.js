import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/styles.css';

ReactDOM.render(<App />, 
  document.getElementById('root')
);

// https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f
// For changes, commit and push to remote master, then run "npm run deploy" again
