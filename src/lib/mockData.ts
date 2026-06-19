export type ShipmentStatus = 'Booked' | 'Received' | 'Customs Review' | 'Customs Cleared' | 'In Transit' | 'Border Processing' | 'Out For Delivery' | 'Delivered';

export interface ShipmentDocument {
  name: string;
  type: string;
  status: 'Approved' | 'Under Review' | 'Flagged';
  uploadDate: string;
}

export interface ShipmentNote {
  date: string;
  author: string;
  content: string;
}

export interface Shipment {
  waybill: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  eta: string;
  customer: string;
  cargo: string;
  weight: string;
  timeline: { status: ShipmentStatus; date: string; location: string }[];
  documents: ShipmentDocument[];
  notes: ShipmentNote[];
}

export const mockShipments: Shipment[] = [
  {
    waybill: "DFS-202606-0001",
    origin: "Johannesburg, ZA",
    destination: "Gaborone, BW",
    status: "In Transit",
    eta: "2 Days (Jun 10, 2026)",
    customer: "Global Retail Ltd",
    cargo: "Electronics",
    weight: "1,250 kg",
    timeline: [
      { status: "Booked", date: "Jun 05, 2026 09:00", location: "Johannesburg, ZA" },
      { status: "Received", date: "Jun 05, 2026 14:30", location: "DFS Hub JHB" },
      { status: "Customs Review", date: "Jun 06, 2026 10:15", location: "Kopfontein Border" },
      { status: "Customs Cleared", date: "Jun 06, 2026 16:45", location: "Kopfontein Border" },
      { status: "In Transit", date: "Jun 07, 2026 08:00", location: "Route N4" }
    ],
    documents: [
      { name: "Commercial_Invoice_DFS001.pdf", type: "Commercial Invoice", status: "Approved", uploadDate: "Jun 05, 2026" },
      { name: "Packing_List_DFS001.pdf", type: "Packing List", status: "Approved", uploadDate: "Jun 05, 2026" },
      { name: "Bill_of_Lading_DFS001.pdf", type: "Bill of Lading", status: "Approved", uploadDate: "Jun 06, 2026" }
    ],
    notes: [
      { date: "Jun 05, 2026 09:00", author: "Client Portal", content: "Shipment booked and scheduled for collection." },
      { date: "Jun 05, 2026 14:30", author: "DFS JHB Hub", content: "Cargo received, inspected, and verified against packing list. Weights match." },
      { date: "Jun 06, 2026 10:15", author: "Customs Clearing Dept", content: "Customs documents compiled and submitted to SARS/BURS at Kopfontein Border." },
      { date: "Jun 06, 2026 16:45", author: "Kopfontein Agent", content: "Customs clearance granted. Border transit cleared." },
      { date: "Jun 07, 2026 08:00", author: "Fleet Control", content: "Consignment dispatched. Vehicle ID: DFS-TRK-402 en route to Gaborone via N4." }
    ]
  },
  {
    waybill: "DFS-202606-0002",
    origin: "Lusaka, ZM",
    destination: "Harare, ZW",
    status: "Border Processing",
    eta: "3 Days (Jun 11, 2026)",
    customer: "Mining Corp Ltd",
    cargo: "Heavy Machinery",
    weight: "12,000 kg",
    timeline: [
      { status: "Booked", date: "Jun 04, 2026 11:00", location: "Lusaka, ZM" },
      { status: "Received", date: "Jun 05, 2026 09:00", location: "DFS Hub LUN" },
      { status: "In Transit", date: "Jun 06, 2026 07:30", location: "Route T2" },
      { status: "Border Processing", date: "Jun 07, 2026 13:15", location: "Chirundu Border" }
    ],
    documents: [
      { name: "Commercial_Invoice_DFS002.pdf", type: "Commercial Invoice", status: "Approved", uploadDate: "Jun 04, 2026" },
      { name: "Packing_List_DFS002.pdf", type: "Packing List", status: "Approved", uploadDate: "Jun 04, 2026" },
      { name: "Import_Permit_ZW_DFS002.pdf", type: "Import Permit", status: "Flagged", uploadDate: "Jun 05, 2026" }
    ],
    notes: [
      { date: "Jun 04, 2026 11:00", author: "Client Portal", content: "Shipment booked. Heavy haul configuration requested." },
      { date: "Jun 05, 2026 09:00", author: "DFS LUN Hub", content: "Machinery loaded and lashed. Pre-transit inspection completed." },
      { date: "Jun 06, 2026 07:30", author: "Fleet Control", content: "Vehicle DFS-TRK-088 (Escorted Heavy Carrier) departed Lusaka." },
      { date: "Jun 07, 2026 13:15", author: "Chirundu Agent", content: "Vehicle arrived at Chirundu Border Post. Border queue is moderate." },
      { date: "Jun 07, 2026 14:00", author: "DFS AI Compliance", content: "Flagged: Weight mismatch detected. Import permit lists 12,000 kg while commercial invoice lists 12,500 kg. Reviewing with customs agent." }
    ]
  },
  {
    waybill: "DFS-202606-0003",
    origin: "Pretoria, ZA",
    destination: "Maputo, MZ",
    status: "Delivered",
    eta: "Delivered (Jun 06, 2026)",
    customer: "AgriTech Solutions",
    cargo: "Fertilizer",
    weight: "5,000 kg",
    timeline: [
      { status: "Booked", date: "Jun 01, 2026 08:00", location: "Pretoria, ZA" },
      { status: "Received", date: "Jun 01, 2026 15:00", location: "DFS Hub PTA" },
      { status: "Customs Review", date: "Jun 02, 2026 10:00", location: "Lebombo Border" },
      { status: "Customs Cleared", date: "Jun 03, 2026 11:30", location: "Lebombo Border" },
      { status: "In Transit", date: "Jun 04, 2026 06:00", location: "Route EN4" },
      { status: "Out For Delivery", date: "Jun 05, 2026 09:00", location: "Maputo, MZ" },
      { status: "Delivered", date: "Jun 06, 2026 14:20", location: "AgriTech Maputo" }
    ],
    documents: [
      { name: "Commercial_Invoice_DFS003.pdf", type: "Commercial Invoice", status: "Approved", uploadDate: "Jun 01, 2026" },
      { name: "Packing_List_DFS003.pdf", type: "Packing List", status: "Approved", uploadDate: "Jun 01, 2026" },
      { name: "Cert_of_Origin_SADC_DFS003.pdf", type: "Certificate of Origin", status: "Approved", uploadDate: "Jun 02, 2026" },
      { name: "Bill_of_Lading_DFS003.pdf", type: "Bill of Lading", status: "Approved", uploadDate: "Jun 03, 2026" }
    ],
    notes: [
      { date: "Jun 01, 2026 08:00", author: "Client Portal", content: "Consignment booked. Tariff concessions checked under SADC trade agreement." },
      { date: "Jun 01, 2026 15:00", author: "DFS PTA Hub", content: "Cargo received and stacked. Palletized fertilizer." },
      { date: "Jun 02, 2026 10:00", author: "Lebombo Agent", content: "Documents submitted to SARS & Mozambique Customs (Alfandegas). SADC certificate included." },
      { date: "Jun 03, 2026 11:30", author: "Lebombo Agent", content: "Clearance completed. Customs duties calculated at zero tariff under trade concession." },
      { date: "Jun 04, 2026 06:00", author: "Fleet Control", content: "Departed Lebombo Border on Route EN4." },
      { date: "Jun 05, 2026 09:00", author: "DFS Maputo Agent", content: "Arrived at local Maputo depot. Prepared for local delivery." },
      { date: "Jun 06, 2026 14:20", author: "Local Driver", content: "Delivered to AgriTech Maputo. Signed POD received. Proof uploaded." }
    ]
  }
];

export const STATUS_ORDER: ShipmentStatus[] = [
  'Booked', 'Received', 'Customs Review', 'Customs Cleared', 'In Transit', 'Border Processing', 'Out For Delivery', 'Delivered'
];

