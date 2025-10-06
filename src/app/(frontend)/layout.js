import Header from "../(frontend)/header/page";
import "../../../public/css/globals.css";
import Footer from "../(frontend)/footer/page";
import TopButton from "../(frontend)/components/TopButton";


export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <Header />
        {children}
        <TopButton/>
        <Footer />
      </body>
    </html>
  );
}
