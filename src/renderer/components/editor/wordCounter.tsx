import { useCurrentEditor } from "@tiptap/react";
import React from "react";

export default function WordCounter () {
  const { editor } = useCurrentEditor();
  const charCount = editor?.storage.characterCount.characters();
  const wordCount = editor?.storage.characterCount.words();

  return <p style={{color:"GrayText",marginTop:"50px"}}>Character count: {charCount} Word Count: {wordCount}</p>;
};
