import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Catalog } from './components/Catalog';
import { OrderForm } from './components/OrderForm';
import { Footer } from './components/Footer';

function App() {
    return (
        <main className="min-h-screen bg-background font-sans selection:bg-primary selection:text-dark">
            <Hero />
            <Philosophy />
            <Catalog />
            <OrderForm />
            <Footer />
        </main>
    );
}

export default App;
