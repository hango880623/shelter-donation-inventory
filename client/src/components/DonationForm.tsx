import React, { useState } from 'react';
import { DonationType, DonationFormData, CreateDonationRequest } from '../types/donation';

/**
 * Props interface for the DonationForm component
 */
interface DonationFormProps {
  onSubmit: (donation: CreateDonationRequest) => Promise<void>;
  isLoading?: boolean;
}

/**
 * DonationForm component
 * Provides a form for users to input donation details
 */
const DonationForm: React.FC<DonationFormProps> = ({ onSubmit, isLoading = false }) => {
  // Form state
  const [formData, setFormData] = useState<DonationFormData>({
    donorName: '',
    donationType: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
  });

  // Form validation errors
  const [errors, setErrors] = useState<Partial<Record<keyof DonationFormData, string>>>({});

  /**
   * Handle input changes
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof DonationFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof DonationFormData, string>> = {};

    if (!formData.donorName.trim()) {
      newErrors.donorName = 'Donor name is required';
    }

    if (!formData.donationType) {
      newErrors.donationType = 'Donation type is required';
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({
        donorName: formData.donorName.trim(),
        donationType: formData.donationType as DonationType,
        quantity: formData.quantity.trim(),
        date: formData.date,
      });

      // Reset form on successful submission
      setFormData({
        donorName: '',
        donationType: '',
        quantity: '',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

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

  return (
    <div className="donation-form">
      <h2>Add New Donation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="donorName">Donor Name *</label>
          <input
            type="text"
            id="donorName"
            name="donorName"
            value={formData.donorName}
            onChange={handleInputChange}
            placeholder="Enter donor's name"
            disabled={isLoading}
          />
          {errors.donorName && <span className="error">{errors.donorName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="donationType">Donation Type *</label>
          <select
            id="donationType"
            name="donationType"
            value={formData.donationType}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">Select donation type</option>
            {Object.values(DonationType).map(type => (
              <option key={type} value={type}>
                {getDonationTypeLabel(type)}
              </option>
            ))}
          </select>
          {errors.donationType && <span className="error">{errors.donationType}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity/Amount *</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="e.g., $100, 5 bags, 10 pieces"
            disabled={isLoading}
          />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Adding Donation...' : 'Add Donation'}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;