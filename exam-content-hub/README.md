# Exam content hub

Static frontend for browsing the 149 exam tabs. Search or select an exam, choose a page on the left, and view Meta Title, Meta Description, Meta Keywords, and Structure Data. Empty cells are shown as “No entry yet.”

## Google Sheets connection

1. Open the target Google Sheet and choose **Extensions → Apps Script**.
2. Replace `Code.gs` with this folder's `Code.gs`, then set `SPREADSHEET_ID` to the ID from the Sheets URL.
3. Deploy or update the Apps Script as a **Web app**, executing as the sheet owner. Set access for the intended audience, then authorize the sheet read access.
4. Copy the deployment URL ending in `/exec` and put it in `API_URL` at the top of `index.html`.
5. Commit and deploy this folder as the Vercel project root (or configure its `Root Directory` as `exam-frontend/github`).

The page calls the read-only Apps Script JSONP endpoint every 60 seconds while visible. Sheet tabs, page names, and metadata values load from Google Sheets. `data.json` provides a snapshot when the endpoint is not configured or cannot be reached. Do not put the Google Sheet ID or any credentials in `index.html` or `data.json`.

Use unique page names in column A. Columns B–E are Meta Title, Meta Description, Meta Keywords, and Structure Data. G1 may contain a full display name for a shortened tab name.

