import { Router } from 'express';
import { donationController } from '../controllers/donationController';

/**
 * Router for donation-related endpoints
 * Defines all the REST API routes for CRUD operations on donations
 */
const donationRoutes = Router();

// GET /api/donations - Get all donations
donationRoutes.get('/', donationController.getAllDonations);

// GET /api/donations/:id - Get a specific donation by ID
donationRoutes.get('/:id', donationController.getDonationById);

// POST /api/donations - Create a new donation
donationRoutes.post('/', donationController.createDonation);

// PUT /api/donations/:id - Update an existing donation
donationRoutes.put('/:id', donationController.updateDonation);

// DELETE /api/donations/:id - Delete a donation
donationRoutes.delete('/:id', donationController.deleteDonation);

export default donationRoutes;