import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';




export interface Job {
  id?: string; 
  title: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
  location: string;
  description: string;
  salary: string;
  type: string;
}


const addJob = async (newJob: Job): Promise<void> => {
  await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newJob),
  });
};

const deleteJob = async (id: string): Promise<void> => {
  await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
};

const updateJob = async (job: Job): Promise<void> => {
  await fetch(`/api/jobs/${job.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
};


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/add-job" element={<AddJobPage AddJobSubmit={addJob} />} />
      <Route
        path="/edit-job/:id"
        element={<EditJobPage updateJobSubmit={updateJob} />}
        loader={jobLoader} 
      />
      <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App: React.FC = () => <RouterProvider router={router} />;
export default App;
