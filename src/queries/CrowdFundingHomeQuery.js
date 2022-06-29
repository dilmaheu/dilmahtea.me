const CrowdFundingHomeQuery = `
{
  recurringElement {
    data {
      id
      attributes {
        Footer_text
        Company_name
        Company_address
        Company_email
        OpenGraph_default{
            data {
                attributes {
                    name
                    url
                    provider_metadata
                    alternativeText
                }
            }
        }
      }
    }
  }
  crowdfundingHome {
    data {
      attributes {
        localizations {
          data {
            attributes {
              locale
            }
          }
        }
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
        Heading_button_text
        Heading_button_link
        Heading_goal
        Heading_supporters
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
  crowdfundingPlans(sort: "Price_EUR_excl_VAT") {
    data {
      id
      attributes {
        locale
        Perk
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
}
`;

export default CrowdFundingHomeQuery;