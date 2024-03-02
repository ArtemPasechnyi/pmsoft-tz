import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import { IBook } from "../../../../../shared/model/interfaces";

interface IBookCardProps {
  book: IBook;
}

export const BookCard = (props: IBookCardProps) => {
  const { book } = props;
  const { name, types, author, id, rating, year } = book;

  const listOfTypes = types.map((type, index) =>
    index === types.length - 1 ? type : type + " | "
  );

  return (
    <Card
      style={{ width: "18rem", margin: "20px" }}
      actions={[
        <Link to={`/form?id=${id}`}>
          <Button type="primary" size="small">
            Обновить
          </Button>
        </Link>,
      ]}
    >
      <Card.Meta
        title={`Книга №${id}`}
        description={
          <>
            <p>
              <strong>Название: </strong>
              {name}
            </p>
            <p>
              <strong>Тип: </strong>
              {listOfTypes}
            </p>
            <p>
              <strong>Автор: </strong>
              {author}
            </p>
            <p>
              <strong>Рейтинг: </strong>
              {rating}
            </p>
            <p>
              <strong>Год: </strong>
              {year}
            </p>
          </>
        }
      />
    </Card>
  );
};
