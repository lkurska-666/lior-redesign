const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs/promises');
(async () => {
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {})});
 const page=await browser.newPage({deviceScaleFactor:1});
 const errors=[]; const results=[];
 page.on('pageerror',e=>errors.push(e.message));
 for(const concept of ['a','b','c']) for(const width of [1440,768,390]) {
  await page.setViewportSize({width,height:width===390?844:1000});
  await page.goto(`http://localhost:4182/concept-${concept}.html`,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await document.fonts.ready;});
  await page.screenshot({path:`review/screenshots/${concept}-${width}-hero.png`});
  const result=await page.evaluate(()=>{
   const box=e=>{let r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};
   const copy=[...document.querySelectorAll('.feature')].every((f,i)=>f.querySelector('h2').textContent===LP.features[i].t&&f.querySelector('.feature-copy p').textContent===LP.features[i].d);
   const portrait=box(document.querySelector('.portrait'));const heading=box(document.querySelector('h1'));
   const outside=[...document.querySelectorAll('body *')].filter(e=>{if(e.closest('.slider,.feature-visual,.hero-art,.dropdown')||e.matches('.skip-link'))return false;const r=e.getBoundingClientRect();const s=getComputedStyle(e);return r.width&&s.display!=='none'&&(r.left<-.5||r.right>innerWidth+.5)}).map(e=>({tag:e.tagName,class:e.className}));
   return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,copy,featureCount:document.querySelectorAll('.feature').length,ctas:[...document.querySelectorAll('.primary')].map(a=>a.href),nicheLinks:[...document.querySelectorAll('.store-example a')].map(a=>a.href),badLinks:[...document.querySelectorAll('a')].filter(a=>a.href.includes('undefined')||a.getAttribute('href')==='#').map(a=>a.textContent),badImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),outside,portrait,heading,heroOverlap:heading.x<portrait.right&&heading.right>portrait.x&&heading.y<portrait.bottom&&heading.bottom>portrait.y};
  });
  result.concept=concept;
  if(!result.copy||result.width!==result.scrollWidth||result.featureCount!==4||result.badLinks.length||result.badImages.length||result.outside.length||result.heroOverlap)throw Error(JSON.stringify(result));
  if(width===390){
   await page.getByRole('button',{name:'Open navigation'}).click();
   await page.locator('#mobile-navigation').waitFor({state:'visible'});
   await page.keyboard.press('Escape');
   if(await page.locator('#mobile-navigation').isVisible())throw Error('Mobile navigation did not close');
  }
  const faq=page.locator('.faq-list details').first();await faq.locator('summary').click();if(!await faq.getAttribute('open').then(v=>v!==null))throw Error('FAQ failed');await faq.locator('summary').click();
  await page.locator('.feature-1').screenshot({path:`review/screenshots/${concept}-${width}-winning.png`});
  await page.locator('.feature-4').screenshot({path:`review/screenshots/${concept}-${width}-domain.png`});
  if(concept==='b'&&width===1440){await page.locator('.created').screenshot({path:'review/screenshots/b-gallery.png'});await page.locator('.final').screenshot({path:'review/screenshots/b-final.png'});}
  if(width===390)await page.screenshot({path:`review/screenshots/${concept}-390-full.png`,fullPage:true});
  const slider=page.locator('#experts');const before=await slider.evaluate(e=>e.scrollLeft);await page.getByRole('button',{name:'Next entrepreneur'}).click();await page.waitForTimeout(500);if(await slider.evaluate(e=>e.scrollLeft)<=before)throw Error('Carousel did not scroll');
  results.push(result);console.log(`${concept.toUpperCase()} ${width}: copy, links, images, overflow, hero, FAQ, slider PASS`);
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://localhost:4182/index.html');
 for(const concept of ['a','b','c']){
  await page.locator(`[data-concept="${concept}"]`).click();
  for(const width of ['desktop','768','390']){
   await page.locator(`[data-width="${width}"]`).click();
   await page.waitForTimeout(100);
   const actual=await page.locator('iframe').evaluate(e=>e.contentWindow.innerWidth);
   if(width!=='desktop'&&actual!==Number(width))throw Error(`Review width ${width} rendered ${actual}`);
  }
 }
 await page.locator('[data-concept="b"]').click();await page.locator('[data-width="desktop"]').click();await page.waitForTimeout(200);await page.screenshot({path:'review/screenshots/comparison.png'});
 if(errors.length)throw Error(errors.join('\n'));
 await fs.writeFile('review/verification.json',JSON.stringify({results,errors,comparisonControls:'PASS'},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
