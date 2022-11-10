const recurringElementQuery = `
  {
    checkoutRecurringElement {
      data {
        id
        attributes {
          locale
          text_add
          text_cart
          text_add_to_cart
          text_add_to_cart_for
          text_edit_cart
          text_size
          text_quantity
          text_order_summary
          text_subtotal
          text_shipping
          text_tax
          text_total
          text_shipping_calculated_at_checkout
          text_proceed_to_checkout
          text_continue_to_payment
          text_return_to_information
          text_continue_shopping
          text_empty_cart
          localizations {
            data {
              attributes {
                locale
                text_add
                text_cart
                text_add_to_cart
                text_add_to_cart_for
                text_edit_cart
                text_size
                text_quantity
                text_order_summary
                text_subtotal
                text_shipping
                text_tax
                text_total
                text_shipping_calculated_at_checkout
                text_proceed_to_checkout
                text_continue_to_payment
                text_return_to_information
                text_continue_shopping
                text_empty_cart
              }
            }
          }
        }
      }
    }
  }
`;

export default recurringElementQuery;
