import React from "react";
import { Forms } from "./Forms";
import { ButtonDownload } from "./pdf/ButtonDownload";
import { PdfDocument } from "./pdf/PdfDocument";
import { PdfPreview } from "./pdf/PdfPreview";
import { BudgeType } from "./pdf/PdfTypes";

const budge: BudgeType = {
  to: "Jaqueline",
  price: 1280,
  comments: [
    "Incluso no valor do orçamento toda a equipe necessária para a execução do serviço de Buffet, bem como todo o material para servir em louça",
    "Mais uma observação para testar o código",
  ],
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
    {
      label: "jantar",
      items: ["caldo verde", "arroz", "feijão tropeiro"],
    },
  ],
  entry: "salgadinhos fritos",
  guests: 80,
};

const pdf = <PdfDocument budge={budge} />;

export function App() {
  return (
    <div className="app">
      <Forms />
      {/* <PdfPreview>{pdf}</PdfPreview>
      <ButtonDownload pdfDocument={pdf} /> */}
    </div>
  );
}
