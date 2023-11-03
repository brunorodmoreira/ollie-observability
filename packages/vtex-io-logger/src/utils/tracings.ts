export function getFunctionCaller() {
  const stack = new Error().stack?.split("\n");

  if (!stack) {
    return;
  }

  return stack[2].trim();
}
