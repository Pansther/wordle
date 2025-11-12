import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import InputGroup from "./InputGroup";

import { generateWord } from "./helper";

import { GameFormValues, GameState } from "./type";

import styles from "./styles.module.scss";
import Button from "../Button";

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Play);

  const form = useForm({
    defaultValues: {
      word: generateWord(),
    },
  });
  const { fields, append, update } = useFieldArray({
    control: form.control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    name: "input",
  });

  const onFinish = () => {
    setTimeout(() => {
      alert("You Win !");
      setGameState(GameState.Win);
    }, 300);
  };

  const onSubmit = (formValues: GameFormValues) => {
    delete formValues.input;

    const activeGroupIndex = fields.length - 1;
    const activeFormValues = Object.entries(formValues).filter(([key]) => {
      const prefix = key.split("_")[0];
      return prefix === String(activeGroupIndex);
    });

    const input = Object.fromEntries(activeFormValues);
    const guessWord = Object.values(input).join("");

    if (guessWord.toLocaleLowerCase() === formValues.word) {
      update(fields.length - 1, {
        input,
        isFilled: true,
      });

      return onFinish();
    }

    appendBlank();
    update(fields.length - 1, {
      input,
      isFilled: true,
    });
  };

  const onError = () => {
    //
  };

  const appendBlank = () => {
    append({
      isFilled: false,
      input: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    });
  };

  const giveUp = () => {
    const word = form.getValues("word");

    setGameState(GameState.Lost);
    alert(`You Lost !, word is "${word}".`);
  };

  const restart = () => {
    form.reset();
    form.setValue("word", generateWord());
    appendBlank();
    setGameState(GameState.Play);
  };

  useEffect(() => {
    appendBlank();

    // eslint-disable-next-line
  }, []);

  return (
    <FormProvider {...form}>
      <form
        className={styles.gameContainer}
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        <div>
          {fields.map((_, i) => (
            <InputGroup key={i} groupIndex={i} gameState={gameState} />
          ))}
        </div>

        {gameState === GameState.Play ? (
          <div className="flex gap-2">
            <Button variant="danger" onClick={giveUp}>
              GIVE UP
            </Button>
            <Button type="submit" variant="primary">
              ENTER
            </Button>
          </div>
        ) : (
          <Button variant="primary" onClick={restart}>
            RESTART
          </Button>
        )}
      </form>
    </FormProvider>
  );
};

export default Game;
