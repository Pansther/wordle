import { FormProvider, useForm } from "react-hook-form";

import InputGroup from "./InputGroup";
import { GameFormValues } from "./type";

const Game = () => {
  const form = useForm<GameFormValues>({});

  const onSubmit = (formValues: GameFormValues) => {
    console.log("formValues", formValues);
  };

  const onError = () => {
    //
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <InputGroup />
        <button type="submit">ENTER</button>
      </form>
    </FormProvider>
  );
};

export default Game;
