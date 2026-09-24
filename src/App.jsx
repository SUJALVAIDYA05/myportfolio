import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Certifications from './pages/Certifications.jsx';
import Contact from './pages/Contact.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import PageTransition from './components/layout/PageTransition.jsx';

/**
 * App component.
 * Sets up:
 * - ScrollToTop on route changes (animations.md §8)
 * - PageTransition wrapper (AnimatePresence + useLocation key) around route outlet
 * - 5 core routes: /, /projects, /projects/:slug, /certifications, /contact (design.md §1 & §4.7)
 */
export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <PageTransition>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageTransition>
    </>
  );
}
