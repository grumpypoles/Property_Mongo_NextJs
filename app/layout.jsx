import NavBar from "@/app/_components/NavBar";
import Footer from "@/app/_components/Footer";
import AuthProvider from "@/app/_components/AuthProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import "@/app/_styles/globals.css";
import 'photoswipe/dist/photoswipe.css'

export const metadata = {
  title: {
    template: "%s: Property",
    default: "Welcome: Property",
  },
  description: "Put some description",
  keywords: "rental, properties, location",
};

const RootLayout = ({ children }) => {
  return (
   <AuthProvider>
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
    </AuthProvider>
  );
};

export default RootLayout;
