export type ShipmentStatus = 'Booked' | 'Received' | 'Customs Review' | 'Customs Cleared' | 'In Transit' | 'Border Processing' | 'Out For Delivery' | 'Delivered';

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
    ]
  }
];

export const STATUS_ORDER: ShipmentStatus[] = [
  'Booked', 'Received', 'Customs Review', 'Customs Cleared', 'In Transit', 'Border Processing', 'Out For Delivery', 'Delivered'
];
