import { useMutation, useQuery } from "@apollo/client";
import { Button, Input, Spin } from "antd";
import { Field, Formik } from "formik";
import { useSnackbar } from "notistack";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  CREATE_BOOK,
  DELETE_BOOK,
  GET_BOOK_BY_ID,
  UPDATE_BOOK,
} from "../../../common/method";
import {
  errorComponent,
  validateArr,
  validateNumber,
  validateRating,
  validateString,
} from "../../../shared/model/consts";
import { ETypeOfBook } from "../../../shared/model/emuns";
import { IBook } from "../../../shared/model/interfaces";
import { SelectView } from "../../../shared/ui/SelectView";
import styles from "./FormikCreateBook.module.css";

interface ICurrentBookProps {
  bookId: number;
}

const clearBook: IBook = {
  name: "",
  types: [],
  author: "",
  id: 1,
  year: "",
  rating: "",
};

const typeOptions = Object.values(ETypeOfBook).map((type) => ({
  value: type,
  label: type,
}));

const FormikCreateBook = () => {
  const { bookId } = useLoaderData() as ICurrentBookProps;
  const { enqueueSnackbar } = useSnackbar();
  const rout = useNavigate();

  const { data = {}, loading } = useQuery(GET_BOOK_BY_ID, {
    variables: { bookId },
  });

  const { getBookById: currentBook = null } = data;

  const book: IBook = currentBook || clearBook;

  const currentBookId = currentBook?.id;

  const defaultValueOptions = typeOptions.filter((typeOption) =>
    book.types.find((types: ETypeOfBook) => types === typeOption.value)
  );

  let succesText: string;
  let submitText: string;
  let title: string;

  switch (true) {
    case !!currentBook: {
      succesText = "Информация о книге успешно обновлена";
      submitText = "Обновить";
      title = `Обновление книги под номером ${currentBookId}`;
      break;
    }

    default: {
      succesText = "Книга успешно создана";
      submitText = "Создать";
      title = "Форма создания книги";
    }
  }

  const [createBook] = useMutation(CREATE_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK);

  const handleDelete = () => {
    deleteBook({
      variables: { bookId: currentBookId },
    });
    rout("/");
    enqueueSnackbar(`Книга номер ${currentBookId} успешно удалена`, {
      variant: "success",
    });
  };

  const handleClickSubmit = (book: IBook) => {
    currentBook
      ? updateBook({ variables: { book } })
      : createBook({ variables: { book } });
    rout("/");
    enqueueSnackbar(succesText, {
      variant: "success",
    });
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <>
      <Formik initialValues={book} onSubmit={(book) => handleClickSubmit(book)}>
        {({ errors, touched, handleSubmit }) => (
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h4>{title}</h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  as={Input}
                  className={styles.formInput}
                  placeholder="Название"
                  name="name"
                  validate={(value: string) => validateString(value, 3)}
                />
                {errors.name &&
                  touched.name &&
                  errorComponent(errors.name as string)}
              </div>
              <div>
                <Field
                  name="types"
                  options={typeOptions}
                  component={SelectView}
                  className={styles.formInput}
                  placeholder="Жанр"
                  isMulti={true}
                  defaultValue={defaultValueOptions}
                  validate={(value: string[]) => validateArr(value)}
                />
                {errors.types &&
                  touched.types &&
                  errorComponent(errors.types as string)}
              </div>
              <div>
                <Field
                  as={Input}
                  className={styles.formInput}
                  placeholder="Автор"
                  name="author"
                  validate={(value: string) => validateString(value, 2)}
                />
                {errors.author &&
                  touched.author &&
                  errorComponent(errors.author as string)}
              </div>
              <div>
                <Field
                  as={Input}
                  className={styles.formInput}
                  placeholder="Год"
                  name="year"
                  type="number"
                  max={9999}
                  validate={(value: number) => validateNumber(value, 4)}
                />
                {errors.year &&
                  touched.year &&
                  errorComponent(errors.year as string)}
              </div>
              <div>
                <Field
                  as={Input}
                  className={styles.formInput}
                  placeholder="Рейтинг"
                  name="rating"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  validate={(value: number) => validateRating(value)}
                />
                {errors.rating &&
                  touched.rating &&
                  errorComponent(errors.rating as string)}
              </div>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="small"
                  className={styles.formButton}
                >
                  {submitText}
                </Button>
                {currentBook && (
                  <Button
                    type="primary"
                    danger
                    size="small"
                    onClick={handleDelete}
                    className={styles.formButton}
                  >
                    Удалить
                  </Button>
                )}
                <Link to={`/`}>
                  <Button
                    type="primary"
                    size="small"
                    className={styles.formButton}
                  >
                    Вернуться к списку
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default FormikCreateBook;
