import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './componentes/paginas/Home';
import Empresa from './componentes/paginas/Empresa';
import Contato from './componentes/paginas/Contato';
import Projetos from './componentes/paginas/Projetos';
import Projeto from './componentes/paginas/Projeto';
import Container from './componentes/layout/Container';
import Navbar from './componentes/layout/Navbar';
import Footer from './componentes/layout/Footer';
import NovoProjeto from './componentes/paginas/NovoProjeto';

function App() {
  return (
    <Router>
      <Navbar />

      <Container classCustomizada="min_height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/novoprojeto" element={<NovoProjeto />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/projeto/:id" element={<Projeto />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}
export default App;
