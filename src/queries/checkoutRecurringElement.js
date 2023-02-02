const recurringElementQuery = `
  {
    checkoutRecurringElement {
      data {
        id
        attributes {
          locale
          updatedAt
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
          Aria_label_cart_focus_text
          Aria_label_cart_close_button_text
          Aria_label_cart_items_text
          Aria_label_remove_cart_item_button_text
          Aria_label_cart_item_quantity_minus_button_text
          Aria_label_cart_item_quantity_plus_button_text
          Aria_label_cart_item_quantity_text
          Aria_label_kindness_cause_items_text
          localizations {
            data {
              attributes {
                locale
                updatedAt
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
                Aria_label_cart_focus_text
                Aria_label_cart_close_button_text
                Aria_label_cart_items_text
                Aria_label_remove_cart_item_button_text
                Aria_label_cart_item_quantity_minus_button_text
                Aria_label_cart_item_quantity_plus_button_text
                Aria_label_cart_item_quantity_text
                Aria_label_kindness_cause_items_text
              }
            }
          }
        }
      }
    }
  }
`;

export default recurringElementQuery;
