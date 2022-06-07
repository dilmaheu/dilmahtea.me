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
            }
          }
        }
      }
    }
  }
}
`;

export default CrowdFundingHomeQuery;
