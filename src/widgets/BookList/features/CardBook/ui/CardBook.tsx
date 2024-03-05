import { Button, Card, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { IBook } from "../../../../../shared/model/interfaces";
import { ISelectedBooks } from "../../../model/interfaces/books";

interface IBookCardProps extends ISelectedBooks {
  book: IBook;
}

const Title = ({ id }: { id: number }) => {
  return <div>{`Книга №${id}`}</div>;
};

export const CardBook = (props: IBookCardProps) => {
  const { book, setSelectedBooks, selectedBooks } = props;
  const { name, types, author, id, rating, year } = book;

  const listOfTypes = types.map((type, index) =>
    index === types.length - 1 ? type : type + " | "
  );

  const handleCheckboxChange = () => {
    const isSelected = selectedBooks.includes(id);

    if (isSelected) {
      setSelectedBooks(
        selectedBooks.filter((selectedId: any) => selectedId !== id)
      );
    } else {
      setSelectedBooks([...selectedBooks, id]);
    }
  };

  return (
    <Card
      style={{ width: "18rem", margin: "20px" }}
      actions={[
        <Link to={`/form?id=${id}`}>
          <Button type="primary" size="small">
            Обновить
          </Button>
        </Link>,
        <Checkbox
          onChange={handleCheckboxChange}
          checked={selectedBooks.includes(id)}
        />,
      ]}
    >
      <Card.Meta
        title={<Title id={id} />}
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
