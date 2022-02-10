import { GraphQLResolveInfo } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type DefaultDocument = {
  __typename?: 'DefaultDocument';
  folders: Array<Folder>;
  projects: ProjectConnection;
};

export type Folder = {
  __typename?: 'Folder';
  id: Scalars['String'];
  name: Scalars['String'];
  projects: Array<Project>;
};

export type Project = {
  __typename?: 'Project';
  availableTaskCount: Scalars['Int'];
  completed: Scalars['Boolean'];
  id: Scalars['String'];
  name: Scalars['String'];
  rootTask: Task;
};

export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  all: Array<Project>;
  byId?: Maybe<Project>;
};


export type ProjectConnectionByIdArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  defaultDocument: DefaultDocument;
  flattenedTasks: Array<Task>;
  inboxTasks: Array<Task>;
};


export type QueryFlattenedTasksArgs = {
  available?: InputMaybe<Scalars['Boolean']>;
  flagged?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  withEffectiveDueDate?: InputMaybe<Scalars['Boolean']>;
};


export type QueryInboxTasksArgs = {
  available?: InputMaybe<Scalars['Boolean']>;
  flagged?: InputMaybe<Scalars['Boolean']>;
};

export type Task = {
  __typename?: 'Task';
  completed: Scalars['Boolean'];
  containingProject?: Maybe<Project>;
  effectiveDueDate?: Maybe<Scalars['String']>;
  effectivelyCompleted: Scalars['Boolean'];
  flagged: Scalars['Boolean'];
  id: Scalars['String'];
  name: Scalars['String'];
  tasks?: Maybe<Array<Task>>;
};

export type TaskViewModelFragment = { __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null };

export type GetTasksQueryVariables = Exact<{
  flagged?: InputMaybe<Scalars['Boolean']>;
  available?: InputMaybe<Scalars['Boolean']>;
  withEffectiveDueDate?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetTasksQuery = { __typename?: 'Query', flattenedTasks: Array<{ __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null }> };

export type GetInboxTasksQueryVariables = Exact<{
  flagged?: InputMaybe<Scalars['Boolean']>;
  available?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetInboxTasksQuery = { __typename?: 'Query', inboxTasks: Array<{ __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null }> };

export type GetTasksInProjectQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type GetTasksInProjectQuery = { __typename?: 'Query', defaultDocument: { __typename?: 'DefaultDocument', projects: { __typename?: 'ProjectConnection', byId?: { __typename?: 'Project', rootTask: { __typename?: 'Task', tasks?: Array<{ __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null }> | null } } | null } } };

export type GetNestedProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNestedProjectsQuery = { __typename?: 'Query', defaultDocument: { __typename?: 'DefaultDocument', folders: Array<{ __typename?: 'Folder', name: string, id: string, projects: Array<{ __typename?: 'Project', name: string, completed: boolean, id: string, availableTaskCount: number }> }> } };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DefaultDocument: ResolverTypeWrapper<DefaultDocument>;
  Folder: ResolverTypeWrapper<Folder>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Project: ResolverTypeWrapper<Project>;
  ProjectConnection: ResolverTypeWrapper<ProjectConnection>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Task: ResolverTypeWrapper<Task>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  DefaultDocument: DefaultDocument;
  Folder: Folder;
  Int: Scalars['Int'];
  Project: Project;
  ProjectConnection: ProjectConnection;
  Query: {};
  String: Scalars['String'];
  Task: Task;
};

export type CallDirectiveArgs = { };

export type CallDirectiveResolver<Result, Parent, ContextType = any, Args = CallDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type NoCallDirectiveArgs = { };

export type NoCallDirectiveResolver<Result, Parent, ContextType = any, Args = NoCallDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type NoFuncDirectiveArgs = { };

export type NoFuncDirectiveResolver<Result, Parent, ContextType = any, Args = NoFuncDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type OnlyDirectiveArgs = {
  field: Scalars['String'];
  op?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type OnlyDirectiveResolver<Result, Parent, ContextType = any, Args = OnlyDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type DefaultDocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['DefaultDocument'] = ResolversParentTypes['DefaultDocument']> = {
  folders?: Resolver<Array<ResolversTypes['Folder']>, ParentType, ContextType>;
  projects?: Resolver<ResolversTypes['ProjectConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  availableTaskCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rootTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectConnection'] = ResolversParentTypes['ProjectConnection']> = {
  all?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  byId?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<ProjectConnectionByIdArgs, 'id'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  defaultDocument?: Resolver<ResolversTypes['DefaultDocument'], ParentType, ContextType>;
  flattenedTasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, Partial<QueryFlattenedTasksArgs>>;
  inboxTasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, Partial<QueryInboxTasksArgs>>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  containingProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  effectiveDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectivelyCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<ResolversTypes['Task']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DefaultDocument?: DefaultDocumentResolvers<ContextType>;
  Folder?: FolderResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectConnection?: ProjectConnectionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  call?: CallDirectiveResolver<any, any, ContextType>;
  noCall?: NoCallDirectiveResolver<any, any, ContextType>;
  noFunc?: NoFuncDirectiveResolver<any, any, ContextType>;
  only?: OnlyDirectiveResolver<any, any, ContextType>;
};

export const TaskViewModelFragmentDoc = gql`
    fragment TaskViewModel on Task {
  name
  id
  effectiveDueDate
  completed
  effectivelyCompleted
  containingProject {
    id
    name
  }
  flagged
}
    `;
export const GetTasksDocument = gql`
    query GetTasks($flagged: Boolean, $available: Boolean, $withEffectiveDueDate: Boolean) {
  flattenedTasks(
    flagged: $flagged
    available: $available
    withEffectiveDueDate: $withEffectiveDueDate
  ) {
    ...TaskViewModel
  }
}
    ${TaskViewModelFragmentDoc}`;
export const GetInboxTasksDocument = gql`
    query GetInboxTasks($flagged: Boolean, $available: Boolean) {
  inboxTasks(flagged: $flagged, available: $available) {
    ...TaskViewModel
  }
}
    ${TaskViewModelFragmentDoc}`;
export const GetTasksInProjectDocument = gql`
    query GetTasksInProject($projectId: String!) {
  defaultDocument {
    projects {
      byId(id: $projectId) {
        rootTask {
          tasks @only(field: "effectiveDeferDate", op: "<", value: "new Date()") {
            ...TaskViewModel
          }
        }
      }
    }
  }
}
    ${TaskViewModelFragmentDoc}`;
export const GetNestedProjectsDocument = gql`
    query GetNestedProjects {
  defaultDocument {
    folders {
      name
      id
      projects {
        name
        completed
        id
        availableTaskCount
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetTasks(variables?: GetTasksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTasksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTasksQuery>(GetTasksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTasks');
    },
    GetInboxTasks(variables?: GetInboxTasksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetInboxTasksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetInboxTasksQuery>(GetInboxTasksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetInboxTasks');
    },
    GetTasksInProject(variables: GetTasksInProjectQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTasksInProjectQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTasksInProjectQuery>(GetTasksInProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTasksInProject');
    },
    GetNestedProjects(variables?: GetNestedProjectsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNestedProjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNestedProjectsQuery>(GetNestedProjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNestedProjects');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;