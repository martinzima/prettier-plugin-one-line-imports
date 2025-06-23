import type { AstPath, Doc, Printer } from 'prettier'

declare global {
  type TCallbackPrint = (path: AstPath) => Doc
}

declare module 'prettier/plugins/estree' {
  const printers: {
    estree: Printer
  }
}
