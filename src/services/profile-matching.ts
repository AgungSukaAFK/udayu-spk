import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

export interface PMResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ProfileMatchingData {
  kode: string;
  kriteria: {
    nama: string;
    bobot: number;
  }[];
  preference: {
    cf: number;
    sf: number;
  };
  sub_kriteria: {
    nama: string;
    kriteria: string;
    harapan_nilai: number;
    jenis: "CORE FACTOR" | "SECONDARY FACTOR";
  }[];
  subject: {
    nama: string;
    nilai: {
      sub_kriteria: string;
      nilai: number;
    }[];
  }[];
}

const COLLECTION_NAME = "profile-matching";

export const PMServices = {
  getAllPM: async (): Promise<PMResponse<ProfileMatchingData[]>> => {
    try {
      const pmRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(pmRef);

      const data = snapshot.docs.map(
        (doc) => doc.data() as ProfileMatchingData
      );
      return {
        success: true,
        message: "Data berhasil diambil.",
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Gagal mengambil data: ${error.message}`,
      };
    }
  },

  getByKode: async (kode: string): Promise<PMResponse<ProfileMatchingData>> => {
    try {
      const pmRef = collection(db, COLLECTION_NAME);
      const q = query(pmRef, where("kode", "==", kode));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return {
          success: false,
          message: `Data dengan kode '${kode}' tidak ditemukan.`,
        };
      }

      const data = snapshot.docs[0].data() as ProfileMatchingData;
      return {
        success: true,
        message: "Data berhasil ditemukan.",
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Gagal mengambil data: ${error.message}`,
      };
    }
  },

  createPM: async (data: ProfileMatchingData): Promise<PMResponse<null>> => {
    try {
      const docRef = doc(db, COLLECTION_NAME, data.kode);
      await setDoc(docRef, data);
      return { success: true, message: "Data berhasil dibuat." };
    } catch (error: any) {
      return {
        success: false,
        message: `Gagal membuat data: ${error.message}`,
      };
    }
  },

  updatePM: async (
    kode: string,
    updatedData: ProfileMatchingData
  ): Promise<PMResponse<null>> => {
    try {
      const docRef = doc(db, COLLECTION_NAME, kode);
      await setDoc(docRef, updatedData); // full replace
      return { success: true, message: "Data berhasil diperbarui." };
    } catch (error: any) {
      return {
        success: false,
        message: `Gagal memperbarui data: ${error.message}`,
      };
    }
  },

  deletePM: async (kode: string): Promise<PMResponse<null>> => {
    try {
      const docRef = doc(db, COLLECTION_NAME, kode);
      await deleteDoc(docRef);
      return { success: true, message: "Data berhasil dihapus." };
    } catch (error: any) {
      return {
        success: false,
        message: `Gagal menghapus data: ${error.message}`,
      };
    }
  },
};
