"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { mockShipments, Shipment, ShipmentStatus, ShipmentDocument, ShipmentNote } from "@/lib/mockData";

interface LogisticsContextType {
  shipments: Shipment[];
  kpis: {
    activeShipments: number;
    deliveredThisMonth: number;
    customsReviews: number;
    delayedShipments: number;
    pendingDocuments: number;
  };
  addShipment: (shipment: Shipment) => void;
  updateShipmentStatus: (waybill: string, status: ShipmentStatus, location?: string) => void;
  addDocumentToShipment: (waybill: string, doc: ShipmentDocument) => void;
  addNoteToShipment: (waybill: string, note: ShipmentNote) => void;
  loading: boolean;
}

const LogisticsContext = createContext<LogisticsContextType | undefined>(undefined);

export function LogisticsProvider({ children }: { children: React.ReactNode }) {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("tradeflow_shipments");
    if (stored) {
      try {
        setShipments(JSON.parse(stored));
      } catch (e) {
        setShipments(mockShipments);
      }
    } else {
      setShipments(mockShipments);
      localStorage.setItem("tradeflow_shipments", JSON.stringify(mockShipments));
    }
    setLoading(false);
  }, []);

  // Helper to save to state and localStorage
  const saveShipments = (updated: Shipment[]) => {
    setShipments(updated);
    localStorage.setItem("tradeflow_shipments", JSON.stringify(updated));
  };

  const addShipment = (shipment: Shipment) => {
    const updated = [shipment, ...shipments];
    saveShipments(updated);
  };

  const updateShipmentStatus = (waybill: string, status: ShipmentStatus, location?: string) => {
    const updated = shipments.map(s => {
      if (s.waybill.toLowerCase() === waybill.toLowerCase()) {
        const timeStr = new Date().toLocaleString("en-US", { hour12: false }).replace(",", "");
        const loc = location || (status === 'Delivered' ? s.destination : 'In Route');
        
        // Add to timeline if not already there
        const alreadyInTimeline = s.timeline.some(t => t.status === status);
        const newTimeline = alreadyInTimeline 
          ? s.timeline.map(t => t.status === status ? { ...t, date: timeStr, location: loc } : t)
          : [...s.timeline, { status, date: timeStr, location: loc }];

        // Append operational note
        const newNote: ShipmentNote = {
          date: timeStr,
          author: "Operations System",
          content: `Shipment status updated to [${status}] at ${loc}.`
        };

        return {
          ...s,
          status,
          timeline: newTimeline,
          notes: [...s.notes, newNote]
        };
      }
      return s;
    });
    saveShipments(updated);
  };

  const addDocumentToShipment = (waybill: string, doc: ShipmentDocument) => {
    const updated = shipments.map(s => {
      if (s.waybill.toLowerCase() === waybill.toLowerCase()) {
        const timeStr = new Date().toLocaleString("en-US", { hour12: false }).replace(",", "");
        const newNote: ShipmentNote = {
          date: timeStr,
          author: "System (Document Audit)",
          content: `New document uploaded: ${doc.name} (${doc.type}). AI compliance status: [${doc.status}].`
        };
        return {
          ...s,
          documents: [...s.documents, doc],
          notes: [...s.notes, newNote]
        };
      }
      return s;
    });
    saveShipments(updated);
  };

  const addNoteToShipment = (waybill: string, note: ShipmentNote) => {
    const updated = shipments.map(s => {
      if (s.waybill.toLowerCase() === waybill.toLowerCase()) {
        return {
          ...s,
          notes: [...s.notes, note]
        };
      }
      return s;
    });
    saveShipments(updated);
  };

  // Dynamically compute KPIs
  const activeShipments = shipments.filter(s => s.status !== "Delivered").length + 22; // Base offset for large scale feel
  const deliveredThisMonth = shipments.filter(s => s.status === "Delivered").length + 111; 
  const customsReviews = shipments.filter(s => s.status === "Customs Review" || s.status === "Border Processing").length + 4;
  const delayedShipments = shipments.filter(s => s.documents.some(d => d.status === "Flagged")).length;
  const pendingDocuments = shipments.reduce((acc, s) => {
    return acc + s.documents.filter(d => d.status === "Under Review" || d.status === "Flagged").length;
  }, 0) + 6;

  return (
    <LogisticsContext.Provider
      value={{
        shipments,
        kpis: {
          activeShipments,
          deliveredThisMonth,
          customsReviews,
          delayedShipments,
          pendingDocuments,
        },
        addShipment,
        updateShipmentStatus,
        addDocumentToShipment,
        addNoteToShipment,
        loading
      }}
    >
      {children}
    </LogisticsContext.Provider>
  );
}

export function useLogistics() {
  const context = useContext(LogisticsContext);
  if (context === undefined) {
    throw new Error("useLogistics must be used within a LogisticsProvider");
  }
  return context;
}
