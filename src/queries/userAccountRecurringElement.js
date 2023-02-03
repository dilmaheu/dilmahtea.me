const userAccountRecurringElementQuery = `
  {
    userAccountRecurringElement {
      data {
        id
        attributes {
          locale
          Facebook_icon{
            data{
              attributes{
                url
                provider_metadata
                formats
                alternativeText
              }
            }
          }
          Google_icon{
            data{
              attributes{
                url
                provider_metadata
                formats
                alternativeText
              }
            }
          }
          Twitter_icon{
            data{
              attributes{
                url
                provider_metadata
                formats
                alternativeText
              }
            }
          }
          Input_label_first_name
          Input_label_last_name
          Input_label_email
          Input_label_phone
          Input_placeholder_your_text
          localizations {
            data {
              attributes {
                locale
                Facebook_icon{
                  data{
                    attributes{
                      url
                      provider_metadata
                      formats
                      alternativeText
                    }
                  }
                }
                Google_icon{
                  data{
                    attributes{
                      url
                      provider_metadata
                      formats
                      alternativeText
                    }
                  }
                }
                Twitter_icon{
                  data{
                    attributes{
                      url
                      provider_metadata
                      formats
                      alternativeText
                    }
                  }
                }
                Input_label_first_name
                Input_label_last_name
                Input_label_email
                Input_label_phone
                Input_placeholder_your_text
              }
            }
          }
        }
      }
    }
  }
`;

export default userAccountRecurringElementQuery;