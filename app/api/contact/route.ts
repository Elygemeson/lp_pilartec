import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL não configurada");
    return NextResponse.json(
      { error: "Serviço de contato não configurado." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, reason, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim() || !reason?.trim()) {
      return NextResponse.json(
        { error: "Nome, e-mail, motivo de contato e mensagem são obrigatórios." },
        { status: 400 }
      );
    }

    const fields: { name: string; value: string; inline?: boolean }[] = [
      { name: "Nome", value: name.trim(), inline: true },
      { name: "E-mail", value: email.trim(), inline: true },
      { name: "Número", value: phone?.trim() || "—", inline: true },
      { name: "Motivo de contato", value: reason.trim(), inline: true },
      { name: "Mensagem", value: message.trim(), inline: false },
    ];

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "📩 Novo contato - Landing Pilar Tec",
            color: 0x0f172a, // slate-900
            fields,
            footer: {
              text: new Date().toLocaleString("pt-BR"),
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Discord webhook error:", response.status, text);
      return NextResponse.json(
        { error: "Falha ao enviar mensagem. Tente novamente." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
