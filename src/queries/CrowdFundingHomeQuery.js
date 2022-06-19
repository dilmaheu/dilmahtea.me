const CrowdFundingHomeQuery = `
{
  recurringElement {
    data {
      id
      attributes {
        Footer_text
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
        Title_icon {
          data {
            id
            attributes {
              name
              url
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
