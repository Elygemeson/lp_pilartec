"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const PRODUCTS = [
  {
    name: "SGA Agro",
    description:
      "Sistema de gestão agrícola completo com controle de perdas, qualidade do plantio, rastreabilidade e relatórios em tempo real.",
    href: "https://sgaagro.com.br",
    logoPath: "/images/SGA_logo.png",
    tag: "Agro · SaaS",
    features: ["Controle de perdas", "Qualidade do plantio", "Relatórios em tempo real", "Rastreabilidade"],
  },
] as const;

const PARTNERS = [
  { name: "Cronoar", href: "https://cronoar.com.br", logoPath: "/images/empresasParceiras/cronoar.png" },
  { name: "Domdchef", href: null, logoPath: "/images/empresasParceiras/domdchef.png" },
  { name: "Monte Alegre", href: null, logoPath: "/images/empresasParceiras/montealegre.png" },
  { name: "Cronoar", href: "https://cronoar.com.br", logoPath: "/images/empresasParceiras/cronoar.png" },
  { name: "Domdchef", href: null, logoPath: "/images/empresasParceiras/domdchef.png" },
  { name: "Monte Alegre", href: null, logoPath: "/images/empresasParceiras/montealegre.png" },
] as const;

const SERVICES = [
  {
    title: "SaaS Próprio",
    description: "Soluções em nuvem prontas para escalar. Produtos maduros, com suporte contínuo e evolução constante.",
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    accent: "#22c55e",
    highlight: "Em produção",
  },
  {
    title: "Sistemas sob medida",
    description: "Do zero ao deploy: gestão, automação e integrações que encaixam exatamente no seu processo.",
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    accent: "#3b82f6",
    highlight: "Sob demanda",
  },
  {
    title: "Landing Pages",
    description: "Páginas de conversão rápidas, responsivas e alinhadas à sua marca para captar leads com precisão.",
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    accent: "#22c55e",
    highlight: "Alta conversão",
  },
] as const;

function Card3D({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    const rX = ((y - cy) / cy) * -9;
    const rY = ((x - cx) / cx) * 9;
    el.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(6px)`;
    const g = el.querySelector('.card-glare') as HTMLElement;
    if (g) g.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.07) 0%, transparent 65%)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    const g = el.querySelector('.card-glare') as HTMLElement;
    if (g) g.style.background = 'transparent';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: 'transform 0.18s ease', transformStyle: 'preserve-3d', willChange: 'transform', position: 'relative', ...style }}
    >
      <div className="card-glare" style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 10 }} />
      {children}
    </div>
  );
}

const NAV_LINKS = [['#servicos', 'Serviços'], ['#produtos', 'Produtos'], ['#parceiros', 'Parceiros']] as const;

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header-outer" style={{ position: 'fixed', top: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: 'calc(100% - 40px)', maxWidth: 1060 }}>
      <div className="navbar-wrap" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(8,8,8,0.96)' : 'rgba(10,10,10,0.75)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 6, padding: '9px 18px',
        transition: 'all 0.3s',
        boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.5)' : 'none',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
          <Image src="/images/LOGOPILARTECBRANCA.png" alt="Pilar Tec" width={160} height={40} priority style={{ height: 36, width: 'auto' }} />
          <span className="fd nav-logo-txt" style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.02em' }}>Pilar Tec</span>
        </Link>

        {/* Desktop: nav + CTA */}
        <div className="navbar-desktop" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <nav style={{
            display: 'flex', gap: 2,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 4, padding: '4px',
          }}>
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href} className="nav-pill">{label}</a>
            ))}
          </nav>
          <a href="#contato" className="btn-cta">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            Fale conosco
          </a>
        </div>

        {/* Mobile: hamburger */}
        <button
          type="button"
          className="navbar-mobile-btn"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            padding: 0,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 6,
            background: 'rgba(255,255,255,0.05)',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {menuOpen ? (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Overlay mobile menu - backdrop atrás (z0), conteúdo na frente (z2) com botões visíveis */}
      <div
        className="navbar-mobile-menu"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 101,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'visibility 0.25s, opacity 0.25s',
        }}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={closeMenu}
          onKeyDown={(e) => e.key === 'Escape' && closeMenu()}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(6px)',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: '100%',
            paddingTop: 'max(env(safe-area-inset-top), 24px)',
            paddingBottom: 'max(env(safe-area-inset-bottom), 24px)',
            paddingLeft: 24,
            paddingRight: 24,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            onClick={closeMenu}
            className="navbar-mobile-close-btn"
            aria-label="Fechar menu"
            style={{
              position: 'absolute',
              top: 'max(env(safe-area-inset-top), 24px)',
              right: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 16px',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 8,
              background: '#000',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Fechar
          </button>
          <div
            className="navbar-mobile-buttons"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              width: '100%',
              maxWidth: 280,
              marginTop: 70,
              flexShrink: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href} className="nav-pill nav-pill-mobile" onClick={closeMenu}>
                {label}
              </a>
            ))}
            <a href="#contato" className="btn-cta btn-cta-mobile" onClick={closeMenu}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              Fale conosco
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", empresa: "", reason: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setFormError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          empresa: form.empresa,
          reason: form.reason,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Falha ao enviar.");
        setFormStatus("error");
        return;
      }
      setFormStatus("success");
      setForm({ name: "", email: "", empresa: "", reason: "", message: "" });
    } catch {
      setFormError("Erro de conexão. Tente novamente.");
      setFormStatus("error");
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        .fd{font-family:'Bricolage Grotesque',sans-serif;}

        .hero-grid{}
        @supports (min-height:100dvh){ .hero-grid{ min-height:100dvh !important; } }

        .badge{
          display:inline-flex;align-items:center;gap:7px;
          background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.22);
          color:#4ade80;font-size:11px;font-weight:600;letter-spacing:0.1em;
          text-transform:uppercase;padding:5px 13px;border-radius:100px;
        }
        .bdot{width:5px;height:5px;background:#22c55e;border-radius:50%;animation:bdot 2s ease-in-out infinite;}
        @keyframes bdot{0%,100%{opacity:1}50%{opacity:0.3}}

        .eyebrow{
          font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;
          color:#444;margin-bottom:14px;display:flex;align-items:center;gap:10px;
        }
        .eyebrow::before{content:'';display:block;width:22px;height:1px;background:#2a2a2a;}

        .svc-card{
          background:#fff;
          border:1px solid rgba(22,101,52,0.2);
          border-radius:12px;padding:32px;position:relative;overflow:hidden;cursor:default;
          box-shadow:0 4px 20px rgba(0,0,0,0.06);
        }
        .svc-card:hover{ box-shadow:0 8px 32px rgba(0,0,0,0.1); border-color:rgba(22,101,52,0.35); }
        .section-servicos .svc-eyebrow{ font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,0.7); margin-bottom:12px; }
        .section-servicos .svc-title{ font-size:clamp(26px,3.5vw,38px); font-weight:700; letter-spacing:-0.025em; color:#fff; margin-bottom:12px; line-height:1.2; }
        .section-servicos .svc-desc{ font-size:15px; color:rgba(255,255,255,0.85); max-width:420px; line-height:1.65; }

        .product-card{
          background:#0f0f0f;
          border:1px solid rgba(255,255,255,0.08);
          border-radius:22px;overflow:hidden;position:relative;cursor:default;
        }

        @keyframes scroll-track{
          0%{transform:translateX(0)}
          100%{transform:translateX(-50%)}
        }
        .carousel-track{
          display:flex;gap:18px;width:max-content;
          animation:scroll-track 26s linear infinite;
        }
        .carousel-track:hover{animation-play-state:paused;}

        .cfield{
          width:100%;background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:10px;color:#fff;
          font-family:'DM Sans',sans-serif;font-size:14px;
          padding:12px 15px;outline:none;transition:border-color 0.2s,background 0.2s;
          resize:none;
        }
        .cfield::placeholder{color:#3a3a3a;}
        .cfield:focus{border-color:rgba(34,197,94,0.35);background:rgba(34,197,94,0.025);}
        .cfield option{background:#111;}

        .flabel{
          display:block;font-size:11px;font-weight:600;letter-spacing:0.07em;
          color:#555;margin-bottom:7px;text-transform:uppercase;
        }

        .csub{
          width:100%;background:linear-gradient(135deg,#22c55e,#16a34a);
          color:#000;font-family:'DM Sans',sans-serif;
          font-size:14px;font-weight:700;
          border:none;border-radius:10px;padding:14px;
          cursor:pointer;transition:opacity 0.2s,transform 0.2s;
          display:flex;align-items:center;justify-content:center;gap:8px;
        }
        .csub:hover{opacity:0.87;transform:translateY(-1px);}

        .qcbtn{
          display:flex;align-items:center;gap:12px;
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:10px;padding:14px 16px;
          text-decoration:none;color:#bbb;
          font-size:13px;font-weight:500;
          transition:all 0.2s;
        }
        .qcbtn:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.16);color:#fff;}

        .fl{color:#3a3a3a;font-size:12px;text-decoration:none;transition:color 0.15s;}
        .fl:hover{color:#999;}

        .grad-text{
          background:linear-gradient(135deg,#22c55e,#3b82f6);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;
        }

        .btn-cta{
          display:inline-flex;align-items:center;justify-content:center;gap:8px;
          background:linear-gradient(135deg,#22c55e 0%,#16a34a 100%);
          color:#000;font-size:13px;font-weight:700;letter-spacing:0.02em;
          padding:10px 20px;border-radius:4px;text-decoration:none;
          border:1px solid rgba(255,255,255,0.12);
          box-shadow:0 2px 12px rgba(34,197,94,0.25),inset 0 1px 0 rgba(255,255,255,0.15);
          transition:transform 0.2s ease,box-shadow 0.2s ease,background 0.2s ease;
        }
        .btn-cta:hover{ transform:translateY(-2px); box-shadow:0 6px 20px rgba(34,197,94,0.35),inset 0 1px 0 rgba(255,255,255,0.2); background:linear-gradient(135deg,#2dd36f 0%,#16a34a 100%); }
        .btn-cta:active{ transform:translateY(0); box-shadow:0 2px 8px rgba(34,197,94,0.2); }

        .btn-cta-hero{
          padding:14px 28px;font-size:15px;border-radius:4px;
          box-shadow:0 4px 16px rgba(34,197,94,0.3),inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .btn-cta-hero:hover{ box-shadow:0 8px 28px rgba(34,197,94,0.4),inset 0 1px 0 rgba(255,255,255,0.25); }

        .btn-outline{
          display:inline-flex;align-items:center;justify-content:center;gap:8px;
          background:rgba(255,255,255,0.03);color:#aaa;
          font-size:14px;font-weight:500;letter-spacing:0.01em;
          padding:12px 24px;border-radius:4px;text-decoration:none;
          border:1px solid rgba(255,255,255,0.12);
          transition:color 0.2s ease,border-color 0.2s ease,background 0.2s ease,transform 0.2s ease,box-shadow 0.2s ease;
        }
        .btn-outline:hover{ color:#fff; border-color:rgba(255,255,255,0.22); background:rgba(255,255,255,0.06); transform:translateY(-1px); box-shadow:0 4px 12px rgba(0,0,0,0.2); }
        .btn-outline-hero{ padding:13px 26px; font-size:15px; border-radius:4px; }

        .nav-pill{
          color:#888;font-size:13px;font-weight:500;letter-spacing:-0.01em;
          padding:8px 16px;border-radius:4px;text-decoration:none;
          transition:color 0.2s ease,background 0.2s ease;
        }
        .nav-pill:hover{ color:#fff; background:rgba(255,255,255,0.08); }

        .hero-circuit-line{ fill:none; stroke:rgba(34,197,94,0.12); stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-dasharray:6 34; animation:hero-circuit-flow 5s linear infinite; }
        .hero-circuit-glow{ fill:none; stroke:rgba(34,197,94,0.18); stroke-width:4; stroke-linecap:round; stroke-linejoin:round; stroke-dasharray:6 34; animation:hero-circuit-flow 5s linear infinite; filter:url(#hero-circuit-blur); }
        .hero-circuit-line-2{ stroke:rgba(59,130,246,0.1); animation-duration:7s; animation-direction:reverse; stroke-dasharray:8 40; }
        .hero-circuit-glow-2{ stroke:rgba(59,130,246,0.14); stroke-dasharray:8 40; animation-duration:7s; animation-direction:reverse; }
        .hero-circuit-pad{ fill:rgba(34,197,94,0.2); animation:hero-circuit-pulse 2.2s ease-in-out infinite; }
        .hero-circuit-pad-2{ fill:rgba(59,130,246,0.15); animation-delay:0.6s; }
        @keyframes hero-circuit-flow{ from{ stroke-dashoffset:0; } to{ stroke-dashoffset:40; } }
        @keyframes hero-circuit-pulse{ 0%,100%{ opacity:0.5; } 50%{ opacity:1; } }

        .svc-circuit-line{ fill:none; stroke:rgba(34,197,94,0.15); stroke-width:1; stroke-linecap:square; stroke-dasharray:8 24; animation:svc-circuit-flow 12s linear infinite; }
        .svc-circuit-line-2{ stroke:rgba(74,222,128,0.1); animation-duration:15s; animation-direction:reverse; stroke-dasharray:6 30; }
        .svc-circuit-dot{ fill:rgba(34,197,94,0.28); animation:svc-circuit-pulse 3s ease-in-out infinite; }
        .svc-circuit-dot-2{ fill:rgba(74,222,128,0.2); animation-delay:1s; }
        @keyframes svc-circuit-flow{ from{ stroke-dashoffset:0; } to{ stroke-dashoffset:32; } }
        @keyframes svc-circuit-pulse{ 0%,100%{ opacity:0.4; } 50%{ opacity:1; } }

        /* Contato: fundos estáticos (sem animação) para melhor performance */
        .contact-bg-stream{ background-image:repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.03) 2px, rgba(34,197,94,0.03) 3px); background-size:100% 60px; }
        .contact-bg-grid{ background-image:linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size:56px 56px; }
        .contact-bg-dot{ background-image:radial-gradient(circle, rgba(34,197,94,0.12) 1px, transparent 1px); background-size:24px 24px; }
        .section-contato{ contain:layout style paint; }

        .whatsapp-float{
          position:fixed;bottom:24px;right:24px;z-index:90;
          display:flex;align-items:center;justify-content:center;
          width:56px;height:56px;border-radius:50%;
          background:#25d366;color:#fff;
          box-shadow:0 4px 20px rgba(37,211,102,0.45);
          transition:transform 0.2s ease,box-shadow 0.2s ease;
          text-decoration:none;
        }
        .whatsapp-float:hover{ transform:scale(1.08); box-shadow:0 6px 28px rgba(37,211,102,0.55); }

        .navbar-mobile-btn{ display:none !important; }
        .navbar-mobile-menu{ pointer-events:none; }
        .navbar-mobile-menu[aria-hidden="false"]{ pointer-events:auto; }
        .navbar-mobile-buttons{ visibility:visible !important; opacity:1 !important; }
        .navbar-mobile-buttons .nav-pill-mobile,
        .navbar-mobile-buttons .btn-cta-mobile{ visibility:visible !important; opacity:1 !important; display:flex !important; }
        .navbar-mobile-buttons .nav-pill-mobile{ display:block !important; }
        .navbar-mobile-close-btn:hover{ background:rgba(255,255,255,0.14); border-color:rgba(255,255,255,0.35); }
        .navbar-mobile-close-btn:active{ background:rgba(255,255,255,0.2); }
        .nav-pill-mobile{
          display:block; text-align:left; border-radius:10px;
          padding:14px 18px !important; font-size:15px !important; font-weight:600;
          color:#fff !important; background:#000 !important;
          border:1px solid rgba(255,255,255,0.25);
          text-decoration:none; transition:background 0.2s, border-color 0.2s, color 0.2s;
        }
        .nav-pill-mobile:hover{ background:#111 !important; border-color:rgba(255,255,255,0.4); color:#fff !important; }
        .btn-cta-mobile{
          margin-top:16px; padding:14px 20px !important; font-size:15px !important; font-weight:700;
          justify-content:center; border-width:2px;
          background:#000 !important; color:#fff !important;
          border:1px solid rgba(255,255,255,0.3) !important;
          box-shadow:0 4px 16px rgba(0,0,0,0.3) !important;
        }
        .btn-cta-mobile:hover{ background:#111 !important; border-color:rgba(255,255,255,0.5) !important; box-shadow:0 6px 24px rgba(0,0,0,0.4) !important; }

        /* Otimização mobile: circuito hero estático (sem animação/blur) para evitar travamentos */
        @media (max-width: 768px){
          .hero-circuit-glow,.hero-circuit-line,.hero-circuit-pad{ animation:none !important; }
          .hero-circuit-glow{ filter:none !important; opacity:0.7; }
          .hero-circuit-svg{ contain:strict; }
        }
        /* Carrossel: camada GPU e contain para menos repaint */
        .carousel-track{
          will-change:transform;
          backface-visibility:hidden;
          contain:layout style;
        }
        @media (max-width: 768px){
          .navbar-mobile-btn{ display:flex !important; }
          .navbar-desktop{ display:none !important; }
          .navbar-wrap{ padding:10px 14px !important; flex-wrap:nowrap; }
          .navbar-wrap .nav-logo-txt{ font-size:0; }
          .header-outer{ width:calc(100% - 24px) !important; top:10px !important; }
          .hero-grid{ padding-top:88px !important; }
          .product-card-grid{ grid-template-columns:1fr !important; }
          .product-card-grid .product-card-text{ padding:28px 20px !important; }
          .product-card-grid .product-card-logo{ border-left:none !important; border-top:1px solid rgba(255,255,255,0.05) !important; padding:28px 20px !important; min-height:200px; }
          .product-card-grid .product-card-logo .product-logo-box{ padding:24px 32px !important; }
          .contact-grid{ grid-template-columns:1fr !important; gap:32px !important; }
          .contact-form-grid{ grid-template-columns:1fr !important; }
          .contact-form-wrap{ padding:24px !important; }
          .section-contato{ padding:48px 16px !important; }
          /* Contato mobile: esconder fundos decorativos (grid/listras/pontos) para aliviar GPU */
          .section-contato .contact-bg-grid,
          .section-contato .contact-bg-stream,
          .section-contato .contact-bg-dot{ display:none !important; }
          .section-produtos{ padding:48px 16px !important; }
          .carousel-track{ animation-duration:35s; }
        }
      `}</style>

      <NavBar />

      <main>
        {/* HERO - banner em 100% da tela */}
        <section
          className="hero-grid"
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '100px 24px 80px',
            boxSizing: 'border-box',
          }}
        >
          {/* Banner de fundo (imagem otimizada pelo Next, semi-transparente) */}
          <div style={{ position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden' }}>
            <Image
              src="/images/banner.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="hero-bg-img"
              style={{ objectFit:'cover',objectPosition:'center',opacity:0.04 }}
              loading="lazy"
            />
          </div>
          <div style={{
            position:'absolute',inset:0,pointerEvents:'none',
            background:'radial-gradient(ellipse 55% 60% at 15% 60%,rgba(34,197,94,0.1) 0%,transparent 65%), radial-gradient(ellipse 45% 50% at 85% 35%,rgba(59,130,246,0.08) 0%,transparent 65%)',
          }}/>
          {/* Circuitos - traços curvos estilo PCB + brilho percorrendo */}
          <svg className="hero-circuit-svg" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.75 }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="hero-circuit-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* Camada de brilho (por cima do traço, animada igual) */}
            <path className="hero-circuit-glow" d="M0 140 Q200 140 320 180 T520 260 T800 320 L1200 320" />
            <path className="hero-circuit-glow hero-circuit-glow-2" d="M0 420 Q180 420 300 480 T500 560 T750 620 L1200 620" />
            <path className="hero-circuit-glow" d="M1200 100 Q900 100 700 180 T400 260 L100 260 Q-20 260 0 400" />
            <path className="hero-circuit-glow hero-circuit-glow-2" d="M150 0 L150 200 Q150 320 280 400 L500 400" />
            <path className="hero-circuit-glow" d="M600 800 L600 500 Q600 380 450 300 L200 300" />
            {/* Traços curvos (trilhas estilo placa de circuito) */}
            <path className="hero-circuit-line" d="M0 140 Q200 140 320 180 T520 260 T800 320 L1200 320" />
            <path className="hero-circuit-line hero-circuit-line-2" d="M0 420 Q180 420 300 480 T500 560 T750 620 L1200 620" />
            <path className="hero-circuit-line" d="M1200 100 Q900 100 700 180 T400 260 L100 260 Q-20 260 0 400" />
            <path className="hero-circuit-line hero-circuit-line-2" d="M150 0 L150 200 Q150 320 280 400 L500 400" />
            <path className="hero-circuit-line" d="M600 800 L600 500 Q600 380 450 300 L200 300" />
            <path className="hero-circuit-line hero-circuit-line-2" d="M1000 0 L1000 220 Q1000 340 850 440 L1200 520" />
            <path className="hero-circuit-line" d="M0 580 Q250 580 400 520 T700 440 L950 440" />
            {/* Pads (pontos de solda / conexão) */}
            <rect className="hero-circuit-pad" x="316" y="176" width="10" height="10" rx="2" />
            <rect className="hero-circuit-pad hero-circuit-pad-2" x="496" y="256" width="10" height="10" rx="2" />
            <rect className="hero-circuit-pad" x="776" y="316" width="10" height="10" rx="2" />
            <rect className="hero-circuit-pad hero-circuit-pad-2" x="296" y="476" width="8" height="8" rx="2" />
            <rect className="hero-circuit-pad" x="596" y="496" width="10" height="10" rx="2" />
            <rect className="hero-circuit-pad hero-circuit-pad-2" x="146" y="396" width="8" height="8" rx="2" />
            <rect className="hero-circuit-pad" x="438" y="296" width="8" height="8" rx="2" />
            <rect className="hero-circuit-pad hero-circuit-pad-2" x="846" y="436" width="10" height="10" rx="2" />
          </svg>
          <div style={{ maxWidth:1060, margin:'0 auto', position:'relative', width: '100%' }}>
            <h1 className="fd" style={{
              fontSize:'clamp(34px,4.5vw,52px)',fontWeight:700,
              lineHeight:1.12,letterSpacing:'-0.025em',
              maxWidth:620,marginBottom:20,
            }}>
              Software que sustenta{' '}
              <span style={{ color:'#22c55e' }}>seu negócio</span>
            </h1>
            <p style={{ fontSize:16,color:'#777',maxWidth:480,lineHeight:1.68,marginBottom:38 }}>
              Desenvolvemos SaaS, sistemas sob medida e landing pages para marcas que precisam de tecnologia séria. Do agro à indústria.
            </p>
            <div style={{ display:'flex',gap:14,flexWrap:'wrap' }}>
              <a href="#contato" className="btn-cta btn-cta-hero">
                Falar com a Pilar Tec
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                </svg>
              </a>
              <a href="#servicos" className="btn-outline btn-outline-hero">Ver serviços</a>
            </div>

            <div style={{ marginTop:68,paddingTop:34,borderTop:'1px solid rgba(255,255,255,0.06)',display:'flex',gap:44,flexWrap:'wrap' }}>
              {[['3+','Empresas atendidas'],['1','SaaS em produção'],['100%','Foco no resultado']].map(([n,l])=>(
                <div key={l}>
                  <div className="fd grad-text" style={{ fontSize:32,fontWeight:700,lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:12,color:'#444',marginTop:6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVIÇOS - verde transparente com preto + circuitos (estilo diferente do banner) */}
        <section id="servicos" className="section-servicos" style={{
          padding: '96px 24px',
          background: 'linear-gradient(180deg, rgba(15,81,50,0.75) 0%, rgba(8,24,16,0.9) 40%, rgba(5,5,5,0.97) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Leve brilho verde */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 40% at 50% 20%, rgba(34,197,94,0.12) 0%, transparent 50%)', pointerEvents: 'none' }} />
          {/* Circuitos - traços retos (horizontal/vertical), estilo diagrama - diferente do banner */}
          <svg className="svc-circuit-svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.8 }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <g strokeLinecap="square" strokeLinejoin="miter">
              <path className="svc-circuit-line" d="M0 200 H400 V320 H200 V480 H600 V600 H0" />
              <path className="svc-circuit-line svc-circuit-line-2" d="M1200 100 V280 H800 V400 H1000 V560 H1200" />
              <path className="svc-circuit-line" d="M150 0 V160 H350 V0" />
              <path className="svc-circuit-line svc-circuit-line-2" d="M600 800 V620 H900 V480 H700 V800" />
              <path className="svc-circuit-line" d="M0 520 H280 V680 H1200" />
              <path className="svc-circuit-line svc-circuit-line-2" d="M500 400 H750 V240 H950 V120 H1200" />
              <path className="svc-circuit-line" d="M1200 640 H980 V720 H1200" />
            </g>
            <circle className="svc-circuit-dot" cx="400" cy="200" r="3" />
            <circle className="svc-circuit-dot svc-circuit-dot-2" cx="200" cy="320" r="2.5" />
            <circle className="svc-circuit-dot" cx="600" cy="480" r="3" />
            <circle className="svc-circuit-dot svc-circuit-dot-2" cx="800" cy="100" r="2.5" />
            <circle className="svc-circuit-dot" cx="280" cy="520" r="3" />
            <circle className="svc-circuit-dot svc-circuit-dot-2" cx="750" cy="240" r="2.5" />
          </svg>
          <div style={{ maxWidth: 1060, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ marginBottom: 56, textAlign: 'center' }}>
              <div className="svc-eyebrow fd">O que fazemos</div>
              <h2 className="fd svc-title">Da ideia ao produto</h2>
              <p className="svc-desc" style={{ margin: '0 auto' }}>SaaS próprio, sistemas customizados e landing pages que entregam resultado real.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {SERVICES.map(s => (
                <Card3D key={s.title} className="svc-card">
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`, borderRadius: '12px 12px 0 0' }} />
                  <div style={{ width: 48, height: 48, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, background: `${s.accent}14`, border: `1px solid ${s.accent}30`, color: s.accent, position: 'relative', zIndex: 2 }}>
                    {s.icon}
                  </div>
                  <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: s.accent, background: `${s.accent}12`, border: `1px solid ${s.accent}28`, padding: '4px 10px', borderRadius: 100, marginBottom: 14, position: 'relative', zIndex: 2 }}>
                    {s.highlight}
                  </span>
                  <h3 className="fd" style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 10, color: '#0f0f0f', position: 'relative', zIndex: 2 }}>{s.title}</h3>
                  <p style={{ color: '#444', fontSize: 14, lineHeight: 1.65, position: 'relative', zIndex: 2 }}>{s.description}</p>
                </Card3D>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUTO */}
        <section id="produtos" className="section-produtos" style={{ padding:'88px 24px',borderTop:'1px solid rgba(255,255,255,0.05)',background:'#0c0c0c' }}>
          <div style={{ maxWidth:1060,margin:'0 auto' }}>
            <div style={{ marginBottom:48 }}>
              <div className="eyebrow">Nossos produtos</div>
              <h2 className="fd" style={{ fontSize:'clamp(24px,3vw,34px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:10 }}>SaaS desenvolvidos pela Pilar Tec</h2>
              <p style={{ color:'#555',fontSize:15,maxWidth:420,lineHeight:1.6 }}>Produtos prontos para escalar, com rigor técnico e foco no usuário final.</p>
            </div>

            {PRODUCTS.map(p=>(
              <Card3D key={p.name} className="product-card" style={{ maxWidth:900 }}>
                <div style={{ position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,#22c55e77,transparent)',zIndex:2 }}/>
                <div className="product-card-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1fr' }}>
                  {/* left */}
                  <div className="product-card-text" style={{ padding:'44px 40px',display:'flex',flexDirection:'column',justifyContent:'space-between',position:'relative',zIndex:2 }}>
                    <div style={{ position:'absolute',top:-60,left:-60,width:280,height:280,background:'radial-gradient(circle,rgba(34,197,94,0.07) 0%,transparent 65%)',pointerEvents:'none' }}/>
                    <div>
                      <div style={{ display:'inline-block',fontSize:10,fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#22c55e',background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.18)',padding:'4px 11px',borderRadius:100,marginBottom:16 }}>
                        {p.tag}
                      </div>
                      <h3 className="fd" style={{ fontSize:30,fontWeight:700,letterSpacing:'-0.025em',marginBottom:12 }}>{p.name}</h3>
                      <p style={{ color:'#666',fontSize:14,lineHeight:1.68,marginBottom:24 }}>{p.description}</p>
                      <ul style={{ listStyle:'none',display:'flex',flexDirection:'column',gap:8,marginBottom:32 }}>
                        {p.features.map(f=>(
                          <li key={f} style={{ display:'flex',alignItems:'center',gap:9,color:'#aaa',fontSize:13 }}>
                            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2.5} style={{ flexShrink:0 }}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" style={{
                      display:'inline-flex',alignItems:'center',gap:8,
                      background:'rgba(34,197,94,0.1)',color:'#22c55e',
                      fontSize:13,fontWeight:600,
                      padding:'11px 20px',borderRadius:9,
                      border:'1px solid rgba(34,197,94,0.22)',
                      textDecoration:'none',transition:'background 0.2s',width:'fit-content',
                    }}
                      onMouseEnter={e=>e.currentTarget.style.background='rgba(34,197,94,0.18)'}
                      onMouseLeave={e=>e.currentTarget.style.background='rgba(34,197,94,0.1)'}
                    >
                      Acessar plataforma
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                      </svg>
                    </a>
                  </div>
                  {/* right logo */}
                  <div className="product-card-logo" style={{
                    borderLeft:'1px solid rgba(255,255,255,0.05)',
                    background:'linear-gradient(135deg,#111 0%,#0f0f0f 100%)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    padding:44,position:'relative',overflow:'hidden',
                  }}>
                    <div style={{ position:'absolute',inset:0,background:'radial-gradient(circle at 50% 50%,rgba(34,197,94,0.05) 0%,transparent 60%)' }}/>
                    <div className="product-logo-box" style={{
                      background:'#1c1c1c',border:'1px solid rgba(255,255,255,0.07)',
                      borderRadius:16,padding:'36px 48px',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      position:'relative',zIndex:2,
                      boxShadow:'0 20px 60px rgba(0,0,0,0.6)',
                    }}>
                      <Image src={p.logoPath} alt={p.name} width={210} height={90} style={{ maxHeight:78,width:'auto',objectFit:'contain' }} unoptimized/>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </section>

        {/* PARCEIROS CARROSSEL */}
        <section id="parceiros" style={{ padding:'88px 0',borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth:1060,margin:'0 auto',padding:'0 24px',marginBottom:44 }}>
            <div className="eyebrow">Parceiros</div>
            <h2 className="fd" style={{ fontSize:'clamp(24px,3vw,34px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:10 }}>Marcas que confiam na Pilar Tec</h2>
            <p style={{ color:'#555',fontSize:15,maxWidth:400,lineHeight:1.6 }}>Empresas que contam com a nossa tecnologia para software e presença digital.</p>
          </div>
          <div className="carousel-wrap" style={{ overflow:'hidden',maskImage:'linear-gradient(90deg,transparent 0%,black 10%,black 90%,transparent 100%)',WebkitMaskImage:'linear-gradient(90deg,transparent 0%,black 10%,black 90%,transparent 100%)',contain:'layout style' }}>
            <div className="carousel-track">
              {[...PARTNERS,...PARTNERS].map((p,i)=>(
                <div key={i} className="carousel-item" style={{
                  background:'#111',border:'1px solid rgba(255,255,255,0.07)',
                  borderRadius:12,padding:'22px 36px',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  minWidth:190,height:96,flexShrink:0,
                }}>
                  {p.href
                    ? <a href={p.href} target="_blank" rel="noopener noreferrer" style={{ display:'flex' }}>
                        <Image src={p.logoPath} alt={p.name} width={150} height={58} sizes="(max-width: 768px) 100px, 150px" style={{ maxHeight:50,width:'auto',objectFit:'contain' }} loading="lazy" />
                      </a>
                    : <Image src={p.logoPath} alt={p.name} width={150} height={58} sizes="(max-width: 768px) 100px, 150px" style={{ maxHeight:50,width:'auto',objectFit:'contain' }} loading="lazy" />
                  }
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTATO - fundo tema tecnologia com efeito */}
        <section id="contato" className="section-contato" style={{
          padding: '88px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'linear-gradient(180deg, rgba(8,20,14,0.98) 0%, rgba(5,5,8,0.99) 50%, #050508 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(34,197,94,0.08) 0%, transparent 55%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 80% 70%, rgba(59,130,246,0.05) 0%, transparent 50%)', pointerEvents: 'none' }} />
          <div className="contact-bg-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.8 }} />
          <div className="contact-bg-stream" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
          <div className="contact-bg-dot" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1060, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="contact-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1.15fr',gap:64,alignItems:'start' }}>

              {/* left */}
              <div>
                <div className="eyebrow">Contato</div>
                <h2 className="fd" style={{ fontSize:'clamp(24px,3vw,34px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:14 }}>
                  Vamos construir algo juntos?
                </h2>
                <p style={{ color:'#555',fontSize:15,lineHeight:1.65,marginBottom:36 }}>
                  Conte sua ideia. A Pilar Tec cuida da parte técnica, do início ao deploy.
                </p>

                <div style={{ display:'flex',flexDirection:'column',gap:10,marginBottom:36 }}>
                  <a href="mailto:pilartec.startup@gmail.com" className="qcbtn">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                    <div>
                      <div style={{ fontSize:10,color:'#444',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:2 }}>E-mail</div>
                      <div>pilartec.startup@gmail.com</div>
                    </div>
                  </a>
                  <a href="https://wa.me/556493247562?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20Pilar%20Tec." target="_blank" rel="noopener noreferrer" className="qcbtn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#22c55e">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <div>
                      <div style={{ fontSize:10,color:'#444',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:2 }}>WhatsApp</div>
                      <div>+55 64 9324-7562</div>
                    </div>
                  </a>
                  <a href="https://www.instagram.com/pilar.tec/" target="_blank" rel="noopener noreferrer" className="qcbtn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#3b82f6">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <div>
                      <div style={{ fontSize:10,color:'#444',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:2 }}>Instagram</div>
                      <div>@pilar.tec</div>
                    </div>
                  </a>
                </div>

                <div style={{ display:'flex',alignItems:'center',gap:10,background:'rgba(34,197,94,0.05)',border:'1px solid rgba(34,197,94,0.13)',borderRadius:10,padding:'12px 16px' }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                  </svg>
                  <span style={{ fontSize:13,color:'#666' }}>Resposta em até <strong style={{ color:'#ccc' }}>24 horas</strong> úteis</span>
                </div>
              </div>

              {/* right form */}
              <div className="contact-form-wrap" style={{ background:'#111',border:'1px solid rgba(255,255,255,0.07)',borderRadius:18,padding:'36px' }}>
                <div style={{ marginBottom:26 }}>
                  <h3 className="fd" style={{ fontSize:19,fontWeight:600,letterSpacing:'-0.02em',marginBottom:5 }}>Envie uma mensagem</h3>
                  <p style={{ fontSize:13,color:'#444' }}>Preencha abaixo e entraremos em contato.</p>
                </div>
                <form style={{ display:'flex',flexDirection:'column',gap:16 }} onSubmit={handleSubmit}>
                  <div className="contact-form-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
                    <div>
                      <label className="flabel">Nome</label>
                      <input className="cfield" type="text" placeholder="Seu nome" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required/>
                    </div>
                    <div>
                      <label className="flabel">Empresa</label>
                      <input className="cfield" type="text" placeholder="Nome da empresa" value={form.empresa} onChange={e=>setForm(f=>({...f,empresa:e.target.value}))}/>
                    </div>
                  </div>
                  <div>
                    <label className="flabel">E-mail</label>
                    <input className="cfield" type="email" placeholder="seu@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required/>
                  </div>
                  <div>
                    <label className="flabel">Serviço de interesse</label>
                    <select className="cfield" value={form.reason} onChange={e=>setForm(f=>({...f,reason:e.target.value}))}>
                      <option value="">Selecione um serviço...</option>
                      <option value="SaaS / Produto digital">SaaS / Produto digital</option>
                      <option value="Sistema sob medida">Sistema sob medida</option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="Consultoria / Outro">Consultoria / Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="flabel">Mensagem</label>
                    <textarea className="cfield" rows={4} placeholder="Conte um pouco sobre seu projeto ou necessidade..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} required/>
                  </div>
                  {formStatus === "error" && formError && <p style={{ fontSize:13, color:"#ef4444" }}>{formError}</p>}
                  {formStatus === "success" && <p style={{ fontSize:13, color:"#22c55e" }}>Mensagem enviada! Entraremos em contato em breve.</p>}
                  <button type="submit" className="csub" disabled={formStatus === "loading"}>
                    {formStatus === "loading" ? "Enviando..." : (
                      <>
                        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                        </svg>
                        Enviar mensagem
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop:'1px solid rgba(255,255,255,0.06)', background:'#060606', padding:'48px 24px 32px' }}>
        <div style={{ maxWidth:1060, margin:'0 auto' }}>
          <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:28, marginBottom:28 }}>
            <Link href="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none' }}>
              <Image src="/images/LOGOPILARTECBRANCA.png" alt="Pilar Tec" width={160} height={40} style={{ height:42, width:'auto', opacity:0.9 }} />
              <span className="fd" style={{ fontSize:15, fontWeight:600, color:'#888', letterSpacing:'-0.02em' }}>Pilar Tec</span>
            </Link>
            <nav style={{ display:'flex', alignItems:'center', gap:24 }}>
              <a href="#servicos" style={{ fontSize:13, color:'#666', textDecoration:'none', transition:'color 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.color='#aaa';}} onMouseLeave={e=>{e.currentTarget.style.color='#666';}}>Serviços</a>
              <a href="#produtos" style={{ fontSize:13, color:'#666', textDecoration:'none', transition:'color 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.color='#aaa';}} onMouseLeave={e=>{e.currentTarget.style.color='#666';}}>Produtos</a>
              <a href="#parceiros" style={{ fontSize:13, color:'#666', textDecoration:'none', transition:'color 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.color='#aaa';}} onMouseLeave={e=>{e.currentTarget.style.color='#666';}}>Parceiros</a>
              <a href="#contato" style={{ fontSize:13, color:'#666', textDecoration:'none', transition:'color 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.color='#aaa';}} onMouseLeave={e=>{e.currentTarget.style.color='#666';}}>Contato</a>
              <a href="https://www.instagram.com/pilar.tec/" target="_blank" rel="noopener noreferrer" style={{ fontSize:13, color:'#666', textDecoration:'none', transition:'color 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.color='#aaa';}} onMouseLeave={e=>{e.currentTarget.style.color='#666';}}>Instagram</a>
            </nav>
          </div>
          <div style={{ paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.05)', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12 }}>
            <span style={{ fontSize:12, color:'#3a3a3a' }}>© {new Date().getFullYear()} Pilar Tec. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>

      {/* Botão fixo WhatsApp */}
      <a
        href="https://wa.me/556493247562?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20Pilar%20Tec."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Contato pelo WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}