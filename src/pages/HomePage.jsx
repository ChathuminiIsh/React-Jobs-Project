import React from 'react'
import Hero from '../components/Hero'; 
import HomeCard from '../components/HomeCards';
import JobListnings from '../components/JobListings';
import ViewAllJobs from '../components/ViewAllJobs';

const HomePage = () => {
  return (
    <>
    <Hero />
    <HomeCard />
    <JobListnings isHome={true} />
    <ViewAllJobs />
    </>
  )
}

export default HomePage