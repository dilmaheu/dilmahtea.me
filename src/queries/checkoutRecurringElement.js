const recurringElementQuery = `
  {
    checkoutRecurringElement {
      data {
        id
        attributes {
          locale
          text_add
          text_add_to_cart
          text_add_to_cart_for
          text_size
          text_quantity
          text_cart
          text_order_summary
          text_subtotal
          text_shipping
          text_tax
          text_total
          text_shipping_calculated_at_checkout
          text_proceed_to_checkout
          localizations {
            data {
              attributes {
                locale
                text_add
                text_add_to_cart
                text_add_to_cart_for
                text_size
                text_quantity
                text_cart
                text_order_summary
                text_subtotal
                text_shipping
                text_tax
                text_total
                text_shipping_calculated_at_checkout
                text_proceed_to_checkout
              }
            }
          }
        }
      }
    }
  }
`;

export default recurringElementQuery;
