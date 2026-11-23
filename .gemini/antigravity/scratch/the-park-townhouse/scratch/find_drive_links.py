import re
import urllib.request
import os

with open('scratch/drive_html.txt', 'r', encoding='utf-8') as f:
    html = f.read()

# Find all file/d/<ID>/view
links = re.findall(r'https:\\/\\/drive\.google\.com\\/file\\/d\\/([a-zA-Z0-9_-]{25,})\\/view', html)
print('Found links:', len(links), len(set(links)))
unique_ids = list(dict.fromkeys(links))
for i, uid in enumerate(unique_ids):
    print(f"{i+1}: {uid}")

os.makedirs('assets/videos', exist_ok=True)
count = 0
for uid in unique_ids:
    if count >= 4:
        break
    dest = f"assets/videos/hero_video_{count+1}.mp4"
    if os.path.exists(dest) and os.path.getsize(dest) > 100000:
        print(f"Already downloaded: {dest}")
        count += 1
        continue
    download_url = f"https://drive.google.com/uc?export=download&id={uid}"
    print(f"Downloading {dest} from {download_url}...")
    try:
        req = urllib.request.Request(
            download_url,
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as out_f:
            content = resp.read()
            out_f.write(content)
        size = os.path.getsize(dest)
        print(f"Finished {dest}, size: {size} bytes")
        if size > 100000:
            count += 1
        else:
            print("Response might be HTML or confirmation, removing small file...")
            os.remove(dest)
    except Exception as e:
        print(f"Error {dest}: {e}")
