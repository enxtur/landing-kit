/**
 * Returns `target` and `rel` props for anchor elements when the href is an
 * external URL (starts with http:// or https://).  For internal (relative or
 * hash) links an empty object is returned so spreading is always safe.
 */
export function linkProps(href: string) {
  const isExternal = /^https?:\/\//.test(href);
  return isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
