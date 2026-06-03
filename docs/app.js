// ============================================
// 中国历史身份抽签 - 核心逻辑
// ============================================

(function () {
  'use strict';

  // ---- State ----
  let currentResult = null;
  let drawHistory = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
  let isDrawing = false;
  let storyTypingTimer = null;

  // ---- Particles Background ----
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.7 ? '#d4a843' : '#ffffff';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ---- Weighted Random Selection ----
  function weightedRandom(items, getWeight) {
    const totalWeight = items.reduce((sum, item) => sum + getWeight(item), 0);
    let random = Math.random() * totalWeight;
    for (const item of items) {
      random -= getWeight(item);
      if (random <= 0) return item;
    }
    return items[items.length - 1];
  }

  // ---- Core Draw Logic ----
  function performDraw() {
    // 1. Select dynasty
    const dynasty = weightedRandom(DYNASTIES, d => d.weight);

    // 2. Select sub-period within dynasty
    const subPeriod = dynasty.subPeriods[Math.floor(Math.random() * dynasty.subPeriods.length)];

    // 3. Select region based on dynasty weights
    const regionWeights = DYNASTY_REGION_WEIGHTS[dynasty.id] || DYNASTY_REGION_WEIGHTS.ming;
    const regionKeys = Object.keys(regionWeights);
    const regionKey = weightedRandom(regionKeys, k => regionWeights[k]);
    const region = REGIONS[regionKey];

    // 4. Select gender
    const gender = weightedRandom(GENDERS, g => g.weight);

    // 5. Select occupation
    const occKeys = Object.keys(OCCUPATIONS);
    const dynMultipliers = DYNASTY_OCCUPATION_MULTIPLIERS[dynasty.id] || {};

    // Adjust weights: disable emperor/empress for PRC, apply multipliers
    const adjustedOccupations = occKeys.map(key => {
      let w = OCCUPATIONS[key].weight;
      if (dynMultipliers[key] !== undefined) {
        w *= dynMultipliers[key];
      }
      // Gender adjustments
      if (gender.id === 'female' && ['emperor', 'top_general', 'military_officer', 'soldier', 'palace_eunuch'].includes(key)) {
        w *= 0.05; // extremely rare for women
      }
      if (gender.id === 'female' && ['empress', 'servant'].includes(key)) {
        w *= 3; // more likely
      }
      return { key, weight: Math.max(0, w) };
    }).filter(o => o.weight > 0);

    const selectedOcc = weightedRandom(adjustedOccupations, o => o.weight);
    const occupation = OCCUPATIONS[selectedOcc.key];
    const occupationKey = selectedOcc.key;

    // 6. Get rarity
    const rarity = occupation.rarity;
    const rarityConfig = RARITY_CONFIG[rarity];

    // 7. Special occupation title (optional)
    const specialOccs = DYNASTY_SPECIAL_OCCUPATIONS[dynasty.id] || [];
    const hasSpecialTitle = rarity !== 'common' && Math.random() < 0.3 && specialOccs.length > 0;
    const specialTitle = hasSpecialTitle ? specialOccs[Math.floor(Math.random() * specialOccs.length)] : null;

    // 8. Construct result
    const result = {
      dynasty: dynasty,
      subPeriod: subPeriod,
      region: region,
      regionKey: regionKey,
      gender: gender,
      occupation: occupation,
      occupationKey: occupationKey,
      rarity: rarity,
      rarityConfig: rarityConfig,
      specialTitle: specialTitle,
      story: '',
      timestamp: Date.now(),
      id: 'lottery_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    };

    return result;
  }

  // ---- Page Navigation ----
  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
  }

  window.goHome = function () {
    showPage('page-home');
  };

  window.startDraw = function () {
    showPage('page-draw');
    resetLotteryCard();
  };

  function resetLotteryCard() {
    const card = document.getElementById('lotteryCard');
    card.classList.remove('flipping');
    card.style.transform = '';
    const front = card.querySelector('.card-front');
    const back = card.querySelector('.card-back');
    front.style.display = '';
    front.style.opacity = '';
    front.style.transform = '';
    back.style.opacity = '0';
    back.classList.remove('revealed');
    back.innerHTML = '';
    isDrawing = false;
  }

  // ---- Draw Card Animation ----
  window.drawCard = function () {
    if (isDrawing) return;
    isDrawing = true;

    // Vibrate if supported
    if (navigator.vibrate) navigator.vibrate(50);

    const card = document.getElementById('lotteryCard');
    const front = card.querySelector('.card-front');
    const back = card.querySelector('.card-back');

    // Perform the draw
    currentResult = performDraw();

    // Flip animation
    front.style.transition = 'transform 0.5s ease-in, opacity 0.3s ease-in';
    front.style.transform = 'rotateY(90deg) scale(0.9)';
    front.style.opacity = '0';

    setTimeout(() => {
      front.style.display = 'none';

      // Populate card back
      const r = currentResult;
      const rc = r.rarityConfig;
      back.innerHTML = `
        <div style="text-align:center;">
          <div style="font-size:1rem;margin-bottom:0.5rem;color:${rc.color};">${rc.name}</div>
          <div style="font-family:var(--font-serif);font-size:2rem;font-weight:900;margin-bottom:0.5rem;color:${rc.color};">
            ${r.specialTitle || r.occupation.name}
          </div>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.75rem;">
            ${r.dynasty.name} · ${r.subPeriod.name}
          </div>
          <div style="font-size:2rem;margin-bottom:0.5rem;">${'★'.repeat(rc.stars)}</div>
          <div style="font-size:0.75rem;color:var(--text-dim);margin-top:1rem;">
            点击查看详情 ↓
          </div>
        </div>
      `;

      back.style.transition = 'transform 0.5s ease-out, opacity 0.4s ease-out';
      back.style.transform = 'rotateY(0deg)';
      back.style.opacity = '1';
      back.classList.add('revealed');

      // Confetti for legendary/epic
      if (r.rarity === 'legendary' || r.rarity === 'epic') {
        launchConfetti(rc.color);
      }

      // Click to go to result
      card.onclick = function () {
        showResult(currentResult);
      };
    }, 500);
  };

  // ---- Confetti Effect ----
  function launchConfetti(color) {
    const colors = [color, '#FFD700', '#FF6B6B', '#4ECDC4', '#fff'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.top = '-10px';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        piece.style.width = (Math.random() * 8 + 4) + 'px';
        piece.style.height = (Math.random() * 8 + 4) + 'px';
        piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 3500);
      }, i * 50);
    }
  }

  // ---- Show Result Page ----
  function showResult(result) {
    showPage('page-result');

    const r = result;
    const rc = r.rarityConfig;

    // Save to history
    drawHistory.unshift({
      id: r.id,
      dynasty: r.dynasty.name,
      occupation: r.specialTitle || r.occupation.name,
      region: r.region.name,
      rarity: r.rarity,
      timestamp: r.timestamp,
      result: r,
    });
    if (drawHistory.length > 50) drawHistory = drawHistory.slice(0, 50);
    localStorage.setItem('lotteryHistory', JSON.stringify(drawHistory));
    renderHistory();

    // Render result card
    const wrapper = document.getElementById('resultWrapper');
    wrapper.innerHTML = `
      <div class="result-card ${r.rarity}" id="resultCard">
        <div class="result-header" style="background: linear-gradient(180deg, ${rc.color}15, transparent);">
          <div class="dynasty-banner">${r.dynasty.description}</div>
          <div class="occupation-name" style="color: ${rc.color};">
            ${r.specialTitle || r.occupation.name}
          </div>
          <div class="rarity-badge ${r.rarity}">${rc.name} · ${rc.chance}</div>
          <div class="result-stars" style="color: ${rc.color};">
            ${'★'.repeat(rc.stars)}${'☆'.repeat(5 - rc.stars)}
          </div>
        </div>

        <div class="result-divider"></div>

        <div class="result-details">
          <div class="detail-item">
            <div class="detail-icon">🏯</div>
            <div class="detail-label">朝代</div>
            <div class="detail-value">${r.dynasty.name} · ${r.subPeriod.name}</div>
          </div>
          <div class="detail-item">
            <div class="detail-icon">${r.gender.id === 'male' ? '♂' : '♀'}</div>
            <div class="detail-label">性别</div>
            <div class="detail-value">${r.gender.name}性</div>
          </div>
          <div class="detail-item">
            <div class="detail-icon">${r.region.icon}</div>
            <div class="detail-label">出生地</div>
            <div class="detail-value">${r.region.name}</div>
          </div>
          <div class="detail-item">
            <div class="detail-icon">📋</div>
            <div class="detail-label">身份</div>
            <div class="detail-value">${r.occupation.name}</div>
          </div>
        </div>

        <div class="result-divider"></div>

        <div class="result-story">
          <div class="story-title">—— 命运之书 ——</div>
          <div class="story-text loading" id="storyText">
            <div class="spinner"></div>
            <span style="margin-left:0.5rem;">命运正在书写...</span>
          </div>
        </div>

        <div class="result-tags">
          ${r.occupation.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          ${r.specialTitle ? `<span class="tag" style="border-color:${rc.color}40;color:${rc.color};">${r.specialTitle}</span>` : ''}
          <span class="tag">${r.region.modern}</span>
        </div>

        <div class="result-actions">
          <button class="btn-action primary" onclick="startDraw()">🔄 再抽一签</button>
          <button class="btn-action secondary" onclick="openShare()">📤 分享</button>
        </div>
      </div>
    `;

    // Generate story
    generateStory(r);
  }

  // ---- AI Story Generation ----
  async function generateStory(result) {
    const storyEl = document.getElementById('storyText');
    if (!storyEl) return;

    try {
      const prompt = AI_PROMPT_TEMPLATE
        .replace('{dynasty}', result.dynasty.name)
        .replace('{subPeriod}', result.subPeriod.name + '（' + result.subPeriod.range + '）')
        .replace('{occupation}', result.specialTitle || result.occupation.name)
        .replace('{gender}', result.gender.name)
        .replace('{region}', result.region.name)
        .replace('{modernRegion}', result.region.modern)
        .replace('{rarity}', result.rarityConfig.name + '级身份');

      // Try Cloudflare Worker API proxy first
      const story = await callZhipuAPI(prompt);
      typeStory(story, storyEl);
    } catch (err) {
      console.warn('AI generation failed, using offline template:', err);
      // Fallback to offline story
      const story = generateOfflineStory(result);
      typeStory(story, storyEl);
    }
  }

  async function callZhipuAPI(prompt) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) throw new Error('API returned ' + response.status);

      const data = await response.json();
      return data.story || data.content || data.text || '';
    } catch (e) {
      clearTimeout(timeout);
      throw e;
    }
  }

  // ---- Typing Effect ----
  function typeStory(text, el) {
    if (storyTypingTimer) clearInterval(storyTypingTimer);
    el.classList.remove('loading');
    el.innerHTML = '';

    let idx = 0;
    const speed = 30; // ms per char

    storyTypingTimer = setInterval(() => {
      if (idx < text.length) {
        el.innerHTML = text.substring(0, idx + 1) + '<span class="typing-cursor"></span>';
        idx++;
      } else {
        el.innerHTML = text;
        clearInterval(storyTypingTimer);
        storyTypingTimer = null;
      }
    }, speed);
  }

  // ---- Offline Story Generator ----
  function generateOfflineStory(result) {
    const r = result;
    const templates = OFFLINE_STORY_TEMPLATES[r.rarity] || OFFLINE_STORY_TEMPLATES.common;
    let story = templates[Math.floor(Math.random() * templates.length)];

    const seasons = ['春', '夏', '秋', '冬'];
    const season = seasons[Math.floor(Math.random() * 4)];

    const replacements = {
      '{dynasty}': r.dynasty.name,
      '{subPeriod}': r.subPeriod.name,
      '{region}': r.region.name,
      '{season}': season,
      '{occupation}': r.specialTitle || r.occupation.name,
    };

    for (const [key, val] of Object.entries(replacements)) {
      story = story.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), val);
    }

    return story;
  }

  // ---- Share Functions ----
  window.openShare = function () {
    if (!currentResult) return;
    const r = currentResult;
    const rc = r.rarityConfig;

    const preview = document.getElementById('sharePreview');
    preview.innerHTML = `
      <div class="share-title">前世今生 · 中国历史身份抽签</div>
      <div class="share-identity" style="color:${rc.color};">
        ${r.specialTitle || r.occupation.name}
      </div>
      <div class="share-desc">
        ${r.dynasty.description} · ${r.gender.name}性 · ${r.region.name}人<br>
        稀有度：${'★'.repeat(rc.stars)}${'☆'.repeat(5 - rc.stars)} ${rc.name}
      </div>
      <div class="share-tags">
        ${r.occupation.tags.slice(0, 3).join(' · ')}
      </div>
    `;

    document.getElementById('shareOverlay').classList.add('active');
  };

  window.closeShare = function () {
    document.getElementById('shareOverlay').classList.remove('active');
  };

  window.generateShareImage = function () {
    if (!currentResult) return;
    const r = currentResult;
    const rc = r.rarityConfig;
    const canvas = document.getElementById('shareCanvas');
    const ctx = canvas.getContext('2d');
    const W = 750, H = 1334;

    // Background
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, W, H);

    // Decorative border
    ctx.strokeStyle = rc.color + '60';
    ctx.lineWidth = 2;
    roundRect(ctx, 40, 40, W - 80, H - 80, 20);
    ctx.stroke();

    // Inner border
    ctx.strokeStyle = rc.color + '30';
    ctx.lineWidth = 1;
    roundRect(ctx, 55, 55, W - 110, H - 110, 16);
    ctx.stroke();

    // Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#d4a843';
    ctx.font = '700 36px "Noto Serif SC", serif';
    ctx.fillText('前世今生', W / 2, 160);

    ctx.fillStyle = '#8a8a9a';
    ctx.font = '300 24px "Noto Sans SC", sans-serif';
    ctx.fillText('中国历史身份抽签', W / 2, 200);

    // Dynasty banner
    ctx.fillStyle = rc.color + '30';
    roundRectFill(ctx, W / 2 - 180, 260, 360, 50, 25);
    ctx.fillStyle = rc.color;
    ctx.font = '500 24px "Noto Sans SC", sans-serif';
    ctx.fillText(r.dynasty.description, W / 2, 292);

    // Main identity
    ctx.fillStyle = rc.color;
    ctx.font = '900 72px "Noto Serif SC", serif';
    ctx.fillText(r.specialTitle || r.occupation.name, W / 2, 420);

    // Stars
    ctx.font = '32px sans-serif';
    ctx.fillStyle = rc.color;
    const starStr = '★'.repeat(rc.stars) + '☆'.repeat(5 - rc.stars);
    ctx.fillText(starStr, W / 2, 480);

    // Rarity badge
    ctx.fillStyle = '#8a8a9a';
    ctx.font = '400 22px "Noto Sans SC", sans-serif';
    ctx.fillText(`${rc.name} · ${rc.chance}`, W / 2, 530);

    // Details card
    ctx.fillStyle = '#ffffff08';
    roundRectFill(ctx, 80, 580, W - 160, 200, 16);

    const details = [
      ['🏯 朝代', `${r.dynasty.name} · ${r.subPeriod.name}`],
      [`${r.gender.id === 'male' ? '♂' : '♀'} 性别`, r.gender.name + '性'],
      [`${r.region.icon} 籍贯`, `${r.region.name}（${r.region.modern}）`],
      ['📋 身份', r.occupation.name],
    ];

    details.forEach((d, i) => {
      const y = 630 + i * 45;
      ctx.textAlign = 'left';
      ctx.fillStyle = '#6a6a7a';
      ctx.font = '400 22px "Noto Sans SC", sans-serif';
      ctx.fillText(d[0], 120, y);
      ctx.fillStyle = '#e8e6e3';
      ctx.fillText(d[1], 320, y);
    });

    // Story text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#d4a84380';
    ctx.font = '500 20px "Noto Serif SC", serif';
    ctx.fillText('—— 命运之书 ——', W / 2, 840);

    const story = r.story || generateOfflineStory(r);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#c8c8c8';
    ctx.font = '400 24px "Noto Sans SC", sans-serif';
    wrapText(ctx, story, 100, 890, W - 200, 40);

    // Watermark
    ctx.textAlign = 'center';
    ctx.fillStyle = '#55556680';
    ctx.font = '300 20px "Noto Sans SC", sans-serif';
    ctx.fillText('前世今生 · 中国历史身份抽签', W / 2, H - 80);
    ctx.fillText('扫一扫，抽你的前世身份', W / 2, H - 50);

    // Download
    canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `前世今生_${r.dynasty.name}_${r.specialTitle || r.occupation.name}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('图片已保存！');
    }, 'image/png');
  };

  window.copyShareText = function () {
    if (!currentResult) return;
    const r = currentResult;
    const rc = r.rarityConfig;
    const text = `【前世今生 · 中国历史身份抽签】\n` +
      `我抽到了：${r.specialTitle || r.occupation.name}\n` +
      `${'★'.repeat(rc.stars)}${'☆'.repeat(5 - rc.stars)} ${rc.name}\n` +
      `${r.dynasty.description} · ${r.gender.name}性 · ${r.region.name}人\n` +
      `你也来试试吧！`;

    navigator.clipboard.writeText(text).then(() => {
      showToast('文案已复制！');
    }).catch(() => {
      showToast('复制失败，请手动复制');
    });
  };

  // ---- Canvas Helpers ----
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  function roundRectFill(ctx, x, y, w, h, r) {
    roundRect(ctx, x, y, w, h, r);
    ctx.fill();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = text.split('');
    let line = '';
    let currentY = y;

    for (let i = 0; i < chars.length; i++) {
      const testLine = line + chars[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line.length > 0) {
        ctx.fillText(line, x, currentY);
        line = chars[i];
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  }

  // ---- History ----
  window.toggleHistory = function () {
    const drawer = document.getElementById('historyDrawer');
    drawer.classList.toggle('open');
  };

  function renderHistory() {
    const list = document.getElementById('historyList');
    if (drawHistory.length === 0) {
      list.innerHTML = '<div class="history-empty">还没有抽过签</div>';
      return;
    }
    list.innerHTML = drawHistory.slice(0, 20).map(h => {
      const rc = RARITY_CONFIG[h.rarity] || RARITY_CONFIG.common;
      return `
        <div class="history-item" onclick="viewHistoryItem('${h.id}')">
          <div class="hi-dynasty">${h.dynasty} · ${h.rarity === 'legendary' ? '传说' : h.rarity === 'epic' ? '史诗' : h.rarity === 'rare' ? '稀有' : '普通'}</div>
          <div class="hi-occupation" style="color:${rc.color};">${h.occupation}</div>
          <div class="hi-region">${h.region} · ${new Date(h.timestamp).toLocaleDateString('zh-CN')}</div>
        </div>
      `;
    }).join('');
  }

  window.viewHistoryItem = function (id) {
    const item = drawHistory.find(h => h.id === id);
    if (item && item.result) {
      currentResult = item.result;
      document.getElementById('historyDrawer').classList.remove('open');
      showResult(currentResult);
    }
  };

  // ---- Toast ----
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    renderHistory();
  });

})();
