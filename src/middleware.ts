// middleware.js
"use server";
import { NextResponse } from "next/server";
import subdomains from "../subdomains.json";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: any) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");

  // Se define una lista de dominios permitidos (incluyendo localhost y el dominio real)
  const allowedDomains = ["localhost:3000"];

  // Verificamos si el hostname actual está en la lista de dominios permitidos
  const isAllowedDomain = allowedDomains.some((domain) =>
    hostname.includes(domain),
  );

  // Extraemos el posible subdominio de la URL
  const subdomain = hostname.split(".")[0];

  // Si estamos en un dominio permitido y no es un subdominio, permitimos la solicitud
  if (isAllowedDomain && !subdomains.some((d) => d.subdomain === subdomain)) {
    return NextResponse.next();
  }

  const subdomainData = subdomains.find((d) => d.subdomain === subdomain);

  if (subdomainData) {
    // Reescribe la URL a una ruta dinámica basada en el subdominio
    console.log(subdomain, url.pathname);
    return NextResponse.rewrite(
      new URL(`/${subdomain}${url.pathname}`, req.url),
    );
  }

  return new Response(null, { status: 404 });
}
