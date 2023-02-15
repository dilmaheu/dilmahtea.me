const userAccountDashboardQuery = `
  {
    userAccountDashboard {
      data {
        attributes {
          locale
          Title
          Personal_information{
            Name
            Phone
            Email
            Address
            Label_phone
            Label_email
            Label_address
            Social_media{
              Facebook
              Google
              Twitter
            }
            Social_media_title
            Button_remove_text
            Button_update_text
            Button_edit_text
            Button_add_new_address_text
            text_connected
            text_not_connected
          }
          Block2_visibility
          Block2{
            Block2_title
            Block2_text
            Label_my_selected_cause
            My_selected_cause_text
            Label_let_dilmah_pick_cause
            Let_dilmah_pick_cause_text
            Button_change_cause_text
            Notification_cause_update_text
          }
          Block3_visibility
          Block3{
            Block3_title
            Label_order
            Button_track_package
            Button_track_package_text
            Button_buy_again_text
            Button_sold_out_text
            Button_view_all_orders_text
            text_more_products_in_this_order
            text_estimated_delivery
            text_estimated_shipment
            text_delivered
            Empty_order_blob{
              data{
                attributes{
                  url
                  provider_metadata
                  alternativeText
                }
              }
            }
            Empty_order_text
            Empty_order_button_text
            Empty_order_button_link
          }
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
          text_content
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
                  Phone
                  Email
                  Address
                  Label_phone
                  Label_email
                  Label_address
                  Social_media{
                    Facebook
                    Google
                    Twitter
                  }
                  Social_media_title
                  Button_remove_text
                  Button_update_text
                  Button_edit_text
                  Button_add_new_address_text
                  text_connected
                  text_not_connected
                }
                Block2_visibility
                Block2{
                  Block2_title
                  Block2_text
                  Label_my_selected_cause
                  My_selected_cause_text
                  My_selected_cause_text
                  Label_let_dilmah_pick_cause
                  Let_dilmah_pick_cause_text
                  Button_change_cause_text
                  Notification_cause_update_text
                }
                Block3_visibility
                Block3{
                  Block3_title
                  Label_order
                  Button_track_package
                  Button_track_package_text
                  Button_buy_again_text
                  Button_sold_out_text
                  Button_view_all_orders_text
                  text_more_products_in_this_order
                  text_estimated_delivery
                  text_estimated_shipment
                  text_delivered
                  Empty_order_blob{
                    data{
                      attributes{
                        url
                        provider_metadata
                        alternativeText
                      }
                    }
                  }
                  Empty_order_text
                  Empty_order_button_text
                  Empty_order_button_link
                }
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
                text_content
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