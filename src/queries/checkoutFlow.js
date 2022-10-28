const checkoutShippingQuery = `
  {
    checkoutFlow {
      data {
        id
        attributes {
          locale
          steps
          shortened_steps
          localizations {
            data {
              attributes {
                locale
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
