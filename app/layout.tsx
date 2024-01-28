import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";

const font = Kanit({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STeP กรมทรัพย์สินทางปัญหา",
  description: "STeP กรมทรัพย์สินทางปัญหา การจัดการบริหารโครงการ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body className={font.className}>{children}</body>
      </ThemeRegistry>
    </html>
  );
}
