import { Outlet } from "react-router-dom";
import { SessionProvider } from "./contexts/session.context.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import "minireset.css";
import "./App.css";
import MainHeader from "./components/header/MainHeader.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // hoja de estilos de las notificaciones
import Footer from "./components/footer/Footer.jsx";

library.add(fas, far);

export function App() {
  return (
    <SessionProvider>
      <MainHeader />
      <ToastContainer /> {/* Contenedor de las notificaciones */}
      <Outlet />
      <Footer />
    </SessionProvider>
  );
}

export default App;
