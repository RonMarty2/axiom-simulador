import type { PlanPersonalizado } from "./types";

export const axiomPDF = {
  generatePlanPDF(plan: PlanPersonalizado): Buffer {
    // Mock PDF generation - returns a minimal PDF-like buffer
    const pdfContent = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/Resources<<>>>>endobj
xref
0 4
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
trailer<</Size 4/Root 1 0 R>>
startxref
200
%%EOF`;
    return Buffer.from(pdfContent, "utf-8");
  },

  async savePlanToStorage(
    buffer: Buffer,
    planId: string
  ): Promise<string> {
    // Mock storage - in production would save to S3/Vercel Blob Storage
    const fileName = `plan-${planId}.pdf`;
    return `/api/axiom/storage/${fileName}`;
  },
};
