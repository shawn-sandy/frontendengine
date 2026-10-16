# Opus 5.5 for Work

**Source:** https://anthropic.ondemand.goldcast.io/on-demand/0888972a-51b6-416e-9c1e-0020d86c8af9
**Saved:** 2026-10-16

## TL;DR
An on-demand Anthropic webinar (Sep 25, ~53 min) with Amelia Pedone, Nicholas Lin, and Nathan Wu on using Claude Opus 5.5 for non-developer work. It covers what changed versus Opus 5 (cheaper, faster, clearer writing), prompting tips, and a live Cowork demo using the new Docs, Slides, and Design artifact types.

## Key points
- About 40% cheaper per task than Opus 5. Input and output tokens are 20% cheaper, and cache reads are 60% cheaper, which matters most for long agentic sessions.
- Output is over 30% faster, and it uses fewer tokens per task.
- Writing is more skimmable and puts the key information first.
- Strongest areas: following instructions closely, data and financial analysis (65% on a finance benchmark), vision and document extraction, and visual/UI design.
- Safety: the hardest model to prompt-inject that Anthropic has tested (~1% success). Blocked requests fall back to an earlier model instead of refusing.
- Docs, Slides, and Design artifacts run inside Cowork. Docs supports charts, interactive widgets, comments, multiplayer editing, and tagging Claude. You can export to Word, PDF, Google Docs, Notion, or PowerPoint, and the PowerPoint export stays editable.
- Opus 5.5 slides read as one connected story, while Opus 5 handled each slide on its own.

## Notable details
- **Prompting tips:** drop "think hard/carefully" (it always thinks, scaled by effort). Use **medium effort** by default, since max rarely helps much. Say what "done" looks like in the first prompt. Ask for the finished file, not an outline. Share screenshots of charts instead of retyping the data.
- **Design direction:** give a specific list of patterns and anti-patterns. Telling it to "avoid generic" only swaps one default style for another.
- **Brand style:** point Claude to written guidelines, or to example decks in a connected Drive folder.
- **Enterprise:** artifacts are off by default, and admins enable them per group in org settings. Chat and Cowork are merging into one tab over the coming weeks.
- A new Sonnet is coming. For now, the recommendation is to make Opus 5.5 your daily driver.
- Linked resources: "Blog: Claude Opus 5.5" and "Choosing an Effort Level with Opus 5.5".

## Takeaways
- For FrontendEngine, the design-prompting advice (name your anti-patterns, share screenshots) fits well with posts on design engineering and AI-assisted UI prototyping.
- Try medium effort plus a goal-first prompt in your own Cowork workflows, and compare the cost and quality with what you get now.
- Connecting context through connectors was called the single highest-leverage step for getting good output.
