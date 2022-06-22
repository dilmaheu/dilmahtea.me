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
              provider_metadata
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
              provider_metadata
            }
          }
        }
      }
    }
  }
}
`;

export default CrowdFundingHomeQuery;
