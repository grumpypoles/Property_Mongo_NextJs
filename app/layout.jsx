import "@/app/_styles/globals.css";
import NavBar from "@/app/_components/NavBar";
import Footer from "@/app/_components/Footer";
import AuthProvider from "@/app/_components/AuthProvider";

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
      </body>
    </html>
    </AuthProvider>
  );
};

export default RootLayout;
