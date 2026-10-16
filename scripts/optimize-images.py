"""Create the lighter image variants the site serves in grids and cards.

Originals in public/images stay untouched (they are used in the full-size
lightbox). Run after adding or replacing an image:

    python scripts/optimize-images.py
"""
from pathlib import Path

from PIL import Image

IMAGES = Path(__file__).resolve().parent.parent / "public" / "images"
THUMBS = IMAGES / "thumbs"


def save_webp(source: Path, target: Path, width: int, quality: int = 78) -> None:
    image = Image.open(source).convert("RGB")
    if image.width > width:
        image = image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)
    image.save(target, "WEBP", quality=quality, method=6)
    print(f"{target.relative_to(IMAGES)}  {image.width}x{image.height}  {target.stat().st_size // 1024} KB")


def main() -> None:
    THUMBS.mkdir(exist_ok=True)
    # Social designs and persona previews: shown at most ~620 px wide in cards.
    for source in sorted(IMAGES.glob("image-*.webp")) + sorted(IMAGES.glob("*-personas.png")):
        save_webp(source, THUMBS / f"{source.stem}.webp", 720)
    # Reel posters: tiles are at most ~340 px wide (680 px at 2x).
    for source in sorted(IMAGES.glob("video-*.jpg")):
        save_webp(source, THUMBS / f"{source.stem}.webp", 540, quality=74)
    save_webp(IMAGES / "shimaa-portrait.webp", THUMBS / "shimaa-portrait.webp", 640, quality=80)


if __name__ == "__main__":
    main()
