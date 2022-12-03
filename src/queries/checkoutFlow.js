const checkoutShippingQuery = `
  {
    checkoutFlow {
      data {
        id
        attributes {
          locale
          updatedAt
          steps
          shortened_steps
          localizations {
            data {
              attributes {
                locale
                updatedAt
                steps
                shortened_steps
              }
            }
          }
        }
      }
    }
  }
`;

export default checkoutShippingQuery;
