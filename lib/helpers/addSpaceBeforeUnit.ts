export function addSpaceBeforeUnit(value: string): string {
  return value.replace(/(\d)([a-zA-Z])/g, '$1 $2');
}
