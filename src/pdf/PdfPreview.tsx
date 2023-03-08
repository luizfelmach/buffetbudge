import { ReactElement } from "react";
import { PDFViewer } from "@react-pdf/renderer";

type Props = {
  children: ReactElement;
};

export const PdfPreview = (props: Props) => {
  return (
    <PDFViewer width={850} height={600}>
      {props.children}
    </PDFViewer>
  );
};
