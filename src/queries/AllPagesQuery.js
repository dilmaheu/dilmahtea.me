const AllPagesQuery = `
{
  recurringElement {
    data {
      id
      attributes {
        Footer_text
      }
    }
  }
  crowdfundingPlans(sort: "Price_EUR_excl_VAT") {
    data {
      id
      attributes {
        localizations {
          data {
            attributes {
              locale
              Title
              TitleIcon_Name
              Title_icon {
                data {
                  id
                  attributes {
                    name
                    url
                    provider_metadata
                    alternativeText
                  }
                }
              }
              Price_EUR_excl_VAT
              Intro_text
              List
              Button_text
            }
          }
        }
        locale
        Perk
        Title
        Title_icon {
          data {
            id
            attributes {
              name
              alternativeText
            }
          }
        }
        Price_EUR_excl_VAT
        Intro_text
        List
        Button_text
      }
    }
  }
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
  crowdfundingHome {
    data {
      id
      attributes {
        Intro_blob {
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
        localizations {
          data {
            attributes {
              locale
              Meta {
                HTML_Title
                Meta_description
                noindex
                nofollow
                URL_slug
                Canonical_link
              }
              Title
              Intro_text
              Intro_blob {
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
              Heading_plans
              Heading_block
              Block_text
              Block_blob {
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
            }
          }
        }
      }
    }
  }
  crowdfundingPaymentConfirmation {
    data {
      id
      attributes {
        localizations {
          data {
            attributes {
              locale
              Title
              Intro_text
              Heading_block
              Block_text
              Block_blob {
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
        locale
        Title
        Intro_text
        Heading_block
        Block_text
        Block_blob {
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
  basicPages {
    data {
      id
      attributes {
        localizations {
          data {
            attributes {
              locale
              Title
              Intro_text
              Heading_block
              Block_text
              Block_blob{
                data{
                  id
                  attributes{
                    url
                    provider_metadata
                    formats
                    alternativeText
                  }
                }
              }
              Meta{
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
        locale
        Title
        Intro_text
        Heading_block
        Block_text
        Block_blob{
          data{
            id
            attributes{
              url
              provider_metadata
              formats
              alternativeText
            }
          }
        }
        Meta{
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
}`;

export default AllPagesQuery;
