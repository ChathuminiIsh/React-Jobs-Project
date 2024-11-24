import React, { useState } from 'react';
import { Job } from '../App';

interface AddJobPageProps {
  AddJobSubmit: (newJob: Job) => Promise<void>;
}

const AddJobPage: React.FC<AddJobPageProps> = ({ AddJobSubmit }) => {
  const [formData, setFormData] = useState<Job>({
    title: '',
    company: {
      name: '',
      description: '',
      contactEmail: '',
      contactPhone: '',
    },
    location: '',
    description: '',
    salary: '',
    type: 'Full-Time', 
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('company.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await AddJobSubmit(formData);
    setFormData({
      title: '',
      company: { name: '', description: '', contactEmail: '', contactPhone: '' },
      location: '',
      description: '',
      salary: '',
      type: 'Full-Time',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required />
      <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required />
      <input name="company.name" value={formData.company.name} onChange={handleChange} placeholder="Company Name" required />
      <input name="company.contactEmail" value={formData.company.contactEmail} onChange={handleChange} placeholder="Contact Email" required />
      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJobPage;
