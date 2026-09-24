import os
from PIL import Image, ImageDraw

os.makedirs("c:/Users/admin/Desktop/myportfolio/public/images/projects-teaser", exist_ok=True)

width, height = 900, 600 # 3:2 aspect ratio
img = Image.new("RGB", (width, height), "#1E1B1A")
draw = ImageDraw.Draw(img)

# Dark warm background gradient
for y in range(height):
    ratio = y / height
    r = int(30 * (1 - ratio) + 20 * ratio)
    g = int(27 * (1 - ratio) + 18 * ratio)
    b = int(26 * (1 - ratio) + 17 * ratio)
    draw.line([(0, y), (width, y)], fill=(r, g, b))

# Floating project collage cards:
# 1. Main code IDE window (center-left)
ide_x, ide_y, ide_w, ide_h = 60, 50, 480, 360
draw.rounded_rectangle([ide_x - 4, ide_y - 4, ide_x + ide_w + 4, ide_y + ide_h + 4], radius=10, fill="#2E2825")
draw.rounded_rectangle([ide_x, ide_y, ide_x + ide_w, ide_y + ide_h], radius=8, fill="#181514")

# IDE title bar
draw.rectangle([ide_x, ide_y, ide_x + ide_w, ide_y + 32], fill="#26211F")
draw.ellipse([ide_x + 14, ide_y + 11, ide_x + 24, ide_y + 21], fill="#A85C32")
draw.ellipse([ide_x + 32, ide_y + 11, ide_x + 42, ide_y + 21], fill="#D4A373")
draw.ellipse([ide_x + 50, ide_y + 11, ide_x + 60, ide_y + 21], fill="#8A9D8B")
draw.text((ide_x + 75, ide_y + 10), "server.js — Full-Stack Architecture", fill="#A69B91")

# Code editor lines
colors = ["#A85C32", "#D4A373", "#EFD9C6", "#8A9D8B", "#F3EEE3"]
ly = ide_y + 50
for i in range(13):
    indent = 25 + ((i % 4) * 28 if i % 5 != 0 else 0)
    llen = 120 + ((i * 47) % 220)
    col = colors[i % len(colors)]
    draw.rounded_rectangle([ide_x + indent, ly, ide_x + indent + llen, ly + 8], radius=4, fill=col)
    if i % 3 == 0:
        draw.rounded_rectangle([ide_x + indent + llen + 16, ly, ide_x + indent + llen + 80, ly + 8], radius=4, fill="#6B6259")
    ly += 22

# 2. Overlapping live app card (right side)
app_x, app_y, app_w, app_h = 420, 160, 420, 380
draw.rounded_rectangle([app_x - 6, app_y - 6, app_x + app_w + 6, app_y + app_h + 6], radius=14, fill="#3D352F")
draw.rounded_rectangle([app_x, app_y, app_x + app_w, app_y + app_h], radius=12, fill="#0F172A")

# App bar
draw.rectangle([app_x, app_y, app_x + app_w, app_y + 36], fill="#1E293B")
draw.text((app_x + 20, app_y + 11), "NEXUS // Real-Time Escrow Marketplace", fill="#F43F5E")
draw.rounded_rectangle([app_x + app_w - 90, app_y + 8, app_x + app_w - 15, app_y + 28], radius=4, fill="#10B981")
draw.text((app_x + app_w - 80, app_y + 11), "CONNECTED", fill="#0B1320")

# Mini metrics row
draw.rounded_rectangle([app_x + 20, app_y + 55, app_x + 190, app_y + 130], radius=8, fill="#1E293B")
draw.text((app_x + 35, app_y + 70), "ACTIVE MILESTONES", fill="#94A3B8")
draw.text((app_x + 35, app_y + 92), "12 Approved", fill="#38BDF8")

draw.rounded_rectangle([app_x + 210, app_y + 55, app_x + app_w - 20, app_y + 130], radius=8, fill="#1E293B")
draw.text((app_x + 225, app_y + 70), "SAFETY COMPLIANCE", fill="#94A3B8")
draw.text((app_x + 225, app_y + 92), "98.4% YOLOv8", fill="#10B981")

# Mini live chart / activity feed
for row in range(3):
    ry = app_y + 155 + row * 65
    draw.rounded_rectangle([app_x + 20, ry, app_x + app_w - 20, ry + 52], radius=6, fill="#1E293B")
    draw.ellipse([app_x + 35, ry + 18, app_x + 51, ry + 34], fill="#A85C32" if row % 2 == 0 else "#38BDF8")
    draw.text((app_x + 65, ry + 12), f"Transaction Hash #{4092 + row*11} confirmed", fill="#F8FAFC")
    draw.text((app_x + 65, ry + 30), "Role-based verification • Cloudinary multi-image upload", fill="#64748B")

# Tech badge strip in bottom left
badges = ["React.js", "Node.js", "Express", "MongoDB", "YOLOv8", "RAG"]
bx = 60
by = 460
for b in badges:
    bw = len(b) * 11 + 24
    draw.rounded_rectangle([bx, by, bx + bw, by + 32], radius=16, fill="#A85C32")
    draw.text((bx + 12, by + 9), b, fill="#F3EEE3")
    bx += bw + 12

img.save("c:/Users/admin/Desktop/myportfolio/public/images/projects-teaser/my-projects-photo.jpg", "JPEG", quality=92)
print("Generated my-projects-photo.jpg successfully")
