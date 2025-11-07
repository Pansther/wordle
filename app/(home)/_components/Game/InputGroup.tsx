import cx from "clsx";

import styles from "./styles.module.scss";
import { useFormContext } from "react-hook-form";
import { useRef } from "react";

interface InputGroupProps {
  wordLength?: number;
}

const InputGroup = ({ wordLength = 5 }: InputGroupProps) => {
  const currentFocusIndexRef = useRef(0);

  const {
    register,
    setFocus,
    setValue,
    formState: { errors },
  } = useFormContext();

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

    // console.log("key", key);

    switch (key) {
      case "ArrowLeft":
        return prevInput();
      case "ArrowRight":
        return nextInput();
      case "Enter":
        return;
      case "Backspace":
        setValue(currentFocusIndexRef.current + "", "");
        event.preventDefault();
        prevInput();
        break;
      default:
        const keyCode = event.keyCode;

        event.preventDefault();

        if (keyCode < 65 || keyCode > 90) {
          return;
        }

        setValue(currentFocusIndexRef.current + "", key.toLocaleUpperCase());
        nextInput();
    }
  };

  return (
    <div className={cx(styles.inputGroup)}>
      {Array.from(new Array(wordLength)).map((_, i) => {
        const regis = register(i + "", {
          required: { value: true, message: "" },
        });
        const isError = !!errors[i];

        return (
          <input
            {...regis}
            autoFocus
            key={i}
            autoCorrect={undefined}
            autoComplete={undefined}
            className={cx("font-main", { [styles.error]: isError })}
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
