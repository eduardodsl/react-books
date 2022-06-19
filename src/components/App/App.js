import { LocaleService } from '../../services/LocaleService/LocaleService';
import  MainHeader from '../MainHeader/MainHeader';
import { AuthorService } from '../../services/AuthorService/AuthorService';
import AuthorCard from '../AuthorCard/AuthorCard';
import { Footer } from '../Footer/Footer';

function App() {

  return (
    <div className="App">
      <LocaleService>
        <AuthorService>
          <MainHeader />
          <AuthorCard />
        </AuthorService>
        <Footer />
      </LocaleService>
    </div>
  );
}

export default App;
