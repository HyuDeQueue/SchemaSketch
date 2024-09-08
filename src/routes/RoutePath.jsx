import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/AuthenticationPages/LoginPage";
import Dashboard from "../pages/UserPages/DesignListPage";
import DesignPage from "../pages/UserPages/DesignPage";
import Table from "../components/DesignComponents/Table";
const RoutePath = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="designlist" element={<Dashboard />} />
          <Route path="designpage" element={<DesignPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePath;
