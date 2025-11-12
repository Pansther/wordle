import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import Button from "../Button";
import InputGroup from "./InputGroup";

import { generateWord } from "./helper";

import { GameFormValues, GameState } from "./type";

import styles from "./styles.module.scss";

const Modal = withReactContent(Swal);

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
      Modal.fire({
        title: "You Win !",
        showCloseButton: true,
        showConfirmButton: false,
        html: (
          <div className="flex flex-col gap-8 items-center">
            <Button variant="primary" onClick={restart} style={{ width: 150 }}>
              RESTART
            </Button>
          </div>
        ),
      });
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

    Modal.fire({
      title: "You Lost !",
      showCloseButton: true,
      showConfirmButton: false,
      html: (
        <div className="flex flex-col gap-8 items-center">
          <p>
            The answer was <b>&quot;{word}&quot;</b>
          </p>
          <Button variant="primary" onClick={restart} style={{ width: 150 }}>
            RESTART
          </Button>
        </div>
      ),
    });
  };

  const restart = () => {
    Modal.close();
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
