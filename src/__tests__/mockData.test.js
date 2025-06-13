import { describe, it, expect } from 'vitest';
import { mockJobSites, mockInventoryData } from '../data/mockData';

describe('Mock Data Validation', () => {
  describe('Job Sites Data', () => {
    it('should be an array with at least one job site', () => {
      expect(Array.isArray(mockJobSites)).toBe(true);
      expect(mockJobSites.length).toBeGreaterThan(0);
    });

    it('should have valid job site structure', () => {
      mockJobSites.forEach(jobSite => {
        expect(jobSite).toHaveProperty('id');
        expect(jobSite).toHaveProperty('name');
        expect(jobSite).toHaveProperty('status');
        expect(jobSite).toHaveProperty('address');
        
        expect(typeof jobSite.id).toBe('number');
        expect(typeof jobSite.name).toBe('string');
        expect(typeof jobSite.status).toBe('string');
        expect(typeof jobSite.address).toBe('string');
      });
    });

    it('should have valid status values', () => {
      const validStatuses = ['On Road', 'Completed', 'On Hold', 'In Progress'];
      
      mockJobSites.forEach(jobSite => {
        expect(validStatuses).toContain(jobSite.status);
      });
    });

    it('should have unique job site IDs', () => {
      const ids = mockJobSites.map(site => site.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have non-empty names and addresses', () => {
      mockJobSites.forEach(jobSite => {
        expect(jobSite.name.trim()).not.toBe('');
        expect(jobSite.address.trim()).not.toBe('');
      });
    });
  });

  describe('Inventory Data', () => {
    it('should be an object with numeric keys', () => {
      expect(typeof mockInventoryData).toBe('object');
      expect(mockInventoryData).not.toBeNull();
      
      Object.keys(mockInventoryData).forEach(key => {
        expect(!isNaN(parseInt(key))).toBe(true);
      });
    });

    it('should have valid inventory structure for each job site', () => {
      Object.values(mockInventoryData).forEach(inventory => {
        expect(inventory).toHaveProperty('categories');
        expect(Array.isArray(inventory.categories)).toBe(true);
        
        inventory.categories.forEach(category => {
          expect(category).toHaveProperty('id');
          expect(category).toHaveProperty('name');
          expect(category).toHaveProperty('items');
          
          expect(typeof category.id).toBe('number');
          expect(typeof category.name).toBe('string');
          expect(Array.isArray(category.items)).toBe(true);
        });
      });
    });

    it('should have valid item structure', () => {
      Object.values(mockInventoryData).forEach(inventory => {
        inventory.categories.forEach(category => {
          category.items.forEach(item => {
            expect(item).toHaveProperty('nr');
            expect(item).toHaveProperty('item');
            expect(item).toHaveProperty('quantity');
            expect(item).toHaveProperty('description');
            expect(item).toHaveProperty('notes');
            
            expect(typeof item.nr).toBe('number');
            expect(typeof item.item).toBe('string');
            expect(typeof item.quantity).toBe('number');
            expect(typeof item.description).toBe('string');
            expect(typeof item.notes).toBe('string');
            expect(item.quantity).toBeGreaterThanOrEqual(0);
          });
        });
      });
    });

    it('should have valid category names', () => {
      const validCategories = ['Sidewalk Shed', 'Scaffold', 'Shoring'];
      
      Object.values(mockInventoryData).forEach(inventory => {
        inventory.categories.forEach(category => {
          expect(validCategories).toContain(category.name);
        });
      });
    });

    it('should have matching job site IDs between job sites and inventory', () => {
      const jobSiteIds = mockJobSites.map(site => site.id);
      const inventoryJobSiteIds = Object.keys(mockInventoryData).map(id => parseInt(id));
      
      inventoryJobSiteIds.forEach(id => {
        expect(jobSiteIds).toContain(id);
      });
    });
  });
}); 