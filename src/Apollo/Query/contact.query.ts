import { gql } from "@apollo/client";

export const CREATE_CONTACT = gql`
mutation MyMutation($subject: String = "", $name: String = "", $email: String = "", $description: String = "") {
    createContact(
      data: {name: $name, subject: $subject, email: $email, description: $description}
    ) {
      id
    }
}
`;