/* Shared helpers: teddy bears, floating hearts, heart bursts, page transitions */

// ---------- Teddy bear (clean, classic look, inline SVG) ----------
// kind: "heart" (holds a heart), "banner" (birthday banner + party hat), "wave" (plain, waving), "angry" (grumpy face)
let teddyId = 0;
function teddy(kind) {
  const u = 't' + (teddyId++);
  const angry = kind === 'angry';
  const line = '#9a6232', dark = '#3b2216';
  const F = `fill="url(#${u}f)" stroke="${line}" stroke-width="2.5"`;
  const P = `fill="url(#${u}p)"`;

  const defs = `
  <defs>
    <radialGradient id="${u}f" cx=".4" cy=".3" r=".85"><stop offset="0" stop-color="#e6b27a"/><stop offset="1" stop-color="#c4864c"/></radialGradient>
    <radialGradient id="${u}p" cx=".45" cy=".35" r=".8"><stop offset="0" stop-color="#fbe5c8"/><stop offset="1" stop-color="#ecc597"/></radialGradient>
    <linearGradient id="${u}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7fa6"/><stop offset="1" stop-color="#e03a78"/></linearGradient>
  </defs>`;

  const arm = (cx, cy, rot, ry = 30) => `<ellipse cx="${cx}" cy="${cy}" rx="17" ry="${ry}" ${F} transform="rotate(${rot} ${cx} ${cy})"/>`;

  let armsBack = '', armsFront = '', prop = '', hat = '';
  if (kind === 'heart') {
    prop = `<path d="M120 238 C76 206 88 172 120 190 C152 172 164 206 120 238Z" fill="url(#${u}r)" stroke="#c4245f" stroke-width="2.5" stroke-linejoin="round"/>
            <path d="M101 192 C98 197 100 203 106 207" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="4" stroke-linecap="round"/>`;
    armsFront = arm(82, 212, -35, 28) + arm(158, 212, 35, 28);
  } else if (kind === 'banner') {
    prop = `<path d="M34 172 Q120 154 206 172 L206 208 Q120 190 34 208Z" fill="#ffe3ee" stroke="#ff8fb5" stroke-width="3"/>
            <text x="120" y="193" text-anchor="middle" font-family="Quicksand,Arial,sans-serif" font-weight="700" font-size="15" fill="#d6366f">HAPPY BIRTHDAY</text>`;
    armsFront = arm(36, 190, 20, 26) + arm(204, 190, -20, 26);
    hat = `<path d="M120 -6 L152 50 L88 50Z" fill="#ffb3d1" stroke="#ff8fb5" stroke-width="2.5" stroke-linejoin="round"/>
           <path d="M106 20 L134 26 M98 36 L142 42" stroke="#fff" stroke-width="4" stroke-opacity=".85"/><circle cx="120" cy="-6" r="8" fill="#fff" stroke="#ff8fb5" stroke-width="2"/>`;
  } else if (kind === 'hug') {
    // arms are drawn hanging from the shoulder so CSS can swing them open and closed (.hugging)
    const hangingArm = (sx, cls) => `<g transform="translate(${sx} 170)"><g class="harm ${cls}"><ellipse cx="0" cy="28" rx="17" ry="30" ${F}/></g></g>`;
    armsFront = hangingArm(60, 'harm-l') + hangingArm(180, 'harm-r') + `<path class="hheart" d="M120 232 C92 210 100 188 120 200 C140 188 148 210 120 232Z" fill="url(#${u}r)" stroke="#c4245f" stroke-width="2" stroke-linejoin="round"/>`;
  } else if (angry) {
    armsFront = arm(66, 216, -15, 28) + arm(174, 216, 15, 28);
  } else {
    armsFront = arm(66, 212, 20, 28) + arm(184, 168, -35, 28);
  }

  const eye = x => `<ellipse cx="${x}" cy="${angry ? 100 : 98}" rx="7.5" ry="${angry ? 6 : 9}" fill="${dark}"/><circle cx="${x - 2.5}" cy="${angry ? 98 : 95}" r="2.8" fill="#fff"/>`;
  const brows = angry
    ? `<path d="M78 82 L108 95" stroke="${dark}" stroke-width="6" stroke-linecap="round"/><path d="M162 82 L132 95" stroke="${dark}" stroke-width="6" stroke-linecap="round"/>`
    : '';
  const mouth = angry
    ? `<path d="M120 128 V134 M120 134 Q108 128 100 138 M120 134 Q132 128 140 138" fill="none" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>`
    : `<path d="M120 128 V135 M120 135 Q111 145 101 137 M120 135 Q129 145 139 137" fill="none" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>`;
  const cheek = angry ? '#ff5a5a' : '#ff9db9';
  const extras = angry
    ? `<path d="M28 70 q-10 -14 0 -26 q10 -12 0 -24" fill="none" stroke="#ff7a7a" stroke-width="5" stroke-linecap="round" opacity=".85"/>
       <path d="M212 70 q10 -14 0 -26 q-10 -12 0 -24" fill="none" stroke="#ff7a7a" stroke-width="5" stroke-linecap="round" opacity=".85"/>
       <g stroke="#e02424" stroke-width="5" stroke-linecap="round" fill="none"><path d="M182 36 q10 4 12 -8 M182 36 q-4 -10 8 -12 M182 36 q10 10 -4 14"/></g>`
    : '';

  return `
  <svg viewBox="0 -16 240 296" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${angry ? 'Grumpy' : 'Cute'} teddy bear">
    ${defs}
    <ellipse cx="120" cy="276" rx="80" ry="7" fill="#6b3b55" opacity=".15"/>
    <circle cx="62" cy="52" r="30" ${F}/><circle cx="62" cy="54" r="17" ${P}/>
    <circle cx="178" cy="52" r="30" ${F}/><circle cx="178" cy="54" r="17" ${P}/>
    <ellipse cx="80" cy="254" rx="32" ry="22" ${F}/><ellipse cx="80" cy="258" rx="16" ry="11" ${P}/>
    <ellipse cx="160" cy="254" rx="32" ry="22" ${F}/><ellipse cx="160" cy="258" rx="16" ry="11" ${P}/>
    <ellipse cx="120" cy="204" rx="64" ry="58" ${F}/>
    <ellipse cx="120" cy="212" rx="38" ry="38" ${P}/>
    <circle cx="120" cy="104" r="70" ${F}/>
    <ellipse cx="120" cy="122" rx="36" ry="28" ${P} stroke="${line}" stroke-width="2" />
    ${eye(88)}${eye(152)}${brows}
    <ellipse cx="74" cy="124" rx="11" ry="8" fill="${cheek}" opacity=".5"/><ellipse cx="166" cy="124" rx="11" ry="8" fill="${cheek}" opacity=".5"/>
    <path d="M108 110 Q120 103 132 110 Q130 123 120 126 Q110 123 108 110Z" fill="${dark}"/>
    <ellipse cx="115" cy="111" rx="4" ry="2" fill="#fff" opacity=".6"/>
    ${mouth}
    <path d="M120 188 L98 176 Q92 186 98 198Z M120 188 L142 176 Q148 186 142 198Z" fill="url(#${u}r)" stroke="#c4245f" stroke-width="2" stroke-linejoin="round"/>
    <ellipse cx="120" cy="188" rx="8" ry="9" fill="#e03a78" stroke="#c4245f" stroke-width="2"/>
    ${hat}
    ${prop}
    ${armsFront}
    ${extras}
  </svg>`;
}
document.querySelectorAll('[data-teddy]').forEach(el => { el.innerHTML = teddy(el.dataset.teddy); });

// ---------- Floating hearts & sparkles ----------
(function floaters() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const layer = document.createElement('div');
  layer.className = 'floaters';
  layer.setAttribute('aria-hidden', 'true');
  document.body.prepend(layer);
  const glyphs = ['♥', '♡', '♥', '✦', '❤'];
  const colors = ['#ff8fb5', '#ffb3d1', '#ff6f9f', '#d9b8ff', '#ffd1e3', '#fff'];
  function spawn() {
    const el = document.createElement('span');
    el.className = 'float';
    el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (12 + Math.random() * 26) + 'px';
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDuration = (7 + Math.random() * 7) + 's';
    el.style.setProperty('--sway', (Math.random() * 80 - 40) + 'px');
    layer.appendChild(el);
    setTimeout(() => el.remove(), 15000);
  }
  for (let i = 0; i < 12; i++) setTimeout(spawn, i * 250);
  if (!reduce) setInterval(spawn, 700);
})();

// ---------- Heart burst (celebration) ----------
function burst(x, y, count = 22) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'burst';
    p.textContent = ['♥', '❤', '✦', '♡'][i % 4];
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.color = ['#ff6f9f', '#ff8fb5', '#ffb3d1', '#d9b8ff', '#fff'][i % 5];
    const a = Math.random() * Math.PI * 2, d = 70 + Math.random() * 160;
    p.style.setProperty('--dx', Math.cos(a) * d + 'px');
    p.style.setProperty('--dy', Math.sin(a) * d - 40 + 'px');
    p.style.fontSize = 16 + Math.random() * 22 + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
}

// ---------- Smooth page transition ----------
function goTo(url) {
  const veil = document.createElement('div');
  veil.className = 'veil';
  document.body.appendChild(veil);
  requestAnimationFrame(() => veil.classList.add('on'));
  setTimeout(() => { location.href = url; }, 900);
}
