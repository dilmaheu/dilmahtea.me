const crowdfundingFormQuery = `
  {
    crowdfundingForm {
      data {
        id
        attributes {
          localizations {
            data {
              attributes {
                locale
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
          locale
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
`;

export default crowdfundingFormQuery;
