import { useMutation } from "@apollo/client";
import { Button, Modal } from "antd";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { DELETE_BOOKS } from "../../../../../common/method";
import { ISelectedBooks } from "../../../model/interfaces/books";

export const RemoveBook = (props: ISelectedBooks) => {
  const { selectedBooks, setSelectedBooks } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const [deleteBook] = useMutation(DELETE_BOOKS);

  const isBooksLength = selectedBooks.length;

  let textVariant: string;
  let textModal: string;

  switch (true) {
    case isBooksLength === 1: {
      textModal = `Книга под номерам ${selectedBooks} будет удалена`;
      textVariant = `Книга под номерам ${selectedBooks} успешно удалена`;
      break;
    }

    default: {
      textModal = `Книги под номерами ${selectedBooks} будут удалены`;
      textVariant = `Книги под номерами ${selectedBooks} успешно удалены`;
    }
  }

  const handleDelete = () => {
    deleteBook({
      variables: { bookIds: selectedBooks },
    });
    setSelectedBooks([]);
    setIsOpen(false);
    enqueueSnackbar(textVariant, {
      variant: "success",
    });
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        title="Подтверждение удаления"
        visible={isOpen}
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={closeModal}>
            Отменить
          </Button>,
          <Button key="submit" type="primary" onClick={handleDelete}>
            Да, удалить
          </Button>,
        ]}
      >
        <p>{textModal}</p>
      </Modal>
      <Button onClick={showModal} disabled={!isBooksLength} danger>
        Удалить
      </Button>
    </>
  );
};
