"use client";

// import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import dynamic from "next/dynamic";
import { SwaggerUIProps } from "swagger-ui-react";

type Props = {
  spec: Record<string, any>;
};

const DynamicSwaggerUI = dynamic(
  () =>
    import("swagger-ui-react").then(
      (mod) => mod.default as React.ComponentType<SwaggerUIProps>,
    ),
  {
    ssr: false,
    loading: () => <p>Loading Component...</p>,
  },
);

function ReactSwagger({ spec }: Props) {
  return <DynamicSwaggerUI spec={spec} />;
}

export default ReactSwagger;
