import { Donation, CreateDonationRequest, UpdateDonationRequest, ApiResponse } from '../types/donation';

/**
 * API service for managing donations
 * Handles all HTTP requests to the backend API
 */
class DonationApiService {
  private baseUrl = '/api/donations';

  /**
   * Fetch all donations from the API
   * @returns Promise with array of donations
   */
  async getAllDonations(): Promise<Donation[]> {
    try {
      const response = await fetch(this.baseUrl);
      const result: ApiResponse<Donation[]> = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch donations');
      }

      return result.data || [];
    } catch (error) {
      console.error('Error fetching donations:', error);
      throw error;
    }
  }

  /**
   * Create a new donation
   * @param donationData - The donation data to create
   * @returns Promise with the created donation
   */
  async createDonation(donationData: CreateDonationRequest): Promise<Donation> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const result: ApiResponse<Donation> = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create donation');
      }

      if (!result.data) {
        throw new Error('No data returned from server');
      }

      return result.data;
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  }

  /**
   * Update an existing donation
   * @param id - The donation ID to update
   * @param updateData - The data to update
   * @returns Promise with the updated donation
   */
  async updateDonation(id: string, updateData: UpdateDonationRequest): Promise<Donation> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result: ApiResponse<Donation> = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update donation');
      }

      if (!result.data) {
        throw new Error('No data returned from server');
      }

      return result.data;
    } catch (error) {
      console.error('Error updating donation:', error);
      throw error;
    }
  }

  /**
   * Delete a donation
   * @param id - The donation ID to delete
   * @returns Promise that resolves when deletion is complete
   */
  async deleteDonation(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });

      const result: ApiResponse<void> = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete donation');
      }
    } catch (error) {
      console.error('Error deleting donation:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const donationApiService = new DonationApiService();