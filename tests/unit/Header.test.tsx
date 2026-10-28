import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout/Header";
import { NAV_ITEMS } from "@/content/site";

describe("Header", () => {
  it("renders every navigation anchor", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Navigation principale" });
    for (const item of NAV_ITEMS) {
      const link = nav.querySelector(`a[href="#${item.id}"]`);
      expect(link).not.toBeNull();
      expect(link).toHaveTextContent(item.label);
    }
  });

  it("toggles the mobile menu and closes it with Escape", () => {
    render(<Header />);
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
