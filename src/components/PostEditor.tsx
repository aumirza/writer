"use client";

import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

export default function PostEditor() {
  const editor = useCreateBlockNote({});
  return <BlockNoteView theme="light" className="h-full" editor={editor} />;
}
