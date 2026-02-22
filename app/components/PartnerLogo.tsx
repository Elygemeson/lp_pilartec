"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function PartnerLogo({
  name,
  href,
  logoPath,
}: {
  name: string;
  href: string | null;
  logoPath: string;
}) {
  const [failed, setFailed] = useState(false);

  const content = (
    <span className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <span className="relative flex h-12 w-32 items-center justify-center">
        {!failed ? (
          <Image
            src={logoPath}
            alt={`Logo ${name}`}
            fill
            className="object-contain object-center"
            sizes="128px"
            unoptimized
            onError={() => setFailed(true)}
          />
        ) : null}
        <span
          className={`text-center text-sm font-semibold text-slate-600 ${failed ? "block" : "hidden"}`}
        >
          {name}
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-xl"
      >
        {content}
      </Link>
    );
  }
  return <div>{content}</div>;
}
