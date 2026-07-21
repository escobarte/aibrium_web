# CHANGELOG — Aibrium build log

Claude Code appends one entry at the end of every task. Newest at the bottom.

**Entry format:**
```
## [Phase N] Short task name — YYYY-MM-DD
- files: path/one.tsx, path/two.ts
- notes: what was built / anything worth knowing
- status: ⏳ built, untested        ← set on completion
```
When the task has been run (`npm run dev`) and works, change the status line to:
```
- status: ✅ verified — YYYY-MM-DD
```

Status legend: `⏳ built, untested` · `✅ verified` · `⚠️ needs fix (reason)`

---

<!-- entries below this line -->
