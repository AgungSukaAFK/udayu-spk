import { db } from "@/lib/firebase"; // Assuming your firebase config is here
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";

export interface WPResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// services/weighted-product.ts
export interface WeightedProductData {
  kode: string;
  criteria: {
    code: string;
    name: string;
    weight: number;
    type: "Benefit" | "Cost"; // Added type for criteria
    assessments: {
      value: string;
      score: number;
    }[];
  }[];
  fishCandidates: {
    code: string;
    assessments: {
      criteriaCode: string;
      value: string;
    }[];
  }[];
  created_at?: Timestamp;
  updated_at?: Timestamp;
}

// ... rest of WPServices (no changes needed there for this refactor)

const COLLECTION_NAME = "wps"; // Collection name for WP data

export const WPServices = {
  getAllWP: async (): Promise<WPResponse<WeightedProductData[]>> => {
    try {
      const wpRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(wpRef);

      const data = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...(doc.data() as WeightedProductData),
          } as WeightedProductData)
      );
      return {
        success: true,
        message: "Data Weighted Product berhasil diambil.",
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Gagal mengambil data Weighted Product: ${error.message}`,
      };
    }
  },

  getByKode: async (kode: string): Promise<WPResponse<WeightedProductData>> => {
    try {
      const wpRef = collection(db, COLLECTION_NAME);
      const q = query(wpRef, where("kode", "==", kode));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return {
          success: false,
          message: `Data Weighted Product dengan kode '${kode}' tidak ditemukan.`,
        };
      }

      const data = snapshot.docs[0].data() as WeightedProductData;
      return {
        success: true,
        message: "Data Weighted Product berhasil ditemukan.",
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Gagal mengambil data Weighted Product: ${error.message}`,
      };
    }
  },

  createWP: async (dto: WeightedProductData): Promise<WPResponse<null>> => {
    try {
      const docRef = doc(db, COLLECTION_NAME, dto.kode);

      const dataToSave = {
        ...dto,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };

      await setDoc(docRef, dataToSave);

      return {
        success: true,
        message: "Data Weighted Product berhasil dibuat.",
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Gagal membuat data Weighted Product: ${error.message}`,
      };
    }
  },

  updateWP: async (
    kode: string,
    updatedData: WeightedProductData
  ): Promise<WPResponse<null>> => {
    try {
      const docRef = doc(db, COLLECTION_NAME, kode);

      const dataToUpdate = {
        ...updatedData,
        updated_at: serverTimestamp(),
      };

      await setDoc(docRef, dataToUpdate, { merge: true }); // Use merge to avoid overwriting the entire document
      return {
        success: true,
        message: "Data Weighted Product berhasil diperbarui.",
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Gagal memperbarui data Weighted Product: ${error.message}`,
      };
    }
  },

  deleteWP: async (kode: string): Promise<WPResponse<null>> => {
    try {
      const docRef = doc(db, COLLECTION_NAME, kode);
      await deleteDoc(docRef);
      return {
        success: true,
        message: "Data Weighted Product berhasil dihapus.",
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Gagal menghapus data Weighted Product: ${error.message}`,
      };
    }
  },
};
