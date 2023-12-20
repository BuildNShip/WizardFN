export const buttons = [
  {
    url: "/dashboard/profile",
    title: "Profile",
    icon: "fi fi-sr-clipboard-user",
  },
  {
    url: "/dashboard/connect-discord",
    title: "Connect Discord",
    icon: "fi fi-sr-data-transfer",
  },

  {
    url: "/dashboard/campus-details",
    title: "Campus Details",
    icon: "fi fi-sr-book-arrow-right",
  },
  {
    url: "/dashboard/hackathon",
    title: "Hackathon",
    icon: "fi fi-sr-head-side-thinking",
  },
  {
    url: "/dashboard/learning-circle",
    title: "Learning Circle",
    icon: "fi fi-sr-books",
  },
  {
    url: "/dashboard/refer",
    title: "Referrals",
    icon: "fi fi-sr-building",
  },
  {
    url: "",
    title: "Management",
    icon: "fi fi-sr-layout-fluid",
    children: [
      {
        url: "",
        title: "User Management",
        children: [
          {
            url: "/dashboard/manage-users",
            title: "Manage Users",
          },
          {
            url: "/dashboard/user-role-verification",
            title: "User Role Verification",
          },
        ],
      },
      {
        url: "",
        title: "Manage Organization",
        children: [
          {
            url: "/dashboard/affiliation",
            title: "Affiliation",
          },
          {
            url: "/dashboard/organization-transfer",
            title: "Organization Transfer",
          },
          {
            url: "/dashboard/manage-departments",
            title: "Departments",
            // icon: fi fi-sr-users-gear
          },
          {
            url: "/dashboard/organizations",
            title: "Organizations",
            // icon: fi fi-sr-building
          },
        ],
      },
      {
        url: "",
        title: "Task Management",
        // icon: fi fi-sr-users,
        children: [
          {
            url: "/dashboard/tasks",
            title: "Tasks",
          },
          {
            url: "/dashboard/task-type",
            title: "Task Type",
          },
          {
            url: "/dashboard/events",
            title: "Events",
          },
        ],
      },
      {
        url: "/dashboard/interest-groups",
        title: "Interest Groups",
        // icon: fi fi-sr-books
      },

      {
        url: "/dashboard/college-levels",
        title: "College Levels",
        // icon: fi fi-sr-building
      },

      {
        url: "/dashboard/karma-voucher",
        title: "Karma Voucher",
        // icon: fi fi-sr-note
      },
      {
        url: "/dashboard/error-log",
        title: "Error Log",
        // icon: fi fi-sr-note
      },

      {
        url: "/dashboard/dynamic-type",
        title: "Dynamic Type",
        // icon: fi fi-sr-users-gear
      },
      {
        url: "/dashboard/manage-roles",
        title: "Manage Roles",
        // icon: fi fi-sr-users-gear
      },

      {
        url: "/dashboard/manage-locations",
        title: "Manage Locations",
        icon: "fi fi-ss-map-marker",
      },
      {
        url: "/dashboard/channels",
        title: "Channels",
      },

      {
        url: "/dashboard/url-shortener",
        title: "URL Shortener",
        // icon: fi fi-sr-globe
      },

      {
        url: "/dashboard/discord-moderation",
        title: "Discord Moderation",
        // icon: fi fi-sr-users-gear
      },
    ],
  },
  {
    url: "/dashboard/zonal-dashboard",
    title: "Zonal Dashboard",
    icon: "fi fi-sr-marker",
  },
  {
    url: "/dashboard/district-dashboard",
    title: "District Dashbaord",
    icon: "fi fi-sr-map-marker",
  },
];
