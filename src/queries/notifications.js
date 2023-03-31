const notificationsQuery = `
  {
    notifications {
      data {
        attributes {
          locale
          Type
          Content
          Closing_Enabled
          localizations(filters: { publishedAt: { ne: null } }) {
            data {
              attributes {
                locale
                Content
              }
            }
          }
        }
      }
    }
  }
`;

export default notificationsQuery;
