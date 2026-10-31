"""Create the lighter image variants the site serves in grids and cards.

Originals in public/images stay untouched (they are used in the full-size
lightbox). Run after adding or replacing an image:

    python scripts/optimize-images.py

To add one new design from an original export (never a screenshot or a Facebook copy):

    python scripts/optimize-images.py add "Data/new design.png" image-21

That writes public/images/image-21.webp (full size), images/thumbs/image-21.webp (720 px card
preview) and, for designs wider than 1600 px, images/large/image-21.webp (1254 px, for phones),
then prints the line to add to designSizes in src/lib/media.ts. See docs/adding-work.md.
"""
import sys
from pathlib import Path

from PIL import Image

IMAGES = Path(__file__).resolve().parent.parent / "public" / "images"
THUMBS = IMAGES / "thumbs"
LARGE = IMAGES / "large"


def save_webp(source: Path | Image.Image, target: Path, width: int, quality: int = 78) -> None:
    image = source if isinstance(source, Image.Image) else Image.open(source).convert("RGB")
    if image.width > width:
        image = image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)
    image.save(target, "WEBP", quality=quality, method=6)
    print(f"{target.relative_to(IMAGES)}  {image.width}x{image.height}  {target.stat().st_size // 1024} KB")


def open_flat(source: Path) -> Image.Image:
    """Open an original export; transparent areas become white instead of undefined (often black)."""
    image = Image.open(source)
    if image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info):
        background = Image.new("RGB", image.size, "white")
        background.paste(image.convert("RGBA"), mask=image.convert("RGBA").getchannel("A"))
        return background
    return image.convert("RGB")


def add_design(source: Path, design_id: str) -> None:
    """Full-size WebP at the original resolution plus the smaller copies the gallery serves."""
    full = IMAGES / f"{design_id}.webp"
    if full.exists():
        sys.exit(f"{full.relative_to(IMAGES)} already exists; pick the next free image id.")
    image = open_flat(source)
    image.save(full, "WEBP", quality=90, method=6)
    print(f"{full.name}  {image.width}x{image.height}  {full.stat().st_size // 1024} KB")
    # The smaller copies are resized from the original, not from the lossy full-size WebP.
    save_webp(image, THUMBS / f"{design_id}.webp", 720)
    if image.width > 1600:
        LARGE.mkdir(exist_ok=True)
        save_webp(image, LARGE / f"{design_id}.webp", 1254, quality=88)
    print()
    print("Add to designSizes in src/lib/media.ts:")
    print(f"  '{design_id}': [{image.width}, {image.height}],")


def main() -> None:
    THUMBS.mkdir(exist_ok=True)
    # Social designs and persona previews: shown at most ~620 px wide in cards.
    for source in sorted(IMAGES.glob("image-*.webp")) + sorted(IMAGES.glob("*-personas.png")):
        save_webp(source, THUMBS / f"{source.stem}.webp", 720)
        # Designs wider than 1600 px also get the 1254 px phone copy (see designImage in src/lib/media.ts).
        if source.suffix == ".webp" and Image.open(source).width > 1600:
            save_webp(source, LARGE / source.name, 1254, quality=88)
    # Reel posters: tiles are at most ~340 px wide (680 px at 2x).
    for source in sorted(IMAGES.glob("video-*.jpg")):
        save_webp(source, THUMBS / f"{source.stem}.webp", 540, quality=74)
    save_webp(IMAGES / "shimaa-portrait.webp", THUMBS / "shimaa-portrait.webp", 640, quality=80)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "add":
        if len(sys.argv) != 4:
            sys.exit('Usage: python scripts/optimize-images.py add "Data/file name.png" image-NN')
        add_design(Path(sys.argv[2]), sys.argv[3])
    elif len(sys.argv) > 1:
        sys.exit("Unknown arguments. Run with no arguments, or: add <file> <image-id>")
    else:
        main()
