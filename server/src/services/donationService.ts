import { v4 as uuidv4 } from 'uuid';
import { Donation, CreateDonationRequest, UpdateDonationRequest } from '../models/donation';

/**
 * In-memory storage service for donations
 * In a production environment, this would be replaced with a database service
 */
class DonationService {
  private donations: Donation[] = [];

  /**
   * Get all donations
   * @returns Array of all donations
   */
  getAllDonations(): Donation[] {
    return this.donations;
  }

  /**
   * Get a donation by ID
   * @param id - The donation ID
   * @returns The donation if found, undefined otherwise
   */
  getDonationById(id: string): Donation | undefined {
    return this.donations.find(donation => donation.id === id);
  }

  /**
   * Create a new donation
   * @param donationData - The donation data to create
   * @returns The created donation
   */
  createDonation(donationData: CreateDonationRequest): Donation {
    const now = new Date().toISOString();
    const newDonation: Donation = {
      id: uuidv4(),
      ...donationData,
      createdAt: now,
      updatedAt: now
    };

    this.donations.push(newDonation);
    return newDonation;
  }

  /**
   * Update an existing donation
   * @param id - The donation ID to update
   * @param updateData - The data to update
   * @returns The updated donation if found, undefined otherwise
   */
  updateDonation(id: string, updateData: UpdateDonationRequest): Donation | undefined {
    const donationIndex = this.donations.findIndex(donation => donation.id === id);
    
    if (donationIndex === -1) {
      return undefined;
    }

    const updatedDonation: Donation = {
      ...this.donations[donationIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    this.donations[donationIndex] = updatedDonation;
    return updatedDonation;
  }

  /**
   * Delete a donation
   * @param id - The donation ID to delete
   * @returns True if deleted successfully, false if not found
   */
  deleteDonation(id: string): boolean {
    const donationIndex = this.donations.findIndex(donation => donation.id === id);
    
    if (donationIndex === -1) {
      return false;
    }

    this.donations.splice(donationIndex, 1);
    return true;
  }

  /**
   * Get donations count for statistics
   * @returns The total number of donations
   */
  getDonationsCount(): number {
    return this.donations.length;
  }
}

// Export a singleton instance
export const donationService = new DonationService();