const userAccountDashboardQuery = `
  {
    userAccountDashboard {
      data {
        attributes {
          locale
          Title
          Personal_information{
            Name
            Label_username
            Label_phone
            Label_email
            Label_delivery_address
            Label_billing_address
            Social_media_title
            Social_media{
              Facebook
              Google
              Twitter
            }
          }
          Block2_visibility
          Block2{
            Block2_title
            Block2_text
            Label_my_selected_cause
            My_selected_cause_text
            Label_let_dilmah_pick_cause
            Let_dilmah_pick_cause_text
            Notification_cause_update_text
          }
          Block3_title
          Support_visibility
          Support{
            Button_text
            Button_link
            Button_icon{
              data{
                attributes{
                  url
                  provider_metadata
                  alternativeText
                }
              }
            }
          }
          Breadcrumb{
            Steps{
              Name
              Link
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
          localizations {
            data {
              attributes {
                locale
                Title
                Personal_information{
                  Name
                  Label_username
                  Label_phone
                  Label_email
                  Label_delivery_address
                  Label_billing_address
                  Social_media_title
                  Social_media{
                    Facebook
                    Google
                    Twitter
                  }
                }
                Block2_visibility
                Block2{
                  Block2_title
                  Block2_text
                  Label_my_selected_cause
                  My_selected_cause_text
                  Label_let_dilmah_pick_cause
                  Let_dilmah_pick_cause_text
                  Notification_cause_update_text
                }
                Block3_title
                Support_visibility
                Support{
                  Button_text
                  Button_link
                  Button_icon{
                    data{
                      attributes{
                        url
                        provider_metadata
                        alternativeText
                      }
                    }
                  }
                }
                Breadcrumb{
                  Steps{
                    Name
                    Link
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
        }
      }
    }
  }
`;

export default userAccountDashboardQuery;