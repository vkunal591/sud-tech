export const userPermissions = [
  {
    module: "Dashboard",
    access: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  {
    module: "Manage Ledger",
    access: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  {
    module: "Manage Notifications",
    access: {
      read: true,
      delete: true,
      custome: true,
      print: true,
      updateStatus: true,
    },
  },
  {
    module: "Manage Invoice",
    access: {
      read: true,
      update: true,
      create: true,
      print: true,
      updateStatus:true,
      delete: true,
    },
  },
  {
    module: "Manage Invoice",
    access: {
      read: true,
      update: true,
      create: true,
      invoice: true,
      delete: true,
      print:true
    },
  },
  {
    module: "Manage Yards",
    access: {
      read: true,
      update: true,
      create: true,
      invoice: true,
      delete: true,
    },
  },
  {
    module: "Manage Invoice",
    access: {
      read: true,
      update: true,
      delete: true,
      view: true,
      // updateStatus: true,
      print: true,
    },
  },
  {
    module: "Manage Orders",
    access: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
  },
];
