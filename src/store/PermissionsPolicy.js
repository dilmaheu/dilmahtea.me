const PermissionsPolicyRecord = {
  accelerometer: [],
  "ambient-light-sensor": [],
  autoplay: [],
  battery: [],
  camera: [],
  "display-capture": [],
  "document-domain": [],
  "encrypted-media": [],
  "execution-while-not-rendered": [],
  "execution-while-out-of-viewport": [],
  fullscreen: [],
  gamepad: [],
  geolocation: [],
  gyroscope: [],
  "layout-animations": [],
  "legacy-image-formats": [],
  magnetometer: [],
  microphone: [],
  midi: [],
  "navigation-override": [],
  "oversized-images": [],
  payment: [],
  "picture-in-picture": [],
  "publickey-credentials-get": [],
  "speaker-selection": [],
  "sync-xhr": [],
  "unoptimized-images": [],
  "unsized-media": [],
  usb: [],
  "screen-wake-lock": [],
  "web-share": [],
  "xr-spatial-tracking": [],
};

const PermissionsPolicy = Object.keys(PermissionsPolicyRecord)
  .map((directive) => {
    const sources = PermissionsPolicyRecord[directive];

    const policy = `${directive}=(${sources.join(" ")})`;

    return policy;
  })
  .join(", ");

export default PermissionsPolicy;
