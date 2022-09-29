import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token 
            user {
                _id
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!,$email: String!) {
        addUser(username: $username, password: $password, email: $email) {
            token
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookId: ID, $authors: [String], $description: String, $title: String, $image: String) {
        saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation RemoveBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            username
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;