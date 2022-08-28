const notificationsQuery = `
  {
    notifications {
      data {
        attributes {
          locale
          Type
          Content
          Closing_Enabled
          localizations {
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
