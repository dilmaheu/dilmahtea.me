const crowdfundingFormQuery = `
  {
    crowdfundingForm {
      data {
        id
        attributes {
          locale
          updatedAt
          Title
          Intro_text
          Meta {
            URL_slug
            HTML_Title
            Meta_description
            noindex
            nofollow
          }
          localizations {
            data {
              attributes {
                locale
                updatedAt
                Title
                Intro_text
                Meta {
                  URL_slug
                  HTML_Title
                  Meta_description
                  noindex
                  nofollow
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default crowdfundingFormQuery;
