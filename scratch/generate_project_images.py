import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs("c:/Users/admin/Desktop/myportfolio/public/images/projects", exist_ok=True)

W, H = 800, 550 # ~16:11 aspect ratio

def create_nexus():
    # NEXUS: Dark navy/pink reselling marketplace
    img = Image.new("RGB", (W, H), "#0F172A")
    d = ImageDraw.Draw(img)
    # Header bar
    d.rectangle([0, 0, W, 50], fill="#1E293B")
    d.text((30, 16), "NEXUS MARKETPLACE", fill="#F43F5E")
    d.rounded_rectangle([W - 140, 12, W - 30, 38], radius=6, fill="#F43F5E")
    d.text((W - 120, 16), "+ Sell Item", fill="#FFFFFF")
    
    # Hero / Banner
    d.rounded_rectangle([30, 70, W - 30, 170], radius=12, fill="#1E1B4B", outline="#4338CA", width=2)
    d.text((50, 95), "Verified Pre-Owned Goods", fill="#FFFFFF")
    d.text((50, 125), "Role-based access • Real-time chat • Escrow checkout", fill="#94A3B8")
    
    # 3 Product Cards
    card_w = (W - 60 - 40) // 3
    for i in range(3):
        x = 30 + i * (card_w + 20)
        d.rounded_rectangle([x, 190, x + card_w, 420], radius=10, fill="#1E293B", outline="#334155")
        # Image area
        d.rounded_rectangle([x + 10, 200, x + card_w - 10, 310], radius=6, fill="#0F172A")
        # Neon accent badge
        d.rounded_rectangle([x + 20, 210, x + 80, 230], radius=4, fill="#F43F5E")
        d.text((x + 28, 213), "VERIFIED", fill="#FFFFFF")
        # Text lines
        d.rounded_rectangle([x + 15, 330, x + card_w - 40, 342], radius=3, fill="#F8FAFC")
        d.rounded_rectangle([x + 15, 355, x + card_w - 80, 365], radius=3, fill="#94A3B8")
        d.text((x + 15, 385), f"${149 + i * 120}.00", fill="#38BDF8")
        
    # Floating live chat widget (bottom right)
    d.rounded_rectangle([W - 240, 370, W - 40, 520], radius=12, fill="#020617", outline="#F43F5E", width=2)
    d.text((W - 220, 385), "Live Buyer Chat", fill="#F43F5E")
    d.rounded_rectangle([W - 220, 415, W - 80, 440], radius=6, fill="#1E293B")
    d.rounded_rectangle([W - 180, 450, W - 60, 475], radius=6, fill="#F43F5E")
    
    img.save("c:/Users/admin/Desktop/myportfolio/public/images/projects/nexus.jpg", "JPEG", quality=90)

def create_trustledger():
    # TrustLedger: Milestone-Based Escrow Platform (Dark slate / emerald / cyan)
    img = Image.new("RGB", (W, H), "#0B1320")
    d = ImageDraw.Draw(img)
    # Top nav
    d.rectangle([0, 0, W, 50], fill="#111C30")
    d.text((30, 16), "TRUSTLEDGER // ESCROW", fill="#10B981")
    d.rounded_rectangle([W - 180, 12, W - 30, 38], radius=6, fill="#065F46")
    d.text((W - 165, 16), "Vault: $24,500.00", fill="#6EE7B7")
    
    # Milestone tracker card
    d.rounded_rectangle([30, 70, W - 30, 230], radius=12, fill="#15243B", outline="#1E3A5F", width=2)
    d.text((50, 85), "Active Escrow Contract #TL-9042", fill="#F1F5F9")
    d.text((50, 110), "Client: FinCorp Global  |  Contractor: DevStudio Ltd", fill="#64748B")
    
    # 3 Milestones
    for i, (name, status, col) in enumerate([
        ("M1: Architecture & DB Schema", "APPROVED (Released)", "#10B981"),
        ("M2: Core API & Auth Workflow", "IN REVIEW (AI Audited)", "#06B6D4"),
        ("M3: Integration & QA Testing", "LOCKED IN VAULT", "#64748B"),
    ]):
        my = 145 + i * 26
        d.text((50, my), name, fill="#E2E8F0")
        d.rounded_rectangle([W - 230, my - 2, W - 50, my + 18], radius=4, fill=col)
        d.text((W - 220, my), status, fill="#0B1320" if col != "#64748B" else "#FFFFFF")

    # Bottom split cards
    # Left: AI Dispute Resolver (Gemini)
    d.rounded_rectangle([30, 250, W // 2 - 10, 510], radius=10, fill="#15243B", outline="#06B6D4")
    d.text((50, 270), "Gemini 1.5 Dispute Resolution", fill="#06B6D4")
    d.text((50, 300), "Auto-analyzing delivery commits against specs...", fill="#94A3B8")
    d.rounded_rectangle([50, 340, W // 2 - 30, 480], radius=8, fill="#0B1320")
    d.text((65, 360), "Confidence Score: 94% Alignment", fill="#10B981")
    d.text((65, 390), "Resolution recommendation: Release 80%", fill="#E2E8F0")
    d.text((65, 420), "Milestone criteria satisfied in PR #42", fill="#64748B")

    # Right: Automated Invoicing & Wallet
    d.rounded_rectangle([W // 2 + 10, 250, W - 30, 510], radius=10, fill="#15243B", outline="#10B981")
    d.text((W // 2 + 30, 270), "Automated Invoicing & Audit Trail", fill="#10B981")
    for r in range(4):
        ry = 320 + r * 42
        d.rectangle([W // 2 + 30, ry, W - 50, ry + 32], fill="#0B1320")
        d.text((W // 2 + 40, ry + 8), f"INV-2026-00{r+1} • Milestone {r+1}", fill="#CBD5E1")
        d.text((W - 120, ry + 8), f"${5000 + r*2500}", fill="#10B981")

    img.save("c:/Users/admin/Desktop/myportfolio/public/images/projects/trustledger.jpg", "JPEG", quality=90)

def create_industriguard():
    # Industriguard-AI: Dark/Orange Real-time PPE Compliance Surveillance
    img = Image.new("RGB", (W, H), "#121214")
    d = ImageDraw.Draw(img)
    # Top status bar
    d.rectangle([0, 0, W, 48], fill="#1C1B1F")
    d.text((30, 15), "INDUSTRIGUARD-AI // LIVE CAMERA FEED 04", fill="#F97316")
    d.ellipse([W - 150, 18, W - 138, 30], fill="#EF4444") # Red recording dot
    d.text((W - 130, 15), "LIVE 60 FPS", fill="#EF4444")
    
    # Simulated Camera Viewport
    cam_x, cam_y, cam_w, cam_h = 30, 68, 500, 450
    d.rounded_rectangle([cam_x, cam_y, cam_x + cam_w, cam_y + cam_h], radius=10, fill="#1A1A1E", outline="#3F3F46")
    # Crosshairs / Grid
    d.line([(cam_x, cam_y + cam_h // 2), (cam_x + cam_w, cam_y + cam_h // 2)], fill="#27272A")
    d.line([(cam_x + cam_w // 2, cam_y), (cam_x + cam_w // 2, cam_y + cam_h)], fill="#27272A")
    
    # YOLOv8 Detection Boxes
    # Box 1: Hardhat
    d.rectangle([180, 130, 340, 220], outline="#22C55E", width=3)
    d.rectangle([180, 105, 320, 130], fill="#22C55E")
    d.text((185, 110), "HELMET: 98.4%", fill="#000000")
    
    # Box 2: High-vis Vest
    d.rectangle([150, 220, 380, 420], outline="#22C55E", width=3)
    d.rectangle([150, 195, 300, 220], fill="#22C55E")
    d.text((155, 200), "SAFETY VEST: 99.1%", fill="#000000")

    # QR identification tag
    d.rounded_rectangle([320, 240, 460, 310], radius=6, fill="#27272A", outline="#F97316")
    d.text((330, 250), "QR WORKER ID", fill="#F97316")
    d.text((330, 275), "EMP-7704: S. Kumar", fill="#F4F4F5")

    # Right Analytics Panel
    right_x = 550
    d.rounded_rectangle([right_x, cam_y, W - 30, cam_y + cam_h], radius=10, fill="#1C1B1F", outline="#27272A")
    d.text((right_x + 20, cam_y + 20), "Safety Compliance", fill="#F4F4F5")
    d.text((right_x + 20, cam_y + 50), "Facility Score: 98.2%", fill="#22C55E")
    
    # PPE Checklist
    items = [("Hardhat Helmet", "PASS", "#22C55E"), ("High-Vis Vest", "PASS", "#22C55E"), ("Safety Gloves", "PASS", "#22C55E"), ("Steel Toe Boots", "PASS", "#22C55E"), ("Safety Glasses", "ALERT", "#EF4444")]
    for idx, (label, st, col) in enumerate(items):
        iy = cam_y + 90 + idx * 45
        d.rectangle([right_x + 20, iy, W - 50, iy + 36], fill="#27272A")
        d.text((right_x + 30, iy + 10), label, fill="#E4E4E7")
        d.text((W - 90, iy + 10), st, fill=col)

    # Real-time WebSocket banner
    d.rounded_rectangle([right_x + 20, cam_y + 350, W - 50, cam_y + 420], radius=8, fill="#F97316")
    d.text((right_x + 35, cam_y + 365), "WebSocket Active", fill="#000000")
    d.text((right_x + 35, cam_y + 390), "Broadcasting to Admin...", fill="#18181B")

    img.save("c:/Users/admin/Desktop/myportfolio/public/images/projects/industriguard.jpg", "JPEG", quality=90)

def create_docsage():
    # DocSage: Dark indigo RAG chatbot for PDFs
    img = Image.new("RGB", (W, H), "#0F0E17")
    d = ImageDraw.Draw(img)
    # Header
    d.rectangle([0, 0, W, 50], fill="#1B192A")
    d.text((30, 16), "DocSage RAG AI // Document Intelligence", fill="#A78BFA")
    d.rounded_rectangle([W - 160, 12, W - 30, 38], radius=6, fill="#6D28D9")
    d.text((W - 145, 16), "FAISS Vector DB", fill="#FFFFFF")

    # Left: PDF Document Preview
    d.rounded_rectangle([30, 70, 320, 510], radius=10, fill="#1B192A", outline="#2E2B47")
    d.text((45, 90), "Source: Financial_Report_2025.pdf", fill="#C4B5FD")
    d.text((45, 115), "184 Pages • 1,420 Embeddings", fill="#716B94")
    # Mock PDF lines with highlighted semantic chunk
    for i in range(14):
        py = 150 + i * 22
        col = "#A78BFA" if 5 <= i <= 8 else "#3B3759"
        d.rounded_rectangle([45, py, 305, py + 8], radius=3, fill=col)
    d.rounded_rectangle([45, 470, 305, 495], radius=6, fill="#6D28D9")
    d.text((60, 476), "Retrieved Chunk #42 (Score: 0.94)", fill="#FFFFFF")

    # Right: Chat Interface (Groq / LLaMA 3.3)
    chat_x = 345
    d.rounded_rectangle([chat_x, 70, W - 30, 510], radius=10, fill="#161424", outline="#4338CA")
    d.text((chat_x + 20, 90), "Ask DocSage anything about this document...", fill="#94A3B8")
    
    # User query bubble
    d.rounded_rectangle([chat_x + 60, 130, W - 50, 185], radius=12, fill="#4338CA")
    d.text((chat_x + 80, 142), "What were the net cloud margins in Q3 2025?", fill="#FFFFFF")
    d.text((chat_x + 80, 162), "And how does it compare with Q2?", fill="#E0E7FF")

    # AI Grounded Response bubble
    d.rounded_rectangle([chat_x + 20, 210, W - 70, 390], radius=12, fill="#1F1D33", outline="#6D28D9")
    d.text((chat_x + 40, 225), "DocSage (LLaMA 3.3 via Groq):", fill="#A78BFA")
    lines = [
        "According to Page 42, Paragraph 3:",
        "• Q3 2025 Cloud margin was 31.4% ($4.2B).",
        "• This represents a 2.8% increase compared to Q2 (28.6%).",
        "• Primary driver: Enterprise ARR expansion.",
        "Strictly grounded in your uploaded PDF."
    ]
    for idx, l in enumerate(lines):
        d.text((chat_x + 40, 255 + idx * 24), l, fill="#E2E8F0" if "Strictly" not in l else "#10B981")

    # Chat input bar
    d.rounded_rectangle([chat_x + 20, 440, W - 50, 490], radius=8, fill="#0F0E17", outline="#4338CA")
    d.text((chat_x + 35, 455), "Ask follow up question...", fill="#64748B")

    img.save("c:/Users/admin/Desktop/myportfolio/public/images/projects/docsage.jpg", "JPEG", quality=90)

def create_fasalrakshak():
    # FasalRakshak: Dark forest green crop failure predictor
    img = Image.new("RGB", (W, H), "#061A0E")
    d = ImageDraw.Draw(img)
    # Header
    d.rectangle([0, 0, W, 50], fill="#0D2E1A")
    d.text((30, 16), "FASALRAKSHAK // CROP FAILURE PREDICTOR", fill="#4ADE80")
    d.rounded_rectangle([W - 170, 12, W - 30, 38], radius=6, fill="#166534")
    d.text((W - 155, 16), "English | हिन्दी | ಕನ್ನಡ", fill="#86EFAC")

    # Main Metric Cards
    # Crop Health Dial (Left)
    d.rounded_rectangle([30, 70, 280, 310], radius=12, fill="#0B2716", outline="#22C55E")
    d.text((50, 90), "Crop Health Index", fill="#86EFAC")
    d.ellipse([70, 120, 240, 290], outline="#15803D", width=14)
    d.arc([70, 120, 240, 290], 140, 380, fill="#22C55E", width=14)
    d.text((120, 185), "84", fill="#FFFFFF")
    d.text((105, 235), "/ 100 HEALTHY", fill="#4ADE80")

    # 3 Risk Channel Meters (Right)
    d.rounded_rectangle([300, 70, W - 30, 310], radius=12, fill="#0B2716", outline="#15803D")
    d.text((320, 90), "District: Dharwad, Karnataka • Crop: Paddy (Vegetative)", fill="#F0FDF4")
    
    channels = [
        ("Drought Stress (Sentinel-2 NDVI)", 22, "#22C55E", "LOW RISK"),
        ("Pest Pressure (Weather Correlated)", 58, "#FACC15", "MODERATE RISK"),
        ("Nutrient Deficiency (Soil Moisture)", 18, "#22C55E", "OPTIMAL"),
    ]
    for idx, (label, val, col, status) in enumerate(channels):
        cy = 130 + idx * 55
        d.text((320, cy), label, fill="#E2E8F0")
        d.text((W - 140, cy), status, fill=col)
        # Bar track
        d.rounded_rectangle([320, cy + 22, W - 50, cy + 34], radius=6, fill="#061A0E")
        # Bar fill
        fill_w = int((W - 370) * (val / 100))
        d.rounded_rectangle([320, cy + 22, 320 + fill_w, cy + 34], radius=6, fill=col)

    # Bottom: AI Recommendations & Voice Readout
    d.rounded_rectangle([30, 330, W - 30, 510], radius=12, fill="#0D2E1A", outline="#166534")
    d.text((50, 345), "Gemini Advisory & Voice Readout (Web Speech API)", fill="#4ADE80")
    d.text((50, 375), "Apply light irrigation within 48h to offset rising daytime temperature.", fill="#F0FDF4")
    d.text((50, 400), "Pest alert: Monitor stem borer occurrence around field margins.", fill="#FEF08A")
    
    # Audio speaker readout button
    d.rounded_rectangle([50, 440, 260, 485], radius=20, fill="#22C55E")
    d.text((70, 453), "🔊 Read Aloud in ಕನ್ನಡ", fill="#000000")

    img.save("c:/Users/admin/Desktop/myportfolio/public/images/projects/fasalrakshak.jpg", "JPEG", quality=90)

def create_portfolio():
    # Portfolio: Editorial cream & terracotta preview of this very site
    img = Image.new("RGB", (W, H), "#F3EEE3")
    d = ImageDraw.Draw(img)
    
    # Top centered SV monogram
    d.ellipse([W // 2 - 32, 40, W // 2 + 32, 104], fill="#A85C32", outline="#8B4826", width=2)
    d.ellipse([W // 2 - 27, 45, W // 2 + 27, 99], outline="#F3EEE3", width=1)
    d.text((W // 2 - 14, 58), "SV", fill="#F3EEE3")
    
    # Headline: "Hello, I am Sujal!"
    d.text((W // 2 - 140, 130), "Hello, I am Sujal!", fill="#262220")
    d.text((W // 2 - 180, 175), "Full Stack Developer • Clean Logic & Real Problem Solving", fill="#6B6259")
    
    # CTA pill button
    d.rounded_rectangle([W // 2 - 70, 215, W // 2 + 70, 255], radius=20, fill="#A85C32")
    d.text((W // 2 - 45, 227), "Contact me", fill="#F3EEE3")
    
    # Bottom Arch Preview
    arch_w, arch_h = 420, 240
    arch_x = (W - arch_w) // 2
    d.rounded_rectangle([arch_x, 280, arch_x + arch_w, 280 + arch_h], radius=60, fill="#EAE2D0", outline="#DDD3C0", width=2)
    d.text((W // 2 - 100, 380), "Custom Design System", fill="#8B4826")
    d.text((W // 2 - 130, 410), "Vite + React Router + Tailwind CSS", fill="#262220")
    
    img.save("c:/Users/admin/Desktop/myportfolio/public/images/projects/portfolio.jpg", "JPEG", quality=90)

create_nexus()
create_trustledger()
create_industriguard()
create_docsage()
create_fasalrakshak()
create_portfolio()
print("All 6 project screenshot placeholders generated successfully!")
