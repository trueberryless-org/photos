const IMAGE_EXTENSION = /\.(jpg|jpeg|png|webp)$/i;

export const EAGER_IMAGE_COUNT = 20;

export function getImageAlt(path: string) {
  const filename = path
    .split("/")
    .pop()
    ?.replace(IMAGE_EXTENSION, "")
    .replaceAll(/[-_]/g, " ");

  return filename || "Image";
}

export function getImageLoading(index: number) {
  return index < EAGER_IMAGE_COUNT ? "eager" : "lazy";
}

export function getImageAspectStyle({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  return `--width: ${width}; --height: ${height};`;
}
