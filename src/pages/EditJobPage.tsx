import React, { useState } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { Job } from '../App';

interface EditJobPageProps {
  updateJobSubmit: (job: Job) => Promise<void>;
}

const EditJobPage: React.FC<EditJobPageProps> = ({ updateJobSubmit }) => {
  const job = useLoaderData() as Job;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<Job>(job);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateJobSubmit(formData);
    navigate(`/jobs/${id}`);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Job Title:
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Company Name:
        <input
          type="text"
          name="company.name"
          value={formData.company.name || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Job Description:
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Job Location:
        <input
          type="text"
          name="location"
          value={formData.location || ''}
          onChange={handleChange}
        />
      </label>

     

      <button type="submit">Update Job</button>
    </form>
  );
};

export default EditJobPage;
