"""Render social preview cards (1200x630) and the apple-touch icon with a headless browser.

A browser is used (not PIL) so Arabic text is shaped correctly. Requires:
    pip install playwright && python -m playwright install chromium
Run from the repository root after changing a project title, subtitle or cover:
    python scripts/render-social-images.py
Pass project slugs to render only those projects' cards:
    python scripts/render-social-images.py spanish-course-tanta
"""
import base64
import html
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OG = PUBLIC / "images" / "og"
FONTS = "https://fonts.googleapis.com/css2?family=Alexandria:wght@500;700&family=DM+Sans:wght@400;600&family=DM+Serif+Display:ital@0;1&family=Readex+Pro:wght@400;500&display=block"
TINTS = {"peach": "#f0ddc8", "cream": "#f1e5d3", "rose": "#ead6d8", "sage": "#dce0cf", "lilac": "#e3dce9"}


def read_projects():
    """Pull the fields we need straight from src/lib/content.ts so the cards never drift from the site."""
    source = (ROOT / "src" / "lib" / "content.ts").read_text(encoding="utf-8")
    projects = []
    for block in re.findall(r"\{ ?slug:'.*?(?=\n \{ ?slug:|\n\];)", source, re.S):
        get = lambda key: re.search(key + r":pair\('((?:[^'\\]|\\.)*)', ?'((?:[^'\\]|\\.)*)'\)", block)
        title, subtitle = get("title"), get("subtitle")
        projects.append({
            "slug": re.search(r"slug:'([^']+)'", block).group(1),
            "brand": re.search(r"brand:'([^']+)'", block).group(1),
            "color": re.search(r"color:'([^']+)'", block).group(1),
            "cover": re.search(r"cover:'([^']+)'", block).group(1),
            "title": {"en": title.group(1), "ar": title.group(2)},
            "subtitle": {"en": subtitle.group(1), "ar": subtitle.group(2)},
        })
    return projects


def data_uri(path: Path) -> str:
    mime = {"webp": "image/webp", "png": "image/png", "jpg": "image/jpeg"}[path.suffix[1:]]
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"


BASE_CSS = """
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;background:#211b1d;color:#faf5ef;font-family:'DM Sans',sans-serif}
.card{position:relative;display:flex;height:100%;padding:64px 72px;gap:56px;align-items:center}
.card:before{content:'';position:absolute;inset:34px;border:1px solid #ffffff1f;border-radius:22px}
.copy{flex:1;min-width:0;position:relative}
.mono{direction:ltr;display:inline-block;font-family:'DM Serif Display';font-style:italic;font-size:64px;line-height:1;color:#dba0b0}
.label{margin-top:36px;font-size:20px;letter-spacing:.16em;color:#dba0b0;text-transform:uppercase}
h1{margin-top:14px;font-family:'DM Serif Display';font-weight:400;font-size:64px;line-height:1.05;letter-spacing:-.02em}
.sub{margin-top:22px;font-size:26px;color:#e8dcd6}
.url{margin-top:44px;font-size:20px;color:#a99c98}
.art{position:relative;width:400px;height:470px;border-radius:16px;display:grid;place-items:center;overflow:hidden;flex-shrink:0}
.art img{max-width:86%;max-height:86%;border-radius:6px;box-shadow:0 18px 40px #0003}
.art.video{width:276px;height:490px}
.art.video img{max-width:none;max-height:none;width:100%;height:100%;object-fit:cover;border-radius:0;box-shadow:none}
[dir=rtl] body,[dir=rtl] .copy{font-family:'Readex Pro',sans-serif}
[dir=rtl] h1{font-family:'Alexandria';font-weight:700;letter-spacing:0;line-height:1.3;font-size:58px}
[dir=rtl] .label{letter-spacing:0;font-size:22px}
[dir=rtl] .url{direction:ltr;text-align:right}
"""


def page(lang: str, body: str) -> str:
    direction = "rtl" if lang == "ar" else "ltr"
    return f'<!doctype html><html lang="{lang}" dir="{direction}"><head><meta charset="utf-8"><link rel="stylesheet" href="{FONTS}"><style>{BASE_CSS}</style></head><body>{body}</body></html>'


def project_card(project, lang):
    cover = PUBLIC / project["cover"].lstrip("/")
    kind = "video" if cover.suffix == ".jpg" else "design"
    return page(lang, f"""
      <div class="card">
        <div class="copy">
          <div class="mono">s.</div>
          <p class="label">{html.escape(project['brand'])}</p>
          <h1>{html.escape(project['title'][lang])}</h1>
          <p class="sub">{html.escape(project['subtitle'][lang])}</p>
          <p class="url">shimaa-essaam.github.io</p>
        </div>
        <div class="art {kind}" style="background:{TINTS.get(project['color'], '#f0eae2')}"><img src="{data_uri(cover)}" alt=""></div>
      </div>""")


ARABIC_SITE_CARD = page("ar", """
  <div class="card">
    <div class="copy">
      <div class="mono">s.</div>
      <p class="label">صانعة محتوى</p>
      <h1 style="font-size:96px">شيماء عصام</h1>
      <p class="sub" style="font-size:40px;color:#dba0b0">من فكرة لحكاية.</p>
      <p class="sub">كتابة السكريبتات · محتوى السوشيال · مونتاج الفيديو</p>
      <p class="url">shimaa-essaam.github.io/ar</p>
    </div>
  </div>""")

APPLE_ICON = """<!doctype html><html><head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@1&display=block">
<style>*{margin:0}body{width:180px;height:180px;background:#713447;display:grid;place-items:center}
span{font-family:'DM Serif Display';font-style:italic;font-size:118px;line-height:1;color:#faf5ef;margin-top:-14px}</style></head><body><span>s.</span></body></html>"""


def main():
    only = set(sys.argv[1:])
    OG.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        tab = browser.new_page(viewport={"width": 1200, "height": 630})

        def shoot(markup: str, target: Path):
            tab.set_content(markup, wait_until="networkidle")
            tab.evaluate("document.fonts.ready")
            tab.screenshot(path=str(target))
            print(target.relative_to(ROOT))

        for project in read_projects():
            if only and project["slug"] not in only:
                continue
            for lang in ("en", "ar"):
                suffix = "-ar" if lang == "ar" else ""
                shoot(project_card(project, lang), OG / f"{project['slug']}{suffix}.png")
        if not only:
            shoot(ARABIC_SITE_CARD, PUBLIC / "images" / "social-preview-ar.png")
            tab.set_viewport_size({"width": 180, "height": 180})
            shoot(APPLE_ICON, ROOT / "src" / "app" / "apple-icon.png")
        browser.close()


if __name__ == "__main__":
    main()
