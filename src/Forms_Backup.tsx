import { Autocomplete, Checkbox, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { BudgeType } from "./pdf/PdfTypes";

const initial: BudgeType = {
  to: "",
  entry: "salgadinhos",
  comments: [
    "Incluso no valor do orçamento toda a equipe necessária para a execução do serviço de Buffet, bem como todo o material para servir em louça",
  ],
  guests: 0,
  price: 0,
  services: [],
};

const entries = ["salgadinhos", "churrasco"];

export const Forms = () => {
  const [budge, setBudge] = useState(initial);

  const [entryCheckbox, setEntryCheckbox] = useState(false);

  const changeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudge((previousState) => {
      console.log(previousState);
      return { ...previousState, to: e.target.value };
    });
  };

  const handleChangeEntryCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setEntryCheckbox((prev) => {
      return !prev;
    });
  };

  return (
    <div className="forms">
      <TextField
        id="outlined-basic"
        label="Orçamento para"
        variant="outlined"
        sx={{ width: 250 }}
      />

      <TextField
        id="outlined-number"
        label="Total de convidados"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Autocomplete
        freeSolo
        disabled={entryCheckbox}
        id="entry"
        options={entries}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Entrada" />}
      />
      <Checkbox
        inputProps={{ "aria-label": "Checkbox demo" }}
        checked={!entryCheckbox}
        onChange={handleChangeEntryCheckbox}
      />

      {/* {budge.comments.map((comment, index) => {})} */}

      <TextField
        id="outlined-number"
        label="Preço do orçamento"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};
