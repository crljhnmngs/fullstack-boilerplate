import { Header } from '../components/Header';
import { Counter } from '../components/Counter';

function Home() {
    return (
        <div className="h-screen w-screen">
            <Header />
            <Counter />
        </div>
    );
}

export default Home;
