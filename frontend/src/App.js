import ProductDetail from "@pages/ProductDetail";
import Alert from "@shared-layouts/Alert";
import Footer from "@shared-layouts/Footer";
import Header from "@shared-layouts/Header";
import { HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ReduxProvider from "./redux/provider";

function App() {
  return (
    <HelmetProvider>
      <ReduxProvider>
        <Alert />
        <Header />
        <Routes>
          <Route extact path="/" element={<Home />} />
          <Route extact path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </ReduxProvider>
    </HelmetProvider>
  );
}

export default App;
