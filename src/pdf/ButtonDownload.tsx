import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReactElement } from "react";

type Props = {
  pdfDocument: ReactElement;
};

export const ButtonDownload = ({ pdfDocument }: Props) => {
  return (
    <PDFDownloadLink document={pdfDocument} fileName="budget.pdf">
      Download
    </PDFDownloadLink>
  );
};
