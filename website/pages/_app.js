import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { Navbar, Footer } from '../components';
import { NFTProvider } from '../context/NFTContext';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <NFTProvider>
    <ThemeProvider attribute="class">
      <div className="dark:bg-w-dark bg-white min-h-screen">
        <Navbar />
        <div className="pt-65">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>

      <Script src="https://kit.fontawesome.com/8a40a6fca5.js" crossOrigin="anonymous" />
    </ThemeProvider>
  </NFTProvider>
);

export default MyApp;
