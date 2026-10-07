"use client";

import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";

export default function Tex({ tex }: { tex: string }) {
  const html = useMemo(
    () => katex.renderToString(tex, { throwOnError: false, strict: "ignore", output: "html" }),
    [tex]
  );
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
