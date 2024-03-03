import { Button } from "antd";
import { Link } from "react-router-dom";
import styles from "./AddBook.module.css";

export const AddBook = () => {
  return (
    <Link to={`/form`} className={styles.item}>
      <Button type="primary">Добавить новую книгу</Button>
    </Link>
  );
};
