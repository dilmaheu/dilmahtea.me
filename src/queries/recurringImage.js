const images = [
  "logo",
  "favicon",
  "hero_background",
  "crowdfunding_info_section_background",
  "footer_background",
  "footer_leaf",
  "footer_leaf_sm",
  "error_notification",
  "warning_notification",
  "info_notification",
  "success_notification",
  "white_love_ribbon",
  "green_love_ribbon",
  "white_cup",
  "green_cup",
  "light_green_cup",
  "white_right_arrow",
  "green_right_arrow",
  "white_down_arrow",
  "green_down_arrow",
  "white_clock",
  "light_green_clock",
  "white_flower",
  "light_green_flower",
  "love_gift",
  "left_quote",
  "green_book",
  "green_bulb",
  "green_leaf",
  "left_post_leaf",
];

const recurringImageQuery = `
  {
    recurringImage {
      data {
        id
        attributes {
          ${images.map(
            (image) => `
              ${image} {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
            `
          )}
        }
      }
    }
  }
`;

export default recurringImageQuery;
