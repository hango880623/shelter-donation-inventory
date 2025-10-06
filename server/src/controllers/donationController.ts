import { Request, Response } from 'express';
import { donationService } from '../services/donationService';
import { CreateDonationRequest, UpdateDonationRequest, DonationType } from '../models/donation';

/**
 * Controller for handling donation-related HTTP requests
 */
class DonationController {
  /**
   * Get all donations
   * GET /api/donations
   */
  getAllDonations = (req: Request, res: Response): void => {
    try {
      const donations = donationService.getAllDonations();
      res.status(200).json({
        success: true,
        data: donations,
        count: donations.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve donations',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  /**
   * Get a single donation by ID
   * GET /api/donations/:id
   */
  getDonationById = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const donation = donationService.getDonationById(id);

      if (!donation) {
        res.status(404).json({
          success: false,
          message: 'Donation not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: donation
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve donation',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  /**
   * Create a new donation
   * POST /api/donations
   */
  createDonation = (req: Request, res: Response): void => {
    try {
      const { donorName, donationType, quantity, date }: CreateDonationRequest = req.body;

      // Validate required fields
      if (!donorName || !donationType || !quantity || !date) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: donorName, donationType, quantity, and date are required'
        });
        return;
      }

      // Validate donation type
      if (!Object.values(DonationType).includes(donationType)) {
        res.status(400).json({
          success: false,
          message: 'Invalid donation type',
          validTypes: Object.values(DonationType)
        });
        return;
      }

      // Validate date format
      if (isNaN(Date.parse(date))) {
        res.status(400).json({
          success: false,
          message: 'Invalid date format. Please use ISO date string (YYYY-MM-DD)'
        });
        return;
      }

      const donation = donationService.createDonation({
        donorName,
        donationType,
        quantity,
        date
      });

      res.status(201).json({
        success: true,
        data: donation,
        message: 'Donation created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create donation',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  /**
   * Update an existing donation
   * PUT /api/donations/:id
   */
  updateDonation = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const updateData: UpdateDonationRequest = req.body;

      // Validate donation type if provided
      if (updateData.donationType && !Object.values(DonationType).includes(updateData.donationType)) {
        res.status(400).json({
          success: false,
          message: 'Invalid donation type',
          validTypes: Object.values(DonationType)
        });
        return;
      }

      // Validate date format if provided
      if (updateData.date && isNaN(Date.parse(updateData.date))) {
        res.status(400).json({
          success: false,
          message: 'Invalid date format. Please use ISO date string (YYYY-MM-DD)'
        });
        return;
      }

      const updatedDonation = donationService.updateDonation(id, updateData);

      if (!updatedDonation) {
        res.status(404).json({
          success: false,
          message: 'Donation not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: updatedDonation,
        message: 'Donation updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update donation',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  /**
   * Delete a donation
   * DELETE /api/donations/:id
   */
  deleteDonation = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const deleted = donationService.deleteDonation(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Donation not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Donation deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete donation',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
}

export const donationController = new DonationController();