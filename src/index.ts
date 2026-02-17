import type { Plugin, Parser, Printer, SupportLanguage, SupportOption, AstPath, Doc, ParserOptions } from 'prettier';
import { version as prettierVersion } from 'prettier';
import { printers as estreePrinters } from 'prettier/plugins/estree';
import { parsers as typescriptParsers } from 'prettier/plugins/typescript';

// Compatibility check for Prettier version >= 3
try {
  const majorVersion = parseInt(prettierVersion.split('.')[0], 10);
  if (majorVersion < 3) {
    throw new Error(
      `prettier-plugin-one-line-imports requires Prettier version 3.0.0 or higher. ` +
        `You are using version ${prettierVersion}. ` +
        `Please upgrade Prettier to use this plugin.`
    );
  }
} catch (error) {
  throw new Error(
    `prettier-plugin-one-line-imports failed to parse Prettier version. ` +
      `Please use Prettier 3.0.0 or higher to use this plugin.`
  );
}

/**
 * Recursively replaces Line elements with a single space in Doc arrays
 * but preserves comments and their formatting
 */
function removeLinesFromDoc(doc: Doc): Doc {
  // If doc is a string, return as is
  if (typeof doc === 'string') {
    return doc;
  }

  if (Array.isArray(doc)) {
    return doc.map((item) => {
      if (typeof item === 'object' && item !== null && 'type' in item) {
        if (item.type === 'line') {
          return ' ';
        }
      }
      return removeLinesFromDoc(item);
    });
  }

  if (typeof doc === 'object' && doc !== null && 'type' in doc) {
    const docCommand = doc as any;

    if (docCommand.contents) {
      return {
        ...docCommand,
        contents: removeLinesFromDoc(docCommand.contents)
      };
    }

    if (docCommand.type === 'fill' && docCommand.parts) {
      return {
        ...docCommand,
        parts: removeLinesFromDoc(docCommand.parts)
      };
    }

    if (docCommand.type === 'if-break') {
      return {
        ...docCommand,
        breakContents: removeLinesFromDoc(docCommand.breakContents),
        flatContents: removeLinesFromDoc(docCommand.flatContents)
      };
    }

    if (docCommand.type === 'group' && docCommand.expandedStates) {
      return {
        ...docCommand,
        expandedStates: removeLinesFromDoc(docCommand.expandedStates)
      };
    }

    return docCommand;
  }

  return doc;
}

/**
 * Returns true if any import specifier has comments
 */
function hasCommentsInSpecifiers(node: any): boolean {
  if (node.specifiers) {
    for (const specifier of node.specifiers) {
      if (specifier.comments && specifier.comments.length > 0) {
        return true;
      }
    }
  }
  return false;
}

const languages: SupportLanguage[] = [
  {
    name: 'TypeScript',
    parsers: ['typescript'],
    extensions: ['.ts'],
    vscodeLanguageIds: ['typescript']
  },
  {
    name: 'TypeScript JSX',
    parsers: ['typescript-jsx'],
    extensions: ['.tsx'],
    vscodeLanguageIds: ['typescriptreact']
  }
];

const parsers: Record<string, Parser> = {
  typescript: { ...typescriptParsers.typescript },
  'typescript-jsx': { ...typescriptParsers.typescript }
};

const printers: Record<string, Printer> = {
  estree: {
    ...estreePrinters.estree,
    print: (
      path: AstPath<any>,
      options: ParserOptions<any>,
      print: (path: AstPath<any>) => Doc,
      args?: unknown
    ): Doc => {
      const node = path.getNode();
      let printed = estreePrinters.estree.print(path, options, print, args);

      if (node.type === 'ImportDeclaration') {
        if (!hasCommentsInSpecifiers(node)) {
          printed = removeLinesFromDoc(printed);
        }
      }
      return printed;
    }
  }
};

const plugin: Plugin = {
  parsers,
  languages,
  printers
};

export default plugin;
