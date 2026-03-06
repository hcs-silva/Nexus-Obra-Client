import styles from "../styles/header.module.css";
import logoPt from "../assets/Nexus_Obra_Logo_Only_Nobg.png";

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={logoPt} alt="Nexus Obra Logo" className={styles.logo} />
      <h1>Nexus Obra</h1>
    </div>
  );
};
export default Header;
