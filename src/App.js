import './App.css';
import './reset.css';
import Header from './shared/Header/header';
import Nav from './shared/Nav/Nav';
import Footer from './shared/Footer/Footer';
import { Outlet } from "react-router-dom";
import { SearchProvider } from './components/SearchContext/SearchContext';


function App() {
  return (
    <>
      <div className="grid">
        <div className="col-1">
          <Nav />
        </div>
        <div className="col-11 home">
          <SearchProvider>
            <Header />
            <Outlet />
          </SearchProvider>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
