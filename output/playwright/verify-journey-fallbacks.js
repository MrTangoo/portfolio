async (page) => {
  const origin = new URL(page.url()).origin;
  const results = [];
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  async function waitForAnchor(id) {
    await page.waitForFunction(id => {
      const el = document.getElementById(id);
      const expected = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)
        + parseFloat(getComputedStyle(el).scrollMarginTop);
      return Math.abs(el.getBoundingClientRect().top - expected) < 3;
    }, id, { timeout: 7000 });
  }
  async function staticState(label) {
    const state = await page.evaluate(() => ({
      pins: document.querySelectorAll('.pin-spacer').length,
      stageStyle: document.querySelector('[data-rt-stage]').style.cssText,
      hidden: [...document.querySelectorAll('[data-rt-scene], [data-rt-year], [data-rt-content]')]
        .filter(el => getComputedStyle(el).opacity !== '1' || getComputedStyle(el).visibility !== 'visible').length,
      yearTransforms: [...document.querySelectorAll('[data-rt-year]')].map(el => getComputedStyle(el).transform),
    }));
    results.push({ label, ...state });
    check(state.pins === 0 && state.hidden === 0, label + ': hidden static content');
    check(state.stageStyle === '' && state.yearTransforms.every(t => t === 'none'), label + ': stale styles');
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('.pin-spacer').waitFor();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(300);
  await staticState('reduced-motion-after-navigation');
  await page.reload();
  await page.waitForTimeout(500);
  await staticState('reduced-motion-cold-load');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForTimeout(500);
  check(await page.locator('.pin-spacer').count() === 1, 'Pin not restored');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);
  check(await page.locator('.pin-spacer').count() === 0, 'Mobile pin remains');
  const mobileNav = page.getByRole('navigation', { name: 'Navigation mobile' });
  await page.getByRole('button', { name: 'Ouvrir le menu', exact: true }).click();
  await mobileNav.getByRole('link', { name: 'Applications NEW' }).click();
  await page.waitForURL('**/fr/applications');
  await page.getByRole('button', { name: 'Ouvrir le menu', exact: true }).click();
  await mobileNav.getByRole('link', { name: /Certifications/ }).click();
  await page.waitForURL('**/fr#certifications');
  await waitForAnchor('certifications');
  const mobile = await page.evaluate(() => ({
    pins: document.querySelectorAll('.pin-spacer').length,
    desktopDisplay: getComputedStyle(document.querySelector('[data-rt-stage]').parentElement).display,
    articles: document.querySelectorAll('#parcours article').length,
    certificationTop: document.querySelector('#certifications').getBoundingClientRect().top,
    expectedTop: parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)
      + parseFloat(getComputedStyle(document.querySelector('#certifications')).scrollMarginTop),
  }));
  check(mobile.pins === 0 && mobile.desktopDisplay === 'none' && mobile.articles === 5, 'Mobile fallback broken');
  check(Math.abs(mobile.certificationTop - mobile.expectedTop) < 3, 'Mobile anchor misplaced');
  results.push({ label: 'mobile-native-return', ...mobile });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator('.pin-spacer').waitFor();
  for (const id of ['certifications', 'approche', 'contact']) {
    await page.goto(origin + '/fr#' + id);
    await page.locator('.pin-spacer').waitFor();
    await waitForAnchor(id);
    const position = await page.locator('#' + id).evaluate(el => ({
      top: el.getBoundingClientRect().top,
      expectedTop: parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)
        + parseFloat(getComputedStyle(el).scrollMarginTop),
    }));
    check(Math.abs(position.top - position.expectedTop) < 3, 'Deep link misplaced: ' + id + ' at ' + position.top);
    results.push({ label: 'deep-link-' + id, ...position });
  }
  return { origin, results };
}
