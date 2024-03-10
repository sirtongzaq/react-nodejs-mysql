import "@/styles/components/index.scss";
import "@/styles/globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/styles/pages/index.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}
