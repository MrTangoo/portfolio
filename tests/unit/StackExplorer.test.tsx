import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StackExplorer } from "@/components/sections/stack/StackExplorer";
import { fr } from "@/i18n/dictionaries/fr";
import { DictionaryProvider } from "@/i18n/provider";

const stack = fr.stack.categories;
const renderStack = () =>
  render(
    <DictionaryProvider dict={fr}>
      <StackExplorer categories={stack} />
    </DictionaryProvider>,
  );

describe("StackExplorer", () => {
  it("shows the first category by default", () => {
    renderStack();
    const first = stack[0];
    if (!first) throw new Error("stack is empty");
    expect(screen.getByRole("tab", { name: new RegExp(first.label) })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("React");
  });

  it("switches category on click", () => {
    renderStack();
    fireEvent.click(screen.getByRole("tab", { name: /Database & ORM/ }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("PostgreSQL");
    expect(screen.getByRole("tabpanel")).not.toHaveTextContent("React");
  });

  it("supports arrow-key navigation between tabs", () => {
    renderStack();
    const tabs = screen.getAllByRole("tab");
    const [first, second] = tabs;
    if (!first || !second) throw new Error("expected at least two tabs");

    first.focus();
    fireEvent.keyDown(first, { key: "ArrowDown" });
    expect(second).toHaveAttribute("aria-selected", "true");
    expect(second).toHaveFocus();

    fireEvent.keyDown(second, { key: "End" });
    expect(tabs.at(-1)).toHaveAttribute("aria-selected", "true");
  });

  it("marks favourite technologies", () => {
    renderStack();
    expect(screen.getAllByRole("img", { name: "Technologie favorite" }).length).toBeGreaterThan(0);
  });
});
