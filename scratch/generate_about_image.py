from PIL import Image, ImageDraw, ImageFont
import math

# Create 900x1200 warm editorial workspace illustration
width = 900
height = 1200
img = Image.new("RGB", (width, height), "#F3EEE3")
draw = ImageDraw.Draw(img)

# Background wall with soft warm lighting gradient
for y in range(height):
    ratio = y / height
    # blend from #EAE2D0 to #E0D5BF
    r = int(234 * (1 - ratio * 0.3) + 224 * (ratio * 0.3))
    g = int(226 * (1 - ratio * 0.3) + 213 * (ratio * 0.3))
    b = int(208 * (1 - ratio * 0.3) + 191 * (ratio * 0.3))
    draw.line([(0, y), (width, y)], fill=(r, g, b))

# Wall art / floating shelf or window frame in upper area
# Minimalist frame on wall
draw.rectangle([100, 120, 320, 380], fill="#F3EEE3", outline="#DDD3C0", width=4)
# Abstract art inside frame
draw.arc([140, 160, 280, 300], 0, 180, fill="#A85C32", width=6)
draw.line([(140, 230), (280, 230)], fill="#8B4826", width=4)
draw.ellipse([185, 250, 235, 300], fill="#EFD9C6")

# Floating wooden shelf
shelf_y = 440
draw.rectangle([60, shelf_y, 440, shelf_y + 16], fill="#BFA78A")
draw.rectangle([60, shelf_y + 16, 440, shelf_y + 24], fill="#9E8568")
# Small succulent pot on shelf
draw.polygon([(110, shelf_y), (135, shelf_y - 45), (165, shelf_y - 45), (190, shelf_y)], fill="#DDD3C0")
# Plant leaves
draw.ellipse([125, shelf_y - 70, 150, shelf_y - 40], fill="#7A8B7B")
draw.ellipse([150, shelf_y - 75, 175, shelf_y - 40], fill="#637764")
draw.ellipse([138, shelf_y - 85, 162, shelf_y - 45], fill="#8A9D8B")

# Wooden Desk (starts around y = 620 to bottom)
desk_top = 640
# Desk surface with perspective
draw.rectangle([0, desk_top, width, height], fill="#CDB69B")
# Desk bevel / front face
draw.rectangle([0, desk_top, width, desk_top + 28], fill="#BA9E80")
draw.rectangle([0, desk_top + 28, width, desk_top + 34], fill="#8C7357")

# Ambient warm shadow under devices
draw.ellipse([120, desk_top + 40, 780, desk_top + 300], fill="#B8A085")

# Large Monitor (center-back)
mon_w, mon_h = 480, 300
mon_x = (width - mon_w) // 2
mon_y = 380

# Monitor stand
stand_w = 40
draw.rectangle([width // 2 - stand_w // 2, mon_y + mon_h, width // 2 + stand_w // 2, mon_y + mon_h + 120], fill="#4A4541")
draw.ellipse([width // 2 - 80, mon_y + mon_h + 105, width // 2 + 80, mon_y + mon_h + 135], fill="#383431")

# Monitor frame
draw.rounded_rectangle([mon_x - 10, mon_y - 10, mon_x + mon_w + 10, mon_y + mon_h + 10], radius=12, fill="#262220")
# Monitor screen (dark code editor IDE)
draw.rounded_rectangle([mon_x, mon_y, mon_x + mon_w, mon_y + mon_h], radius=6, fill="#1E1B1A")

# Code editor title bar
draw.rectangle([mon_x, mon_y, mon_x + mon_w, mon_y + 24], fill="#2D2825")
# Window dots
draw.ellipse([mon_x + 12, mon_y + 7, mon_x + 22, mon_y + 17], fill="#A85C32")
draw.ellipse([mon_x + 28, mon_y + 7, mon_x + 38, mon_y + 17], fill="#D4A373")
draw.ellipse([mon_x + 44, mon_y + 7, mon_x + 54, mon_y + 17], fill="#8A9D8B")

# Code editor lines (warm colors matching palette: #A85C32, #EFD9C6, #D4A373, #8A9D8B)
code_colors = ["#A85C32", "#D4A373", "#EFD9C6", "#8A9D8B", "#F3EEE3"]
line_y = mon_y + 40
for i in range(12):
    indent = 20 + ((i % 4) * 24 if i % 5 != 0 else 0)
    line_len = 100 + ((i * 37) % 240)
    c1 = code_colors[i % len(code_colors)]
    draw.rounded_rectangle([mon_x + indent, line_y, mon_x + indent + line_len, line_y + 8], radius=4, fill=c1)
    if i % 2 == 1:
        draw.rounded_rectangle([mon_x + indent + line_len + 15, line_y, mon_x + indent + line_len + 70, line_y + 8], radius=4, fill="#6B6259")
    line_y += 20

# Laptop open in front-left
lap_x = 100
lap_y = 660
lap_w = 300
lap_h = 200
# Laptop screen
draw.rounded_rectangle([lap_x, lap_y, lap_x + lap_w, lap_y + lap_h], radius=10, fill="#262220")
draw.rounded_rectangle([lap_x + 8, lap_y + 8, lap_x + lap_w - 8, lap_y + lap_h - 8], radius=6, fill="#231F1D")
# Laptop code lines
for i in range(7):
    ly = lap_y + 24 + i * 20
    draw.rounded_rectangle([lap_x + 24, ly, lap_x + 120 + ((i*29)%110), ly + 6], radius=3, fill="#D4A373" if i%2==0 else "#A85C32")

# Laptop base / keyboard base (angled perspective)
draw.polygon([
    (lap_x - 30, lap_y + lap_h + 80),
    (lap_x + lap_w + 30, lap_y + lap_h + 80),
    (lap_x + lap_w, lap_y + lap_h),
    (lap_x, lap_y + lap_h)
], fill="#C5BEB5", outline="#9E968D")
# Keyboard indentation
draw.polygon([
    (lap_x - 10, lap_y + lap_h + 50),
    (lap_x + lap_w + 10, lap_y + lap_h + 50),
    (lap_x + lap_w - 10, lap_y + lap_h + 8),
    (lap_x + 10, lap_y + lap_h + 8)
], fill="#383431")

# Desk accessories:
# Ceramic coffee mug on right
mug_x = 720
mug_y = 740
draw.ellipse([mug_x, mug_y, mug_x + 70, mug_y + 30], fill="#EFD9C6") # top
draw.rectangle([mug_x, mug_y + 15, mug_x + 70, mug_y + 85], fill="#EFD9C6") # body
draw.ellipse([mug_x, mug_y + 70, mug_x + 70, mug_y + 100], fill="#EFD9C6") # base
draw.ellipse([mug_x + 6, mug_y + 4, mug_x + 64, mug_y + 24], fill="#603813") # dark coffee
# Mug handle
draw.arc([mug_x + 50, mug_y + 25, mug_x + 88, mug_y + 75], 270, 90, fill="#EFD9C6", width=8)

# Minimalist Notebook and pen on right-front
nb_x = 520
nb_y = 800
draw.rounded_rectangle([nb_x, nb_y, nb_x + 170, nb_y + 240], radius=8, fill="#F3EEE3", outline="#DDD3C0", width=3)
# Bookmark ribbon
draw.line([(nb_x + 40, nb_y), (nb_x + 40, nb_y + 255)], fill="#A85C32", width=4)
# Notebook grid/ruled lines
for ny in range(nb_y + 35, nb_y + 220, 22):
    draw.line([(nb_x + 20, ny), (nb_x + 150, ny)], fill="#DDD3C0", width=1)
# Sleek Pen
draw.line([(nb_x + 195, nb_y + 20), (nb_x + 195, nb_y + 200)], fill="#262220", width=5)
draw.line([(nb_x + 195, nb_y + 15), (nb_x + 195, nb_y + 20)], fill="#A85C32", width=3)

# Potted small desk plant on far right
plant_x = 750
plant_y = 600
# Pot
draw.polygon([(plant_x, plant_y + 50), (plant_x + 20, plant_y + 120), (plant_x + 80, plant_y + 120), (plant_x + 100, plant_y + 50)], fill="#A85C32")
# Plant leaves
draw.ellipse([plant_x + 20, plant_y, plant_x + 55, plant_y + 55], fill="#7A8B7B")
draw.ellipse([plant_x + 45, plant_y - 15, plant_x + 80, plant_y + 50], fill="#5B6D5C")
draw.ellipse([plant_x + 10, plant_y + 20, plant_x + 50, plant_y + 60], fill="#8FA290")
draw.ellipse([plant_x + 60, plant_y + 15, plant_x + 95, plant_y + 60], fill="#7A8B7B")

# Soft vignette overlay
vignette = Image.new("RGBA", (width, height), (0, 0, 0, 0))
vdraw = ImageDraw.Draw(vignette)
vdraw.rectangle([0, 0, width, height], outline=(168, 92, 50, 20), width=16)

# Composite and save
img = Image.alpha_composite(img.convert("RGBA"), vignette).convert("RGB")
img.save("c:/Users/admin/Desktop/myportfolio/public/images/about/about-photo.jpg", "JPEG", quality=92)
print("Generated about-photo.jpg successfully")
