/**
 * Donation model interface
 * Represents the structure of a donation record in the shelter inventory system
 */
export interface Donation {
  id: string;
  donorName: string;
  donationType: DonationType;
  quantity: string; // Can be numeric amount or descriptive quantity
  date: string; // ISO date string
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
 * Excludes auto-generated fields (id, createdAt, updatedAt)
 */
export interface CreateDonationRequest {
  donorName: string;
  donationType: DonationType;
  quantity: string;
  date: string;
}

/**
 * Request interface for updating an existing donation
 * All fields are optional to allow partial updates
 */
export interface UpdateDonationRequest {
  donorName?: string;
  donationType?: DonationType;
  quantity?: string;
  date?: string;
}