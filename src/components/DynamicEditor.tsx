"use client";

import dynamic from "next/dynamic";

export const DynamicEditor = dynamic(() => import("./PostEditor"), {
  ssr: false,
});
