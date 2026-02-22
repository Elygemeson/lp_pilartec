"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const reason = formData.get("reason") as string;
    const message = formData.get("message") as string;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, reason, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Falha ao enviar. Tente novamente.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Erro de conexão. Tente novamente.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-4 text-left"
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300">
          Nome
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          disabled={status === "loading"}
          className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white disabled:opacity-60"
          placeholder="Seu nome"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300">
          E-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          disabled={status === "loading"}
          className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white disabled:opacity-60"
          placeholder="seu@email.com"
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-300">
          Número
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          disabled={status === "loading"}
          className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white disabled:opacity-60"
          placeholder="(00) 00000-0000"
        />
      </div>
      <div>
        <label htmlFor="contact-reason" className="block text-sm font-medium text-slate-300">
          Motivo de contato
        </label>
        <select
          id="contact-reason"
          name="reason"
          required
          disabled={status === "loading"}
          className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white disabled:opacity-60"
        >
          <option value="">Selecione...</option>
          <option value="Dúvida">Dúvida</option>
          <option value="Orçamento">Orçamento</option>
          <option value="Parceria">Parceria</option>
          <option value="Suporte">Suporte</option>
          <option value="Outro">Outro</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300">
          Mensagem
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          disabled={status === "loading"}
          className="mt-1 block w-full resize-y rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white disabled:opacity-60"
          placeholder="Conte sua ideia ou dúvida..."
        />
      </div>

      {status === "success" && (
        <p className="rounded-lg bg-green-900/40 px-4 py-3 text-sm text-green-200">
          Mensagem enviada! Entraremos em contato em breve.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-lg bg-red-900/40 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-white px-6 py-3 text-base font-medium text-slate-900 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
