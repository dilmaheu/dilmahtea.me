const userAccountQuery = `
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
                formats
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
                  formats
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
          localizations {
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
                      formats
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

export default userAccountQuery;