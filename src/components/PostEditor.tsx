"use client";

import dynamic from "next/dynamic";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

const DynamicEditor = dynamic(() => import("./BlockEditor"), {
  ssr: false,
});

export function PostEditor() {
  const [content, setContent] = useState<string>();

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <div className="flex-grow flex relative p-5 gap-8">
      <div className="flex flex-col gap-5 flex-grow">
        <div className="">
          <Input placeholder="Meaningful Title" />
        </div>
        <div className="flex flex-col flex-grow gap-5 border p-2 rounded">
          <Tabs className="flex-grow" defaultValue="write">
            <TabsList>
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write">
              <DynamicEditor onChange={setContent} />
            </TabsContent>
            <TabsContent value="preview">Your preview</TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="min-w-[25%]">
        <div className="flex items-center gap-2">
          <Button className="bg-accent text-black">
            <EyeIcon /> Preview
          </Button>
          <Button className="bg-accent text-black">Save Draft</Button>
          <Button className="bg-primary">Save</Button>
        </div>
      </div>
    </div>
  );
}
