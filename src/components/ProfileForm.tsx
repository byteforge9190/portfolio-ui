// src/components/ProfileForm.tsx
// Why: Form component for creating and editing profile information

import React, { useState } from 'react';
import { profileAPI, handleAPIError } from '../api/services';
import type { CreateProfileRequest, Profile, ApiError } from '../types';
import heic2any from "heic2any";
import { toast } from 'react-toastify';
import { FaUser, FaSave, FaTimes } from 'react-icons/fa';

interface ProfileFormProps {
  existingProfile?: Profile;
  onSuccess: () => void;
  onCancel?: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ existingProfile, onSuccess, onCancel }) => {
  const [errors, setErrors] = useState<Partial<CreateProfileRequest>>({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateProfileRequest>({
    fullName: existingProfile?.fullName || '',
    title: existingProfile?.title || '',
    summary: existingProfile?.summary || '',
    bio: existingProfile?.bio || '',
    location: existingProfile?.location || '',
    phone: existingProfile?.phone || '',
    email: existingProfile?.email || '',
    website: existingProfile?.website || '',
    linkedinUrl: existingProfile?.linkedinUrl || '',
    githubUrl: existingProfile?.githubUrl || '',
    profileImageUrl: existingProfile?.profileImageUrl || '',
    resumeUrl: existingProfile?.resumeUrl || '',
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(existingProfile?.profileImageUrl || null);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateProfileRequest> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate URLs if provided
    const urlFields: (keyof CreateProfileRequest)[] = ['website', 'linkedinUrl', 'githubUrl', 'resumeUrl']; // profileImageUrl removed from here
    urlFields.forEach(field => {
      const value = formData[field] as string;
      if (value && value.trim() && !value.match(/^https?:\/\/.+/)) {
        newErrors[field] = 'Please enter a valid URL (starting with http:// or https://)';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let finalProfileImageUrl = formData.profileImageUrl; // Start with existing URL or empty

      if (selectedImage) {
        // Upload image to Cloudinary
        const uploadResponse = await profileAPI.uploadImage(selectedImage);
        finalProfileImageUrl = uploadResponse.url; // Get the URL from the upload response
      }

      const cleanedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          typeof value === 'string' ? value.trim() : value
        ])
      ) as CreateProfileRequest;

      // Update formData with the new image URL before submitting the profile
      cleanedData.profileImageUrl = finalProfileImageUrl;

      if (existingProfile) {
        await profileAPI.update(cleanedData);
        toast.success('Profile updated successfully!');
      } else {
        await profileAPI.create(cleanedData);
        toast.success('Profile created successfully!');
      }

      onSuccess();
    } catch (error: unknown) {
      const errorMessage = handleAPIError(error as ApiError);
      toast.error(`Failed to ${existingProfile ? 'update' : 'create'} profile: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateProfileRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'image/heic') {
      try {
        const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg' });
        const jpegFile = new File([Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob], 'converted.jpg', { type: 'image/jpeg' });
        setSelectedImage(jpegFile);
        setImagePreview(URL.createObjectURL(jpegFile));
      } catch  {
        toast.error("Failed to convert HEIC image. Please try another image.");
      }
    } else {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
    // Clear any previous URL validation error for this field
    if (errors.profileImageUrl) {
      setErrors(prev => ({ ...prev, profileImageUrl: undefined }));
    }
  };

  const renderInput = (
    field: keyof CreateProfileRequest,
    label: string,
    errors: Partial<CreateProfileRequest>,
    type: string = 'text',
    required: boolean = false,
    placeholder?: string
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={formData[field] as string}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
          errors[field] ? 'border-red-500' : 'border-gray-600'
        } text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors`}
        disabled={loading}
      />
      {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
    </div>
  );

  const renderTextarea = (
    field: keyof CreateProfileRequest,
    label: string,
    errors: Partial<CreateProfileRequest>,
    required: boolean = false,
    placeholder?: string,
    rows: number = 4
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        value={formData[field] as string}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
          errors[field] ? 'border-red-500' : 'border-gray-600'
        } text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors resize-vertical`}
        disabled={loading}
      />
      {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
    </div>
  );

  const renderFileInput = (
    field: keyof CreateProfileRequest,
    label: string,
    accept: string,
    currentPreview: string | null,
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errors: Partial<CreateProfileRequest>
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className={`w-full text-white bg-gray-700 border ${errors[field] ? 'border-red-500' : 'border-gray-600'} rounded-lg p-2 focus:outline-none focus:border-teal-500 transition-colors`}
        disabled={loading}
      />
      {currentPreview && (
        <div className="mt-3">
          {field === 'profileImageUrl' ? (
            <img src={currentPreview} alt="Preview" className="w-24 h-24 object-cover rounded-full border border-gray-600" />
          ) : (
            <a href={currentPreview} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
              View Current File
            </a>
          )}
        </div>
      )}
      {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center mb-6">
        <FaUser className="text-teal-400 text-2xl mr-3" />
        <h3 className="text-2xl font-bold text-teal-300">
          {existingProfile ? 'Edit Profile' : 'Create Profile'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput('fullName', 'Full Name', errors, 'text', true, 'John Doe')}
          {renderInput('title', 'Professional Title', errors, 'text', true, 'Software Developer')}
        </div>

        {renderTextarea('summary', 'Professional Summary', errors, true, 'Brief professional summary...', 3)}

        {/* Contact Information */}
        <div className="border-t border-gray-700 pt-6">
          <h4 className="text-lg font-semibold text-gray-300 mb-4">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput('email', 'Email', errors, 'email', true, 'john@example.com')}
            {renderInput('phone', 'Phone Number', errors, 'tel', false, '+1 (555) 123-4567')}
            {renderInput('location', 'Location', errors, 'text', false, 'New York, NY')}
            {renderInput('website', 'Personal Website', errors, 'url', false, 'https://johndoe.com')}
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 pt-6">
          <h4 className="text-lg font-semibold text-gray-300 mb-4">Social Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput('linkedinUrl', 'LinkedIn URL', errors, 'url', false, 'https://linkedin.com/in/johndoe')}
            {renderInput('githubUrl', 'GitHub URL', errors, 'url', false, 'https://github.com/johndoe')}
          </div>
        </div>

        {/* Media URLs */}
        <div className="border-t border-gray-700 pt-6">
          <h4 className="text-lg font-semibold text-gray-300 mb-4">Media & Documents</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderFileInput(
              'profileImageUrl',
              'Profile Image',
              'image/png, image/jpeg',
              imagePreview,
              handleImageChange,
              errors
            )}
            {renderInput('resumeUrl', 'Resume URL', errors, 'url', false, 'https://example.com/resume.pdf')}
          </div>
        </div>

        {/* Bio */}
        <div className="border-t border-gray-700 pt-6">
          {renderTextarea('bio', 'About Me / Bio', errors, false, 'Tell your story, background, interests...', 6)}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
              disabled={loading}
            >
              <FaTimes />
              <span>Cancel</span>
            </button>
          )}
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            <FaSave />
            <span>{loading ? 'Saving...' : existingProfile ? 'Update Profile' : 'Create Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
