#!/usr/bin/env python3
"""Compose all Thomas screens into one labeled overview image."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = Path("/opt/cursor/artifacts/screenshots")
COMPOSITE = OUT_DIR / "thomas-all-screens-complete.png"
ARTIFACTS = Path("/opt/cursor/artifacts")

# (filename, label) — current product screens only
MOBILE = [
    ("screen-mobile-00-home.png", "1 · Business Home"),
    ("screen-mobile-01-chat.png", "2 · Chat"),
    ("screen-mobile-07-chat-conversation.png", "3 · Conversation"),
    ("screen-mobile-02-cellar.png", "4 · Cellar Check"),
    ("screen-mobile-08-order.png", "5 · Restock Order"),
    ("screen-mobile-03-close-step1.png", "6 · Close — Cash"),
    ("screen-mobile-04-close-step2.png", "7 · Close — Cellar"),
    ("screen-mobile-05-close-step3.png", "8 · Close — Sign-off"),
    ("screen-mobile-06-record.png", "9 · The Record"),
]

DESKTOP = [
    ("screen-desktop-00-home.png", "10 · Desktop Home"),
    ("screen-desktop-01-cellar-chat.png", "11 · Cellar + Chat"),
    ("screen-desktop-05-order.png", "12 · Restock"),
    ("screen-desktop-02-close.png", "13 · Close the Night"),
    ("screen-desktop-03-record.png", "14 · The Record"),
    ("screen-desktop-04-chat-conversation.png", "15 · Conversation"),
]

BG = (8, 21, 35)  # midnight navy
CREAM = (246, 240, 231)
GOLD = (199, 138, 44)
MUTED = (180, 168, 150)


def font(size: int, bold: bool = False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def load(name: str) -> Image.Image:
    path = OUT_DIR / name
    if not path.exists():
        raise FileNotFoundError(path)
    return Image.open(path).convert("RGB")


def phone_frame(img: Image.Image, max_h: int = 520) -> Image.Image:
    """Scale mobile screenshot and wrap in a thin device frame."""
    scale = max_h / img.height
    w = int(img.width * scale)
    h = int(img.height * scale)
    resized = img.resize((w, h), Image.Resampling.LANCZOS)
    pad = 6
    framed = Image.new("RGB", (w + pad * 2, h + pad * 2), (20, 36, 54))
    framed.paste(resized, (pad, pad))
    return framed


def desk_frame(img: Image.Image, max_w: int = 560) -> Image.Image:
    scale = max_w / img.width
    w = int(img.width * scale)
    h = int(img.height * scale)
    resized = img.resize((w, h), Image.Resampling.LANCZOS)
    pad = 4
    framed = Image.new("RGB", (w + pad * 2, h + pad * 2), (20, 36, 54))
    framed.paste(resized, (pad, pad))
    return framed


def label_block(draw: ImageDraw.ImageDraw, x: int, y: int, text: str, fnt):
    draw.text((x, y), text, fill=CREAM, font=fnt)


def main():
    title_f = font(36, bold=True)
    section_f = font(22, bold=True)
    label_f = font(15, bold=True)
    sub_f = font(16)

    mobile_imgs = [(phone_frame(load(n)), lab) for n, lab in MOBILE]
    desktop_imgs = [(desk_frame(load(n)), lab) for n, lab in DESKTOP]

    gap = 28
    side = 48
    top = 120
    label_h = 28

    # Mobile row: 5 + 4
    row1 = mobile_imgs[:5]
    row2 = mobile_imgs[5:]
    mw = max(im.width for im, _ in mobile_imgs)
    mh = max(im.height for im, _ in mobile_imgs)

    mobile_row_w = 5 * mw + 4 * gap
    mobile_block_h = 2 * (mh + label_h + 8) + gap + 40

    # Desktop: 3 per row
    dw = max(im.width for im, _ in desktop_imgs)
    dh = max(im.height for im, _ in desktop_imgs)
    desk_cols = 3
    desk_row_w = desk_cols * dw + (desk_cols - 1) * gap
    desk_rows = (len(desktop_imgs) + desk_cols - 1) // desk_cols
    desk_block_h = desk_rows * (dh + label_h + 8) + (desk_rows - 1) * gap + 40

    content_w = max(mobile_row_w, desk_row_w)
    width = content_w + side * 2
    height = top + mobile_block_h + 56 + desk_block_h + 60

    canvas = Image.new("RGB", (width, height), BG)
    draw = ImageDraw.Draw(canvas)

    # Title
    title = "Thomas for Business — All Screens"
    draw.text((side, 36), title, fill=CREAM, font=title_f)
    draw.text(
        (side, 82),
        "Mobile (9)  ·  Desktop (6)  ·  Live notices + Restock  ·  Personal parked",
        fill=MUTED,
        font=sub_f,
    )
    # Gold rule
    draw.rectangle([side, 108, side + 120, 111], fill=GOLD)

    y = top
    draw.text((side, y), "Mobile", fill=GOLD, font=section_f)
    y += 36

    def place_row(items, cell_w, cell_h, y0):
        x = side + (content_w - (len(items) * cell_w + (len(items) - 1) * gap)) // 2
        for im, lab in items:
            ox = x + (cell_w - im.width) // 2
            canvas.paste(im, (ox, y0))
            # label centered under
            bbox = draw.textbbox((0, 0), lab, font=label_f)
            tw = bbox[2] - bbox[0]
            draw.text(
                (x + (cell_w - tw) // 2, y0 + cell_h + 6),
                lab,
                fill=CREAM,
                font=label_f,
            )
            x += cell_w + gap
        return y0 + cell_h + label_h + 8

    y = place_row(row1, mw, mh, y)
    y += gap
    y = place_row(row2, mw, mh, y)

    y += 48
    draw.text((side, y), "Desktop", fill=GOLD, font=section_f)
    y += 36

    for i in range(0, len(desktop_imgs), desk_cols):
        chunk = desktop_imgs[i : i + desk_cols]
        y = place_row(chunk, dw, dh, y)
        if i + desk_cols < len(desktop_imgs):
            y += gap

    canvas.save(COMPOSITE, optimize=True)
    # Also copy to artifacts root for easy find
    dest = ARTIFACTS / "thomas-all-screens-complete.png"
    canvas.save(dest, optimize=True)
    print(f"saved {COMPOSITE}")
    print(f"saved {dest}")
    print(f"size {canvas.size}")


if __name__ == "__main__":
    main()
