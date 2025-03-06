"use client";

import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";

export default function BlockEditor({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const editor = useCreateBlockNote({});
  const handleChange = () => {
    const content = editor.document.map((block) => block.content);
    console.log(content);
    onChange(content);
  };
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex border rounded bg-background p-1 gap-1">
        <div className="flex">
          <Button
            className="b"
            variant="ghost"
            onClick={() => editor.toggleStyles({ bold: true })}
          >
            <span className="font-bold">B</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => editor.toggleStyles({ italic: true })}
          >
            <span className="italic">I</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => editor.toggleStyles({ underline: true })}
          >
            <span className="underline">U</span>
          </Button>
        </div>
        <Separator orientation="vertical" />
      </div>
      <div className="border rounded border-accent h-full p-2">
        <BlockNoteView onChange={handleChange} theme="light" editor={editor} />
      </div>
    </div>
  );
}
