/**
 * Donation model interface for the frontend
 * Matches the backend Donation interface
 */
export interface Donation {
  id: string;
  donorName: string;
  donationType: DonationType;
  quantity: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Donation type enumeration
 * Defines the various types of donations the shelter can receive
 */
export enum DonationType {
  MONEY = 'money',
  FOOD = 'food',
  CLOTHING = 'clothing',
  MEDICAL_SUPPLIES = 'medical_supplies',
  TOYS = 'toys',
  HOUSEHOLD_ITEMS = 'household_items',
  OTHER = 'other'
}

/**
 * Request interface for creating a new donation
 */
export interface CreateDonationRequest {
  donorName: string;
  donationType: DonationType;
  quantity: string;
  date: string;
}

/**
 * Request interface for updating an existing donation
 */
export interface UpdateDonationRequest {
  donorName?: string;
  donationType?: DonationType;
  quantity?: string;
  date?: string;
}

/**
 * API response interface
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

/**
 * Form data interface for the donation form
 */
export interface DonationFormData {
  donorName: string;
  donationType: DonationType | '';
  quantity: string;
  date: string;
}