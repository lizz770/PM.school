import React from "react";
import styles from "./PageLayout.module.scss"
import Navbar from "./Navbar"
const PageLayout =({ children, user }) =>{
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <Navbar user={user}/>
                <div className={styles.childrenWrapper}>
                    {children}
                </div>
            </div>
        </div>
    )
};
export default PageLayout;