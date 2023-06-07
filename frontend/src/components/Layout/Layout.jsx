import React from "react";
import styles from "./Layout.module.scss";
import { MobileNavProvider } from "../../context/MobileNavProvider";
const Layout = ({ children, navbar, mobileNavbar }) => {
  return (
    <div className={styles.container}>
      <MobileNavProvider>
      {mobileNavbar}
      {navbar}
      {children}
      </MobileNavProvider>
    </div>

  );
};

export default Layout;