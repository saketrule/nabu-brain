# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Demo
The "Workflow Redesigner" Bot: A demo where a user describes a messy manual process (e.g., "I get receipts via email, save them to a folder, and then manually type them into a spreadsheet"). The app instantly generates a visual map showing how NABU would automate 80% with rule-based systems (like n8n) and use AI for the remaining 20% "brain" work.

### Scenarios
Scenario A: The "Inbox Chaos" (General Admin)
The Mess: "We receive 50 invoices a day via email. My assistant downloads them, renames them, and types the totals into Excel."

NABU Redesign: * Triggers: Gmail Watcher.

Action: AI Document Parser (Extracts Line Items).

Storage: Auto-sync to QuickBooks & Google Sheets.

Scenario B: The "Content Factory" (Marketing)
The Mess: "I record a 1-hour podcast. I have to manually listen, find clips, write 5 LinkedIn posts, and create a newsletter."

NABU Redesign: * Triggers: File Upload (S3/Drive).

Action: GPT-4o Transcription -> Agentic Summarization -> Multi-platform Content Generator.

Scenario C: The "Lead Chaser" (Sales)
The Mess: "Leads come from the website. I manually check their LinkedIn, see if they are a fit, and then write them an email."

NABU Redesign: * Triggers: Form Submission.

Action: Clay/Clearbit Enrichment -> AI Lead Scoring -> Personalized Draft in Outreach.io.