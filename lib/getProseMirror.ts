export default function getProseMirror() {
  const elements = document.getElementsByClassName('ProseMirror');
  if (elements.length > 1) {
    console.error(
      "There is more than one HTML element with the class 'ProseMirror'!"
    );
  }
  const prosemirror = elements[0] as HTMLDivElement;
  return prosemirror;
}
