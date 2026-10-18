// Three.js background scenes, ported from the design's makeStage(). Each stage owns its renderer,
// follows the shared pointer, and renders only while its container is on screen.
import * as T from "three";
import { pointer } from "@/lib/pointer";

export type SceneKind = "terreno" | "cluster" | "paineis" | "logs" | "globo";

export type Stage = { scroll: number; dispose: () => void };

type State = {
  t: number;
  rx: number;
  ry: number;
  spin: number;
  spinV: number;
  drag: number | null;
  scroll: number;
};

const GREEN = 0x00ff88,
  HAIR = 0x3a4556,
  MUTED = 0xa7b0c5;

type Builder = (ctx: {
  scene: T.Scene;
  camera: T.PerspectiveCamera;
  el: HTMLElement;
  st: State;
  hero: boolean;
}) => (dt: number) => void;

const wideOf = (el: HTMLElement) => el.clientWidth > 900;

const SCENES: Record<SceneKind, Builder> = {
  terreno: ({ scene, camera, st }) => {
    const geo = new T.PlaneGeometry(44, 44, 110, 110);
    geo.rotateX(-Math.PI / 2);
    const pts = new T.Points(geo, new T.PointsMaterial({ color: GREEN, size: 0.055, transparent: true, opacity: 0.75 }));
    const wire = new T.LineSegments(
      new T.WireframeGeometry(new T.PlaneGeometry(44, 44, 22, 22).rotateX(-Math.PI / 2)),
      new T.LineBasicMaterial({ color: 0x252d39, transparent: true, opacity: 0.5 }),
    );
    wire.position.y = -1.6;
    const g = new T.Group();
    g.add(pts);
    g.add(wire);
    scene.add(g);
    const base = (geo.attributes.position.array as Float32Array).slice();
    camera.position.set(0, 3.2, 11);
    camera.lookAt(0, 0, -6);
    return () => {
      const a = geo.attributes.position.array as Float32Array,
        t = st.t,
        mx = st.ry,
        mz = st.rx;
      for (let i = 0; i < a.length; i += 3) {
        const x = base[i],
          z = base[i + 2],
          d = Math.hypot(x - mx * 10, z - (mz * 6 + 2));
        a[i + 1] =
          Math.sin(x * 0.32 + t * 0.9) * 0.55 +
          Math.cos(z * 0.28 + t * 0.7) * 0.55 +
          Math.exp(-d * d * 0.05) * 1.6 * Math.sin(d * 1.2 - t * 4);
      }
      geo.attributes.position.needsUpdate = true;
      g.rotation.y = st.ry * 0.25 + st.spin;
      camera.position.y = 3.2 + st.scroll * 0.003;
    };
  },

  cluster: ({ scene, camera, el, st }) => {
    const g = new T.Group();
    scene.add(g);
    const hexG = new T.CylinderGeometry(0.6, 0.6, 0.32, 6),
      eG = new T.EdgesGeometry(hexG),
      fill = new T.MeshBasicMaterial({ color: 0x0d1118 });
    const mOld = new T.LineBasicMaterial({ color: HAIR }),
      mNew = new T.LineBasicMaterial({ color: GREEN }),
      mMid = new T.LineBasicMaterial({ color: 0xf4f7ff });
    const aspect0 = (el.clientWidth || 1) / (el.clientHeight || 1),
      C = 18,
      RR = 12;
    const pods: { grp: T.Group; e: T.LineSegments; x: number; z: number; v: number; flip: number }[] = [];
    g.scale.setScalar(Math.max(1, (12.6 * aspect0 + 3) / (C * 1.2)));
    for (let i = 0; i < C; i++)
      for (let j = 0; j < RR; j++) {
        const x = (i - C / 2) * 1.2 + (j % 2) * 0.6,
          z = (j - RR / 2) * 1.04,
          grp = new T.Group(),
          e = new T.LineSegments(eG, mOld);
        grp.add(new T.Mesh(hexG, fill));
        grp.add(e);
        grp.position.set(x, 0, z);
        g.add(grp);
        pods.push({ grp, e, x, z, v: 0, flip: -1 });
      }
    {
      const W = C * 1.2,
        z0 = -RR * 0.52 - 0.6,
        z1 = RR * 0.52;
      const nr = (x0: number, x1: number) => {
        const p = [
          [x0, z0],
          [x1, z0],
          [x1, z1],
          [x0, z1],
          [x0, z0],
        ].map(([x, z]) => new T.Vector3(x, -0.3, z));
        g.add(
          new T.Line(new T.BufferGeometry().setFromPoints(p), new T.LineBasicMaterial({ color: HAIR, transparent: true, opacity: 0.8 })),
        );
      };
      for (let n = 0; n < 3; n++) nr(-W / 2 + (n * W) / 3 + 0.2, -W / 2 + ((n + 1) * W) / 3 - 0.2);
    }
    camera.position.set(0, 9, 10);
    camera.lookAt(0, 0, 0);
    let wave = -99,
      ver = 0;
    return () => {
      const t = st.t,
        mx = st.ry * 9,
        mz = st.rx * 5;
      if (t > wave + 7) {
        wave = t;
        ver = 1 - ver;
      }
      const front = (t - wave) * ((C * 1.2) / 4.2) - C * 0.62;
      pods.forEach((p) => {
        const target = p.x < front ? ver : 1 - ver;
        if (p.v !== target && p.flip < 0) {
          p.flip = t;
          p.v = target;
        }
        const k = p.flip >= 0 ? Math.min(1, (t - p.flip) / 0.6) : 1;
        if (k >= 1) p.flip = -1;
        const d = Math.hypot(p.x - mx, p.z - mz);
        p.grp.position.y =
          (p.flip >= 0 ? Math.sin(k * Math.PI) * 1.1 : 0) + Math.exp(-d * d * 0.12) * 0.9 + Math.sin(p.x * 0.5 + t) * 0.06;
        p.grp.scale.setScalar(p.flip >= 0 ? 0.55 + 0.45 * k : 1);
        p.e.material = p.flip >= 0 ? mMid : p.v ? mNew : mOld;
      });
      g.rotation.y = st.ry * 0.18 + st.spin + Math.sin(t * 0.1) * 0.08;
      camera.position.y = 9 + st.scroll * 0.004;
    };
  },

  globo: ({ scene, camera, el, st, hero }) => {
    const g = new T.Group();
    scene.add(g);
    const R = 4.2;
    g.add(new T.Points(new T.IcosahedronGeometry(R, 14), new T.PointsMaterial({ color: MUTED, size: 0.03, transparent: true, opacity: 0.5 })));
    const ring = (f: (a: number) => T.Vector3) => {
      const p: T.Vector3[] = [];
      for (let i = 0; i <= 96; i++) p.push(f((i / 96) * Math.PI * 2));
      g.add(new T.Line(new T.BufferGeometry().setFromPoints(p), new T.LineBasicMaterial({ color: HAIR, transparent: true, opacity: 0.8 })));
    };
    for (let k = -3; k <= 3; k++) {
      const a = k * 0.42,
        r = R * Math.cos(a),
        y = R * Math.sin(a);
      ring((b) => new T.Vector3(Math.cos(b) * r, y, Math.sin(b) * r));
    }
    for (let k = 0; k < 6; k++) {
      const c = Math.cos((k * Math.PI) / 6),
        s = Math.sin((k * Math.PI) / 6);
      ring((a) => new T.Vector3(Math.cos(a) * R * c, Math.sin(a) * R, Math.cos(a) * R * s));
    }
    const ll = (la: number, lo: number) => {
      const a = (la * Math.PI) / 180,
        b = (-lo * Math.PI) / 180;
      return new T.Vector3(Math.cos(a) * Math.cos(b) * R, Math.sin(a) * R, Math.cos(a) * Math.sin(b) * R);
    };
    const regs = (
      [
        [-15.8, -47.9],
        [-23.5, -46.6],
        [38.9, -77],
        [45.5, -122.7],
        [53.3, -6.2],
        [50.1, 8.7],
        [1.3, 103.8],
        [35.7, 139.7],
        [-33.9, 151.2],
        [19, 72.8],
      ] as [number, number][]
    ).map(([a, b]) => ll(a, b));
    const nG = new T.BoxGeometry(0.18, 0.18, 0.18),
      nM = new T.MeshBasicMaterial({ color: GREEN });
    const nodes = regs.map((p) => {
      const m = new T.Mesh(nG, nM);
      m.position.copy(p);
      g.add(m);
      return m;
    });
    const pG = new T.BoxGeometry(0.09, 0.09, 0.09);
    const arcs: { c: T.QuadraticBezierCurve3; m: T.Mesh; t: number; sp: number }[] = [];
    (
      [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [2, 4],
        [5, 6],
        [6, 7],
        [7, 8],
        [4, 9],
        [1, 5],
        [3, 7],
      ] as [number, number][]
    ).forEach(([a, b]) => {
      const A = regs[a],
        B = regs[b],
        mid = A.clone().add(B).multiplyScalar(0.5);
      mid.setLength(R * (1.15 + A.distanceTo(B) * 0.06));
      const c = new T.QuadraticBezierCurve3(A, mid, B);
      g.add(new T.Line(new T.BufferGeometry().setFromPoints(c.getPoints(48)), new T.LineBasicMaterial({ color: GREEN, transparent: true, opacity: 0.35 })));
      const m = new T.Mesh(pG, nM);
      g.add(m);
      arcs.push({ c, m, t: Math.random(), sp: 0.25 + Math.random() * 0.35 });
    });
    camera.position.set(0, 0, 13);
    return (dt) => {
      arcs.forEach((a) => {
        a.t = (a.t + dt * a.sp) % 1;
        a.m.position.copy(a.c.getPoint(a.t));
      });
      nodes.forEach((n, i) => n.scale.setScalar(1 + Math.sin(st.t * 3 + i) * 0.3));
      g.rotation.y = st.t * 0.07 + st.ry * 0.4 + st.spin;
      g.rotation.x = 0.3 + st.rx * 0.15;
      g.position.x = hero ? 0 : wideOf(el) ? 3.4 : 0;
      camera.position.z = 13 + st.scroll * 0.006;
    };
  },

  paineis: ({ scene, camera, st }) => {
    const g = new T.Group();
    scene.add(g);
    const PW = 3.2,
      PH = 2,
      M = 64;
    type Panel = { p: T.Group; arr: Float32Array; lg: T.BufferGeometry; vals: number[]; bars: T.Mesh[]; baseY: number; acc: number; ph: number };
    const panels: Panel[] = [];
    const rect = (w: number, hh: number) =>
      new T.BufferGeometry().setFromPoints(
        [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
          [-1, -1],
        ].map(([a, b]) => new T.Vector3((a * w) / 2, (b * hh) / 2, 0)),
      );
    const fillG = new T.PlaneGeometry(PW, PH),
      fillM = new T.MeshBasicMaterial({ color: 0x0d1118, transparent: true, opacity: 0.9 });
    for (let r = 0; r < 2; r++)
      for (let c = 0; c < 4; c++) {
        const p = new T.Group(),
          ang = (c - 1.5) * 0.42,
          hot = (r * 4 + c) % 3 === 0,
          isBar = !hot && (r + c) % 2 === 1;
        const baseY = (r - 0.5) * 2.5;
        p.position.set(Math.sin(ang) * 9, baseY, -Math.cos(ang) * 9 + 7);
        p.rotation.y = -ang;
        p.add(new T.Mesh(fillG, fillM));
        p.add(new T.Line(rect(PW, PH), new T.LineBasicMaterial({ color: hot ? GREEN : HAIR })));
        p.add(
          new T.Line(
            new T.BufferGeometry().setFromPoints([new T.Vector3(-PW / 2, PH / 2 - 0.3, 0.01), new T.Vector3(PW / 2, PH / 2 - 0.3, 0.01)]),
            new T.LineBasicMaterial({ color: HAIR }),
          ),
        );
        const tg = new T.Mesh(new T.PlaneGeometry(0.9, 0.07), new T.MeshBasicMaterial({ color: MUTED }));
        tg.position.set(-PW / 2 + 0.6, PH / 2 - 0.15, 0.01);
        p.add(tg);
        const dot = new T.Mesh(new T.PlaneGeometry(0.1, 0.1), new T.MeshBasicMaterial({ color: GREEN }));
        dot.position.set(PW / 2 - 0.2, PH / 2 - 0.15, 0.01);
        p.add(dot);
        const arr = new Float32Array(M * 3),
          vals: number[] = [];
        let v = Math.random();
        for (let i = 0; i < M; i++) {
          v = Math.max(0, Math.min(1, v + (Math.random() - 0.5) * 0.25));
          vals.push(v);
        }
        const lg = new T.BufferGeometry();
        lg.setAttribute("position", new T.BufferAttribute(arr, 3));
        const bars: T.Mesh[] = [];
        if (isBar)
          for (let i = 0; i < 14; i++) {
            const b = new T.Mesh(new T.PlaneGeometry(0.14, 1), new T.MeshBasicMaterial({ color: i % 5 === 0 ? GREEN : 0x36405b }));
            b.position.set(-PW / 2 + 0.3 + i * 0.19, 0, 0.01);
            p.add(b);
            bars.push(b);
          }
        else p.add(new T.Line(lg, new T.LineBasicMaterial({ color: hot ? GREEN : 0xf4f7ff })));
        g.add(p);
        panels.push({ p, arr, lg, vals, bars, baseY, acc: 0, ph: Math.random() * 6 });
      }
    camera.position.set(0, 0, 10);
    return (dt) => {
      panels.forEach((o) => {
        o.acc += dt;
        if (o.acc > 0.12) {
          o.acc = 0;
          let nv = o.vals[o.vals.length - 1] + (Math.random() - 0.5) * 0.28;
          if (Math.random() < 0.03) nv += 0.5;
          o.vals.push(Math.max(0, Math.min(1, nv)));
          o.vals.shift();
        }
        if (o.bars.length)
          o.bars.forEach((b, i) => {
            const hh = 0.1 + (Math.sin(st.t * 2 + i * 0.7 + o.ph) * 0.5 + 0.5) * 1.2;
            b.scale.y = hh;
            b.position.y = -PH / 2 + 0.15 + hh / 2;
          });
        else {
          for (let i = 0; i < M; i++) {
            o.arr[i * 3] = -PW / 2 + 0.15 + (i / (M - 1)) * (PW - 0.3);
            o.arr[i * 3 + 1] = -PH / 2 + 0.2 + o.vals[i] * (PH - 0.65);
            o.arr[i * 3 + 2] = 0.02;
          }
          o.lg.attributes.position.needsUpdate = true;
        }
        o.p.position.y = o.baseY + Math.sin(st.t * 0.6 + o.ph) * 0.08;
      });
      g.rotation.y = st.ry * 0.18 + st.spin;
      g.rotation.x = st.rx * 0.08;
      camera.position.z = 10 + st.scroll * 0.004;
    };
  },

  logs: ({ scene, camera, st }) => {
    const N = 700,
      pos = new Float32Array(N * 6),
      col = new Float32Array(N * 6);
    const L: { x: number; y: number; z: number; len: number; sp: number; lvl: number }[] = [];
    for (let i = 0; i < N; i++)
      L.push({
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 20,
        z: -Math.random() * 14,
        len: 0.3 + Math.random() * 1.8,
        sp: 0.6 + Math.random() * 1.4,
        lvl: Math.random() < 0.06 ? 2 : Math.random() < 0.3 ? 1 : 0,
      });
    const geo = new T.BufferGeometry();
    geo.setAttribute("position", new T.BufferAttribute(pos, 3));
    geo.setAttribute("color", new T.BufferAttribute(col, 3));
    const lines = new T.LineSegments(geo, new T.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.95 }));
    scene.add(lines);
    const cW = new T.Color(0xf4f7ff),
      cM = new T.Color(0x3a4556),
      cG = new T.Color(GREEN);
    camera.position.set(0, 0, 10);
    return (dt) => {
      const my = -st.rx * 6;
      L.forEach((l, i) => {
        l.y += dt * l.sp;
        if (l.y > 10) {
          l.y = -10;
          l.x = (Math.random() - 0.5) * 30;
        }
        const j = i * 6;
        pos[j] = l.x;
        pos[j + 1] = l.y;
        pos[j + 2] = l.z;
        pos[j + 3] = l.x + l.len;
        pos[j + 4] = l.y;
        pos[j + 5] = l.z;
        const c = l.lvl === 2 || (Math.abs(l.y - my) < 1 && l.z > -7) ? cG : l.lvl === 1 ? cW : cM;
        col[j] = c.r;
        col[j + 1] = c.g;
        col[j + 2] = c.b;
        col[j + 3] = c.r;
        col[j + 4] = c.g;
        col[j + 5] = c.b;
      });
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
      lines.rotation.y = st.ry * 0.15 + st.spin;
      camera.position.y = -st.scroll * 0.002;
    };
  },
};

export function makeStage(el: HTMLElement, kind: SceneKind, opts: { hero?: boolean } = {}): Stage {
  const hero = !!opts.hero;
  const W = el.clientWidth || innerWidth,
    H = el.clientHeight || innerHeight;
  const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, hero ? 2 : 1.25));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 700ms linear";
  el.appendChild(renderer.domElement);
  requestAnimationFrame(() => {
    renderer.domElement.style.opacity = "1";
  });
  const scene = new T.Scene();
  scene.fog = new T.Fog(0x090a0e, 10, 32);
  const camera = new T.PerspectiveCamera(50, W / H, 0.1, 120);
  const st: State = { t: 0, rx: 0, ry: 0, spin: 0, spinV: 0, drag: null, scroll: hero ? scrollY : 0 };
  const update = SCENES[kind]({ scene, camera, el, st, hero });

  let dead = false,
    raf = 0,
    last = performance.now();
  const loop = (now: number) => {
    if (dead) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    st.t += dt;
    st.ry += (pointer.nx - st.ry) * 0.04;
    st.rx += (pointer.ny - st.rx) * 0.04;
    if (st.drag == null) st.spinV *= 0.95;
    st.spin += st.spinV;
    const r = el.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) {
      update(dt);
      renderer.render(scene, camera);
    }
    if (hero) el.style.opacity = String(Math.max(0, 1 - (st.scroll / innerHeight) * 0.9));
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  const ro = new ResizeObserver(() => {
    const w = el.clientWidth,
      h = el.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  ro.observe(el);

  // the hero scene can be spun by dragging anywhere on its section
  const sec = hero ? el.parentElement : null;
  const down = (e: PointerEvent) => {
    if ((e.target as Element).closest("a,button")) return;
    st.drag = e.clientX;
  };
  const up = () => {
    st.drag = null;
  };
  const mv = (e: PointerEvent) => {
    if (st.drag != null) {
      st.spinV = (e.clientX - st.drag) * 0.002;
      st.drag = e.clientX;
    }
  };
  if (sec) {
    sec.addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    addEventListener("pointermove", mv);
  }

  return {
    get scroll() {
      return st.scroll;
    },
    set scroll(v: number) {
      st.scroll = v;
    },
    dispose() {
      dead = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (sec) {
        sec.removeEventListener("pointerdown", down);
        removeEventListener("pointerup", up);
        removeEventListener("pointermove", mv);
      }
      scene.traverse((o) => (o as T.Mesh).geometry?.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
