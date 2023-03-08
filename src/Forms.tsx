import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Checkbox,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { BudgeType } from "./pdf/PdfTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import IconA from "@mui/material/Icon";
import { green } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PdfDocument } from "./pdf/PdfDocument";
import { PdfPreview } from "./pdf/PdfPreview";
import { pdf, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { saveAs } from "file-saver";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const steps = ["Detalhes", "Serviços", "Observações"];

const initial: BudgeType = {
  to: "",
  entry: "",
  comments: [
    "Incluso no valor do orçamento toda a equipe necessária para a execução do serviço de Buffet, bem como todo o material para servir em louça",
  ],
  guests: 0,
  price: 0,
  services: [
    {
      label: "roda de buteco",
      items: [
        "filé de peito de frango empanado",
        "batata frita",
        "polenta frita",
        "queijo",
        "presunto",
        "linguiça tipo churraco confril",
        "torresmo",
        "batata baby",
        "mini hamburguer",
        "mini cachorro quente",
        "mini churros",
        "mini pizza",
        "ovo de codorna",
        "tábua de frios (lombo, salaminho, presunto, queijo, azeitona, etc.)",
      ],
    },

    {
      label: "bebidas",
      items: ["suco 2 sabores", "coca-cola", "guaraná"],
    },
  ],
};

const entries = ["salgadinhos", "churrasco"];

export const Forms = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [entryCheckbox, setEntryCheckbox] = useState(false);
  const [budge, setBudge] = useState(initial);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleGenPDF = async () => {
    const document = <PdfDocument budge={budge} />;

    pdf(document)
      .toBlob()
      .then((blob) => {
        saveAs(blob, `Orçamento_${budge.to}.pdf`);
      })
      .catch((err) => console.log(err));
  };

  const handleTo = (e: ChangeEvent<HTMLInputElement>) => {
    setBudge((prev) => {
      return { ...prev, to: e.target.value };
    });
  };

  const handleGuests = (e: ChangeEvent<HTMLInputElement>) => {
    setBudge((prev) => {
      return { ...prev, guests: +e.target.value };
    });
  };

  const handleEntry = (e: any, value: any) => {
    setBudge((prev) => {
      return { ...prev, entry: value };
    });
  };

  const handlePrice = (e: any) => {
    setBudge((prev) => {
      return { ...prev, price: +e.target.value };
    });
  };

  const handleDeleteComment = (index: number) => {
    setBudge((prev) => {
      prev.comments.splice(index, 1);
      return { ...prev };
    });
  };

  const handleAddComment = () => {
    setBudge((prev) => {
      prev.comments.push("");
      return { ...prev };
    });
  };

  const handleUpdateComment = (index: number, e: any) => {
    setBudge((prev) => {
      prev.comments[index] = e.target.value;
      return { ...prev };
    });
  };

  const handleDeleteService = (index: number) => {
    setBudge((prev) => {
      prev.services.splice(index, 1);
      return { ...prev };
    });
  };

  const handleServiceUpdateLabel = (index: number, e: any) => {
    setBudge((prev) => {
      prev.services[index].label = e.target.value;
      return { ...prev };
    });
  };

  const handleAddService = () => {
    setBudge((prev) => {
      prev.services.push({ items: [], label: "" });
      return { ...prev };
    });
  };

  const handleAddItemService = (serviceIndex: number) => {
    setBudge((prev) => {
      prev.services[serviceIndex].items.push("");
      return { ...prev };
    });
  };

  const handleServiceUpdateItem = (
    serviceIndex: number,
    itemIndex: number,
    e: any
  ) => {
    setBudge((prev) => {
      prev.services[serviceIndex].items[itemIndex] = e.target.value;
      return { ...prev };
    });
  };

  const handleServiceDeleteItem = (serviceIndex: number, itemIndex: number) => {
    setBudge((prev) => {
      prev.services[serviceIndex].items.splice(itemIndex, 1);
      return { ...prev };
    });
  };

  const handleChangeEntryCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setEntryCheckbox((prev) => {
      return !prev;
    });
    setBudge((prev) => {
      return { ...prev, entry: "" };
    });
  };

  return (
    <Box sx={{ width: "90vw", margin: "auto", mt: 10, mb: 20 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === 0 ? (
        <>
          <Typography sx={{ mt: 2, mb: 2 }}>
            Forneça detalhes sobre o orçamento.
          </Typography>

          <TextField
            id="outlined-basic"
            label="Orçamento para"
            variant="outlined"
            sx={{ width: 250, mt: 2, mb: 2 }}
            value={budge.to}
            onChange={handleTo}
          />

          <TextField
            id="outlined-number"
            label="Total de convidados"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={budge.guests}
            onChange={handleGuests}
            sx={{ width: 250, mt: 2, mb: 2 }}
          />

          <Box display={"flex"} sx={{ mt: 2, mb: 2 }}>
            <Autocomplete
              freeSolo
              disabled={entryCheckbox}
              id="entry"
              options={entries}
              sx={{ width: 250 }}
              renderInput={(params) => (
                <TextField {...params} label="Entrada" />
              )}
              value={budge.entry}
              onChange={handleEntry}
            />
            <Checkbox
              inputProps={{ "aria-label": "Checkbox demo" }}
              checked={!entryCheckbox}
              onChange={handleChangeEntryCheckbox}
            />
          </Box>

          <TextField
            id="outlined-number"
            label="Preço do orçamento"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={budge.price}
            sx={{ width: 250, mt: 2, mb: 2 }}
            onChange={handlePrice}
          />

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained"
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext} variant="contained">
              Próximo
            </Button>
          </Box>
        </>
      ) : (
        ""
      )}

      {activeStep === 1 ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Adicione os serviços.</Typography>

          {budge.services.map((service, index) => {
            return (
              <Accordion
                expanded={expanded === "panel" + index}
                onChange={handleChange("panel" + index)}
                key={index}
              >
                <Box sx={{ display: "flex" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{ flexGrow: 1 }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Serviço"
                      variant="outlined"
                      value={service.label}
                      onChange={(e) => handleServiceUpdateLabel(index, e)}
                    />
                  </AccordionSummary>
                  <Box display={"flex"}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteService(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <AccordionDetails>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Itens deste serviço.
                  </Typography>

                  {service.items.map((item, indexItem) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        key={indexItem}
                      >
                        <TextField
                          key={index}
                          id="outlined-basic"
                          label="Item"
                          variant="standard"
                          sx={{ width: 250 }}
                          value={item}
                          onChange={(e) =>
                            handleServiceUpdateItem(index, indexItem, e)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddItemService(index);
                            }
                          }}
                        />

                        <IconButton
                          aria-label="delete"
                          onClick={() =>
                            handleServiceDeleteItem(index, indexItem)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    );
                  })}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: 3,
                    }}
                  >
                    <IconButton
                      aria-label="click"
                      onClick={(e) => handleAddItemService(index)}
                    >
                      <Icon>add_circle</Icon>
                    </IconButton>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="click" onClick={handleAddService}>
              <Icon sx={{ color: green[500], fontSize: "3rem" }}>
                add_circle
              </Icon>
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              onClick={handleBack}
              variant="contained"
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} variant="contained">
              Próximo
            </Button>
          </Box>
        </>
      ) : (
        ""
      )}

      {activeStep === 2 ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Adicione as observações necessárias.
          </Typography>
          <List>
            {budge.comments.map((comment, index) => {
              return (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(index)}
                      data-index={index}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  key={index}
                  data-index={index}
                >
                  <TextField
                    id="outlined-basic"
                    label="Observação"
                    variant="outlined"
                    sx={{ width: 400 }}
                    value={comment}
                    onChange={(e: any) => handleUpdateComment(index, e)}
                    multiline
                  />
                </ListItem>
              );
            })}
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="click" onClick={handleAddComment}>
              <Icon sx={{ color: green[500], fontSize: "3rem" }}>
                add_circle
              </Icon>
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              onClick={handleBack}
              variant="contained"
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              color="success"
              variant="contained"
              onClick={handleGenPDF}
              endIcon={<FileDownloadIcon />}
            >
              Salvar
            </Button>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
