import urllib.request
import re
import json

url = 'https://drive.google.com/drive/folders/1eh_vHJfK3SWWV3229g9pxrG4efIGgR2m'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    
    # Save a snippet or search for file patterns
    with open('scratch/drive_html.txt', 'w', encoding='utf-8') as f:
        f.write(html)
        
    print('HTML length:', len(html))
    # Look for drive items data in JS payload
    # Patterns like ["id", "title.mp4"]
    matches = re.findall(r'\["([a-zA-Z0-9_-]{20,})","([^"]+\.(?:mp4|mov|webm|m4v))"', html, re.I)
    print('Matches:', matches)
    
    # Try finding any mp4 or video files
    any_video = re.findall(r'([^\s"\'<>]+\.(?:mp4|mov|webm|m4v))', html, re.I)
    print('Any video strings:', set(any_video))
    
    # Also find any id followed by mime type video/
    video_mime = re.findall(r'([a-zA-Z0-9_-]{25,}).{1,200}?video', html)
    print('Video mime IDs count:', len(video_mime))
    for vid in video_mime[:10]:
        print('Vid match:', vid)

except Exception as e:
    print('Error:', e)
