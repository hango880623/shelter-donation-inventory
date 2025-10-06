import React, { useState, useEffect } from 'react';
import DonationForm from './components/DonationForm';
import DonationList from './components/DonationList';
import { donationApiService } from './services/donationApiService';
import { Donation, CreateDonationRequest, UpdateDonationRequest } from './types/donation';
import './App.css';

/**
 * Main App component
 * Manages the overall state and orchestrates the donation management functionality
 */
const App: React.FC = () => {
  // State management
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load all donations on component mount
   */
  useEffect(() => {
    loadDonations();
  }, []);

  /**
   * Fetch all donations from the API
   */
  const loadDonations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedDonations = await donationApiService.getAllDonations();
      // Sort donations by creation date (newest first)
      const sortedDonations = fetchedDonations.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setDonations(sortedDonations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load donations');
      console.error('Error loading donations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle creating a new donation
   */
  const handleCreateDonation = async (donationData: CreateDonationRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const newDonation = await donationApiService.createDonation(donationData);
      
      // Add the new donation to the beginning of the list
      setDonations(prev => [newDonation, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create donation');
      console.error('Error creating donation:', err);
      throw err; // Re-throw to let the form handle the error
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle updating an existing donation
   */
  const handleUpdateDonation = async (id: string, updateData: UpdateDonationRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedDonation = await donationApiService.updateDonation(id, updateData);
      
      // Update the donation in the list
      setDonations(prev => 
        prev.map(donation => 
          donation.id === id ? updatedDonation : donation
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update donation');
      console.error('Error updating donation:', err);
      throw err; // Re-throw to let the component handle the error
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle deleting a donation
   */
  const handleDeleteDonation = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await donationApiService.deleteDonation(id);
      
      // Remove the donation from the list
      setDonations(prev => prev.filter(donation => donation.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete donation');
      console.error('Error deleting donation:', err);
      throw err; // Re-throw to let the component handle the error
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏠 Digital Aid - Shelter Donation Inventory</h1>
        <p>Manage and track donations for our local shelter community</p>
      </header>

      <main className="app-main">
        {/* Error message display */}
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={clearError} className="error-close">×</button>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="loading-banner">
            <span>Processing...</span>
          </div>
        )}

        <div className="app-content">
          {/* Donation Form Section */}
          <section className="form-section">
            <DonationForm 
              onSubmit={handleCreateDonation}
              isLoading={isLoading}
            />
          </section>

          {/* Donation List Section */}
          <section className="list-section">
            <DonationList
              donations={donations}
              onUpdate={handleUpdateDonation}
              onDelete={handleDeleteDonation}
              isLoading={isLoading}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2024 Digital Aid - Helping shelters manage donations effectively</p>
      </footer>
    </div>
  );
};

export default App;