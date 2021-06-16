import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="ui pointing menu">
                    <Link className="item" to="/">
                        Home
                    </Link>
                    <Link className="item" to="/otherpage">
                        Another Page 
                    </Link>
                </div>
                <div>
                    <Route exact path="/" component={Fib} />
                    <Route path="/otherpage" component={OtherPage} />
                </div>
            </div>
        </Router>
    );
}

export default App;
