async (page) => {
  function installProbe() {
    window.journeyProbe = () => {
      const stage = document.querySelector('[data-rt-stage]');
      const timelines = new Set();
      const seen = new Set();
      function visit(value) {
        if (!value || seen.has(value)) return;
        seen.add(value);
        if (value.scrollTrigger?.trigger === stage) timelines.add(value);
        for (const child of value.data ?? []) visit(child);
        for (const child of value.contexts ?? []) visit(child);
      }
      let fiber = stage?.[Object.keys(stage).find(key => key.startsWith('__reactFiber'))];
      for (; fiber; fiber = fiber.return) {
        for (let hook = fiber.memoizedState; hook; hook = hook.next) {
          visit(hook.memoizedState?.current);
        }
      }
      return {
        url: location.href,
        y: scrollY,
        height: document.documentElement.scrollHeight,
        pins: document.querySelectorAll('.pin-spacer').length,
        timelines: [...timelines].map(tl => ({
          progress: tl.progress(), time: tl.time(), duration: tl.duration(), labels: tl.labels,
          triggerProgress: tl.scrollTrigger.progress,
          start: tl.scrollTrigger.start, end: tl.scrollTrigger.end,
          years: tl.getChildren().filter(t => t.targets?.().some(el => el.matches?.('[data-rt-year]')))
            .map(t => ({ start: t.startTime(), progress: t.progress(), initted: t._initted })),
        })),
        scenes: [...document.querySelectorAll('[data-rt-scene]')].map(scene => {
          const year = scene.querySelector('[data-rt-year]');
          const rect = year?.getBoundingClientRect();
          const mask = year?.parentElement.getBoundingClientRect();
          return {
            id: scene.dataset.rtScene, opacity: getComputedStyle(scene).opacity,
            visibility: getComputedStyle(scene).visibility,
            year: year && {
              opacity: getComputedStyle(year).opacity, transform: getComputedStyle(year).transform,
              y: year._gsap?.y, yPercent: year._gsap?.yPercent,
              top: rect.top, maskTop: mask.top, maskBottom: mask.bottom,
            },
          };
        }),
      };
    };
  }
  await page.addInitScript(installProbe);
  await page.evaluate(installProbe);
  console.log(JSON.stringify(await page.evaluate(() => window.journeyProbe()), null, 2));
}
