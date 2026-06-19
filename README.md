# DFS Digital Logistics Operating System (DFS-OS)

Welcome to the **DFS Digital Logistics Operating System (DFS-OS)**, a premium technology platform built for DFS Group. DFS-OS serves as a digital foundation for customs clearing, freight forwarding, transit corridor monitoring, and regional cross-border compliance throughout the Southern African Development Community (SADC) region.

DFS-OS combines modern web design with live artificial intelligence to demonstrate a state-of-the-art control room for SADC cross-border logistics.

---

## 🚀 Key Modules & Capabilities

### 1. Operations Control Center (Admin Portal)
*   **Active Dispatch Desk**: Enables control room operators to create new consignments, assign tracking waybills, and log cargo descriptions.
*   **Checkpoint & Status Updates**: Operations officers can update shipment positions (e.g., Kopfontein, Beitbridge, Chirundu, Ramatlabama) and advance transit status.
*   **Dynamic State Propagation**: Built on a unified global context (`LogisticsProvider`) with `localStorage` fallback. Operations modifications instantly synchronize across all dashboards.

### 2. Client Portal & Tracking Center
*   **Consignment Tracking**: High-fidelity tracking portal featuring timeline milestones, automated checkpoint timestamps, and live route mapping.
*   **Interactive Maps**: Integrated with React Leaflet and OpenStreetMap for physical location visualizations across regional corridors.
*   **Consolidated Client Dashboard**: Gives shippers real-time oversight of cargo status, historical invoicing, active quotes, and linked customs documents.

### 3. SADC Customs Co-pilot
*   **Live Advisory AI**: Both the dedicated Customs Assistant (`/assistant`) and the floating support widget are connected directly to a secure `/api/chat` route powered by Google's `gemini-2.5-flash` model.
*   **Database-Aware Responses**: Injects the active shipments database state as dynamic context into the LLM prompt. The AI advisor can resolve queries about specific waybills, ETAs, and border discrepancies in real-time.
*   *Note: All compliance outputs conclude with the mandatory disclaimer: "Final clearance remains subject to customs authority approval."*

### 4. AI Document compliance Audit
*   **OCR Valuation Auditor**: Automated audits for regional trade documents (Commercial Invoices, Packing Lists, Import Permits, Certificates of Origin) at `/api/analyze-doc`.
*   **Border Processing Simulation**: Automatically flags compliance issues based on filename metadata and waybill status (e.g., highlighting weight discrepancies for heavy industrial cargo at the Chirundu border).

---

## 🛠 Tech Stack

*   **Framework**: Next.js 16.2 (Turbopack) with App Router
*   **UI Library**: React 19.2 & Tailwind CSS v4
*   **Animation**: Framer Motion
*   **Icons**: Lucide React
*   **Mapping**: Leaflet & React Leaflet (OpenStreetMap)
*   **AI Engine**: Google Gemini API (`gemini-2.5-flash`)
*   **Data Model**: Stamped PostgreSQL/Supabase schema (defined in `database_schema.sql`)

---

## 📦 Getting Started

### 1. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🔐 Credentials & Access Roles

To log in and experience the platform's multi-tenant design, use the following credentials on the login screen:

### Operations Control Center (Admin)
*   **Superadmin**: `superadmin@dfsgroup.com` / `super123`
*   **Fleet Manager**: `fleet@dfsgroup.com` / `fleet123`
*   **Customs Clearing Agent**: `customs@dfsgroup.com` / `customs123`

### Client Portal
*   **Commercial Customer**: `client@example.com` / `user123`

---

*DFS Digital Logistics Operating System. Connecting Southern African Trade Corridors.*
