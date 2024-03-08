
import "@/styles/components/index.scss"
import "@/styles/globals.scss";
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/pages/index.scss'


export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

