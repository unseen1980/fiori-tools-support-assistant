import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fiori tools support assistant",
  description: "Build with Pinecone, OpenAI, Langchain, NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fd-tool-header">
          <div className="fd-tool-header__group">
            <div className="fd-tool-header__element">
              <img
                className="fd-tool-header__logo"
                src="//unpkg.com/fundamental-styles/dist/images/sap-logo.png"
                srcSet="//unpkg.com/fundamental-styles/dist/images/sap-logo@2x.png 1x, //unpkg.com/fundamental-styles/dist/images/sap-logo@3x.png 2x, //unpkg.com/fundamental-styles/dist/images/sap-logo@4x.png 3x"
                alt="SAP"
              />
            </div>
            <div className="fd-tool-header__element">
              <h4 className="fd-title fd-title--h5 fd-tool-header__title">
                Fiori tools customer support assistant
              </h4>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
