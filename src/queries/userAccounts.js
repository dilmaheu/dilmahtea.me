const userAccountsQuery = `
  {
    userAccounts {
      data {
        id
        attributes {
          locale
          Title
          Intro_text
          Intro_blob {
            data {
              attributes {
                url
                provider_metadata
                alternativeText
              }
            }
          }
          Form{
            Email_or_phone
            First_name
            Last_name
            Email
            Phone
            Submit_button_text
            Blob{
              data {
                attributes {
                  url
                  provider_metadata
                  alternativeText
                }
              }
            }
          }
          Block_text
          Social_media{
            Facebook
            Google
            Twitter
          }
          Button_pretext
          Button_text
          Meta {
            HTML_Title
            Meta_description
            noindex
            nofollow
            URL_slug
            Canonical_link
          }
          localizations(filters: { publishedAt: { ne: null } }) {
            data {
              attributes {
                locale
                Title
                Intro_text
                Intro_blob {
                  data {
                    attributes {
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                Form{
                  Email_or_phone
                  First_name
                  Last_name
                  Email
                  Phone
                  Submit_button_text
                  Blob{
                    data {
                      attributes {
                        url
                        provider_metadata
                        alternativeText
                      }
                    }
                  }
                }
                Block_text
                Social_media{
                  Facebook
                  Google
                  Twitter
                }
                Button_pretext
                Button_text
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

export default userAccountsQuery;
