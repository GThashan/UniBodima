import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { Listings } from './components/Listings';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Categories />
      <Listings />
      <Footer />
    </div>
  );
}

export default App;

