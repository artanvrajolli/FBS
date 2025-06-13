import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import JobSitesPage from './pages/JobSitesPage';
import InventoryPage from './pages/InventoryPage';
import { mockJobSites, mockInventoryData } from './data/mockData';
import './App.css';
import { TestPage } from './pages/TestPage';

function App() {
  const [jobSites, setJobSites] = useState(mockJobSites);
  const [inventoryData, setInventoryData] = useState(mockInventoryData);

  const addJobSite = (newJobSite) => {
    const id = Math.max(...jobSites.map(site => site.id)) + 1;
    const siteWithId = { ...newJobSite, id };
    setJobSites([siteWithId,...jobSites]);
    setInventoryData(prev => ({
      ...prev,
      [id]: { categories: [] }
    }));
  };

  const updateJobSite = (updatedJobSite) => {
    setJobSites(jobSites.map(site =>
      site.id === updatedJobSite.id ? updatedJobSite : site
    ));
  };

  const updateInventory = (jobSiteId, updatedInventory) => {
    setInventoryData(prev => ({
      ...prev,
      [jobSiteId]: updatedInventory
    }));
  };

  return (
    <Router>
      <div className="app">
        
        <Routes>
          <Route
            path="/"
            element={
              <JobSitesPage
                jobSites={jobSites}
                onAddJobSite={addJobSite}
                onUpdateJobSite={updateJobSite}
              />
            }
          />
          <Route
            path="/test"
            element={<TestPage />}
          />
          <Route
            path="/inventory/:jobSiteId"
            element={
              <InventoryPage
                jobSites={jobSites}
                inventoryData={inventoryData}
                onUpdateInventory={updateInventory}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
