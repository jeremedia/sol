import MoMABalanceText from "./moma-balance-text.js";

describe("BalanceText", () => {
  const balanceTextClassName = "balance-text";
  const shouldBalanceTextTests = [
    { input: "Judd", expected: false },
    { input: "a good day for books", expected: true },
    { input: "Feb 20–July 10", expected: true },
    { input: "Feb 20–July&nbsp;10", expected: true },
    { input: "Feb&nbsp;20–July&nbsp;10", expected: false },
    { input: "Feb 20–22", expected: true },
    { input: "Feb 20&ndash;22", expected: true },
    { input: "9:00–9:30", expected: false },
    { input: "9:00 AM–5:00 PM", expected: true },
    { input: "Fluvial metropolis", expected: false },
    { input: "Fluvial metro-polis", expected: true },
    { input: "I—am", expected: false },
    { input: "I—am—not", expected: true },
    { input: "I&mdash;am—not", expected: true },
    { input: "Judd is minimalist", expected: true },
    { input: "Judd&nbsp;is&nbsp;minimalist", expected: false },
    { input: "Felix Fen&shy;eon", expected: false },
    { input: "Design: <nobr>Now in Production</nobr>", expected: false },
    { input: "New York\n", expected: false },
    { input: "Graphic Design: <nobr>Now in Production</nobr>", expected: true },
  ];

  const momaBalanceText = new MoMABalanceText(balanceTextClassName);

  describe("shouldBalanceText", () => {
    shouldBalanceTextTests.forEach(({ input, expected }) => {
      test(`matches for input: ${input}`, () => {
        expect(momaBalanceText.shouldBalanceText(input)).toBe(expected);
      });
    });
  });

  describe("toggleBalanceTextClass", () => {
    shouldBalanceTextTests.forEach(({ input, expected }) => {
      test(`toggles for input: ${input}`, () => {
        expect(momaBalanceText.toggleBalanceTextClass(input)).toBe(
          expected ? balanceTextClassName : ""
        );
      });
    });
  });
});
