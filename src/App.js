import React from 'react';
import './App.scss';
import './scss/base/_fonts.scss'
import './scss/base/_globals.scss'
import './scss/_variables.scss'
import './scss/base/_typography.scss'

//import ApiProvider from './components/Contexts/ApiContext';
//import { ApiContext } from './components/Contexts/ApiContext';

import Header from './components/Header/Header'
import Input from './components/Input/Input'
import Content from './components/Content/Content'

const App = () => {
    
    return (
        <div className="App">
            <Header />
            <main>
              <Input />
              <Content  />
            </main>
        </div>
    );
}

export default App;
