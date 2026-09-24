import os
from PIL import Image, ImageDraw, ImageFont

# Ensure directories
certs_dir = "c:/Users/admin/Desktop/myportfolio/public/images/certifications"
hackarena_dir = "c:/Users/admin/Desktop/myportfolio/public/images/achievements/hackarena-2k26"
chakravyuha_dir = "c:/Users/admin/Desktop/myportfolio/public/images/achievements/chakravyuha"

os.makedirs(certs_dir, exist_ok=True)
os.makedirs(hackarena_dir, exist_ok=True)
os.makedirs(chakravyuha_dir, exist_ok=True)

# Helper to draw a certificate
def draw_certificate(filename, title, subtitle, instructor, cert_id, date, length):
    # 4:3 aspect ratio certificate (800x600 or 1000x750)
    w, h = 1000, 750
    img = Image.new("RGB", (w, h), "#FAF7F2")
    draw = ImageDraw.Draw(img)

    # Outer border
    draw.rectangle([20, 20, w - 20, h - 20], outline="#A85C32", width=3)
    draw.rectangle([28, 28, w - 28, h - 28], outline="#E5D9C5", width=2)
    
    # Corner ornaments
    for cx, cy in [(40, 40), (w - 40, 40), (40, h - 40), (w - 40, h - 40)]:
        draw.ellipse([cx - 8, cy - 8, cx + 8, cy + 8], fill="#A85C32")

    # Header / Logo
    # Udemy purple badge
    draw.rounded_rectangle([60, 60, 200, 105], radius=8, fill="#5624D0")
    draw.text((85, 72), "udemy", fill="#FFFFFF")
    draw.text((w - 280, 75), f"Certificate No: {cert_id[:16]}...", fill="#887D75")

    # Main text
    draw.text((w // 2 - 190, 150), "CERTIFICATE OF COMPLETION", fill="#A85C32")
    draw.line([(w // 2 - 190, 180), (w // 2 + 190, 180)], fill="#A85C32", width=2)

    draw.text((w // 2 - 120, 215), "This is to certify that", fill="#6B6259")
    draw.text((w // 2 - 110, 255), "SUJAL VAIDYA", fill="#262220")
    draw.line([(w // 2 - 160, 295), (w // 2 + 160, 295)], fill="#DDD3C0", width=1)

    draw.text((w // 2 - 170, 320), "has successfully completed the course", fill="#6B6259")
    
    # Multi-line title wrap
    if len(title) > 45:
        split_idx = title[:45].rfind(" ")
        t1 = title[:split_idx]
        t2 = title[split_idx+1:]
        draw.text((w // 2 - (len(t1)*5), 365), t1, fill="#262220")
        draw.text((w // 2 - (len(t2)*5), 405), t2, fill="#262220")
    else:
        draw.text((w // 2 - (len(title)*5), 380), title, fill="#262220")

    draw.text((w // 2 - 150, 470), f"Instructors: {instructor}", fill="#6B6259")

    # Footer section
    # Left: Date & length
    draw.text((80, 570), f"Date: {date}", fill="#6B6259")
    draw.text((80, 600), f"Length: {length}", fill="#6B6259")
    draw.text((80, 630), f"Certificate ID: {cert_id}", fill="#887D75")

    # Center: Seal
    seal_x, seal_y = w // 2, 600
    draw.ellipse([seal_x - 55, seal_y - 55, seal_x + 55, seal_y + 55], fill="#F3EEE3", outline="#A85C32", width=3)
    draw.ellipse([seal_x - 45, seal_y - 45, seal_x + 45, seal_y + 45], outline="#E5D9C5", width=1)
    draw.text((seal_x - 30, seal_y - 12), "VERIFIED", fill="#A85C32")
    draw.text((seal_x - 24, seal_y + 8), "UDEMY", fill="#6B6259")

    # Right: Signature line
    draw.line([(w - 280, 600), (w - 80, 600)], fill="#262220", width=2)
    draw.text((w - 230, 615), "Udemy Certification", fill="#6B6259")

    filepath = os.path.join(certs_dir, filename)
    img.save(filepath, "PNG")
    print(f"Saved {filepath}")

# 1. Java
draw_certificate(
    "java-certificate.png",
    "Java Training Complete — Course for Java Beginners All in One",
    "Comprehensive Java Foundation",
    "Udemy (Crunch Coding Institute)",
    "UC-2a73d416-533e-4427-82ac-b012a38a7cd8",
    "September 23, 2026",
    "4 hours"
)

# 2. Python
draw_certificate(
    "python-certificate.png",
    "Learn to Code in Python 3: Programming Beginner to Advanced",
    "Python 3 Masterclass",
    "Udemy (Ivan Lourenço Gomes, Learn IT University, Andrii Piatakha)",
    "UC-3fa05422-1559-40cb-8871-ee9c34d21334",
    "July 4, 2024",
    "5.5 hours"
)

# 3. Full-Stack
draw_certificate(
    "fullstack-bootcamp-certificate.png",
    "The Complete Full-Stack Web Development Bootcamp",
    "Full-Stack Web Development Mastery",
    "Udemy (Dr. Angela Yu)",
    "UC-b54f4dbb-065a-4114-88ce-0d98d7896ae1",
    "March 3, 2026",
    "62 hours"
)

# Helper to draw achievement photos
def draw_achievement_photo(filepath, event_title, badge_text, context_text, bg_tone):
    w, h = 900, 600 # 3:2 aspect ratio
    img = Image.new("RGB", (w, h), bg_tone)
    draw = ImageDraw.Draw(img)

    # Stylized photo background representation
    # Top banner / atmosphere
    for y in range(h):
        ratio = y / h
        r = int(img.getpixel((0, 0))[0] * (1 - ratio * 0.25))
        g = int(img.getpixel((0, 0))[1] * (1 - ratio * 0.25))
        b = int(img.getpixel((0, 0))[2] * (1 - ratio * 0.25))
        draw.line([(0, y), (w, y)], fill=(r, g, b))

    # Darker container for photo vibe
    draw.rounded_rectangle([40, 40, w - 40, h - 40], radius=16, fill="#262220")

    # Inner decorative grid / framing
    draw.rounded_rectangle([48, 48, w - 48, h - 48], radius=14, outline="#443D39", width=2)

    # Event badge
    draw.rounded_rectangle([80, 80, 320, 125], radius=22, fill="#A85C32")
    draw.text((105, 93), badge_text, fill="#FFFFFF")

    # Main text
    draw.text((80, 160), event_title, fill="#FAF7F2")
    draw.text((80, 205), context_text, fill="#DDD3C0")

    # Graphical event illustration elements (e.g. stage / trophy / cheque representation)
    draw.rounded_rectangle([80, 270, w - 80, h - 90], radius=12, fill="#322C2A")
    draw.rectangle([100, 290, w - 100, h - 110], outline="#A85C32", width=1)
    
    # Cheque / Memento / Podium card in center
    cw_center = w // 2
    draw.rounded_rectangle([cw_center - 240, 320, cw_center + 240, h - 140], radius=8, fill="#F3EEE3")
    draw.rectangle([cw_center - 225, 335, cw_center + 225, h - 155], outline="#A85C32", width=2)
    draw.text((cw_center - 180, 355), event_title, fill="#262220")
    draw.text((cw_center - 180, 385), badge_text, fill="#A85C32")
    draw.text((cw_center - 180, 415), "Awarded to Sujal Vaidya • Team Code Blooded", fill="#6B6259")

    img.save(filepath, "JPEG", quality=92)
    print(f"Saved {filepath}")

# HackArena 4 photos
draw_achievement_photo(
    os.path.join(hackarena_dir, "1.jpg"),
    "HackArena 2K26 — Hackathon Lab",
    "WORKING SESSION",
    "Sprint development of TrustLedger milestone-based escrow platform",
    "#3D4A41"
)
draw_achievement_photo(
    os.path.join(hackarena_dir, "2.jpg"),
    "HackArena 2K26 — Team Code Blooded",
    "1ST RUNNER UP (2ND PLACE)",
    "Team holding the ₹5,000 cash prize cheque on stage",
    "#4A3D36"
)
draw_achievement_photo(
    os.path.join(hackarena_dir, "3.jpg"),
    "HackArena 2K26 — Sujal Vaidya",
    "1ST RUNNER UP (2ND PLACE)",
    "Solo portrait holding the award cheque and certificate",
    "#36414A"
)
draw_achievement_photo(
    os.path.join(hackarena_dir, "4.jpg"),
    "HackArena 2K26 — Prize Handover",
    "JCET HUBBALLI & UNSTOP",
    "Prize handover ceremony with faculty members and hackathon judges",
    "#423847"
)

# Chakravyuha 2 photos
draw_achievement_photo(
    os.path.join(chakravyuha_dir, "1.jpg"),
    "Chakravyuha — Vaibhav",
    "1ST PRIZE WINNER",
    "On-stage award presentation ceremony at Vaibhav",
    "#4A3B32"
)
draw_achievement_photo(
    os.path.join(chakravyuha_dir, "2.jpg"),
    "Chakravyuha — Vaibhav",
    "1ST PRIZE WINNER",
    "Receiving the winner certificate and memento from dignitaries",
    "#36453D"
)
print("All images generated successfully!")
