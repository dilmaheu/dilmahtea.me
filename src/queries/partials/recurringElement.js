const recurringElementQuery = `
  {
    recurringElement {
      data {
        id
        attributes {
          locale
          Footer_text
          Company_name
          Company_address
          Company_email
          OpenGraph_default {
            data {
              attributes {
                name
                url
                provider_metadata
                alternativeText
              }
            }
          }
          text_chapter
          text_practices_to_follow
          text_practices
          text_explore_the_world_of_kindness
          localizations {
            data {
              attributes {
                locale
                Footer_text
                Company_name
                Company_address
                Company_email
                OpenGraph_default {
                  data {
                    attributes {
                      name
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                text_chapter
                text_practices_to_follow
                text_practices
                text_explore_the_world_of_kindness
              }
            }
          }
        }
      }
    }
  }
`;

export default recurringElementQuery;
