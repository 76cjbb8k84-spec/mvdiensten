export const metadata = {
  title: "MVDiensten — Mark van Dijk",
  description: "MD Control, consultancy en interim leiderschap voor hospitality met meerdere outlets.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
