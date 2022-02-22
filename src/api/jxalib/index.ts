export const library = `
${pascalCase.toString()}
${extractId.toString()}
`;

function pascalCase(s: string) {
  return (s.match(/[a-zA-Z0-9]+/g) || []).map((w) => `${w[0].toUpperCase()}${w.slice(1)}`).join("");
}
function extractId(s: string | undefined) {
  return (
    s
      ?.split("byId")
      .reverse()[0]
      .match(/^\("(.+)"\)$/)
      ?.reverse()[0] ?? null
  );
}
