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

  it("should keep single import on one line", async () => {
    const input = `import { something } from "some-package";`;
    const expected = `import { something } from "some-package";\n`;

    expect(await format(input)).toBe(expected);
  });

  it("should convert multi-line import to single line", async () => {
    const input = `import {
  something,
  anotherThing,
  thirdThing
} from "some-package";`;

    const expected = `import { something, anotherThing, thirdThing } from "some-package";\n`;

    expect(await format(input)).toBe(expected);
  });

  it("should handle default imports", async () => {
    const input = `import defaultExport,
{
  namedExport1,
  namedExport2
} from "some-package";`;

    const expected = `import defaultExport, { namedExport1, namedExport2 } from "some-package";\n`;

    expect(await format(input)).toBe(expected);
  });

  it("should handle type imports", async () => {
    const input = `import type {
  SomeType,
  AnotherType
} from "types-package";`;

    const expected = `import type { SomeType, AnotherType } from "types-package";\n`;

    expect(await format(input)).toBe(expected);
  });

  it("should handle mixed type and value imports", async () => {
    const input = `import {
  valueExport,
  type TypeExport
} from "mixed-package";`;

    const expected = `import { valueExport, type TypeExport } from "mixed-package";\n`;

    expect(await format(input)).toBe(expected);
  });

  it("should handle multiple import statements", async () => {
    const input = `import { first } from "first-package";
import {
  second,
  third
} from "second-package";
import type { Fourth } from "third-package";`;

    const expected = `import { first } from "first-package";\nimport { second, third } from "second-package";\nimport type { Fourth } from "third-package";\n`;

    expect(await format(input)).toBe(expected);
  });

  it("should not affect non-import code", async () => {
    const input = `const someObject = {
  property1: "value1",
  property2: "value2"
};

function someFunction() {
  return "hello";
}`;

    const expected = `const someObject = {\n  property1: \"value1\",\n  property2: \"value2\",\n};\n\nfunction someFunction() {\n  return \"hello\";\n}\n`;

    expect(await format(input)).toBe(expected);
  });
});