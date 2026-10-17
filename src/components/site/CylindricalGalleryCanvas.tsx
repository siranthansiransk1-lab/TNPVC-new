import React, { useEffect, useRef, useState, useCallback } from "react";

export interface GalleryItemRenderData {
  id: number;
  url: string;
  isCircular?: boolean;
  rect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  hover: number;
  pointer: { x: number; y: number };
  zoom: number;
}

export interface CylindricalGalleryCanvasProps {
  items: GalleryItemRenderData[];
  curlStrength?: number; // Optional external override
  onWebglReadyChange?: (ready: boolean) => void;
  className?: string;
}

// ─── Native 2D Simplex Noise for WebGL (Ian McEwan, Ashima Arts - MIT) ───
const SIMPLEX_NOISE_GLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 10.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = x0.x > x0.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;

const VERTEX_SHADER_SRC = `
attribute vec2 aPosition;
varying vec2 vScreenUv;

void main() {
  vScreenUv = aPosition;
  gl_Position = vec4(aPosition.x * 2.0 - 1.0, 1.0 - aPosition.y * 2.0, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;

uniform sampler2D uTexture;
uniform vec2 uViewport;        // [width, height] in CSS pixels
uniform vec4 uRect;            // [left, top, width, height] in CSS pixels
uniform vec2 uImageSize;       // [naturalWidth, naturalHeight]
uniform vec2 uPointer;         // normalized pointer in item [0, 1]
uniform float uCurlStrength;   // scroll-driven edge curl strength [0.0 = flat, >0 = curved]
uniform float uHover;          // smoothed hover state [0, 1]
uniform float uZoom;           // micro zoom scale
uniform float uIsCircular;     // 1.0 for circular medallion, 0.0 for rectangle
uniform float uRadius;         // corner radius in CSS pixels

varying vec2 vScreenUv;

${SIMPLEX_NOISE_GLSL}

void main() {
  // ─── Estudio Bang / Tremendo Studio Viewport Edge Cylindrical Distortion ───
  // Bends screen-space coordinates BEFORE mapping into card bounding box.
  // The center of the viewport (centeredY == 0.0) remains predominantly flat and undistorted.
  // Curvature gradually increases towards top and bottom viewport boundaries.
  vec2 screenUv = vScreenUv;
  float centeredY = screenUv.y * 2.0 - 1.0;
  
  // Authentic circular cylinder cross-section: 0 at center, 1 at top/bottom edges
  float edgeProfile = 1.0 - sqrt(max(0.0, 1.0 - centeredY * centeredY));
  
  // Inverse sampling: compressing screenUv.x causes visible card edges to curl outward
  // near the top and bottom viewport boundaries, rolling into depth
  screenUv.x = 0.5 + (screenUv.x - 0.5) * (1.0 - edgeProfile * uCurlStrength);
  
  // Longitudinal perspective compression as the surface rolls over the horizon
  screenUv.y = 0.5 + (screenUv.y - 0.5) * (1.0 - edgeProfile * uCurlStrength * 0.32);

  // Map into item bounding box
  vec2 localUv = (screenUv * uViewport - uRect.xy) / uRect.zw;

  // Anti-Aliased Shape Masking
  float mask = 1.0;
  if (uIsCircular > 0.5) {
    float dist = length(localUv - vec2(0.5));
    mask = smoothstep(0.5, 0.485, dist);
    if (mask <= 0.0) discard;
  } else {
    vec2 edgePx = min(localUv, 1.0 - localUv) * uRect.zw;
    vec2 cornerDist = max(vec2(0.0), abs(localUv - 0.5) * uRect.zw - (uRect.zw * 0.5 - vec2(uRadius)));
    float cornerLen = length(cornerDist);
    if (cornerLen > 0.0) {
      mask = 1.0 - smoothstep(uRadius - 1.2, uRadius + 0.2, cornerLen);
    } else {
      mask = smoothstep(0.0, 0.8, min(edgePx.x, edgePx.y));
    }
    if (mask <= 0.0) discard;
  }

  // Cover image aspect ratio preservation
  vec2 uv = 0.5 + (localUv - 0.5) / uZoom;
  float aspect = uRect.z / max(uRect.w, 1.0);
  float imageAspect = uImageSize.x / max(uImageSize.y, 1.0);
  if (imageAspect > aspect) {
    uv.x = 0.5 + (uv.x - 0.5) * aspect / imageAspect;
  } else {
    uv.y = 0.5 + (uv.y - 0.5) * imageAspect / aspect;
  }

  // Estudio Bang Simplex Noise Hover Displacement
  float circle = 1.0 - length((localUv - uPointer) * vec2(1.0, 1.0 / aspect)) * 15.0;
  float pointerDistancePx = length((localUv - uPointer) * uRect.zw);
  float focusMask = smoothstep(14.0, 48.0, pointerDistancePx);
  float displacement = circle * snoise(gl_FragCoord.xy) * 0.0028 * uHover * focusMask;
  uv += vec2(displacement, -displacement);

  vec3 color = texture2D(uTexture, clamp(uv, 0.0, 1.0)).rgb;

  // Subtle cylindrical lighting depth: curved edge receives gentle depth shading
  // At rest (uCurlStrength == 0.0), depthShade is exactly 1.0 (flat planar lighting)
  float depthShade = mix(1.0, 0.94 + 0.06 * (1.0 - edgeProfile), min(1.0, uCurlStrength * 16.0));
  float hoverLight = 1.0 + uHover * 0.05;
  color *= depthShade * hoverLight;

  gl_FragColor = vec4(color * mask, mask);
}
`;

interface TextureEntry {
  status: "loading" | "ready" | "failed";
  texture: WebGLTexture | null;
  width: number;
  height: number;
  usedAt: number;
  image: HTMLImageElement | null;
}

export const CylindricalGalleryCanvas: React.FC<CylindricalGalleryCanvasProps> = ({
  items,
  curlStrength: externalCurlStrength,
  onWebglReadyChange,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const bufferRef = useRef<WebGLBuffer | null>(null);
  const texturesRef = useRef<Map<string, TextureEntry>>(new Map());
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const isDestroyedRef = useRef<boolean>(false);
  const [webglReady, setWebglReady] = useState<boolean>(false);

  const itemsRef = useRef<GalleryItemRenderData[]>(items);
  itemsRef.current = items;

  // Estudio Bang Scroll Velocity & Decay Engine State
  const scrollPhysicsRef = useRef<{
    lastTime: number;
    lastScrollY: number;
    lastScrollTime: number;
    velocity: number;
    smoothedIntensity: number;
    rafId: number;
  }>({
    lastTime: performance.now(),
    lastScrollY: typeof window !== "undefined" ? window.scrollY : 0,
    lastScrollTime: performance.now(),
    velocity: 0,
    smoothedIntensity: 0,
    rafId: 0,
  });

  // Inform parent of WebGL readiness
  useEffect(() => {
    onWebglReadyChange?.(webglReady);
  }, [webglReady, onWebglReadyChange]);

  // WebGL Pipeline Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    isDestroyedRef.current = false;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.warn("WebGL not supported; falling back to DOM layout.");
      setWebglReady(false);
      return;
    }

    glRef.current = gl;

    const compileShader = (type: number, src: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const frag = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);

    if (!vert || !frag) {
      setWebglReady(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      setWebglReady(false);
      return;
    }

    programRef.current = program;

    // Cache uniform locations
    uniformsRef.current = {
      uTexture: gl.getUniformLocation(program, "uTexture"),
      uViewport: gl.getUniformLocation(program, "uViewport"),
      uRect: gl.getUniformLocation(program, "uRect"),
      uImageSize: gl.getUniformLocation(program, "uImageSize"),
      uPointer: gl.getUniformLocation(program, "uPointer"),
      uCurlStrength: gl.getUniformLocation(program, "uCurlStrength"),
      uHover: gl.getUniformLocation(program, "uHover"),
      uZoom: gl.getUniformLocation(program, "uZoom"),
      uIsCircular: gl.getUniformLocation(program, "uIsCircular"),
      uRadius: gl.getUniformLocation(program, "uRadius"),
    };

    // Full-screen Quad Buffer [0..1]
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const quadVertices = new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);
    bufferRef.current = buffer;

    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Alpha blending configuration
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    setWebglReady(true);

    return () => {
      isDestroyedRef.current = true;
      setWebglReady(false);

      texturesRef.current.forEach((entry) => {
        if (entry.texture && glRef.current) {
          glRef.current.deleteTexture(entry.texture);
        }
      });
      texturesRef.current.clear();

      if (bufferRef.current && glRef.current) {
        glRef.current.deleteBuffer(bufferRef.current);
      }
      if (programRef.current && glRef.current) {
        glRef.current.deleteProgram(programRef.current);
      }
    };
  }, []);

  // Texture Loader & LRU Cache
  const getTexture = useCallback((url: string): TextureEntry | null => {
    const gl = glRef.current;
    if (!gl) return null;

    const existing = texturesRef.current.get(url);
    if (existing) {
      existing.usedAt = performance.now();
      return existing;
    }

    const entry: TextureEntry = {
      status: "loading",
      texture: null,
      width: 1,
      height: 1,
      usedAt: performance.now(),
      image: null,
    };
    texturesRef.current.set(url, entry);

    const img = new Image();
    img.crossOrigin = "anonymous";
    entry.image = img;

    img.onload = () => {
      if (isDestroyedRef.current || !glRef.current) return;

      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      } catch (err) {
        console.warn("Failed texture upload for:", url, err);
        entry.status = "failed";
        return;
      }

      entry.texture = tex;
      entry.width = img.naturalWidth || 800;
      entry.height = img.naturalHeight || 600;
      entry.status = "ready";
      entry.image = null;
    };

    img.onerror = () => {
      entry.status = "failed";
      entry.image = null;
    };

    img.src = url;
    return null;
  }, []);

  // ─── Scroll Velocity Tracker (Passive, 0 Latency) ───
  useEffect(() => {
    const handleScroll = () => {
      const physics = scrollPhysicsRef.current;
      const now = performance.now();
      const currentY = window.scrollY;
      const deltaY = Math.abs(currentY - physics.lastScrollY);
      const deltaTime = Math.max(1, now - physics.lastScrollTime);

      // Clamp anomalous jumps (e.g. initial hash navigation)
      physics.velocity =
        deltaY > Math.max(window.innerHeight * 1.5, 1200)
          ? 0
          : (deltaY / deltaTime) * 1000;

      physics.lastScrollY = currentY;
      physics.lastScrollTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Main WebGL Render Loop with bybang.co Physics Settling ───
  useEffect(() => {
    if (!webglReady) return;

    let rafId: number;

    const render = (now: number) => {
      const gl = glRef.current;
      const canvas = canvasRef.current;
      const program = programRef.current;
      const uniforms = uniformsRef.current;
      const physics = scrollPhysicsRef.current;

      if (!gl || !canvas || !program) return;

      // Time delta calculation clamped for frame hitch protection
      const dt = Math.min(100, Math.max(0, now - physics.lastTime));
      physics.lastTime = now;

      // ─── Estudio Bang Velocity & Curvature Damping Equation ───
      // Active scroll window: within last 48ms
      const isActivelyScrolling = now - physics.lastScrollTime < 48;
      const targetIntensity = isActivelyScrolling
        ? Math.min(physics.velocity / 700, 1.0)
        : 0;

      // Asymmetric spring damping: 25ms rise on scroll, 180ms gentle uncurling back to flat
      const G = targetIntensity > physics.smoothedIntensity ? 25 : 180;
      physics.smoothedIntensity +=
        (targetIntensity - physics.smoothedIntensity) *
        (1 - Math.exp(-dt / G));

      // Snap cleanly to 0 at rest to guarantee 100% planar undistorted layout
      if (targetIntensity === 0 && physics.smoothedIntensity < 0.0005) {
        physics.smoothedIntensity = 0;
      }

      // Check prefers-reduced-motion
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Authentic Estudio Bang curl constant: 0.052 max curl strength
      const maxCurl = 0.052;
      const activeCurl =
        externalCurlStrength !== undefined
          ? externalCurlStrength * maxCurl
          : prefersReducedMotion
          ? 0
          : maxCurl * physics.smoothedIntensity;

      // Match canvas resolution to device pixel ratio
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const targetH = Math.max(1, Math.round(canvas.clientHeight * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      gl.viewport(0, 0, targetW, targetH);
      gl.useProgram(program);

      gl.uniform2f(uniforms.uViewport, canvas.clientWidth, canvas.clientHeight);

      gl.disable(gl.SCISSOR_TEST);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.SCISSOR_TEST);

      const scale = targetW / canvas.clientWidth;

      // Scissor box horizontal expansion ensures curled edges are never clipped
      const expandC =
        canvas.clientWidth *
          0.5 *
          (activeCurl / Math.max(0.01, 1.0 - activeCurl)) +
        8;

      for (const item of itemsRef.current) {
        const texEntry = getTexture(item.url);
        if (!texEntry || !texEntry.texture) continue;

        const { rect, hover, pointer, zoom, isCircular } = item;

        const rectBottom = rect.top + rect.height;
        const rectRight = rect.left + rect.width;

        // Skip completely offscreen items
        if (
          rectBottom < -80 ||
          rect.top > canvas.clientHeight + 80 ||
          rectRight < -80 ||
          rect.left > canvas.clientWidth + 80
        ) {
          continue;
        }

        const scissorLeft = Math.max(
          0,
          Math.floor((rect.left - expandC) * scale)
        );
        const scissorRight = Math.min(
          targetW,
          Math.ceil((rect.left + rect.width + expandC) * scale)
        );
        const scissorBottom = Math.max(
          0,
          Math.floor((canvas.clientHeight - (rect.top + rect.height)) * scale)
        );
        const scissorTop = Math.min(
          targetH,
          Math.ceil((canvas.clientHeight - rect.top) * scale)
        );

        const scissorW = Math.max(0, scissorRight - scissorLeft);
        const scissorH = Math.max(0, scissorTop - scissorBottom);

        if (scissorW <= 0 || scissorH <= 0) continue;

        gl.scissor(scissorLeft, scissorBottom, scissorW, scissorH);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texEntry.texture);

        gl.uniform4f(uniforms.uRect, rect.left, rect.top, rect.width, rect.height);
        gl.uniform2f(uniforms.uImageSize, texEntry.width, texEntry.height);
        gl.uniform2f(uniforms.uPointer, pointer.x, pointer.y);
        gl.uniform1f(uniforms.uCurlStrength, activeCurl);
        gl.uniform1f(uniforms.uHover, hover);
        gl.uniform1f(uniforms.uZoom, zoom);
        gl.uniform1f(uniforms.uIsCircular, isCircular ? 1.0 : 0.0);
        gl.uniform1f(uniforms.uRadius, isCircular ? 0.0 : 10.0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [webglReady, externalCurlStrength, getTexture]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className || "absolute inset-0 w-full h-full pointer-events-none"}
      style={{ zIndex: 10 }}
    />
  );
};

export default CylindricalGalleryCanvas;
