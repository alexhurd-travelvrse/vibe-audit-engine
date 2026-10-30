import os
import re

root_dir = r"C:\Users\Student\.gemini\antigravity\scratch\vibe-audit-engine"
hits = []

for dirpath, dirnames, filenames in os.walk(root_dir):
    if "node_modules" in dirpath or ".cache" in dirpath or "dist" in dirpath:
        continue
    for fname in filenames:
        if fname.endswith((".js", ".mjs", ".cjs", ".ts", ".jsx", ".tsx")):
            fpath = os.path.join(dirpath, fname)
            try:
                with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                    for i, line in enumerate(f):
                        # Match something like foo.title where foo is not ?
                        matches = re.finditer(r'([a-zA-Z0-9_\]\)]+)\.title\b', line)
                        for m in matches:
                            var_name = m.group(1)
                            if var_name not in ['prop', 'matchedBenchmarkProp']:
                                hits.append((fpath, i + 1, line.strip(), var_name))
            except Exception as e:
                pass

print(f"Total potential unsafe .title accesses: {len(hits)}")
for fpath, lno, line, var_name in hits:
    relpath = os.path.relpath(fpath, root_dir)
    print(f"{relpath}:{lno} [{var_name}] -> {line[:120]}")
