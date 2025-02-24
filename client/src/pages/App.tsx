import React from 'react';
import { Header } from '../components/Header';
import { Counter } from '../components/Counter';

function App() {
    return (
        <div role="main" className="h-screen w-screen">
            <Header />
            <Counter />
        </div>
    );
}

export default App;
