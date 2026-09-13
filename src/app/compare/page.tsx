import { ComparePage } from "@/app-shell/pages/compare/compare-page";
import { getRequestLocale } from "@/app/locale";

export default async function CompareRoute() {
  return <ComparePage locale={await getRequestLocale()} />;
}
