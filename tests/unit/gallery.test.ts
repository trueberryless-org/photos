import { describe, expect, test } from "vitest";

import {
  EAGER_IMAGE_COUNT,
  getImageAlt,
  getImageAspectStyle,
  getImageLoading,
} from "../../src/libs/gallery";

describe("getImageAlt", () => {
  test.each([
    [
      "../images/mother_goose_with_two_cute_goslings.jpg",
      "mother goose with two cute goslings",
    ],
    ["../images/Close_Up_Of_Presents.JPG", "Close Up Of Presents"],
    ["../images/red-giant.png", "red giant"],
    ["../images/photo.webp", "photo"],
  ])("describes %s", (path, expected) => {
    expect(getImageAlt(path)).toBe(expected);
  });

  test("falls back for paths without a name", () => {
    expect(getImageAlt("")).toBe("Image");
    expect(getImageAlt("../images/.jpg")).toBe("Image");
  });
});

describe("getImageLoading", () => {
  test("loads the first images eagerly and the rest lazily", () => {
    expect(getImageLoading(0)).toBe("eager");
    expect(getImageLoading(EAGER_IMAGE_COUNT - 1)).toBe("eager");
    expect(getImageLoading(EAGER_IMAGE_COUNT)).toBe("lazy");
  });
});

describe("getImageAspectStyle", () => {
  test("exposes the dimensions as custom properties", () => {
    expect(getImageAspectStyle({ height: 400, width: 600 })).toBe(
      "--width: 600; --height: 400;"
    );
  });
});
