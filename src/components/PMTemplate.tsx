import Header from "./Header";

export default function PMTemplate({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 mx-auto w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl shadow-sm min-h-screen py-2 px-4">
      {/* Header (logo + menu bar) */}
      <Header />

      {/* Sections container */}
      <div className="flex flex-col gap-4 w-full">{children}</div>
    </div>
  );
}
