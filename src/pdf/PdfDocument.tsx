import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { BudgeType } from "./PdfTypes";

// @ts-ignore
import * as PE from "numero-por-extenso";

export type Props = {
  budge: BudgeType;
};

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5vAx05IsDqlA.ttf",
    },
    {
      src: "http://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
      fontWeight: "medium",
    },
    {
      src: "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TjARc9AMX6lJBP.ttf",
      fontStyle: "italic",
    },
    {
      src: "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
      fontStyle: "bold",
    },
    {
      src: "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TzBhc9AMX6lJBP.ttf",
      fontStyle: "boldItalic",
    },
  ],
});

Font.register({
  family: "Great Vibes",
  src: "http://fonts.gstatic.com/s/greatvibes/v14/RWmMoKWR9v4ksMfaWd_JN-XCg6UKDXlq.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: "15pt",
    padding: 35,
    color: "#212427",
    paddingTop: 0,
    paddingBottom: 0,
  },
  header: {
    textAlign: "center",
    padding: 20,
    paddingBottom: 0,
  },
  footer: {
    textAlign: "center",
    padding: 20,
    lineHeight: "3pt",
  },

  entry: {
    padding: 20,
    textAlign: "justify",
    fontStyle: "bold",
    paddingBottom: 0,
  },

  service: {
    padding: 10,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },

  price: {
    padding: 20,
    fontStyle: "bold",
  },

  comment: {
    padding: 10,
    paddingHorizontal: 20,
    fontFamily: "Roboto",
    fontStyle: "italic",
    textAlign: "justify",
  },
});

const monthNames = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export const PdfDocument = ({ budge }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontStyle: "normal", fontSize: 20 }}>
            {budge.to} - {budge.guests} convidados
          </Text>
        </View>

        {budge.entry ? (
          <View style={styles.entry}>
            <Text>
              Entrada:
              <Text style={{ fontStyle: "normal" }}> {budge.entry}</Text>
            </Text>
          </View>
        ) : (
          ""
        )}

        {budge.services.map((service) => {
          return (
            <View style={styles.service}>
              <Text style={{ paddingBottom: 10, fontStyle: "bold" }}>
                {service.label}
              </Text>
              <Text style={{ paddingLeft: 20, textAlign: "justify" }}>
                {service.items.map((item, index) => {
                  return (
                    <Text>
                      {index != 0 ? " \u2022 " : ""}
                      {item}
                    </Text>
                  );
                })}
              </Text>
            </View>
          );
        })}

        {budge.comments.map((comment, index) => {
          return (
            <View style={styles.comment}>
              <Text style={{ color: "#fe7968", fontStyle: "boldItalic" }}>
                Observação:{" "}
                <Text style={{ color: "#212427", fontStyle: "italic" }}>
                  {comment}.
                </Text>
              </Text>
            </View>
          );
        })}

        <View style={styles.price}>
          <Text>
            Valor do Serviço:
            <Text style={{ fontStyle: "normal" }}>
              {" "}
              R$ {budge.price},00 (
              {PE.porExtenso(budge.price, PE.estilo.monetario)}).
            </Text>
          </Text>
        </View>

        <View style={styles.footer} wrap={false}>
          <Text>
            Domingos Martins/ES, {new Date().getDate()} de{" "}
            {monthNames[new Date().getMonth()]} de {new Date().getFullYear()}
          </Text>
          <Text style={{ fontFamily: "Great Vibes", fontSize: 20 }}>
            Darlene Machado Buffet
          </Text>
        </View>
      </Page>
    </Document>
  );
};
