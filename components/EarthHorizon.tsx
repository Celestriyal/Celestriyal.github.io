'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const surfaceVertexShader = `
varying vec2 vUv;
varying vec3 vNormalWorld;
varying vec3 vPositionWorld;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vPositionWorld = worldPos.xyz;
  vNormalWorld = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const surfaceFragmentShader = `
uniform sampler2D uDayMap;
uniform sampler2D uBumpMap;
uniform sampler2D uWaterMap;
uniform sampler2D uCloudMap;
uniform vec3 uSunDirection;
uniform float uCloudOffset;
uniform vec2 uTexelSize;
uniform float uCloudUseLuma;

varying vec2 vUv;
varying vec3 vNormalWorld;
varying vec3 vPositionWorld;

vec3 aces(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

float sampleCloud(vec2 uv) {
  vec4 c = texture2D(uCloudMap, uv, -0.65);
  return mix(c.a, c.r, uCloudUseLuma);
}

vec3 computeBumpNormal(vec3 N, vec2 uv, float landMask) {
  if (landMask < 0.05) return N;

  vec3 q0 = dFdx(vPositionWorld);
  vec3 q1 = dFdy(vPositionWorld);
  vec2 st0 = dFdx(uv);
  vec2 st1 = dFdy(uv);
  float det = st0.x * st1.y - st1.x * st0.y;
  if (abs(det) < 1e-7) return N;

  vec2 texel = vec2(1.0 / 4096.0, 1.0 / 2048.0);
  float hL = texture2D(uBumpMap, uv - vec2(texel.x, 0.0), -0.5).r;
  float hR = texture2D(uBumpMap, uv + vec2(texel.x, 0.0), -0.5).r;
  float hD = texture2D(uBumpMap, uv - vec2(0.0, texel.y), -0.5).r;
  float hU = texture2D(uBumpMap, uv + vec2(0.0, texel.y), -0.5).r;

  float bumpScale = 3.0 * landMask;
  float dHdu = (hR - hL) * bumpScale;
  float dHdv = (hU - hD) * bumpScale;

  vec3 S = normalize(q0 * st1.y - q1 * st0.y);
  vec3 T = normalize(-q0 * st1.x + q1 * st0.x);
  vec3 T_ortho = normalize(S - N * dot(N, S));
  vec3 B_ortho = normalize(T - N * dot(N, T));

  return normalize(N - T_ortho * dHdu - B_ortho * dHdv);
}

void main() {
  vec3 N_geo = normalize(vNormalWorld);
  vec3 V = normalize(cameraPosition - vPositionWorld);
  vec3 L = normalize(uSunDirection);

  float waterMask = texture2D(uWaterMap, vUv).r;
  float landMask = 1.0 - waterMask;
  vec3 N = computeBumpNormal(N_geo, vUv, landMask);

  // 5-tap unsharp micro-contrast mask + negative mipmap LOD bias for razor-sharp coastlines
  vec3 c0 = texture2D(uDayMap, vUv, -0.65).rgb;
  vec3 cL = texture2D(uDayMap, vUv - vec2(uTexelSize.x, 0.0), -0.65).rgb;
  vec3 cR = texture2D(uDayMap, vUv + vec2(uTexelSize.x, 0.0), -0.65).rgb;
  vec3 cD = texture2D(uDayMap, vUv - vec2(0.0, uTexelSize.y), -0.65).rgb;
  vec3 cU = texture2D(uDayMap, vUv + vec2(0.0, uTexelSize.y), -0.65).rgb;
  vec3 blur = (cL + cR + cD + cU) * 0.25;
  vec3 sharpenedSrgb = clamp(c0 + (c0 - blur) * 0.42, 0.0, 1.0);

  // Convert to linear light space and apply natural orbital grading
  vec3 albedo = pow(sharpenedSrgb, vec3(2.2));
  float luma = dot(albedo, vec3(0.2126, 0.7152, 0.0722));
  albedo = mix(vec3(luma), albedo, 0.82);

  // Deepen oceans toward authentic orbital cobalt/navy while preserving coastal shallows
  vec3 deepOceanTint = mix(albedo, albedo * vec3(0.72, 0.82, 0.96), 0.45);
  albedo = mix(albedo, deepOceanTint, waterMask);

  float ndotlGeo = dot(N_geo, L);
  float ndotl = dot(N, L);
  float dayFactor = smoothstep(-0.15, 0.45, ndotlGeo);
  float diffuse = max(ndotl, 0.0);
  float softDiffuse = pow(clamp(ndotl * 0.70 + 0.30, 0.0, 1.0), 1.15);

  // Crisp 2-tap cloud ground shadows synced to differential cloud rotation
  vec2 cUv1 = vec2(fract(vUv.x - uCloudOffset - 0.0014), clamp(vUv.y - 0.0010, 0.0, 1.0));
  vec2 cUv2 = vec2(fract(vUv.x - uCloudOffset - 0.0022), clamp(vUv.y - 0.0016, 0.0, 1.0));
  float cloudShadowSample = 0.65 * sampleCloud(cUv1) + 0.35 * sampleCloud(cUv2);
  float cloudShadow = 1.0 - smoothstep(0.10, 0.78, cloudShadowSample) * 0.55 * dayFactor;

  // Dual-lobe ocean specular glint
  vec3 H = normalize(L + V);
  float ndoth = max(dot(N_geo, H), 0.0);
  float ndotv = max(dot(N_geo, V), 0.0);
  float grazingF = 0.30 + 0.70 * pow(1.0 - ndotv, 2.5);
  float oceanSpec = (pow(ndoth, 20.0) * 0.08 + pow(ndoth, 110.0) * 0.28) * waterMask * grazingF * dayFactor * cloudShadow;

  // Direct solar illumination in linear space
  vec3 litSurface = albedo * (0.04 + 1.20 * mix(softDiffuse, diffuse, 0.70)) * cloudShadow;
  litSurface += vec3(0.85, 0.92, 1.0) * oceanSpec;

  // Moderate, natural Rayleigh aerial perspective toward horizon limb
  float horizon = 1.0 - ndotv;
  vec3 attenuation = exp(-vec3(0.45, 0.22, 0.05) * pow(horizon, 2.6) * 0.60);
  litSurface *= attenuation;

  float scatterFactor = clamp(pow(horizon, 2.75) * 0.70 + pow(horizon, 5.5) * 0.22, 0.0, 0.86);
  vec3 betaR = vec3(0.22, 0.48, 0.92);
  vec3 limbBlue = vec3(0.55, 0.78, 0.98);
  vec3 scatterColor = mix(betaR, limbBlue, smoothstep(0.30, 0.95, pow(horizon, 2.2)));

  vec3 color = mix(litSurface, scatterColor * (0.12 + 0.92 * dayFactor), scatterFactor * (0.18 + 0.82 * dayFactor));

  // ACES Filmic tone mapping + sRGB output
  color = aces(color);
  color = pow(color, vec3(1.0 / 2.2));
  gl_FragColor = vec4(color, 1.0);
}
`;

const cloudVertexShader = `
varying vec2 vUv;
varying vec3 vNormalWorld;
varying vec3 vPositionWorld;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vPositionWorld = worldPos.xyz;
  vNormalWorld = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const cloudFragmentShader = `
uniform sampler2D uCloudMap;
uniform vec3 uSunDirection;
uniform vec2 uTexelSize;
uniform float uCloudUseLuma;

varying vec2 vUv;
varying vec3 vNormalWorld;
varying vec3 vPositionWorld;

vec3 aces(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

float sampleCloudDensity(vec2 uv) {
  vec4 c = texture2D(uCloudMap, uv, -0.65);
  return mix(c.a, c.r, uCloudUseLuma);
}

void main() {
  vec3 N = normalize(vNormalWorld);
  vec3 V = normalize(cameraPosition - vPositionWorld);
  vec3 L = normalize(uSunDirection);

  // 5-tap unsharp mask + negative LOD bias so cumulus clusters & wispy streaks stay tack-sharp
  float d0 = sampleCloudDensity(vUv);
  float dL = sampleCloudDensity(vUv - vec2(uTexelSize.x, 0.0));
  float dR = sampleCloudDensity(vUv + vec2(uTexelSize.x, 0.0));
  float dD = sampleCloudDensity(vUv - vec2(0.0, uTexelSize.y));
  float dU = sampleCloudDensity(vUv + vec2(0.0, uTexelSize.y));
  float dBlur = (dL + dR + dD + dU) * 0.25;
  float sharpenedCloud = clamp(d0 + (d0 - dBlur) * 0.62, 0.0, 1.0);

  float rawAlpha = smoothstep(0.06, 0.74, sharpenedCloud);
  float alpha = clamp(pow(rawAlpha, 0.75) * 1.12, 0.0, 0.97);
  if (alpha < 0.005) discard;

  // Fine-grained directional 3D cloud self-shadowing
  vec2 sunOffsetUv = vec2(fract(vUv.x - 0.0009), clamp(vUv.y + 0.0007, 0.0, 1.0));
  float cloudSunward = smoothstep(0.06, 0.74, sampleCloudDensity(sunOffsetUv));
  float relief = rawAlpha - cloudSunward;

  float ndotl = dot(N, L);
  float sunLight = smoothstep(-0.18, 0.48, ndotl);
  float ndotv = max(dot(N, V), 0.0);
  float horizon = 1.0 - ndotv;

  // Pure broadband cloud albedo with crisp sunlit tops & cool blue-grey undersides
  vec3 cloudBase = vec3(0.95, 0.97, 1.0);
  vec3 shadeTint = mix(vec3(0.58, 0.70, 0.88), vec3(1.06, 1.04, 1.01), smoothstep(-0.20, 0.16, relief));
  vec3 litCloud = cloudBase * shadeTint * (0.05 + 1.10 * sunLight);

  // Subtle sky-blue aerial scattering near horizon limb
  vec3 limbBlue = vec3(0.42, 0.68, 0.96) * (0.12 + 0.90 * sunLight);
  vec3 color = mix(litCloud, limbBlue, clamp(pow(horizon, 2.7) * 0.68, 0.0, 0.74));

  color = aces(color);
  color = pow(color, vec3(1.0 / 2.2));
  gl_FragColor = vec4(color, alpha * (0.28 + 0.72 * sunLight));
}
`;

const rimVertexShader = `
varying vec3 vNormalWorld;
varying vec3 vPositionWorld;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vPositionWorld = worldPos.xyz;
  vNormalWorld = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const rimFragmentShader = `
uniform vec3 uSunDirection;
varying vec3 vNormalWorld;
varying vec3 vPositionWorld;

vec3 aces(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

void main() {
  vec3 N = normalize(vNormalWorld);
  vec3 V = normalize(cameraPosition - vPositionWorld);
  vec3 L = normalize(uSunDirection);

  float ndotv = max(dot(N, V), 0.0);
  float rim = pow(1.0 - ndotv, 7.0);
  float sunWeight = smoothstep(-0.22, 0.45, dot(N, L));

  vec3 rimColor = vec3(0.30, 0.62, 1.0);
  vec3 linear = rimColor * rim * 0.58 * (0.16 + 0.90 * sunWeight);
  vec3 color = pow(aces(linear), vec3(1.0 / 2.2));

  gl_FragColor = vec4(color, clamp(rim * 0.42 * (0.2 + 0.8 * sunWeight), 0.0, 1.0));
}
`;

const atmosphereVertexShader = `
varying vec3 vPositionWorld;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vPositionWorld = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const atmosphereFragmentShader = `
uniform vec3 uEarthCenter;
uniform vec3 uSunDirection;
uniform float uPlanetRadius;
uniform float uAtmosRadius;

varying vec3 vPositionWorld;

vec3 aces(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

vec2 raySphereIntersect(vec3 ro, vec3 rd, float rad) {
  float b = dot(ro, rd);
  float c = dot(ro, ro) - rad * rad;
  float disc = b * b - c;
  if (disc < 0.0) return vec2(-1.0);
  float s = sqrt(disc);
  return vec2(-b - s, -b + s);
}

void main() {
  vec3 ro = cameraPosition - uEarthCenter;
  vec3 rd = normalize(vPositionWorld - cameraPosition);

  vec2 atmosHit = raySphereIntersect(ro, rd, uAtmosRadius);
  if (atmosHit.y < 0.0) discard;

  float tStart = max(atmosHit.x, 0.0);
  float tEnd = atmosHit.y;

  vec2 planetHit = raySphereIntersect(ro, rd, uPlanetRadius);
  if (planetHit.x > 0.0) {
    tEnd = min(tEnd, planetHit.x);
  }

  float pathLen = max(tEnd - tStart, 0.0);
  if (pathLen <= 0.0001) discard;

  const int STEPS = 14;
  float stepSize = pathLen / float(STEPS);
  float scaleHeightR = 0.0072;
  vec3 betaR = vec3(0.16, 0.42, 0.98);
  vec3 L = normalize(uSunDirection);

  vec3 scattered = vec3(0.0);
  float opticalDepth = 0.0;

  for (int i = 0; i < STEPS; i++) {
    float t = tStart + (float(i) + 0.5) * stepSize;
    vec3 samplePos = ro + rd * t;
    float r = length(samplePos);
    float altitude = max(r - uPlanetRadius, 0.0);

    // Smoothly feather out to zero before shell edge so there is no halo ring or white wash
    float boundaryFade = smoothstep(uAtmosRadius, uPlanetRadius + (uAtmosRadius - uPlanetRadius) * 0.25, r);
    float density = exp(-altitude / scaleHeightR) * boundaryFade;
    opticalDepth += density * stepSize;

    vec3 up = samplePos / max(r, 0.0001);
    float sunAlign = smoothstep(-0.28, 0.48, dot(up, L));

    vec3 transmittance = exp(-betaR * opticalDepth * 6.5);
    vec3 limbTint = mix(vec3(0.58, 0.80, 0.98), betaR, smoothstep(0.0, 0.020, altitude));

    scattered += limbTint * (0.45 + 0.55 * transmittance) * density * (0.14 + 0.90 * sunAlign) * stepSize;
  }

  float mu = dot(rd, L);
  float phase = 0.78 + 0.28 * (mu * mu);

  vec3 linearColor = scattered * phase * 11.5;
  vec3 finalColor = pow(aces(linearColor), vec3(1.0 / 2.2));
  float alpha = clamp(opticalDepth * 7.8, 0.0, 0.92);

  gl_FragColor = vec4(finalColor, alpha);
}
`;

export default function EarthHorizon() {
  const canvasHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasHost = canvasHostRef.current;
    if (!canvasHost) return;

    const scene = new THREE.Scene();
    const fov = 32;
    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(fov * 0.5));
    const camera = new THREE.PerspectiveCamera(
      fov,
      canvasHost.clientWidth / Math.max(canvasHost.clientHeight, 1),
      0.05,
      50
    );

    const isMobile = window.innerWidth < 768;
    const getPixelRatio = () =>
      window.innerWidth < 768
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : Math.min(window.devicePixelRatio || 1, 2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(getPixelRatio());
    renderer.setSize(canvasHost.clientWidth, canvasHost.clientHeight);
    renderer.domElement.style.visibility = 'hidden';
    canvasHost.appendChild(renderer.domElement);

    const use8k = !isMobile && renderer.capabilities.maxTextureSize >= 8192;
    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), isMobile ? 8 : 16);
    const segments = isMobile ? 72 : 128;
    const loadingManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadingManager);

    const configureTex = (tex: THREE.Texture) => {
      tex.anisotropy = maxAnisotropy;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.colorSpace = THREE.NoColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    };

    const dayUrl = use8k
      ? '/textures/earth/earth_day_8k.webp'
      : '/textures/earth/earth_day_4k.jpg';
    const cloudUrl = use8k
      ? '/textures/earth/earth_clouds_8k.webp'
      : '/textures/earth/earth_clouds_4k.webp';

    const dayMap = configureTex(loader.load(dayUrl));
    const bumpMap = configureTex(loader.load('/textures/earth/earth_bump_4k.jpg'));
    const waterMap = configureTex(loader.load('/textures/earth/earth_water_4k.webp'));
    const cloudMap = configureTex(loader.load(cloudUrl));

    const texelSize = new THREE.Vector2(
      1 / (use8k ? 8192 : 4096),
      1 / (use8k ? 4096 : 2048)
    );
    const cloudUseLuma = use8k ? 1.0 : 0.0;

    // Upper-left orbital sunlight for raking mountain and 3D cloud relief
    const sunDirection = new THREE.Vector3(-0.42, 0.56, 0.72).normalize();

    const positionGroup = new THREE.Group();
    scene.add(positionGroup);

    const tiltGroup = new THREE.Group();
    // Tilt so India (Maharashtra -> Tamil Nadu -> Sri Lanka) sits dead center in the visible top 1/4 dome
    tiltGroup.rotation.set(-0.88, 0, -0.02);
    positionGroup.add(tiltGroup);

    const earthGroup = new THREE.Group();
    const baseRotY = 3.35;
    earthGroup.rotation.set(0, baseRotY, 0);
    tiltGroup.add(earthGroup);

    const planetRadius = 1.0;
    const atmosRadius = 1.036;

    // 1. 8K/4K Earth Surface
    const surfaceGeo = new THREE.SphereGeometry(planetRadius, segments, segments);
    const surfaceUniforms = {
      uDayMap: { value: dayMap },
      uBumpMap: { value: bumpMap },
      uWaterMap: { value: waterMap },
      uCloudMap: { value: cloudMap },
      uSunDirection: { value: sunDirection },
      uCloudOffset: { value: 0.0 },
      uTexelSize: { value: texelSize },
      uCloudUseLuma: { value: cloudUseLuma },
    };
    const surfaceMat = new THREE.ShaderMaterial({
      uniforms: surfaceUniforms,
      vertexShader: surfaceVertexShader,
      fragmentShader: surfaceFragmentShader,
    });
    const surfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
    earthGroup.add(surfaceMesh);

    // 2. 8K/4K Razor-Sharp Cloud Deck
    const cloudGeo = new THREE.SphereGeometry(1.0035, segments, segments);
    const cloudMat = new THREE.ShaderMaterial({
      uniforms: {
        uCloudMap: { value: cloudMap },
        uSunDirection: { value: sunDirection },
        uTexelSize: { value: texelSize },
        uCloudUseLuma: { value: cloudUseLuma },
      },
      vertexShader: cloudVertexShader,
      fragmentShader: cloudFragmentShader,
      transparent: true,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(cloudMesh);

    // 3. Tight Inner Grazing Horizon Rim
    const rimGeo = new THREE.SphereGeometry(1.005, segments, segments);
    const rimMat = new THREE.ShaderMaterial({
      uniforms: {
        uSunDirection: { value: sunDirection },
      },
      vertexShader: rimVertexShader,
      fragmentShader: rimFragmentShader,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    earthGroup.add(rimMesh);

    // 4. Tight Physically-Scaled Rayleigh Outer Atmosphere
    const atmosGeo = new THREE.SphereGeometry(atmosRadius, segments, segments);
    const atmosUniforms = {
      uEarthCenter: { value: new THREE.Vector3() },
      uSunDirection: { value: sunDirection },
      uPlanetRadius: { value: planetRadius },
      uAtmosRadius: { value: atmosRadius },
    };
    const atmosMat = new THREE.ShaderMaterial({
      uniforms: atmosUniforms,
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    positionGroup.add(atmosMesh);

    const updateFraming = () => {
      const width = canvasHost.clientWidth;
      const height = Math.max(canvasHost.clientHeight, 1);
      const aspect = width / height;
      const isPortrait = aspect < 0.85;
      const effAspect = isPortrait
        ? Math.max(aspect * 1.55, 0.78)
        : Math.min(aspect, 2.45);
      const k = (isPortrait ? 0.933 : 0.835) / (tanHalfFov * effAspect);
      const d = Math.max(1.42, Math.sqrt(k * k + 1));

      camera.aspect = aspect;
      camera.position.set(0, 0, d);
      camera.updateProjectionMatrix();

      const halfH = d * tanHalfFov;
      const projectedRadius = 1 / Math.sqrt(1 - 1 / (d * d));
      const targetY = -halfH - projectedRadius * (isPortrait ? 0.36 : 0.55);

      tiltGroup.rotation.set(isPortrait ? -0.78 : -0.88, 0, -0.02);
      positionGroup.position.set(0, targetY, 0);
      atmosUniforms.uEarthCenter.value.copy(positionGroup.position);
    };

    const mouseTarget = { x: 0, y: 0 };
    const mouseCurrent = { x: 0, y: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const nx = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      const ny = (e.clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
      mouseTarget.x = nx * 0.02;
      mouseTarget.y = ny * 0.014;
    };

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let rafId = 0;
    let isRunning = false;
    let disposed = false;
    let inViewRange = false;
    let lastTime = 0;
    let elapsed = 0;
    let cloudExtraSpin = 0;

    const getRemainingPx = () => {
      const docHeight = document.documentElement.scrollHeight;
      const bottomY = window.scrollY + window.innerHeight;
      return Math.max(0, docHeight - bottomY);
    };

    const renderFrame = (dt: number) => {
      if (!prefersReducedMotion && dt > 0) {
        elapsed += dt;
        cloudExtraSpin += dt * 0.0035;
        mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * Math.min(dt * 3.0, 1);
        mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * Math.min(dt * 3.0, 1);
      }

      const gentleDrift = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.035) * 0.035;
      earthGroup.rotation.y = baseRotY + gentleDrift + mouseCurrent.x;
      earthGroup.rotation.x = mouseCurrent.y;
      cloudMesh.rotation.y = cloudExtraSpin;
      surfaceUniforms.uCloudOffset.value = cloudExtraSpin / (Math.PI * 2);

      renderer.render(scene, camera);
    };

    const animate = (now: number) => {
      if (disposed) return;

      if (!inViewRange) {
        isRunning = false;
        renderer.domElement.style.visibility = 'hidden';
        return;
      }

      const dt = lastTime === 0 ? 0.016 : Math.min((now - lastTime) * 0.001, 0.05);
      lastTime = now;
      renderFrame(dt);

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(animate);
      } else {
        isRunning = false;
      }
    };

    const syncScrollPosition = () => {
      if (disposed) return;
      const remainingPx = getRemainingPx();
      canvasHost.style.transform = `translate3d(0, ${remainingPx}px, 0)`;

      // Pre-warm 250px before the bottom of the page enters the viewport
      inViewRange = remainingPx < window.innerHeight + 250;

      if (!inViewRange) {
        renderer.domElement.style.visibility = 'hidden';
        if (isRunning) {
          cancelAnimationFrame(rafId);
          isRunning = false;
        }
        return;
      }

      renderer.domElement.style.visibility = 'visible';

      if (prefersReducedMotion) {
        renderFrame(0);
        return;
      }

      if (!isRunning) {
        isRunning = true;
        lastTime = 0;
        rafId = requestAnimationFrame(animate);
      }
    };

    updateFraming();
    renderer.compile(scene, camera);
    loadingManager.onLoad = () => {
      if (!disposed) {
        renderFrame(0);
      }
    };

    let lastWidth = canvasHost.clientWidth;
    let lastHeight = canvasHost.clientHeight;

    const handleResize = () => {
      if (disposed) return;
      const nextWidth = canvasHost.clientWidth;
      const nextHeight = canvasHost.clientHeight;
      if (nextWidth === lastWidth && Math.abs(nextHeight - lastHeight) < 80) {
        syncScrollPosition();
        return;
      }
      lastWidth = nextWidth;
      lastHeight = nextHeight;
      renderer.setPixelRatio(getPixelRatio());
      renderer.setSize(nextWidth, nextHeight);
      updateFraming();
      syncScrollPosition();
    };

    const resizeObserver = new ResizeObserver(() => {
      syncScrollPosition();
    });
    resizeObserver.observe(document.body);

    window.addEventListener('scroll', syncScrollPosition, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    syncScrollPosition();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', syncScrollPosition);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      if (canvasHost.contains(renderer.domElement)) {
        canvasHost.removeChild(renderer.domElement);
      }
      surfaceGeo.dispose();
      cloudGeo.dispose();
      rimGeo.dispose();
      atmosGeo.dispose();
      surfaceMat.dispose();
      cloudMat.dispose();
      rimMat.dispose();
      atmosMat.dispose();
      dayMap.dispose();
      bumpMap.dispose();
      waterMap.dispose();
      cloudMap.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
      <div ref={canvasHostRef} className="w-full h-full will-change-transform" />
    </div>
  );
}
