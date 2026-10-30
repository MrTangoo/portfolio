"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = "power2.out";
/** Reading pause appended after each chapter's intro, in timeline seconds. */
const HOLD = 1.0;
const OUT = 0.55;

/**
 * Orchestrates THE RED THREAD: one scrubbed GSAP timeline pinned to the stage —
 * each chapter reveals a monumental year (masked rise) then its content card.
 * Only runs on xl screens with motion allowed; otherwise the stacked scenes
 * stay statically readable.
 */
export function useRedThread(scopeRef: RefObject<HTMLDivElement | null>) {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      scope.current = scopeRef.current;
      if (!scope.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1280px) and (prefers-reduced-motion: no-preference)", () => {
        const root = scope.current!;
        const stage = root.querySelector<HTMLElement>("[data-rt-stage]")!;
        const counter = stage.querySelector<HTMLElement>("[data-rt-counter]")!;
        const fill = stage.querySelector<HTMLElement>("[data-rt-fill]")!;
        const scenes = gsap.utils.toArray<HTMLElement>("[data-rt-scene]", stage);

        // Stage becomes a fixed canvas; scenes overlay absolutely inside it.
        gsap.set(stage, { height: "100svh", overflow: "hidden" });
        scenes.forEach((scene) => {
          gsap.set(scene, {
            position: "absolute",
            inset: 0,
            minHeight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            borderBottomWidth: 0,
            autoAlpha: 0,
          });
        });

        const tl = gsap.timeline({
          defaults: { ease: EASE },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=340%",
            pin: true,
            scrub: 0.8,
            // No invalidateOnRefresh: every tween here is relative (yPercent,
            // opacity, clipPath), and invalidating mid-scrub freezes them in
            // their "from" state after a remount (locale switch, reload).
          },
        });

        const labelPositions: number[] = [];
        const updateCounter = () => {
          const t = tl.time();
          let idx = 0;
          labelPositions.forEach((pos, i) => {
            if (t >= pos - 0.001) idx = i;
          });
          counter.textContent = String(idx + 1).padStart(2, "0");
        };
        tl.eventCallback("onUpdate", updateCounter);

        scenes.forEach((scene, i) => {
          const id = scene.dataset.rtScene!;
          const year = scene.querySelector<HTMLElement>("[data-rt-year]");
          const contents = scene.querySelectorAll<HTMLElement>("[data-rt-content]");

          tl.addLabel(`chapter-${id}`);
          labelPositions[i] = tl.duration();

          // Overlap the previous scene's fade-out so chapters crossfade
          // instead of leaving a blank beat between them.
          tl.to(scene, { autoAlpha: 1, duration: 0.01 }, i === 0 ? 0 : "-=0.35");
          if (year) {
            tl.fromTo(
              year,
              { yPercent: 108, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.9 },
              "<",
            );
          }
          if (contents.length) {
            tl.fromTo(
              contents,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.14 },
              "<0.25",
            );
          }

          // The final screen wipes in top→bottom instead of the plain fade —
          // it reads like a window opening onto what's next.
          if (id === "final") {
            const screen = scene.querySelector<HTMLElement>("[data-rt-screen]");
            if (screen) {
              tl.fromTo(
                screen,
                { clipPath: "inset(0 0 100% 0)" },
                { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power2.inOut" },
                "<0.6",
              );
            }
          }

          tl.to(
            {},
            {
              duration: id === "2025" ? HOLD * 1.3 : i === scenes.length - 1 ? HOLD * 0.5 : HOLD,
            },
          );
          if (i < scenes.length - 1) {
            tl.to(scene, { autoAlpha: 0, duration: OUT });
          }
        });

        // Zone A rail mirrors the whole journey — fromTo pins the start at 0
        // so a ScrollTrigger refresh can't re-record a partially filled state.
        tl.fromTo(
          fill,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", duration: tl.duration(), immediateRender: false },
          0,
        );

        // Deep links (/fr#contact) scroll before the pin-spacer exists, so
        // anchors below the stage land ~340vh too high. Once the pin is in
        // place, re-measure and jump to the real position, then snap the
        // scrubbed playhead to the landed progress — otherwise `scrub: 0.8`
        // eases through every chapter for ~0.8s and a fast scroll-up reads
        // stale frames (half-faded scenes, invisible years).
        const hash = window.location.hash.slice(1);
        let anchorFrame = 0;
        let progressFrame = 0;
        if (hash) {
          anchorFrame = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            document.getElementById(hash)?.scrollIntoView({ behavior: "instant" });
            // Next frame: the scroll event has retargeted the scrub tween,
            // so st.progress already reflects the landed position.
            progressFrame = requestAnimationFrame(() => {
              const st = tl.scrollTrigger;
              if (st) tl.progress(st.progress);
            });
          });
        }

        return () => {
          cancelAnimationFrame(anchorFrame);
          cancelAnimationFrame(progressFrame);
          tl.scrollTrigger?.kill();
          tl.kill();
          scenes.forEach((scene) => {
            gsap.set(scene, { clearProps: "all" });
          });
          // Activity preserves these nodes. A reverted fromTo can leave its
          // start transform behind; on re-entry GSAP parses the 108% offset
          // as a pixel y that yPercent cannot reset. Clear the children too,
          // including their cached transforms and reduced-motion fallbacks.
          gsap.set(stage.querySelectorAll("[data-rt-year], [data-rt-content], [data-rt-screen]"), {
            clearProps: "transform,opacity,clipPath",
          });
          gsap.set(stage, { clearProps: "all" });
          gsap.set(fill, { clearProps: "transform" });
        };
      });
    },
    { scope: scopeRef },
  );
}
