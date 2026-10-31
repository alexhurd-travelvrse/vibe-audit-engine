import sqlite3

conn = sqlite3.connect(r"C:\Users\Student\.gemini\antigravity\conversation_summaries.db")
c = conn.cursor()
c.execute("SELECT conversation_id, title, preview, last_modified_time FROM conversation_summaries WHERE title LIKE '%Vibe%' OR preview LIKE '%Vibe%' OR title LIKE '%Access%' OR preview LIKE '%Access%';")
rows = c.fetchall()
print(f"Found {len(rows)} matching conversations:")
for r in rows:
    print(f"ID: {r[0]} | Title: '{r[1]}' | Preview: '{r[2]}' | Modified: {r[3]}")
