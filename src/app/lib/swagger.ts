import { createSwaggerSpec } from "next-swagger-doc";

export async function getApiDocs() {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: "src/app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Lambeth Site Notice CMS API",
        version: "1.0",
      },
    },
  });

  return spec;
}
