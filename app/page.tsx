import Image from "next/image";
import Link from "next/link";
import { PartnerLogo } from "./components/PartnerLogo";

const PARTNERS = [
  {
    name: "Cronoar",
    href: "https://cronoar.com.br",
    logoPath: "/images/cronoar.png",
  },
  {
    name: "Domdchef",
    href: null,
    logoPath: "/images/domdchef.png",
  },
  {
    name: "SGA Agro",
    href: "https://sgaagro.com.br",
    logoPath: "/images/sgaagro.png",
  },
] as const;

const SERVICES = [
  {
    title: "Nossos SaaS",
    description:
      "Soluções em nuvem prontas para escalar seu negócio. Conheça o SGA Agro e outras ferramentas desenvolvidas pela Pilar Tec.",
    icon: "☁️",
  },
  {
    title: "Criação de sistemas",
    description:
      "Sistemas sob medida para sua empresa: gestão, automação e integrações que realmente resolvem o dia a dia.",
    icon: "⚙️",
  },
  {
    title: "Landing pages",
    description:
      "Páginas de conversão rápidas, responsivas e alinhadas à sua marca para captar leads e divulgar seus produtos.",
    icon: "📄",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-lg">
            <Image
              src="/images/pilartec-logo.svg"
              alt="Pilar Tec"
              width={140}
              height={36}
              priority
              className="h-9 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a
              href="#servicos"
              className="text-slate-600 transition hover:text-slate-900"
            >
              Serviços
            </a>
            <a
              href="#parceiros"
              className="text-slate-600 transition hover:text-slate-900"
            >
              Parceiros
            </a>
            <a
              href="#contato"
              className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              Fale conosco
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Software que sustenta o seu negócio
              </h1>
              <p className="mt-5 text-lg text-slate-600 sm:text-xl">
                Criamos SaaS, sistemas sob medida e landing pages. Somos a base
                técnica de marcas que já confiam no nosso trabalho.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  Falar com a Pilar Tec
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  Ver serviços
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
              O que fazemos
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
              Da ideia ao produto: SaaS próprio, sistemas customizados e
              landing pages que convertem.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {SERVICES.map((s) => (
                <article
                  key={s.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <span className="text-3xl" aria-hidden>
                    {s.icon}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{s.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Parceiros */}
        <section
          id="parceiros"
          className="border-t border-slate-200 bg-white py-16 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
              Marcas que confiam
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
              Empresas que já contam com a Pilar Tec para software e presença
              digital.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {PARTNERS.map((p) => (
                <PartnerLogo
                  key={p.name}
                  name={p.name}
                  href={p.href}
                  logoPath={p.logoPath}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="contato"
          className="border-t border-slate-200 bg-slate-900 py-16 text-white sm:py-24"
        >
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Pronto para dar o próximo passo?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Conte sua ideia. A gente cuida da parte técnica.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:contato@pilartec.com.br"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-medium text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                contato@pilartec.com.br
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-500 px-6 py-3 text-base font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded">
            <Image
              src="/images/pilartec-logo.svg"
              alt="Pilar Tec"
              width={120}
              height={30}
              className="h-8 w-auto opacity-90"
            />
          </Link>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Pilar Tec. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
