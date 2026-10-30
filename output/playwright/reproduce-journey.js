async (page) => {
  const results = [];
  async function capture(label) {
    results.push({ label, ...await page.evaluate(() => window.journeyProbe()) });
  }
  async function scrollBack(label) {
    const state = await page.evaluate(() => window.journeyProbe());
    const tl = state.timelines[0];
    if (!tl) { await capture(label + '-no-timeline'); return; }
    for (const progress of [0.8, 0.6, 0.4, 0.14]) {
      const y = tl.start + progress * (tl.end - tl.start);
      await page.mouse.wheel(0, Math.round(y - await page.evaluate(() => scrollY)));
      await page.waitForTimeout(1100);
      await capture(label + '-' + progress);
    }
  }
  const nav = page.getByRole('navigation', { name: 'Navigation principale' });
  await page.goto('http://localhost:3000/fr');
  await page.locator('.pin-spacer').waitFor();
  await nav.getByRole('link', { name: 'Certifications', exact: true }).click();
  await page.waitForTimeout(1300);
  await nav.getByRole('link', { name: 'Applications NEW' }).click();
  await page.waitForURL('**/fr/applications');
  await page.accessibility?.snapshot?.();
  await nav.getByRole('link', { name: 'Certifications', exact: true }).click();
  await page.waitForURL('**/fr#certifications');
  await page.waitForTimeout(1300);
  await capture('full-load');
  await scrollBack('full-load');
  await nav.getByRole('link', { name: 'Certifications', exact: true }).click();
  await page.waitForTimeout(1300);
  await nav.getByRole('link', { name: 'Applications NEW' }).click();
  await page.waitForURL('**/fr/applications');
  await page.goBack();
  await page.waitForTimeout(1300);
  await capture('history-back');
  await scrollBack('history-back');
  return results;
}

