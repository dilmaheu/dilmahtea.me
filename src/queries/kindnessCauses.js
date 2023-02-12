const kindnessCausesQuery = `
  {
    kindnessCauses {
      data {
        id
        attributes {
          locale
          cause
          description
          featured_blob{
            data{
              attributes{
                url
                provider_metadata
                alternativeText
              }
            }
          }
          localizations {
            data {
              attributes {
                locale
                cause
                description
                featured_blob{
                  data{
                    attributes{
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default kindnessCausesQuery;
