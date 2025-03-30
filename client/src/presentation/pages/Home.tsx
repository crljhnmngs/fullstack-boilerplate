import { Counter } from '../components/Counter';
import { Header } from '../components/Header';

function Home() {
    return (
        <div className="h-screen w-screen">
            <Header />
            <Counter />
        </div>
    );
}

export default Home;
