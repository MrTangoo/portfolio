import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InteractiveProvider } from "@/components/interactive/InteractiveProvider";
import { Header } from "@/components/layout/Header";
import { fr } from "@/i18n/dictionaries/fr";

const renderHeader = () =>
  render(
    <InteractiveProvider>
      <Header />
    </InteractiveProvider>,
  );

describe("Header", () => {
  it("renders every navigation anchor", () => {
    renderHeader();
    const nav = screen.getByRole("navigation", { name: "Navigation principale" });
    for (const item of fr.nav) {
      const link = nav.querySelector(`a[href="#${item.id}"]`);
      expect(link).not.toBeNull();
      expect(link).toHaveTextContent(item.label);
    }
  });

  it("toggles the mobile menu and closes it with Escape", () => {
    renderHeader();
    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Fermer le menu");
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
    expect(toggle).toHaveFocus();
  });
});
