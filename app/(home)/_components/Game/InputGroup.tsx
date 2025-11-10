import { useRef } from "react";
import cx from "clsx";
import { useFormContext } from "react-hook-form";

import styles from "./styles.module.scss";

interface InputGroupProps {
  groupIndex: number;
  wordLength?: number;
}

const InputGroup = ({ groupIndex = 0, wordLength = 5 }: InputGroupProps) => {
  const currentFocusIndexRef = useRef(0);

  const {
    register,
    setFocus,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const word = getValues("word");

  const nextInput = () => {
    if (currentFocusIndexRef.current >= wordLength - 1) return;

    currentFocusIndexRef.current += 1;
    setFocus(currentFocusIndexRef.current + "");
  };

  const prevInput = () => {
    if (currentFocusIndexRef.current <= 0) return;

    currentFocusIndexRef.current -= 1;
    setFocus(currentFocusIndexRef.current + "");
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    const inputName = `${groupIndex}_${currentFocusIndexRef.current}`;

    switch (key) {
      case "ArrowLeft":
        return prevInput();
      case "ArrowRight":
        return nextInput();
      case "Enter":
        return;
      case "Backspace":
        setValue(inputName, "");
        event.preventDefault();
        prevInput();
        break;
      default:
        const keyCode = event.keyCode;

        event.preventDefault();

        if (keyCode < 65 || keyCode > 90) {
          return;
        }

        setValue(inputName, key.toLocaleUpperCase());
        nextInput();
    }
  };

  return (
    <div className={cx(styles.inputGroup)}>
      {Array.from(new Array(wordLength)).map((_, i) => {
        const inputName = `${groupIndex}_${i}`;
        const regis = register(inputName, {
          required: { value: true, message: "" },
        });

        const isError = !!errors[inputName];

        const isFilled = getValues().input[groupIndex]?.isFilled || false;
        const key = isFilled
          ? String(getValues(inputName)).toLocaleLowerCase()
          : "";

        const isCorrect = key && key === word[i];
        const isElsewhere = key && !isCorrect && word.includes(key);

        return (
          <input
            {...regis}
            key={i}
            autoFocus={!i}
            autoCorrect={undefined}
            autoComplete={undefined}
            className={cx("font-main", {
              [styles.error]: isError,
              [styles.correct]: isCorrect,
              [styles.elsewhere]: isElsewhere,
            })}
            onChange={() => {}}
            onKeyDown={onKeyDown}
            onFocus={() => (currentFocusIndexRef.current = i)}
          />
        );
      })}
    </div>
  );
};

export default InputGroup;
