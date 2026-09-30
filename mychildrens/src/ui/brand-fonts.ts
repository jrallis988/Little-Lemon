import { Platform } from "react-native";
import carlitoBold from "../../assets/fonts/Carlito-Bold.ttf";
import carlitoRegular from "../../assets/fonts/Carlito-Regular.ttf";

export const nativeFontAssets = {
  CarlitoRegular: carlitoRegular,
  CarlitoBold: carlitoBold,
};

const webFamily = '"Museo Sans", Calibri, Carlito, sans-serif';

export const fonts =
  Platform.OS === "web"
    ? { display: webFamily, body: webFamily, semibold: webFamily, bold: webFamily }
    : { display: "CarlitoBold", body: "CarlitoRegular", semibold: "CarlitoBold", bold: "CarlitoBold" };

export const fontWeight =
  Platform.OS === "web"
    ? { display: "500" as const, subhead: "700" as const, body: "300" as const }
    : { display: "normal" as const, subhead: "normal" as const, body: "normal" as const };

export function installBrandFonts(): void {
  if (Platform.OS !== "web" || typeof document === "undefined") return;
  if (document.getElementById("bch-brand-fonts")) return;
  const style = document.createElement("style");
  style.id = "bch-brand-fonts";
  style.textContent = `
    @font-face {
      font-family: "Museo Sans";
      src: local("Museo Sans 500"), local("MuseoSans-500"), local("Museo Sans");
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "Museo Sans";
      src: local("Museo Sans 300"), local("MuseoSans-300"), local("Museo Sans Light");
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "Museo Sans";
      src: local("Museo Sans 700"), local("MuseoSans-700"), local("Museo Sans Bold");
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: Carlito;
      src: url(${JSON.stringify(carlitoRegular)}) format("truetype");
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: Carlito;
      src: url(${JSON.stringify(carlitoRegular)}) format("truetype");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: Carlito;
      src: url(${JSON.stringify(carlitoBold)}) format("truetype");
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: Carlito;
      src: url(${JSON.stringify(carlitoBold)}) format("truetype");
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
}
