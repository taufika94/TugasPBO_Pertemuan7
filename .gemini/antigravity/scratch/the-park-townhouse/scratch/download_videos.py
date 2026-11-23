import re
import os
import urllib.request

with open('scratch/drive_html.txt', 'r', encoding='utf-8') as f:
    html = f.read()

# Pattern in Drive web:
# [\"<FILE_ID>\",[\"<FOLDER_ID>\"],\"<FILE_NAME>\",\"video/mp4\"
# In escaped unicode:
# \\x5b\\x22([a-zA-Z0-9_-]{25,})\\x22,\\x5b\\x22[^\\]]+\\x22\\x5d,\\x22([^\\x22]+\\.mp4)\\x22
pattern = r'\\x5b\\x22([a-zA-Z0-9_-]{25,})\\x22,\\x5b\\x221eh_vHJfK3SWWV3229g9pxrG4efIGgR2m\\x22\\x5d,\\x22([^\\x22]+?\\.mp4)'
matches = re.findall(pattern, html)
print(f"Found {len(matches)} videos:")
unique = {}
for file_id, name in matches:
    clean_name = name.encode('utf-8').decode('unicode_escape', errors='ignore')
    unique[file_id] = clean_name
    print(f"- {file_id}: {clean_name}")

os.makedirs('assets/videos', exist_ok=True)

# Let's download a selected set of 4-5 videos:
# E.g. Hook / cinematic entrance, interior, lifestyle, clubhouse/garasi
count = 0
for file_id, name in unique.items():
    if count >= 5:
        break
    safe_name = f"hero_video_{count+1}.mp4"
    dest = os.path.join('assets/videos', safe_name)
    if not os.path.exists(dest) or os.path.getsize(dest) < 10000:
        download_url = f"https://drive.google.com/uc?export=download&id={file_id}"
        print(f"Downloading {safe_name} from {file_id} ({name})...")
        try:
            # Google drive direct download
            req = urllib.request.Request(
                download_url,
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            )
            with urllib.request.urlopen(req) as resp, open(dest, 'wb') as out_f:
                out_f.write(resp.read())
            print(f"Saved {dest}, size: {os.path.getsize(dest)} bytes")
            if os.path.getsize(dest) < 5000:
                print("Small file, might be confirm screen. Checking...")
        except Exception as e:
            print(f"Failed to download {name}: {e}")
    else:
        print(f"Already exists: {dest} ({os.path.getsize(dest)} bytes)")
    count += 1
