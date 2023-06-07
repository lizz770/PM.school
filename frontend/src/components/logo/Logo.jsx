import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

const Logo = ({ homePath }) =>{
    return(
        <Link to={homePath} className={styles.container}>
            <div className={styles.circleContainer}>
                <div className={styles.circleTop}>
                    <div className={styles.circleBtm}>
                        <div className={styles.inner}></div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

Logo.defaultProps ={
    homePath: "/",
};

export default Logo;