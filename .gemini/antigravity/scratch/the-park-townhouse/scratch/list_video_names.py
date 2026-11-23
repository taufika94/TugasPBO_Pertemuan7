import re
with open('scratch/drive_html.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Search for any span or div with .mp4
for match in re.finditer(r'([a-zA-Z0-9_\- ]+\.mp4)', text, re.I):
    name = match.group(1)
    pos = match.start()
    id_match = re.search(r'data-id="([a-zA-Z0-9_-]{20,})"', text[max(0, pos-400):pos+400])
    print(name, '-> ID:', id_match.group(1) if id_match else 'None')
