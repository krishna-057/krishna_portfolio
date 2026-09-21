"""Build the Coswara-focused PDF without modifying the original resume."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume-coswara.pdf"
pdfmetrics.registerFont(TTFont("Arial", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", r"C:\Windows\Fonts\arialbd.ttf"))
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold")

PAGE_W, PAGE_H = A4
LEFT = 38
RIGHT = 38
WIDTH = PAGE_W - LEFT - RIGHT
TEXT = ParagraphStyle("text", fontName="Arial", fontSize=9.25, leading=12.7, textColor=colors.HexColor("#222222"))
BULLET = ParagraphStyle("bullet", parent=TEXT, leftIndent=11, firstLineIndent=-11, spaceAfter=2)
TITLE = ParagraphStyle("title", fontName="Arial-Bold", fontSize=11, leading=14)
HEADER = ParagraphStyle("header", fontName="Arial-Bold", fontSize=20, leading=23, alignment=TA_CENTER)
SUBHEADER = ParagraphStyle("subheader", parent=TEXT, alignment=TA_CENTER, fontSize=10)
LINK_COLOR = "#1454b8"

c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
c.setTitle("Krishna Sharma - AI/ML Resume (Coswara)")
y = PAGE_H - 35


def paragraph(markup, style=TEXT, indent=0):
    global y
    p = Paragraph(markup, style)
    _, height = p.wrap(WIDTH - indent, y)
    p.drawOn(c, LEFT + indent, y - height)
    y -= height


def gap(amount=5):
    global y
    y -= amount


def section(label):
    global y
    gap(10)
    c.setFont("Arial-Bold", 10.5)
    c.setFillColor(colors.HexColor("#161616"))
    c.drawString(LEFT, y - 9, label)
    y -= 12
    c.setStrokeColor(colors.HexColor("#555555"))
    c.setLineWidth(0.55)
    c.line(LEFT, y, PAGE_W - RIGHT, y)
    gap(5)


def heading(left, right=""):
    global y
    c.setFont("Arial-Bold", 9.5)
    c.drawString(LEFT, y - 10, left)
    if right:
        c.setFont("Arial", 9)
        c.drawRightString(PAGE_W - RIGHT, y - 10, right)
    y -= 14


def bullet(content):
    paragraph("&#8226;  " + content, BULLET)


def link(label, href):
    return f'<link href="{href}" color="{LINK_COLOR}"><u>{label}</u></link>'


paragraph("KRISHNA SHARMA", HEADER)
paragraph("AI ML Engineer | Software Engineer", SUBHEADER)
gap(3)
paragraph(
    'Bengaluru, Karnataka, India | '
    + link("krishnasharmacit@gmail.com", "mailto:krishnasharmacit@gmail.com") + ' | '
    + '+91 6001176023 | '
    + link("LinkedIn", "https://www.linkedin.com/in/krishna-sharma-a502aa234") + ' | '
    + link("GitHub", "https://github.com/krishna-057"),
    SUBHEADER,
)

section("PROFESSIONAL SUMMARY")
paragraph(
    "AI/ML and software engineer experienced in building PyTorch computer-vision pipelines, "
    "RAG search, FastAPI services, and full-stack mobile workflows. Strong in model evaluation, "
    "API design, SQL, and turning technical prototypes into documented, testable applications."
)

section("CORE SKILLS")
paragraph("<b>Languages:</b> Python, SQL, JavaScript, TypeScript, Dart, C++, Java")
paragraph("<b>AI and ML:</b> PyTorch, scikit-learn, NumPy, Pandas, CNNs, Transformers, Computer Vision, Transfer Learning, Grad-CAM, NLP")
paragraph("<b>Retrieval and APIs:</b> RAG, Embeddings, BM25, Hybrid Retrieval, FastAPI, REST APIs, PostgreSQL, MySQL, SQLite")
paragraph("<b>Frameworks and Tools:</b> Git, Docker, Prometheus, React, Next.js, Flutter, Supabase, PostgreSQL")

section("PROFESSIONAL EXPERIENCE")
heading("RentMyStay - BrightPath Technology & Services Pvt. Ltd.", "Nov 2025 - Present")
paragraph("Full Stack AI Developer | Bengaluru, India")
bullet("Built FAQ-focused RAG search using hybrid retrieval that combines BM25 keyword matching with embedding similarity, exposed through FastAPI and SQL-backed workflows.")
bullet("Developed production API flows for AI search and structured data operations; configured Prometheus monitoring for 1,000+ daily requests, including latency, volume, and failure behavior.")
bullet("Maintained and debugged the Flutter app, integrated chat and notification APIs, and released a new iOS admin app.")
gap(5)
heading("Saral Startup Schools", "Jan 2025 - Jul 2025")
paragraph("Software Engineering Intern | Bengaluru, India")
bullet("Built a responsive wedding-service booking platform with Next.js, authentication, dashboards, Drizzle ORM, and Cloudflare SQLite/D1 data flows.")
bullet("Designed the end-to-end browsing and booking journey across customer-facing pages and operational dashboard views.")

section("PROJECTS")
paragraph(
    '<b>Coswara Respiratory Symptom Classifier</b> | Python | PyTorch | Audio ML | '
    + link("GitHub", "https://github.com/krishna-057/coswara-respiratory-symptom-classifier")
)
bullet("Built a four-label CNN pipeline using mel spectrograms from 5,067 Coswara audio examples to predict fever, cold, fatigue, and cough.")
bullet("Addressed class imbalance with weighted focal loss and used mixup augmentation; trained and evaluated with five-fold cross-validation.")
bullet("Achieved <b>0.3900 &#177; 0.0135 mean best-validation macro-F1</b> (best fold: 0.4097). Reviewed per-symptom scores and error patterns; results are experimental, not diagnostic.")
gap(6)
paragraph(
    '<b>Pneumonia Detection Benchmark</b> | Python | PyTorch | CNNs | Transformers | Grad-CAM | '
    + link("GitHub", "https://github.com/krishna-057/pneumonia-detection-benchmark")
)
bullet("Audited pediatric chest X-rays for corrupt files and exact duplicates, then created balanced validation and test splits.")
bullet("Compared five CNN and transformer architectures using a consistent two-phase fine-tuning protocol and validation-selected decision thresholds.")
bullet("ConvNeXt-Tiny achieved <b>0.9997 ROC-AUC and 0.990 recall</b>; DenseNet121 achieved <b>0.9899 F1 and 0.995 specificity</b> on the internal test split. Used Grad-CAM to inspect model attention; results are not clinically validated.")

section("EDUCATION")
heading("Central Institute of Technology Kokrajhar", "Aug 2021 - Jun 2025")
paragraph("Bachelor of Technology in Computer Science and Engineering | CGPA 8.80/10 | India")

if y < 30:
    raise RuntimeError(f"Resume overflows the page: y={y:.1f}")
c.save()
print(f"Wrote {OUTPUT} (remaining space: {y:.1f} pt)")
