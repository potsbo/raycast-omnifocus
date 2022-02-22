import { library } from "..";

test("pascalCase", () => {
  const input = "some name";
  const output = eval(`
    ${library}
    pascalCase("${input}");
  `);

  expect(output).toEqual("SomeName");
});

test("extractId", () => {
  const input = `Application("Calendar").calendars.byId("SOME-CALENDAR-ID-1234")`;
  const output = eval(`
    ${library}
    extractId(${JSON.stringify(input)});
  `);

  expect(output).toEqual("SOME-CALENDAR-ID-1234");
});

test("extractId complex", () => {
  const input = `Application("Calendar").calendars.byId("SOME-CALENDAR-ID-1234").events.byId("SOME-EVENT-ID-1234")`;
  const output = eval(`
    ${library}
    extractId(${JSON.stringify(input)});
  `);

  expect(output).toEqual("SOME-EVENT-ID-1234");
});

test("extractId malformed", () => {
  const input = `Application("Calendar").calendars.byId("SOME-CALENDAR-ID-1234").events.byId("SOME-EVENT-ID-1234").someProp()`;
  const output = eval(`
    ${library}
    extractId(${JSON.stringify(input)});
  `);

  expect(output).toEqual(null);
});

test("extractId undefined", () => {
    const output = eval(`
      ${library}
      extractId(undefined);
    `);
  
    expect(output).toEqual(null);
  });
  