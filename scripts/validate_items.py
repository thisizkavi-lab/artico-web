import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
organized = json.load(open(ROOT / "src/web/vocabularyOrganized.json"))

valid_terms = set()
for l in organized["lessons"]:
    lid = l["sourceLesson"]
    for g in l["groups"]:
        for item in g["items"]:
            valid_terms.add(f"{lid}:{item[0].lower().strip()}")

def check_script(script_name):
    mod = {}
    content = (ROOT / "scripts" / script_name).read_text()
    # Find ITEMS list
    lines = content.splitlines()
    items = []
    import ast
    tree = ast.parse(content)
    for node in tree.body:
        if isinstance(node, ast.Assign):
            for t in node.targets:
                if getattr(t, 'id', '') == 'ITEMS':
                    items = ast.literal_eval(node.value)
    print(f"Checking {len(items)} items in {script_name}...")
    errors = []
    for item in items:
        lid, term, query, slug, is_file = item
        key = f"{lid}:{term.lower().strip()}"
        if key not in valid_terms:
            errors.append((key, term, lid))
    if errors:
        print(f"Found {len(errors)} invalid keys:")
        for k, t, lid in errors:
            print(f"  {k} (term: {t})")
            # find closest in that lesson
            lesson_terms = [item[0] for l in organized["lessons"] if l["sourceLesson"] == lid for g in l["groups"] for item in g["items"]]
            matches = [lt for lt in lesson_terms if any(w in lt.lower() for w in t.lower().split())]
            print(f"    candidates in L{lid}: {matches[:5]}")
    else:
        print("All keys are 100% valid!")

if __name__ == "__main__":
    check_script(sys.argv[1])
