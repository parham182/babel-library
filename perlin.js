class PerlinNoise {
  constructor(seed = 12345) {
    this.seed = this.hashSeed(seed);
    this.p = new Uint8Array(512);
    this.reset();
  }

  hashSeed(seed) {
    if (typeof seed === 'number') return Math.floor(seed);
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
    }
    return hash;
  }

  reset() {
    for (let i = 0; i < 256; i++) this.p[i] = i;
    const random = this.createSeededRandom();
    for (let i = 255; i > 0; i--) {
      const j = (random() * (i + 1)) | 0;
      [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
    }
    for (let i = 0; i < 256; i++) this.p[256 + i] = this.p[i];
  }

  createSeededRandom() {
    let t = this.seed >>> 0;
    return function() {
      t += 0x6D2B79F5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  perlin1(x) {
    const X = Math.floor(x) & 255;
    x -= Math.floor(x);
    const u = this.fade(x);
    const a = this.p[X], b = this.p[X + 1];
    return this.lerp(u, this.grad(a, x), this.grad(b, x - 1));
  }

  fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  lerp(t, a, b) { return a + t * (b - a); }
  grad(hash, x) { return (hash & 1 ? -x : x); }
}

function generateThreeDigitNumbers(seed, count = 750, smoothness = 2) {
  const noise = new PerlinNoise(seed);
  const random = noise.createSeededRandom();

  const offset = random() * 1000;

  const numbers = [];
  for (let i = 0; i < count; i++) {
    const val = noise.perlin1(offset + i * smoothness);

    const extra = (random() - 0.5) * 0.3;
    const combined = Math.min(Math.max(val + extra, -1), 1);

    const normalized = (combined + 1) / 2;
    const num = Math.floor(normalized * 900) + 100;

    numbers.push(num);
  }
  return numbers;
}
