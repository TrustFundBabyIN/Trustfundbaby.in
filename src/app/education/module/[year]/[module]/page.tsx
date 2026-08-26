import EducationModulePage from "./EducationModulePage";

export function generateStaticParams() {
  const params = [];
  for (let year = 1; year <= 9; year++) {
    for (let mod = 1; mod <= 12; mod++) {
      params.push({ year: String(year), module: String(mod) });
    }
  }
  return params;
}

export default function Page() {
  return <EducationModulePage />;
}
