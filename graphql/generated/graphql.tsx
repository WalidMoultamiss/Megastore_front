import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Ad = {
  __typename?: 'Ad';
  bgColor?: Maybe<Scalars['String']>;
  bgImage: Image;
  components: Array<Component>;
  createdAt: Scalars['String'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  isPremium: Scalars['Boolean'];
  title: Scalars['String'];
  user: User;
  viewCount: Scalars['Int'];
  width: Scalars['Int'];
};

export type AdInput = {
  bgColor?: InputMaybe<Scalars['String']>;
  bgImage: Scalars['ID'];
  components: Array<Scalars['ID']>;
  height: Scalars['Int'];
  isPremium: Scalars['Boolean'];
  title: Scalars['String'];
  user: Scalars['ID'];
  viewCount: Scalars['Int'];
  width: Scalars['Int'];
};

export type Admin = {
  __typename?: 'Admin';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type AdminInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Component = {
  __typename?: 'Component';
  CompId: Scalars['ID'];
  CompType: Scalars['String'];
  ad: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  tw: Scalars['String'];
  x: Scalars['Int'];
  y: Scalars['Int'];
  zoom: Scalars['Int'];
};

export type ComponentInput = {
  CompId: Scalars['ID'];
  CompType: Scalars['String'];
  ad: Scalars['String'];
  tw: Scalars['String'];
  x: Scalars['Int'];
  y: Scalars['Int'];
  zoom: Scalars['Int'];
};

export type Image = {
  __typename?: 'Image';
  alt: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  src: Scalars['String'];
  user: Scalars['String'];
};

export type ImageInput = {
  alt: Scalars['String'];
  src: Scalars['String'];
  user: Scalars['String'];
};

export type ImgComp = {
  __typename?: 'ImgComp';
  createdAt: Scalars['String'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  image: Image;
  width: Scalars['Int'];
};

export type ImgCompInput = {
  height: Scalars['Int'];
  image: Scalars['ID'];
  width: Scalars['Int'];
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAd?: Maybe<Ad>;
  createComponent?: Maybe<Component>;
  createImage?: Maybe<Image>;
  createImgComp?: Maybe<ImgComp>;
  createQrCodeComp?: Maybe<QrCodeComp>;
  createTextComp?: Maybe<TextComp>;
  deleteAd?: Maybe<Ad>;
  deleteComponent?: Maybe<Component>;
  deleteImage?: Maybe<Image>;
  login?: Maybe<User>;
  loginAdmin?: Maybe<Admin>;
  register?: Maybe<User>;
  registerAdmin?: Maybe<Admin>;
  setFreemium?: Maybe<Ad>;
  setPremium?: Maybe<Ad>;
  setStatus?: Maybe<Ad>;
};


export type MutationCreateAdArgs = {
  input: AdInput;
};


export type MutationCreateComponentArgs = {
  input: ComponentInput;
};


export type MutationCreateImageArgs = {
  input?: InputMaybe<ImageInput>;
};


export type MutationCreateImgCompArgs = {
  input: ImgCompInput;
};


export type MutationCreateQrCodeCompArgs = {
  input: QrCodeCompInput;
};


export type MutationCreateTextCompArgs = {
  input: TextCompInput;
};


export type MutationDeleteAdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteComponentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  input?: InputMaybe<LoginInput>;
};


export type MutationLoginAdminArgs = {
  input?: InputMaybe<LoginInput>;
};


export type MutationRegisterArgs = {
  input?: InputMaybe<UserInput>;
};


export type MutationRegisterAdminArgs = {
  input?: InputMaybe<AdminInput>;
};


export type MutationSetFreemiumArgs = {
  id: Scalars['ID'];
};


export type MutationSetPremiumArgs = {
  id: Scalars['ID'];
};


export type MutationSetStatusArgs = {
  id: Scalars['ID'];
  status: Scalars['String'];
};

export type QrCodeComp = {
  __typename?: 'QrCodeComp';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  image: Image;
  url: Scalars['String'];
};

export type QrCodeCompInput = {
  image: Scalars['ID'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAdminById?: Maybe<Admin>;
  getAllAdmins: Array<Maybe<Admin>>;
  getAllAds?: Maybe<Array<Maybe<Ad>>>;
  getAllAdsByUser?: Maybe<Array<Maybe<Ad>>>;
  getAllComponents?: Maybe<Array<Maybe<Component>>>;
  getAllComponentsByAd?: Maybe<Array<Maybe<Component>>>;
  getAllImages?: Maybe<Array<Maybe<Image>>>;
  getAllImagesByUser?: Maybe<Array<Maybe<Image>>>;
  getAllImgComps?: Maybe<Array<Maybe<ImgComp>>>;
  getAllQrCodeComps?: Maybe<Array<Maybe<QrCodeComp>>>;
  getAllTextComps?: Maybe<Array<Maybe<TextComp>>>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getUserById?: Maybe<User>;
};


export type QueryGetAdminByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetAllAdsByUserArgs = {
  user: Scalars['ID'];
};


export type QueryGetAllComponentsByAdArgs = {
  ad: Scalars['String'];
};


export type QueryGetAllImagesByUserArgs = {
  user: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID'];
};

export type TextComp = {
  __typename?: 'TextComp';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
};

export type TextCompInput = {
  content: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type CreateImageMutationVariables = Exact<{
  input?: InputMaybe<ImageInput>;
}>;


export type CreateImageMutation = { __typename?: 'Mutation', createImage?: { __typename?: 'Image', id: string, src: string, alt: string, user: string, createdAt: string } | null };

export type LoginMutationVariables = Exact<{
  input?: InputMaybe<LoginInput>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, token: string } | null };

export type GetAllImagesByUserQueryVariables = Exact<{
  user: Scalars['String'];
}>;


export type GetAllImagesByUserQuery = { __typename?: 'Query', getAllImagesByUser?: Array<{ __typename?: 'Image', id: string, src: string, alt: string, createdAt: string } | null> | null };


export const CreateImageDocument = gql`
    mutation CreateImage($input: ImageInput) {
  createImage(input: $input) {
    id
    src
    alt
    user
    createdAt
  }
}
    `;
export type CreateImageMutationFn = Apollo.MutationFunction<CreateImageMutation, CreateImageMutationVariables>;

/**
 * __useCreateImageMutation__
 *
 * To run a mutation, you first call `useCreateImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createImageMutation, { data, loading, error }] = useCreateImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateImageMutation(baseOptions?: Apollo.MutationHookOptions<CreateImageMutation, CreateImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateImageMutation, CreateImageMutationVariables>(CreateImageDocument, options);
      }
export type CreateImageMutationHookResult = ReturnType<typeof useCreateImageMutation>;
export type CreateImageMutationResult = Apollo.MutationResult<CreateImageMutation>;
export type CreateImageMutationOptions = Apollo.BaseMutationOptions<CreateImageMutation, CreateImageMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput) {
  login(input: $input) {
    id
    firstName
    lastName
    email
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetAllImagesByUserDocument = gql`
    query GetAllImagesByUser($user: String!) {
  getAllImagesByUser(user: $user) {
    id
    src
    alt
    createdAt
  }
}
    `;

/**
 * __useGetAllImagesByUserQuery__
 *
 * To run a query within a React component, call `useGetAllImagesByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllImagesByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllImagesByUserQuery({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useGetAllImagesByUserQuery(baseOptions: Apollo.QueryHookOptions<GetAllImagesByUserQuery, GetAllImagesByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllImagesByUserQuery, GetAllImagesByUserQueryVariables>(GetAllImagesByUserDocument, options);
      }
export function useGetAllImagesByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllImagesByUserQuery, GetAllImagesByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllImagesByUserQuery, GetAllImagesByUserQueryVariables>(GetAllImagesByUserDocument, options);
        }
export type GetAllImagesByUserQueryHookResult = ReturnType<typeof useGetAllImagesByUserQuery>;
export type GetAllImagesByUserLazyQueryHookResult = ReturnType<typeof useGetAllImagesByUserLazyQuery>;
export type GetAllImagesByUserQueryResult = Apollo.QueryResult<GetAllImagesByUserQuery, GetAllImagesByUserQueryVariables>;