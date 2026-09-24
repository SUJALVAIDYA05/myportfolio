import os
from PIL import Image, ImageDraw

os.makedirs("c:/Users/admin/Desktop/myportfolio/public/images/certifications-teaser", exist_ok=True)

width, height = 900, 600 # 3:2 aspect ratio
img = Image.new("RGB", (width, height), "#F3EEE3")
draw = ImageDraw.Draw(img)

# Warm editorial gradient background
for y in range(height):
    ratio = y / height
    r = int(243 * (1 - ratio * 0.2) + 234 * (ratio * 0.2))
    g = int(238 * (1 - ratio * 0.2) + 226 * (ratio * 0.2))
    b = int(227 * (1 - ratio * 0.2) + 208 * (ratio * 0.2))
    draw.line([(0, y), (width, y)], fill=(r, g, b))

# Certificate showcase cards layout:
# 3 overlapping certificate cards
# Card 1 (back-left): Java
c1_x, c1_y, c1_w, c1_h = 70, 70, 440, 300
draw.rounded_rectangle([c1_x - 3, c1_y - 3, c1_x + c1_w + 3, c1_y + c1_h + 3], radius=14, fill="#DDD3C0")
draw.rounded_rectangle([c1_x, c1_y, c1_x + c1_w, c1_y + c1_h], radius=12, fill="#FFFFFF")
draw.rectangle([c1_x + 16, c1_y + 16, c1_x + c1_w - 16, c1_y + c1_h - 16], outline="#EAE2D0", width=2)
# Udemy logo bar
draw.rectangle([c1_x + 30, c1_y + 35, c1_x + 120, c1_y + 60], fill="#5624D0")
draw.text((c1_x + 40, c1_y + 40), "Udemy", fill="#FFFFFF")
draw.text((c1_x + 30, c1_y + 90), "CERTIFICATE OF COMPLETION", fill="#A85C32")
draw.text((c1_x + 30, c1_y + 125), "Java Training Complete", fill="#262220")
draw.text((c1_x + 30, c1_y + 155), "Beginner to Advanced • 4 Hours", fill="#6B6259")
draw.ellipse([c1_x + c1_w - 90, c1_y + c1_h - 90, c1_x + c1_w - 35, c1_y + c1_h - 35], fill="#EFD9C6", outline="#A85C32", width=2)
draw.text((c1_x + c1_w - 78, c1_y + c1_h - 68), "VERIFIED", fill="#A85C32")

# Card 2 (back-right): Python
c2_x, c2_y, c2_w, c2_h = 390, 110, 440, 300
draw.rounded_rectangle([c2_x - 3, c2_y - 3, c2_x + c2_w + 3, c2_y + c2_h + 3], radius=14, fill="#DDD3C0")
draw.rounded_rectangle([c2_x, c2_y, c2_x + c2_w, c2_y + c2_h], radius=12, fill="#FFFFFF")
draw.rectangle([c2_x + 16, c2_y + 16, c2_x + c2_w - 16, c2_y + c2_h - 16], outline="#EAE2D0", width=2)
draw.rectangle([c2_x + 30, c2_y + 35, c2_x + 120, c2_y + 60], fill="#5624D0")
draw.text((c2_x + 40, c2_y + 40), "Udemy", fill="#FFFFFF")
draw.text((c2_x + 30, c2_y + 90), "CERTIFICATE OF COMPLETION", fill="#A85C32")
draw.text((c2_x + 30, c2_y + 125), "Learn to Code in Python 3", fill="#262220")
draw.text((c2_x + 30, c2_y + 155), "Programming Beginner to Advanced", fill="#6B6259")
draw.ellipse([c2_x + c2_w - 90, c2_y + c2_h - 90, c2_x + c2_w - 35, c2_y + c2_h - 35], fill="#EFD9C6", outline="#A85C32", width=2)
draw.text((c2_x + c2_w - 78, c2_y + c2_h - 68), "VERIFIED", fill="#A85C32")

# Card 3 (front-center, prominent): Full-Stack Bootcamp
c3_x, c3_y, c3_w, c3_h = 200, 220, 500, 330
draw.rounded_rectangle([c3_x - 5, c3_y - 5, c3_x + c3_w + 5, c3_y + c3_h + 5], radius=16, fill="#A85C32")
draw.rounded_rectangle([c3_x, c3_y, c3_x + c3_w, c3_y + c3_h], radius=14, fill="#FAF7F2")
# Gold accent border
draw.rectangle([c3_x + 18, c3_y + 18, c3_x + c3_w - 18, c3_y + c3_h - 18], outline="#D4A373", width=2)
draw.rectangle([c3_x + 35, c3_y + 35, c3_x + 140, c3_y + 65], fill="#5624D0")
draw.text((c3_x + 50, c3_y + 43), "Udemy", fill="#FFFFFF")
draw.text((c3_x + 35, c3_y + 85), "CERTIFICATE OF COMPLETION", fill="#8B4826")
draw.text((c3_x + 35, c3_y + 120), "The Complete Full-Stack Web Development Bootcamp", fill="#262220")
draw.text((c3_x + 35, c3_y + 155), "Instructor: Dr. Angela Yu • 62 Total Hours", fill="#6B6259")

# Badge ribbon
draw.ellipse([c3_x + c3_w - 110, c3_y + c3_h - 110, c3_x + c3_w - 40, c3_y + c3_h - 40], fill="#A85C32", outline="#8B4826", width=2)
draw.text((c3_x + c3_w - 98, c3_y + c3_h - 82), "62 HRS", fill="#F3EEE3")

# Pill tag
draw.rounded_rectangle([c3_x + 35, c3_y + 240, c3_x + 260, c3_y + 275], radius=16, fill="#EAE2D0")
draw.text((c3_x + 50, c3_y + 250), "React • Node.js • Databases", fill="#262220")

img.save("c:/Users/admin/Desktop/myportfolio/public/images/certifications-teaser/certifications-photo.jpg", "JPEG", quality=92)
print("Generated certifications-photo.jpg successfully")
