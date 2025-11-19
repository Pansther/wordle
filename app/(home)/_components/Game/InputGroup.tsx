import { useRef } from "react";
import cx from "clsx";
import { useFormContext } from "react-hook-form";

import { GameState } from "./type";

import styles from "./styles.module.scss";

interface InputGroupProps {
  gameState: GameState;
  groupIndex: number;
  wordLength?: number;
}

const InputGroup = ({
  gameState,
  groupIndex = 0,
  wordLength = 5,
}: InputGroupProps) => {
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

    const inputName = `${groupIndex}_${currentFocusIndexRef.current}`;

    setFocus(inputName);
  };

  const prevInput = () => {
    if (currentFocusIndexRef.current <= 0) return;

    currentFocusIndexRef.current -= 1;

    const inputName = `${groupIndex}_${currentFocusIndexRef.current}`;

    setFocus(inputName);
  };

  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    const key = event.currentTarget?.value?.at(-1)?.toLocaleUpperCase();
    const inputName = `${groupIndex}_${currentFocusIndexRef.current}`;
    const charCode = key?.charCodeAt(0) ?? 0;

    if (charCode < 65 || charCode > 90) {
      setValue(inputName, "");
      event.preventDefault();

      return;
    }

    setValue(inputName, key);
    nextInput();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    const inputName = `${groupIndex}_${currentFocusIndexRef.current}`;

    switch (key) {
      case "ArrowLeft":
        return prevInput();
      case "ArrowRight":
        return nextInput();
      case "ArrowUp":
        const inputValues = getValues("input");
        const prevValues = inputValues?.[inputValues.length - 2]?.input;

        if (!prevValues) return;

        const prevKey =
          Object.values(prevValues)?.[currentFocusIndexRef.current];

        setValue(inputName, prevKey);
        nextInput();
        break;
      case "Enter":
        return;
      case "Backspace":
        const value = getValues(inputName);

        if (!value) prevInput();

        setValue(inputName, "");
        event.preventDefault();
        break;
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
        const isFilled = getValues().input?.[groupIndex]?.isFilled || false;
        const isDisabled = isFilled || gameState !== GameState.Play;

        const key = isFilled
          ? String(getValues(inputName)).toLocaleLowerCase()
          : "";

        const isCorrect = key && key === word[i];
        const isElsewhere = key && !isCorrect && word.includes(key);
        const isAbsent = key && !isCorrect && !isElsewhere;

        return (
          <input
            {...regis}
            key={i}
            autoFocus={!i}
            disabled={isDisabled}
            autoCorrect={undefined}
            autoComplete={undefined}
            className={cx("font-main", {
              [styles.error]: isError,
              [styles.correct]: isCorrect,
              [styles.elsewhere]: isElsewhere,
              [styles.absent]: isAbsent,
              [styles.filled]: isFilled,
            })}
            onChange={() => {}}
            onInput={onInput}
            onKeyDown={onKeyDown}
            onFocus={() => (currentFocusIndexRef.current = i)}
          />
        );
      })}
    </div>
  );
};

export default InputGroup;
