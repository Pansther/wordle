import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import InputGroup from "./InputGroup";

import { generateWord } from "./helper";

import { GameFormValues } from "./type";

const Game = () => {
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

  const onSubmit = (formValues: GameFormValues) => {
    delete formValues.input;

    const activeGroupIndex = fields.length - 1;
    const activeFormValues = Object.entries(formValues).filter(
      ([key]) => key[0] === String(activeGroupIndex),
    );
    const input = Object.fromEntries(activeFormValues);

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

  useEffect(() => {
    appendBlank();

    // eslint-disable-next-line
  }, []);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        {fields.map((_, i) => (
          <InputGroup key={i} groupIndex={i} />
        ))}
        <button type="submit">ENTER</button>
      </form>
    </FormProvider>
  );
};

export default Game;
