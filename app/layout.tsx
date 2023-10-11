import "./globals.css";
import type { Metadata } from "next";
import Provider from "@/components/providers/SessionProvider";
import PrincipalContent from "@/components/containers/PrincipalContent";

export const metadata: Metadata = {
  title: "Court Reservation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <PrincipalContent children={children} />
        </Provider>
      </body>
    </html>
  );
}
