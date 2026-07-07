#!/usr/bin/env bash
# Create a new lesson file from the template with highlight.js inlined.
#
# Usage: templates/new-lesson.sh topics/<slug>/lessons/<n>-<slug>.html
#
# Copies templates/lesson.html to the target path, replacing the
# HLJS-LIGHT-CSS / HLJS-DARK-CSS / HLJS-JS placeholder lines with the
# vendored highlight.js assets. The lesson-builder then edits only the
# content slots (title, CONTENT block, quiz-data JSON) in the copy.
set -euo pipefail

target="${1:?usage: templates/new-lesson.sh <target-lesson-path>}"
here="$(cd "$(dirname "$0")" && pwd)"

mkdir -p "$(dirname "$target")"

python3 - "$here" "$target" <<'PY'
import sys, pathlib

here, target = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
html = (here / "lesson.html").read_text()

for placeholder, asset in [
    ("/* HLJS-LIGHT-CSS */", "vendor/highlight-github.min.css"),
    ("/* HLJS-DARK-CSS */", "vendor/highlight-github-dark.min.css"),
    ("// HLJS-JS", "vendor/highlight.min.js"),
]:
    assert placeholder in html, f"placeholder missing: {placeholder}"
    html = html.replace(placeholder, (here / asset).read_text().strip())

target.write_text(html)
print(f"created {target}")
PY
