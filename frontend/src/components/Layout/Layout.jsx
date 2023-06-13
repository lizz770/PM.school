import styles from "./Layout.module.scss";
import { MobileNavProvider } from "../../context/MobileNavProvider";
import { PagesFiltersProvider } from "../../context/PagesFiltersProvider";

const Layout = ({ children, navbar, mobileNavbar }) => {
  return (
    <div className={styles.layout}>
      <MobileNavProvider>
        <PagesFiltersProvider>
          {mobileNavbar}
          {navbar}
          {children}
        </PagesFiltersProvider>
      </MobileNavProvider>
    </div>
  );
};

export default Layout;
