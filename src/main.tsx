import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";

import { ThemeProvider } from "~/contexts/Theme";

import BaseLayout from "~/layouts/BaseLayout";

import BioPage from "~/pages/BioPage";
import HomePage from "~/pages/HomePage";
import NotFound404Page from "~/pages/404Page";

import GalleryPage from "~/pages/photography";
import JapanGallery from "~/pages/photography/JapanGallery";

import "./styles/index.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0,0)
  }, [pathname]);
  return null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <ScrollToTop />
      <BaseLayout>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="bio" element={<BioPage />} />
            <Route path="photography">
              <Route index element={<GalleryPage />} />
              <Route path="japan" element={<JapanGallery />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound404Page />} />
        </Routes>
      </BaseLayout>
    </ThemeProvider>
  </BrowserRouter>
);
