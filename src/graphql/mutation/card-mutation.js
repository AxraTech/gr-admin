import { gql } from "@apollo/client";

export const CREATE_CARD = gql`
  mutation createCard(
    $card_number: String
    $card_password: String
    $balance: numeric
  ) {
    insert_cards_one(
      object: {
        card_number: $card_number
        card_password: $card_password
        balance: $balance
      }
    ) {
      card_number
      card_password
      created_at
      updated_at
      disabled
      balance
    }
  }
`;


export const UPDATE_CARD_BY_ID = gql`
  mutation updateCardById(
    $id: uuid!
    $card_number: String
    $card_password: String
    $balance: numeric
    $disabled: Boolean
  ) {
    update_cards_by_pk(
      pk_columns: { id: $id },
      _set: {
        card_number: $card_number,
        card_password: $card_password,
        balance: $balance,
        disabled: $disabled
      }
    ) {
      id
      card_number
      card_password
      balance
      disabled
      updated_at
    }
  }
`;
