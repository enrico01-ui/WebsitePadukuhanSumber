import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {DashboardPage} from "../pages/DashboardPage";
import { HistorySitePages } from "../pages/HistorySitePage";
import { DetailProductPage } from "../pages/DetailProductPage";
import { ProductPage } from "../pages/ProductPage";
import { ListUmkmPage } from "../pages/ListUMKM";
import { PDFViewerPage } from "../pages/PdfViewer";
import AdminPage from "../pages/AdminPage";
import { LaporanPage } from "../pages/LaporanPage";


const AppRouter = () => {
  return (
    <>
      <ToastContainer /> {/* Toast harus ada di dalam return */}
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/history" element={<HistorySitePages />} />
        <Route path="/umkm" element={<ListUmkmPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/products/:id" element={<DetailProductPage />} />
        <Route path="/module" element={<PDFViewerPage />} />

        <Route path="/admin-sumber-87pspgk76" element={<AdminPage />} />
        <Route path="/laporan" element={<LaporanPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;