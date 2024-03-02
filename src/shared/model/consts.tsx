export const validateString = (value: string, count: number) => {
  switch (true) {
    case !value:
      return "Обязательное поле";

    case value.length < count:
      return `Минимальное ко-во символов ${count}`;
  }

  return undefined;
};

export const validateRating = (value: number) => {
  const rating = parseFloat(value.toString());

  if (isNaN(rating)) {
    return "Обязательное поле";
  }

  if (rating < 0 || rating > 5) {
    return "Рейтинг должен быть от 0 до 5";
  }

  return undefined;
};

export const validateArr = (value: string[]) => {
  if (!value?.length) {
    return "Обязательное поле";
  }

  return undefined;
};

export const validateNumber = (value: number, count: number) => {
  switch (true) {
    case !value:
      return "Обязательное поле";

    case value.toString().length < count:
      return `Минимальное кол-во символов ${count}`;

    case value.toString().length > count:
      return `Максимальное кол-во символов ${count}`;
  }

  return undefined;
};

export const errorComponent = (error: string) => {
  return (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
      {error}
    </div>
  );
};
