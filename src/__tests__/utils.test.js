import { describe, it, expect } from 'vitest';

const statusUtils = {
  getStatusClassName: (status) => {
    return status.toLowerCase().replace(' ', '-');
  },
  
  isValidStatus: (status) => {
    const validStatuses = ['On Road', 'Completed', 'On Hold', 'In Progress'];
    return validStatuses.includes(status);
  },
  
  getStatusColor: (status) => {
    const statusColors = {
      'On Road': '#ff9500',
      'Completed': '#34c759',
      'On Hold': '#ff3b30',
      'In Progress': '#007aff'
    };
    return statusColors[status] || '#666';
  }
};

const textUtils = {
  truncateText: (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  },
  
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return '';
    return input.trim().replace(/[<>]/g, '');
  }
};

const arrayUtils = {
  getUniqueIds: (array) => {
    return [...new Set(array.map(item => item.id))];
  },
  
  findById: (array, id) => {
    return array.find(item => item.id === id);
  },
  
  groupByStatus: (jobSites) => {
    return jobSites.reduce((acc, site) => {
      const status = site.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(site);
      return acc;
    }, {});
  }
};

describe('Utility Functions', () => {
  describe('Status Utils', () => {
    it('converts status to valid CSS class name', () => {
      expect(statusUtils.getStatusClassName('On Road')).toBe('on-road');
      expect(statusUtils.getStatusClassName('In Progress')).toBe('in-progress');
      expect(statusUtils.getStatusClassName('Completed')).toBe('completed');
    });

    it('validates status values correctly', () => {
      expect(statusUtils.isValidStatus('On Road')).toBe(true);
      expect(statusUtils.isValidStatus('Completed')).toBe(true);
      expect(statusUtils.isValidStatus('Invalid Status')).toBe(false);
      expect(statusUtils.isValidStatus('')).toBe(false);
    });

    it('returns correct colors for status values', () => {
      expect(statusUtils.getStatusColor('On Road')).toBe('#ff9500');
      expect(statusUtils.getStatusColor('Completed')).toBe('#34c759');
      expect(statusUtils.getStatusColor('Unknown')).toBe('#666');
    });
  });

  describe('Text Utils', () => {
    it('truncates long text correctly', () => {
      const longText = 'This is a very long text that should be truncated because it exceeds the maximum length';
      const truncated = textUtils.truncateText(longText, 30);
      
      expect(truncated).toBe('This is a very long text that ...');
      expect(truncated.length).toBe(33);
    });

    it('returns original text if within limit', () => {
      const shortText = 'Short text';
      expect(textUtils.truncateText(shortText, 50)).toBe('Short text');
    });

    it('handles empty or null text', () => {
      expect(textUtils.truncateText('')).toBe('');
      expect(textUtils.truncateText(null)).toBe('');
      expect(textUtils.truncateText(undefined)).toBe('');
    });

    it('sanitizes input by removing HTML tags and trimming', () => {
      expect(textUtils.sanitizeInput('  <script>alert("xss")</script>  ')).toBe('scriptalert("xss")/script');
      expect(textUtils.sanitizeInput('<div>Hello World</div>')).toBe('divHello World/div');
      expect(textUtils.sanitizeInput('  Normal text  ')).toBe('Normal text');
    });

    it('handles non-string input gracefully', () => {
      expect(textUtils.sanitizeInput(123)).toBe('');
      expect(textUtils.sanitizeInput(null)).toBe('');
      expect(textUtils.sanitizeInput(undefined)).toBe('');
    });
  });

  describe('Array Utils', () => {
    const sampleJobSites = [
      { id: 1, name: 'Site 1', status: 'On Road' },
      { id: 2, name: 'Site 2', status: 'Completed' },
      { id: 3, name: 'Site 3', status: 'On Road' },
      { id: 1, name: 'Duplicate', status: 'On Hold' }
    ];

    it('extracts unique IDs from array', () => {
      const uniqueIds = arrayUtils.getUniqueIds(sampleJobSites);
      expect(uniqueIds).toEqual([1, 2, 3]);
      expect(uniqueIds.length).toBe(3);
    });

    it('finds item by ID', () => {
      const found = arrayUtils.findById(sampleJobSites, 2);
      expect(found).toEqual({ id: 2, name: 'Site 2', status: 'Completed' });
      
      const notFound = arrayUtils.findById(sampleJobSites, 999);
      expect(notFound).toBeUndefined();
    });

    it('groups job sites by status', () => {
      const grouped = arrayUtils.groupByStatus(sampleJobSites);
      
      expect(grouped['On Road']).toHaveLength(2);
      expect(grouped['Completed']).toHaveLength(1);
      expect(grouped['On Hold']).toHaveLength(1);
      
      expect(grouped['On Road'][0].name).toBe('Site 1');
      expect(grouped['Completed'][0].name).toBe('Site 2');
    });

    it('handles empty array gracefully', () => {
      expect(arrayUtils.getUniqueIds([])).toEqual([]);
      expect(arrayUtils.findById([], 1)).toBeUndefined();
      expect(arrayUtils.groupByStatus([])).toEqual({});
    });
  });
}); 