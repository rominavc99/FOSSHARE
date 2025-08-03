from django.core.management.base import BaseCommand
from core.models import Tag

TAG_LIST = [
    # 🐧 Tecnología y Dev
    "Linux", "Open Source", "DevOps", "Python", "JavaScript", "TypeScript",
    "React", "Django", "Vue", "Next.js", "Flask", "Node.js",
    "Accessibility", "Security", "AI", "Machine Learning", "Data Science", "Documentation",
    "CLI", "APIs", "Terminal Tools", "Cloud", "Container", "Docker", "Kubernetes",
    "PostgreSQL", "MySQL", "SQLite", "Redis", "MongoDB", "Database",
    "Networking", "Self-Hosting", "Monitoring", "Testing", "Web", "Mobile", "Desktop",

    # 🎨 Diseño
    "UX", "UI", "Design Systems", "Figma", "Sketch", "Adobe XD", "Color Theory", "Typography",
    "Branding", "Prototyping", "Design Tokens", "Motion Design",

    # 🧩 Animación
    "2D Animation", "3D Animation", "Character Animation", "Spine", "Blender", "Toon Boom",
    "After Effects", "Motion Graphics", "Rigging", "VFX",

    # 📝 Escritura y literatura
    "Literature", "Fiction", "Non-fiction", "Storytelling", "Creative Writing",
    "Copywriting", "Screenwriting", "Worldbuilding", "Editing", "Poetry",

    # 🛠️ Herramientas y software
    "Inkscape", "GIMP", "Blender", "Krita", "Godot", "Unity", "Unreal Engine",
    "VSCode", "Zotero", "Obsidian", "Notion", "LaTeX",

    # 📚 Educación y Comunidad
    "Tutorial", "Guide", "Beginner", "Advanced", "Course", "Community", "Documentation",

    # 📊 Estadística y Ciencia
    "Statistics", "Bayesian Analysis", "Hypothesis Testing", "R Programming", "SPSS",
    "Biomedical Engineering", "Biostatistics", "Health Informatics",
    "Accounting", "Finance", "Tax Management",

    # 📈 Gestión de proyectos y calidad
    "Agile", "Scrum", "Kanban", "CMMI", "ISO 9001", "ISO 27001", "Quality Assurance",
    "Process Improvement", "Project Management",

    # 🧠 Modelado y diagramas
    "UML", "Class Diagrams", "Sequence Diagrams", "Use Case Diagrams", "Flowcharts",
    "Modeling Tools", "BPMN", "System Design",

    # 🔬 Ciencia y pensamiento creativo
    "Science", "Physics", "Biology", "Chemistry", "Mathematics", "Research",
    "Creative Programming", "Generative Art", "Creative Coding"
]

class Command(BaseCommand):
    help = "Seed predefined tags into the Tag model"

    def handle(self, *args, **options):
        created = 0
        for name in TAG_LIST:
            name = name.strip()
            obj, was_created = Tag.objects.get_or_create(name=name)
            if was_created:
                created += 1
        self.stdout.write(self.style.SUCCESS(f"Seed completo. {created} tags nuevos creados."))
