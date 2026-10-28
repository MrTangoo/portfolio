import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StackExplorer } from "@/components/sections/stack/StackExplorer";
import { stack } from "@/content/profile";

describe("StackExplorer", () => {
  it("shows the first category by default", () => {
    render(<StackExplorer categories={stack} />);
    const first = stack[0];
    if (!first) throw new Error("stack is empty");
    expect(screen.getByRole("tab", { name: new RegExp(first.label) })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("React");
  });

  it("switches category on click", () => {
    render(<StackExplorer categories={stack} />);
    fireEvent.click(screen.getByRole("tab", { name: /Database & ORM/ }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("PostgreSQL");
    expect(screen.getByRole("tabpanel")).not.toHaveTextContent("React");
  });

  it("supports arrow-key navigation between tabs", () => {
    render(<StackExplorer categories={stack} />);
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
    render(<StackExplorer categories={stack} />);
    expect(screen.getAllByRole("img", { name: "Technologie favorite" }).length).toBeGreaterThan(0);
  });
});
