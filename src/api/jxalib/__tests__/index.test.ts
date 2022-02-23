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

test("paginate no param", () => {
  const input = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }];
  const output = eval(`
      ${library}
      const nodes = ${JSON.stringify(input)};
      pagenate(nodes, {}, (elm) => elm.id);
    `);

  expect(output).toEqual(input);
});

test("paginate normal param", () => {
  const input = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }];
  const output = eval(`
    ${library}
    const nodes = ${JSON.stringify(input)};
    pagenate(nodes, { after: 3, first: 2 }, (elm) => elm.id);
  `);

  expect(output).toEqual([{ id: 4 }, { id: 5 }]);
});

test("paginate no match", () => {
  const input = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }];
  const output = eval(`
    ${library}
    const nodes = ${JSON.stringify(input)};
    pagenate(nodes, { after: 100, first: 2 }, (elm) => elm.id);
  `);

  expect(output).toEqual([]);
});

test("paginate asks too many", () => {
  const input = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }];
  const output = eval(`
    ${library}
    const nodes = ${JSON.stringify(input)};
    pagenate(nodes, { after: 2, first: 100 }, (elm) => elm.id);
  `);

  expect(output).toEqual([{ id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }]);
});
