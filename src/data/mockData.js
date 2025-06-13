export const mockJobSites = [
  {
    id: 14,
    name: "Rruga Agim Ramadani 17, Gjakove, Kosovo",
    status: "On Road",
    address: "Rruga Agim Ramadani 17, Gjakove, Kosovo"
  },
  {
    id: 3,
    name: "Bulevardi Nena Tereze 25, Prishtina, Kosovo",
    status: "Completed",
    address: "Bulevardi Nena Tereze 25, Prishtina, Kosovo"
  },
  {
    id: 7,
    name: "588 Lenox Rd, Brooklyn, NY 11203, USA",
    status: "On Hold",
    address: "588 Lenox Rd, Brooklyn, NY 11203, USA"
  },
  {
    id: 12,
    name: "Rruga Garibaldi 45, Prishtina, Kosovo",
    status: "On Road",
    address: "Rruga Garibaldi 45, Prishtina, Kosovo"
  },
  {
    id: 1,
    name: "Rruga Deshmoret e Kombit 12, Prishtina, Kosovo",
    status: "Completed",
    address: "Rruga Deshmoret e Kombit 12, Prishtina, Kosovo"
  },
  {
    id: 9,
    name: "Rruga UCK 7, Prizren, Kosovo",
    status: "On Hold",
    address: "Rruga UCK 7, Prizren, Kosovo"
  },
  {
    id: 16,
    name: "Rruga Hajdar Dushi 22, Prizren, Kosovo",
    status: "On Road",
    address: "Rruga Hajdar Dushi 22, Prizren, Kosovo"
  },
  {
    id: 5,
    name: "Rruga Adem Jashari 45, Mitrovice, Kosovo",
    status: "On Hold",
    address: "Rruga Adem Jashari 45, Mitrovice, Kosovo"
  },
  {
    id: 15,
    name: "1234 Broadway, New York, NY 10001, USA",
    status: "On Road",
    address: "1234 Broadway, New York, NY 10001, USA"
  },
  {
    id: 11,
    name: "Rruga Skenderbeu 28, Gjilan, Kosovo",
    status: "On Hold",
    address: "Rruga Skenderbeu 28, Gjilan, Kosovo"
  },
  {
    id: 2,
    name: "1705 E 22nd St, Brooklyn, NY 11229, USA",
    status: "On Hold",
    address: "1705 E 22nd St, Brooklyn, NY 11229, USA"
  },
  {
    id: 8,
    name: "Rruga Rexhep Luci 33, Peja, Kosovo",
    status: "On Hold",
    address: "Rruga Rexhep Luci 33, Peja, Kosovo"
  },
  {
    id: 13,
    name: "Bulevardi George Bush 33, Prishtina, Kosovo",
    status: "On Road",
    address: "Bulevardi George Bush 33, Prishtina, Kosovo"
  },
  {
    id: 10,
    name: "Rruga Ismail Qemali 19, Ferizaj, Kosovo",
    status: "In Progress",
    address: "Rruga Ismail Qemali 19, Ferizaj, Kosovo"
  },
  {
    id: 4,
    name: "Rruga Fehmi Agani 8, Gjakove, Kosovo",
    status: "On Hold",
    address: "Rruga Fehmi Agani 8, Gjakove, Kosovo"
  },
  {
    id: 6,
    name: "Rruga Bill Klinton 14, Prishtina, Kosovo",
    status: "On Hold",
    address: "Rruga Bill Klinton 14, Prishtina, Kosovo"
  }
];

export const mockInventoryData = {
  1: {
    categories: [
      {
        id: 1,
        name: "Sidewalk Shed",
        items: [
          { nr: 1, item: "SP001A", quantity: 25, description: "Heavy-duty steel posts for sidewalk shed construction, galvanized coating for weather resistance", notes: "Requires regular inspection for rust or damage" },
          { nr: 2, item: "WP001B", quantity: 100, description: "Premium wooden planks, pressure-treated lumber for durability", notes: "Store in dry location to prevent warping" },
          { nr: 3, item: "SB001C", quantity: 15, description: "Orange safety barriers with reflective strips for pedestrian protection", notes: "Currently deployed at construction zone" }
        ]
      },
      {
        id: 2,
        name: "Scaffold",
        items: [
          { nr: 4, item: "ST001D", quantity: 50, description: "Standard scaffold tubes, steel construction with coupling compatibility", notes: "Compatible with all standard couplers" },
          { nr: 5, item: "BP001E", quantity: 30, description: "Adjustable base plates for scaffold stability on uneven surfaces", notes: "Check adjustment mechanism before use" },
          { nr: 6, item: "CP001F", quantity: 75, description: "Right-angle couplers for scaffold tube connections", notes: "Inspect for wear before each use" }
        ]
      }
    ]
  },
  2: {
    categories: [
      {
        id: 1,
        name: "Sidewalk Shed",
        items: [
          { nr: 7, item: "SP002A", quantity: 20, description: "Steel posts for sidewalk shed, medium-duty construction", notes: "Suitable for temporary installations" },
          { nr: 8, item: "WP002B", quantity: 80, description: "Wooden planks for sidewalk shed decking", notes: "Regular quality, inspect for splinters" }
        ]
      }
    ]
  },
  3: {
    categories: [
      {
        id: 1,
        name: "Sidewalk Shed",
        items: [
          { nr: 9, item: "SP003A", quantity: 30, description: "Heavy-duty steel posts with extended height capability", notes: "Ideal for high-clearance installations" },
          { nr: 10, item: "WP003B", quantity: 120, description: "Premium grade wooden planks with anti-slip surface", notes: "Enhanced safety features included" },
          { nr: 11, item: "SB003C", quantity: 20, description: "High-visibility safety barriers with warning lights", notes: "Battery-powered LED lights included" }
        ]
      },
      {
        id: 2,
        name: "Scaffold",
        items: [
          { nr: 12, item: "ST003D", quantity: 40, description: "Lightweight aluminum scaffold tubes for easy handling", notes: "25% lighter than steel alternatives" },
          { nr: 13, item: "BP003E", quantity: 25, description: "Heavy-duty base plates for maximum stability", notes: "Rated for high-load applications" }
        ]
      }
    ]
  },
  4: {
    categories: [
      {
        id: 1,
        name: "Sidewalk Shed",
        items: [
          { nr: 14, item: "SP004A", quantity: 18, description: "Steel posts currently in active use at construction site", notes: "Scheduled for maintenance check next week" },
          { nr: 15, item: "WP004B", quantity: 65, description: "Standard wooden planks for general sidewalk shed use", notes: "Good condition, ready for deployment" },
          { nr: 16, item: "SB004C", quantity: 12, description: "Portable safety barriers with quick-deploy mechanism", notes: "Easy setup and removal features" }
        ]
      },
      {
        id: 2,
        name: "Shoring",
        items: [
          { nr: 17, item: "HJ004G", quantity: 8, description: "Hydraulic jacks for structural support and load bearing", notes: "Regular hydraulic fluid checks required" },
          { nr: 18, item: "SB004H", quantity: 15, description: "Structural steel beams for temporary support systems", notes: "Load-tested and certified for safety" }
        ]
      }
    ]
  },
  5: {
    categories: [
      {
        id: 1,
        name: "Scaffold",
        items: [
          { nr: 19, item: "ST005D", quantity: 60, description: "Scaffold tubes currently deployed at active worksite", notes: "Part of main scaffold structure, do not remove" },
          { nr: 20, item: "BP005E", quantity: 35, description: "Adjustable base plates with leveling capability", notes: "Suitable for uneven ground conditions" },
          { nr: 21, item: "CP005F", quantity: 90, description: "Universal couplers for scaffold connections", notes: "Compatible with multiple tube sizes" },
          { nr: 22, item: "PB005I", quantity: 25, description: "Platform boards with anti-slip surface treatment", notes: "Enhanced worker safety features" }
        ]
      }
    ]
  },
  6: {
    categories: [
      {
        id: 1,
        name: "Sidewalk Shed",
        items: [
          { nr: 23, item: "SP006A", quantity: 22, description: "Standard steel posts for sidewalk shed construction", notes: "Regular maintenance schedule up to date" },
          { nr: 24, item: "WP006B", quantity: 85, description: "Wooden planks with weather-resistant coating", notes: "Extended lifespan in outdoor conditions" },
          { nr: 25, item: "SB006C", quantity: 18, description: "Safety barriers currently in use for pedestrian protection", notes: "Deployed at high-traffic area" }
        ]
      },
      {
        id: 2,
        name: "Scaffold",
        items: [
          { nr: 26, item: "ST006D", quantity: 45, description: "Standard scaffold tubes for general construction use", notes: "Regularly inspected and maintained" },
          { nr: 27, item: "CP006F", quantity: 68, description: "Right-angle couplers for scaffold assembly", notes: "High-quality steel construction" }
        ]
      }
    ]
  },
  7: {
    categories: [
      {
        id: 1,
        name: "Sidewalk Shed",
        items: [
          { nr: 28, item: "SP007A", quantity: 28, description: "Steel posts currently undergoing maintenance and inspection", notes: "Expected return to service next week" },
          { nr: 29, item: "WP007B", quantity: 110, description: "High-grade wooden planks for heavy-duty applications", notes: "Suitable for high-load bearing requirements" },
          { nr: 30, item: "SB007C", quantity: 16, description: "Standard safety barriers with reflective markings", notes: "Good visibility in low-light conditions" }
        ]
      },
      {
        id: 2,
        name: "Shoring",
        items: [
          { nr: 31, item: "HJ007G", quantity: 12, description: "Heavy-duty hydraulic jacks for structural support", notes: "Rated for maximum load capacity" },
          { nr: 32, item: "SB007H", quantity: 20, description: "Structural steel beams for temporary shoring systems", notes: "Certified for structural load bearing" },
          { nr: 33, item: "TP007J", quantity: 30, description: "Timber posts for traditional shoring applications", notes: "Sustainable wood source, properly treated" }
        ]
      }
    ]
  },
  8: {
    categories: [
      {
        id: 1,
        name: "Scaffold",
        items: [
          { nr: 34, item: "ST008D", quantity: 38, description: "Standard scaffold tubes for general construction", notes: "Recently cleaned and inspected" },
          { nr: 35, item: "BP008E", quantity: 28, description: "Base plates with adjustable height mechanism", notes: "Perfect for sloped surfaces" },
          { nr: 36, item: "CP008F", quantity: 55, description: "Couplers currently in use at active construction site", notes: "Part of main scaffold system" },
          { nr: 37, item: "PB008I", quantity: 20, description: "Platform boards with integrated safety rails", notes: "Enhanced safety compliance features" }
        ]
      }
    ]
  },
  9: {
    categories: [
      {
        id: 1,
        name: "Sidewalk Shed",
        items: [
          { nr: 38, item: "SP009A", quantity: 15, description: "Compact steel posts for narrow sidewalk applications", notes: "Space-saving design for tight areas" },
          { nr: 39, item: "WP009B", quantity: 70, description: "Wooden planks currently in use for sidewalk decking", notes: "Scheduled for replacement next month" },
          { nr: 40, item: "SB009C", quantity: 10, description: "Lightweight safety barriers for temporary use", notes: "Easy to move and reposition" }
        ]
      },
      {
        id: 2,
        name: "Shoring",
        items: [
          { nr: 41, item: "HJ009G", quantity: 6, description: "Compact hydraulic jacks for limited space applications", notes: "Ideal for tight working conditions" },
          { nr: 42, item: "SB009H", quantity: 18, description: "Medium-duty steel beams for moderate load applications", notes: "Perfect for residential projects" }
        ]
      }
    ]
  },
  10: {
    categories: [
      {
        id: 1,
        name: "Scaffold",
        items: [
          { nr: 43, item: "ST010D", quantity: 55, description: "Scaffold tubes in active use for multi-story project", notes: "Critical structural component, do not disturb" },
          { nr: 44, item: "BP010E", quantity: 32, description: "Base plates supporting main scaffold structure", notes: "Load-bearing foundation elements" },
          { nr: 45, item: "CP010F", quantity: 80, description: "Couplers connecting scaffold tube network", notes: "Essential for structural integrity" },
          { nr: 46, item: "PB010I", quantity: 28, description: "Platform boards providing work surface", notes: "Worker safety platform, inspect daily" }
        ]
      },
      {
        id: 2,
        name: "Sidewalk Shed",
        items: [
          { nr: 47, item: "SP010A", quantity: 26, description: "Steel posts supporting pedestrian protection", notes: "Critical safety infrastructure" },
          { nr: 48, item: "WP010B", quantity: 95, description: "Wooden planks forming protective canopy", notes: "Weather protection for pedestrians" }
        ]
      }
    ]
  },
  11: {
    categories: [
      {
        id: 1,
        name: "Sidewalk Shed",
        items: [
          { nr: 49, item: "SP011A", quantity: 19, description: "Standard steel posts ready for deployment", notes: "Recently serviced and inspected" },
          { nr: 50, item: "WP011B", quantity: 75, description: "Wooden planks with fresh protective coating", notes: "Extended weather resistance applied" },
          { nr: 51, item: "SB011C", quantity: 14, description: "Safety barriers with updated reflective tape", notes: "Enhanced visibility for night work" }
        ]
      }
    ]
  },
  12: {
    categories: [
      {
        id: 1,
        name: "Scaffold",
        items: [
          { nr: 52, item: "ST012D", quantity: 42, description: "Scaffold tubes in use for ongoing construction", notes: "Part of temporary access structure" },
          { nr: 53, item: "BP012E", quantity: 26, description: "Base plates anchoring scaffold system", notes: "Provides stability on concrete surface" },
          { nr: 54, item: "CP012F", quantity: 65, description: "Couplers maintaining scaffold connections", notes: "Regular torque checks performed" },
          { nr: 55, item: "PB012I", quantity: 22, description: "Platform boards available for additional levels", notes: "Ready for scaffold expansion" }
        ]
      },
      {
        id: 2,
        name: "Shoring",
        items: [
          { nr: 56, item: "HJ012G", quantity: 10, description: "Hydraulic jacks for structural support systems", notes: "Regularly tested for pressure integrity" },
          { nr: 57, item: "SB012H", quantity: 16, description: "Steel beams for temporary load distribution", notes: "Engineered for specific load requirements" }
        ]
      }
    ]
  },
  13: {
    categories: [
      {
        id: 1,
        name: "Sidewalk Shed",
        items: [
          { nr: 58, item: "SP013A", quantity: 24, description: "Steel posts actively supporting sidewalk protection", notes: "High-traffic area installation" },
          { nr: 59, item: "WP013B", quantity: 90, description: "Wooden planks forming protective overhead canopy", notes: "Shields pedestrians from construction debris" },
          { nr: 60, item: "SB013C", quantity: 17, description: "Safety barriers channeling pedestrian traffic", notes: "Maintains safe walking path" }
        ]
      },
      {
        id: 2,
        name: "Scaffold",
        items: [
          { nr: 61, item: "ST013D", quantity: 48, description: "Scaffold tubes stored and ready for next project", notes: "Clean and properly tagged for inventory" },
          { nr: 62, item: "BP013E", quantity: 30, description: "Base plates with leveling adjustment capability", notes: "Suitable for various surface conditions" }
        ]
      }
    ]
  },
  14: {
    categories: [
      {
        id: 1,
        name: "Sidewalk Shed",
        items: [
          { nr: 63, item: "SP014A", quantity: 21, description: "Steel posts in use for sidewalk protection system", notes: "Protecting busy commercial area" },
          { nr: 64, item: "WP014B", quantity: 88, description: "Wooden planks providing overhead pedestrian protection", notes: "Regular inspection for weathering" },
          { nr: 65, item: "SB014C", quantity: 13, description: "Safety barriers available for additional protection", notes: "Can be deployed for special events" }
        ]
      },
      {
        id: 2,
        name: "Shoring",
        items: [
          { nr: 66, item: "HJ014G", quantity: 9, description: "Hydraulic jacks for emergency structural support", notes: "Kept ready for urgent stabilization needs" },
          { nr: 67, item: "SB014H", quantity: 17, description: "Steel beams for heavy-duty shoring applications", notes: "Rated for maximum structural loads" },
          { nr: 68, item: "TP014J", quantity: 25, description: "Timber posts for traditional construction methods", notes: "Sustainable and cost-effective option" }
        ]
      }
    ]
  },
  15: {
    categories: [
      {
        id: 1,
        name: "Scaffold",
        items: [
          { nr: 69, item: "ST015D", quantity: 52, description: "Scaffold tubes supporting multi-level work platform", notes: "Critical infrastructure for high-rise work" },
          { nr: 70, item: "BP015E", quantity: 34, description: "Base plates providing foundation for scaffold system", notes: "Distributes load across building surface" },
          { nr: 71, item: "CP015F", quantity: 78, description: "Couplers connecting extensive scaffold network", notes: "Regular inspection for connection integrity" },
          { nr: 72, item: "PB015I", quantity: 26, description: "Platform boards ready for scaffold expansion", notes: "Additional work surfaces available" }
        ]
      },
      {
        id: 2,
        name: "Sidewalk Shed",
        items: [
          { nr: 73, item: "SP015A", quantity: 27, description: "Steel posts in storage, ready for deployment", notes: "Maintained in excellent condition" },
          { nr: 74, item: "WP015B", quantity: 105, description: "Wooden planks with premium finish", notes: "High-quality materials for important projects" }
        ]
      }
    ]
  },
  16: {
    categories: [
      {
        id: 1,
        name: "Sidewalk Shed",
        items: [
          { nr: 75, item: "SP016A", quantity: 23, description: "Steel posts supporting pedestrian walkway protection", notes: "Ensures safe passage during construction" },
          { nr: 76, item: "WP016B", quantity: 92, description: "Wooden planks forming protective canopy structure", notes: "Weather and debris protection system" },
          { nr: 77, item: "SB016C", quantity: 16, description: "Safety barriers directing pedestrian flow", notes: "Maintains organized traffic patterns" }
        ]
      },
      {
        id: 2,
        name: "Scaffold",
        items: [
          { nr: 78, item: "ST016D", quantity: 46, description: "Scaffold tubes available for new construction projects", notes: "Inspected and ready for immediate use" },
          { nr: 79, item: "BP016E", quantity: 29, description: "Base plates with advanced adjustment mechanisms", notes: "Precision leveling for critical applications" },
          { nr: 80, item: "CP016F", quantity: 72, description: "High-strength couplers for demanding applications", notes: "Enhanced load capacity and durability" }
        ]
      }
    ]
  }
};

export const statusOptions = [
  { value: "Completed", label: "Completed", color: "#7ac14d", selected:false },
  { value: "On Hold", label: "On Hold", color: "#eb4345", selected:false },
  { value: "In Progress", label: "In Progress", color: "#b3d99b", selected:false },
  { value: "On Road", label: "On Road", color: "#ecde7c", selected:false }
];

export const inventoryStatusOptions = [
  { value: "Available", label: "Available", color: "green" },
  { value: "In Use", label: "In Use", color: "blue" },
  { value: "Maintenance", label: "Maintenance", color: "orange" },
  { value: "Out of Stock", label: "Out of Stock", color: "red" }
]; 

export const categoriesOptions = [
  { value: "Sidewalk Shed", label: "Sidewalk Shed", color: "#67aa3c", selected: false },
  { value: "Scaffold", label: "Scaffold", color: "#efd652", selected: false },
  { value: "Shoring", label: "Shoring", color: "#9640be", selected: false }
];