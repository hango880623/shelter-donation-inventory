import React, { useState } from 'react';
import { Donation, DonationType, UpdateDonationRequest } from '../types/donation';

/**
 * Props interface for the DonationList component
 */
interface DonationListProps {
  donations: Donation[];
  onUpdate: (id: string, updateData: UpdateDonationRequest) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

/**
 * DonationList component
 * Displays a list of donations with edit and delete functionality
 */
const DonationList: React.FC<DonationListProps> = ({ 
  donations, 
  onUpdate, 
  onDelete, 
  isLoading = false 
}) => {
  // State for tracking which donation is being edited
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<UpdateDonationRequest>({});

  /**
   * Get user-friendly donation type labels
   */
  const getDonationTypeLabel = (type: DonationType): string => {
    const labels: Record<DonationType, string> = {
      [DonationType.MONEY]: 'Money',
      [DonationType.FOOD]: 'Food',
      [DonationType.CLOTHING]: 'Clothing',
      [DonationType.MEDICAL_SUPPLIES]: 'Medical Supplies',
      [DonationType.TOYS]: 'Toys',
      [DonationType.HOUSEHOLD_ITEMS]: 'Household Items',
      [DonationType.OTHER]: 'Other',
    };
    return labels[type];
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  /**
   * Start editing a donation
   */
  const startEditing = (donation: Donation) => {
    setEditingId(donation.id);
    setEditFormData({
      donorName: donation.donorName,
      donationType: donation.donationType,
      quantity: donation.quantity,
      date: donation.date,
    });
  };

  /**
   * Cancel editing
   */
  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData({});
  };

  /**
   * Handle input changes in edit form
   */
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Save edited donation
   */
  const saveEdit = async (id: string) => {
    try {
      // Only send changed fields
      const updateData: UpdateDonationRequest = {};
      
      if (editFormData.donorName?.trim()) {
        updateData.donorName = editFormData.donorName.trim();
      }
      if (editFormData.donationType) {
        updateData.donationType = editFormData.donationType;
      }
      if (editFormData.quantity?.trim()) {
        updateData.quantity = editFormData.quantity.trim();
      }
      if (editFormData.date) {
        updateData.date = editFormData.date;
      }

      await onUpdate(id, updateData);
      setEditingId(null);
      setEditFormData({});
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  /**
   * Handle delete with confirmation
   */
  const handleDelete = async (id: string, donorName: string) => {
    if (window.confirm(`Are you sure you want to delete the donation from ${donorName}?`)) {
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Error deleting donation:', error);
      }
    }
  };

  if (donations.length === 0) {
    return (
      <div className="donation-list">
        <h2>Donation List</h2>
        <p className="no-donations">No donations recorded yet. Add your first donation above!</p>
      </div>
    );
  }

  return (
    <div className="donation-list">
      <h2>Donation List ({donations.length} donations)</h2>
      <div className="donations-container">
        {donations.map(donation => (
          <div key={donation.id} className="donation-card">
            {editingId === donation.id ? (
              // Edit mode
              <div className="edit-form">
                <div className="form-row">
                  <label>Donor Name:</label>
                  <input
                    type="text"
                    name="donorName"
                    value={editFormData.donorName || ''}
                    onChange={handleEditInputChange}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="form-row">
                  <label>Type:</label>
                  <select
                    name="donationType"
                    value={editFormData.donationType || ''}
                    onChange={handleEditInputChange}
                    disabled={isLoading}
                  >
                    {Object.values(DonationType).map(type => (
                      <option key={type} value={type}>
                        {getDonationTypeLabel(type)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <label>Quantity:</label>
                  <input
                    type="text"
                    name="quantity"
                    value={editFormData.quantity || ''}
                    onChange={handleEditInputChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="form-row">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    value={editFormData.date || ''}
                    onChange={handleEditInputChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="button-group">
                  <button 
                    onClick={() => saveEdit(donation.id)}
                    className="save-btn"
                    disabled={isLoading}
                  >
                    Save
                  </button>
                  <button 
                    onClick={cancelEditing}
                    className="cancel-btn"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View mode
              <div className="donation-info">
                <h3>{donation.donorName}</h3>
                <div className="donation-details">
                  <p><strong>Type:</strong> {getDonationTypeLabel(donation.donationType)}</p>
                  <p><strong>Quantity:</strong> {donation.quantity}</p>
                  <p><strong>Date:</strong> {formatDate(donation.date)}</p>
                  <p className="timestamps">
                    <small>Added: {formatDate(donation.createdAt)}</small>
                    {donation.updatedAt !== donation.createdAt && (
                      <small> | Updated: {formatDate(donation.updatedAt)}</small>
                    )}
                  </p>
                </div>

                <div className="button-group">
                  <button 
                    onClick={() => startEditing(donation)}
                    className="edit-btn"
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(donation.id, donation.donorName)}
                    className="delete-btn"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationList;