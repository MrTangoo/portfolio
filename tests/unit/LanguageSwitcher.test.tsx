import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { DictionaryProvider } from "@/i18n/provider";
import { fr } from "@/i18n/dictionaries/fr";

describe("language menu", () => {
  it("hides closed choices from focus and supports keyboard navigation", () => {
    render(
      <DictionaryProvider dict={fr}>
        <LanguageSwitcher />
      </DictionaryProvider>,
    );
    const toggle = screen.getByRole("button", { name: "Choisir la langue FR" });
    const menu = screen.getByRole("menu", { hidden: true });
    expect(menu).toHaveAttribute("inert");
    expect(menu).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    fireEvent.keyDown(toggle, { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: "Français" })).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: "English" })).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: "End" });
    expect(screen.getByRole("menuitem", { name: "Deutsch" })).toHaveFocus();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggle).toHaveFocus();
    expect(menu).toHaveAttribute("inert");
  });
});
