const estatesQuery = `
  {
    estates {
      data {
        id
        attributes {
          locale
          updatedAt
          Estate_name
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
          Block_text
          Location {
            data {
              id
              attributes {
                url
                provider_metadata
                formats
                alternativeText
              }
            }
          }
          blogs (filters: { publishedAt: { ne: null } }) {
            data{
              attributes{
                Title
                Intro_blob{
                  data{
                    attributes{
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                authors{
                  data{
                    attributes{
                      givenName
                    }
                  }
                }
                createdAt
                publishedAt
                Meta{
                  URL_slug
                }
              }
            }
          }
          Location_link
          Optional_data{
            Telephone
            Street_address
            Locality
            Region
            Postal_code
            Country
            Geo_latitude
            Geo_longitude
          }
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
                Estate_name
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
                Block_text
                Location {
                  data {
                    attributes {
                      url
                      provider_metadata
                      formats
                      alternativeText
                    }
                  }
                }
                Location_link
                blogs (filters: { publishedAt: { ne: null } }) {
                  data{
                    attributes{
                      Title
                      Intro_blob{
                        data{
                          attributes{
                            url
                            provider_metadata
                            alternativeText
                          }
                        }
                      }
                      authors{
                        data{
                          attributes{
                            givenName
                          }
                        }
                      }
                      createdAt
                      publishedAt
                      Meta{
                        URL_slug
                      }
                    }
                  }
                }
                Optional_data{
                  Telephone
                  Street_address
                  Locality
                  Region
                  Postal_code
                  Country
                  Geo_latitude
                  Geo_longitude
                }
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

export default estatesQuery;
