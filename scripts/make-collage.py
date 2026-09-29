#!/usr/bin/env python3
"""Build a labeled collage of BioCross screen captures."""
import json
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path('/tmp/biocross-shots')
ARTIFACT_JPG = Path('/opt/cursor/artifacts/biocross_all_screens.jpg')
ARTIFACT_PNG = Path('/opt/cursor/artifacts/biocross_all_screens.png')

COLS = 6
GAP = 24
PAD = 40
LABEL_H = 36
PHONE_W = 390
PHONE_H = 844
SCALE = 0.42  # scaled phone width/height in collage

manifest_path = OUT / 'manifest.json'
if not manifest_path.exists():
    raise SystemExit('manifest.json missing — run capture-screens.mjs first')

results = json.loads(manifest_path.read_text())
results = [r for r in results if os.path.exists(r['file'])]
if not results:
    raise SystemExit('no screenshots found')

cell_w = int(PHONE_W * SCALE)
cell_h = int(PHONE_H * SCALE) + LABEL_H
rows = (len(results) + COLS - 1) // COLS

canvas_w = PAD * 2 + COLS * cell_w + (COLS - 1) * GAP
canvas_h = PAD * 2 + 56 + rows * cell_h + (rows - 1) * GAP

canvas = Image.new('RGB', (canvas_w, canvas_h), '#F7F9FC')
draw = ImageDraw.Draw(canvas)

try:
    font_title = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 28)
    font_label = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 14)
except Exception:
    font_title = ImageFont.load_default()
    font_label = font_title

draw.text((PAD, PAD // 2), f'BioCross — {len(results)} screens', fill='#0A1128', font=font_title)

for i, item in enumerate(results):
    r, c = divmod(i, COLS)
    x = PAD + c * (cell_w + GAP)
    y = PAD + 56 + r * (cell_h + GAP)

    img = Image.open(item['file']).convert('RGB')
    thumb = img.resize((cell_w, int(PHONE_H * SCALE)), Image.Resampling.LANCZOS)

    # phone frame shadow
    frame = Image.new('RGB', (cell_w + 4, int(PHONE_H * SCALE) + 4), '#CDD4E0')
    canvas.paste(frame, (x - 2, y + LABEL_H - 2))
    canvas.paste(thumb, (x, y + LABEL_H))

    label = item.get('label', item['id'])
    draw.text((x, y + 8), label, fill='#5B6478', font=font_label)

ARTIFACT_PNG.parent.mkdir(parents=True, exist_ok=True)
canvas.save(ARTIFACT_PNG, 'PNG', optimize=True)
canvas.save(ARTIFACT_JPG, 'JPEG', quality=85, optimize=True)
print(f'wrote {ARTIFACT_JPG} ({canvas_w}x{canvas_h}, {len(results)} screens)')
print(f'wrote {ARTIFACT_PNG}')
