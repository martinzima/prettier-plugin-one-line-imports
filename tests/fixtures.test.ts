import { describe, it, expect } from "vitest";
import prettier from "prettier";
import plugin from "../src/index.js";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

describe("prettier-plugin-one-line-imports", () => {
  const format = async (code: string) =>
    prettier.format(code, {
      parser: "typescript",
      plugins: [plugin],
      printWidth: 80,
    });

  it("should convert multi-line imports to single-line imports", async () => {
    const inputPath = join(process.cwd(), "tests", "fixtures", "multi-line-imports-input.tsx");
    const expectedPath = join(process.cwd(), "tests", "fixtures", "multi-line-imports-expected.tsx");

    const input = readFileSync(inputPath, "utf-8").replace(/\r\n/g, "\n");
    const expected = readFileSync(expectedPath, "utf-8").replace(/\r\n/g, "\n");

    const result = await format(input);

    expect(result).toBe(expected);
  });

  it("should preserve comments inside imports", async () => {
    const inputPath = join(process.cwd(), "tests", "fixtures", "with-comments.ts");
    const expectedPath = join(process.cwd(), "tests", "fixtures", "with-comments-expected.ts");

    const input = readFileSync(inputPath, "utf-8").replace(/\r\n/g, "\n");
    const expected = readFileSync(expectedPath, "utf-8").replace(/\r\n/g, "\n");

    const result = await format(input);

    expect(result).toBe(expected);
  });
});

describe("prettier-plugin-one-line-imports with fixtures", () => {
  const format = async (code: string) =>
    prettier.format(code, {
      parser: "typescript",
      plugins: [plugin],
      printWidth: 80,
    });

  it("should handle imports with comments correctly", async () => {
    const inputPath = join(process.cwd(), "tests", "fixtures", "with-comments.ts");
    const expectedPath = join(process.cwd(), "tests", "fixtures", "with-comments-expected.ts");

    const input = readFileSync(inputPath, "utf-8").replace(/\r\n/g, "\n");
    const expected = readFileSync(expectedPath, "utf-8").replace(/\r\n/g, "\n");

    const result = await format(input);

    expect(result).toBe(expected);
  });
});