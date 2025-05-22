import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeightedProduct from "@/pages/weighted-product";
import ProfileMatching from "@/pages/profile-matching";
import { Toaster } from "sonner";
import GeneticsAlgorithm from "./pages/genetics-algorithm/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/weighted-product"} element={<WeightedProduct />} />
        <Route path={"/profile-matching"} element={<ProfileMatching />} />
        <Route path={"/genetics-algorithm"} element={<GeneticsAlgorithm />} />
        <Route path={"/"} element={<App />} />
      </Routes>
    </BrowserRouter>
    <Toaster richColors position="bottom-center" closeButton />
  </StrictMode>
);
