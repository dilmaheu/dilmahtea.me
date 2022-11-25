const checkoutSuccessQuery = `
  {
    checkoutSuccess {
      data {
        id        
        attributes {
          locale          
          Title
          Intro_text
          linked_post_text
          text_here_is_how          
          Meta {
            HTML_Title
            Meta_description
            noindex
            nofollow
            URL_slug
            Canonical_link
          }
          localizations {
            data {
              attributes {
                locale
                updatedAt
                Title
                Intro_text  
                linked_post_text
                text_here_is_how                  
                Meta {
                  HTML_Title
                  Meta_description
                  noindex
                  nofollow
                  URL_slug
                  Canonical_link
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default checkoutSuccessQuery;
