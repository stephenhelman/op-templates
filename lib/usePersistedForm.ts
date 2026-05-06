"use client";

import { useState, useEffect } from "react";

export interface PersistedFormData {
  businessInfo: {
    companyName: string;
    llcName: string;
    cityState: string;
    email: string;
    phone: string;
  };
  domainPreference: {
    hasOwnDomain: boolean;
    existingDomain: string;
    registrar: string;
    registrarOther: string;
    preferred1: string;
    preferred2: string;
    preferred3: string;
  };
  content: {
    headline: string;
    subheadline: string;
    about: string;
    states: string[];
  };
  customInquiry: {
    enabled: boolean;
    message: string;
  };
}

const STORAGE_KEY = "op_order_draft";

const emptyForm: PersistedFormData = {
  businessInfo: {
    companyName: "",
    llcName: "",
    cityState: "",
    email: "",
    phone: "",
  },
  domainPreference: {
    hasOwnDomain: false,
    existingDomain: "",
    registrar: "",
    registrarOther: "",
    preferred1: "",
    preferred2: "",
    preferred3: "",
  },
  content: {
    headline: "",
    subheadline: "",
    about: "",
    states: [],
  },
  customInquiry: {
    enabled: false,
    message: "",
  },
};

export function usePersistedForm() {
  const [formData, setFormData] = useState<PersistedFormData>(emptyForm);
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PersistedFormData;
        setFormData(parsed);
        setHasDraft(true);
      }
    } catch {
      // corrupted data — start fresh
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(emptyForm);
    setHasDraft(false);
  };

  return { formData, setFormData, clearDraft, hasDraft };
}
