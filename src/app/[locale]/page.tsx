import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { hasLocale } from "@/i18n/config";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}
