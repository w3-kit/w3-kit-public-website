import { JsonLd } from "./JsonLd";

type ComponentJsonLdProps = {
  name: string;
  description: string;
};

export function ComponentJsonLd({ name, description }: ComponentJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name,
        description,
        programmingLanguage: "TypeScript",
        runtimePlatform: "React",
        codeRepository: "https://github.com/w3-kit/w3-kit-public-website",
      }}
    />
  );
}
