import { ReactNode } from "react";
import Header from "./Navbars/Header";
import Footer from "./Footers/Footer";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

const AppLayout = ({ children, className }: AppLayoutProps) => {
  return (
    <main className={`relative overflow-hidden`}>
      <Header />
      <div className={`min-h-screen ${className}`}>{children}</div>
      <Footer />
      <div className=" sm:mt-0" />
    </main>
  );
};

export default AppLayout;
