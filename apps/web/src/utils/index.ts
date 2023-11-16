export function clsx(...classes: (string | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
