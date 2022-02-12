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

export type Condition = {
  children?: InputMaybe<Array<Condition>>;
  enabled?: Scalars['Boolean'];
  field?: InputMaybe<Scalars['String']>;
  operation?: Scalars['String'];
  value?: Scalars['String'];
};

export type Connection = {
  byId?: Maybe<Node>;
  edges: Array<Edge>;
  pageInfo: PageInfo;
};


export type ConnectionByIdArgs = {
  id: Scalars['String'];
};

export type DefaultDocument = {
  __typename?: 'DefaultDocument';
  flattenedTasks: TaskConection;
  folders: FolderConnection;
  inboxTasks: TaskConection;
  perspectiveNames: Array<Scalars['String']>;
  projects: ProjectConnection;
  tags: TagConnection;
};

export type Edge = {
  cursor: Scalars['String'];
  node: Node;
};

export type Folder = Node & {
  __typename?: 'Folder';
  id: Scalars['String'];
  name: Scalars['String'];
  projects: ProjectConnection;
};

export type FolderConnection = Connection & {
  __typename?: 'FolderConnection';
  byId?: Maybe<Folder>;
  edges: Array<FolderEdge>;
  pageInfo: PageInfo;
};


export type FolderConnectionByIdArgs = {
  id: Scalars['String'];
};

export type FolderEdge = Edge & {
  __typename?: 'FolderEdge';
  cursor: Scalars['String'];
  node: Folder;
};

export type Node = {
  id: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type Project = Node & {
  __typename?: 'Project';
  completed: Scalars['Boolean'];
  id: Scalars['String'];
  name: Scalars['String'];
  numberOfAvailableTasks: Scalars['Int'];
  rootTask: Task;
};

export type ProjectConnection = Connection & {
  __typename?: 'ProjectConnection';
  byId?: Maybe<Project>;
  edges: Array<ProjectEdge>;
  pageInfo: PageInfo;
};


export type ProjectConnectionByIdArgs = {
  id: Scalars['String'];
};

export type ProjectEdge = Edge & {
  __typename?: 'ProjectEdge';
  cursor: Scalars['String'];
  node: Project;
};

export type Query = {
  __typename?: 'Query';
  defaultDocument: DefaultDocument;
};

export type Tag = Node & {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
  tags: TagConnection;
  tasks: TaskConection;
};

export type TagConnection = Connection & {
  __typename?: 'TagConnection';
  byId?: Maybe<Tag>;
  edges: Array<TagEdge>;
  pageInfo: PageInfo;
};


export type TagConnectionByIdArgs = {
  id: Scalars['String'];
};

export type TagEdge = Edge & {
  __typename?: 'TagEdge';
  cursor: Scalars['String'];
  node: Tag;
};

export type Task = Node & {
  __typename?: 'Task';
  completed: Scalars['Boolean'];
  containingProject?: Maybe<Project>;
  effectiveDueDate?: Maybe<Scalars['String']>;
  effectivelyCompleted: Scalars['Boolean'];
  flagged: Scalars['Boolean'];
  id: Scalars['String'];
  name: Scalars['String'];
  tasks: TaskConection;
};

export type TaskConection = Connection & {
  __typename?: 'TaskConection';
  byId?: Maybe<Task>;
  edges: Array<TaskEdge>;
  pageInfo: PageInfo;
};


export type TaskConectionByIdArgs = {
  id: Scalars['String'];
};

export type TaskEdge = Edge & {
  __typename?: 'TaskEdge';
  cursor: Scalars['String'];
  node: Task;
};

export type TaskViewModelFragment = { __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null };

export type GetTasksQueryVariables = Exact<{
  flagged?: InputMaybe<Scalars['Boolean']>;
  available?: InputMaybe<Scalars['Boolean']>;
  withEffectiveDueDate?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetTasksQuery = { __typename?: 'Query', defaultDocument: { __typename?: 'DefaultDocument', flattenedTasks: { __typename?: 'TaskConection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } }> } } };

export type GetInboxTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInboxTasksQuery = { __typename?: 'Query', defaultDocument: { __typename?: 'DefaultDocument', inboxTasks: { __typename?: 'TaskConection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } }> } } };

export type GetTasksInProjectQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type GetTasksInProjectQuery = { __typename?: 'Query', defaultDocument: { __typename?: 'DefaultDocument', projects: { __typename?: 'ProjectConnection', byId?: { __typename?: 'Project', rootTask: { __typename?: 'Task', tasks: { __typename?: 'TaskConection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } }> } } } | null } } };

export type GetNestedProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNestedProjectsQuery = { __typename?: 'Query', defaultDocument: { __typename?: 'DefaultDocument', folders: { __typename?: 'FolderConnection', edges: Array<{ __typename?: 'FolderEdge', node: { __typename?: 'Folder', name: string, id: string, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } } }> } } };

export type GetTasksWithTagQueryVariables = Exact<{
  tagId: Scalars['String'];
}>;


export type GetTasksWithTagQuery = { __typename?: 'Query', defaultDocument: { __typename?: 'DefaultDocument', tags: { __typename?: 'TagConnection', byId?: { __typename?: 'Tag', tasks: { __typename?: 'TaskConection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } }> } } | null } } };

export type GetTopLevelProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopLevelProjectsQuery = { __typename?: 'Query', defaultDocument: { __typename?: 'DefaultDocument', folders: { __typename?: 'FolderConnection', edges: Array<{ __typename?: 'FolderEdge', node: { __typename?: 'Folder', name: string, id: string, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } } }> }, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'Project', id: string, name: string, completed: boolean, numberOfAvailableTasks: number } }> } } };

export type GetTaskCreationSupportInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaskCreationSupportInfoQuery = { __typename?: 'Query', defaultDocument: { __typename?: 'DefaultDocument', folders: { __typename?: 'FolderConnection', edges: Array<{ __typename?: 'FolderEdge', node: { __typename?: 'Folder', name: string, id: string, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } } }> }, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'Project', id: string, name: string, completed: boolean, numberOfAvailableTasks: number } }> }, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'Tag', name: string, id: string, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'Tag', name: string, id: string } }> } } }> } } };

export type GetNestedTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNestedTagsQuery = { __typename?: 'Query', defaultDocument: { __typename?: 'DefaultDocument', tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'Tag', name: string, id: string, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'Tag', name: string, id: string } }> } } }> } } };

export type GetPerspectiveNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPerspectiveNamesQuery = { __typename?: 'Query', defaultDocument: { __typename?: 'DefaultDocument', perspectiveNames: Array<string> } };



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
  Condition: Condition;
  Connection: ResolversTypes['FolderConnection'] | ResolversTypes['ProjectConnection'] | ResolversTypes['TagConnection'] | ResolversTypes['TaskConection'];
  DefaultDocument: ResolverTypeWrapper<DefaultDocument>;
  Edge: ResolversTypes['FolderEdge'] | ResolversTypes['ProjectEdge'] | ResolversTypes['TagEdge'] | ResolversTypes['TaskEdge'];
  Folder: ResolverTypeWrapper<Folder>;
  FolderConnection: ResolverTypeWrapper<FolderConnection>;
  FolderEdge: ResolverTypeWrapper<FolderEdge>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Node: ResolversTypes['Folder'] | ResolversTypes['Project'] | ResolversTypes['Tag'] | ResolversTypes['Task'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Project: ResolverTypeWrapper<Project>;
  ProjectConnection: ResolverTypeWrapper<ProjectConnection>;
  ProjectEdge: ResolverTypeWrapper<ProjectEdge>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tag: ResolverTypeWrapper<Tag>;
  TagConnection: ResolverTypeWrapper<TagConnection>;
  TagEdge: ResolverTypeWrapper<TagEdge>;
  Task: ResolverTypeWrapper<Task>;
  TaskConection: ResolverTypeWrapper<TaskConection>;
  TaskEdge: ResolverTypeWrapper<TaskEdge>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Condition: Condition;
  Connection: ResolversParentTypes['FolderConnection'] | ResolversParentTypes['ProjectConnection'] | ResolversParentTypes['TagConnection'] | ResolversParentTypes['TaskConection'];
  DefaultDocument: DefaultDocument;
  Edge: ResolversParentTypes['FolderEdge'] | ResolversParentTypes['ProjectEdge'] | ResolversParentTypes['TagEdge'] | ResolversParentTypes['TaskEdge'];
  Folder: Folder;
  FolderConnection: FolderConnection;
  FolderEdge: FolderEdge;
  Int: Scalars['Int'];
  Node: ResolversParentTypes['Folder'] | ResolversParentTypes['Project'] | ResolversParentTypes['Tag'] | ResolversParentTypes['Task'];
  PageInfo: PageInfo;
  Project: Project;
  ProjectConnection: ProjectConnection;
  ProjectEdge: ProjectEdge;
  Query: {};
  String: Scalars['String'];
  Tag: Tag;
  TagConnection: TagConnection;
  TagEdge: TagEdge;
  Task: Task;
  TaskConection: TaskConection;
  TaskEdge: TaskEdge;
};

export type NoCallDirectiveArgs = { };

export type NoCallDirectiveResolver<Result, Parent, ContextType = any, Args = NoCallDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type WhoseDirectiveArgs = {
  condition: Array<Condition>;
};

export type WhoseDirectiveResolver<Result, Parent, ContextType = any, Args = WhoseDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = {
  __resolveType: TypeResolveFn<'FolderConnection' | 'ProjectConnection' | 'TagConnection' | 'TaskConection', ParentType, ContextType>;
  byId?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<ConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['Edge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type DefaultDocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['DefaultDocument'] = ResolversParentTypes['DefaultDocument']> = {
  flattenedTasks?: Resolver<ResolversTypes['TaskConection'], ParentType, ContextType>;
  folders?: Resolver<ResolversTypes['FolderConnection'], ParentType, ContextType>;
  inboxTasks?: Resolver<ResolversTypes['TaskConection'], ParentType, ContextType>;
  perspectiveNames?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<ResolversTypes['ProjectConnection'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']> = {
  __resolveType: TypeResolveFn<'FolderEdge' | 'ProjectEdge' | 'TagEdge' | 'TaskEdge', ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Node'], ParentType, ContextType>;
};

export type FolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<ResolversTypes['ProjectConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FolderConnection'] = ResolversParentTypes['FolderConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['Folder']>, ParentType, ContextType, RequireFields<FolderConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['FolderEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FolderEdge'] = ResolversParentTypes['FolderEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Folder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Folder' | 'Project' | 'Tag' | 'Task', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numberOfAvailableTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rootTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectConnection'] = ResolversParentTypes['ProjectConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<ProjectConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['ProjectEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectEdge'] = ResolversParentTypes['ProjectEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  defaultDocument?: Resolver<ResolversTypes['DefaultDocument'], ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagConnection'] = ResolversParentTypes['TagConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<TagConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['TagEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagEdge'] = ResolversParentTypes['TagEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  containingProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  effectiveDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectivelyCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskConectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskConection'] = ResolversParentTypes['TaskConection']> = {
  byId?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<TaskConectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['TaskEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskEdge'] = ResolversParentTypes['TaskEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Task'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Connection?: ConnectionResolvers<ContextType>;
  DefaultDocument?: DefaultDocumentResolvers<ContextType>;
  Edge?: EdgeResolvers<ContextType>;
  Folder?: FolderResolvers<ContextType>;
  FolderConnection?: FolderConnectionResolvers<ContextType>;
  FolderEdge?: FolderEdgeResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectConnection?: ProjectConnectionResolvers<ContextType>;
  ProjectEdge?: ProjectEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagConnection?: TagConnectionResolvers<ContextType>;
  TagEdge?: TagEdgeResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskConection?: TaskConectionResolvers<ContextType>;
  TaskEdge?: TaskEdgeResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  noCall?: NoCallDirectiveResolver<any, any, ContextType>;
  whose?: WhoseDirectiveResolver<any, any, ContextType>;
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
  defaultDocument {
    flattenedTasks {
      edges {
        node {
          ...TaskViewModel
        }
      }
    }
  }
}
    ${TaskViewModelFragmentDoc}`;
export const GetInboxTasksDocument = gql`
    query GetInboxTasks {
  defaultDocument {
    inboxTasks @whose(condition: {operation: "and", children: [{field: "effectivelyCompleted", value: "false"}, {operation: "or", children: [{field: "effectiveDeferDate", operation: "=", value: "null"}, {field: "effectiveDeferDate", operation: "<", value: "new Date()"}]}]}) {
      edges {
        node {
          ...TaskViewModel
        }
      }
    }
  }
}
    ${TaskViewModelFragmentDoc}`;
export const GetTasksInProjectDocument = gql`
    query GetTasksInProject($projectId: String!) {
  defaultDocument {
    projects {
      byId(id: $projectId) {
        rootTask {
          tasks {
            edges {
              node {
                ...TaskViewModel
              }
            }
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
      edges {
        node {
          name
          id
          projects {
            edges {
              node {
                name
                completed
                id
                numberOfAvailableTasks
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const GetTasksWithTagDocument = gql`
    query GetTasksWithTag($tagId: String!) {
  defaultDocument {
    tags {
      byId(id: $tagId) {
        tasks {
          edges {
            node {
              ...TaskViewModel
            }
          }
        }
      }
    }
  }
}
    ${TaskViewModelFragmentDoc}`;
export const GetTopLevelProjectsDocument = gql`
    query GetTopLevelProjects {
  defaultDocument {
    folders {
      edges {
        node {
          name
          id
          projects {
            edges {
              node {
                name
                completed
                id
                numberOfAvailableTasks
              }
            }
          }
        }
      }
    }
    projects {
      edges {
        node {
          id
          name
          completed
          numberOfAvailableTasks
        }
      }
    }
  }
}
    `;
export const GetTaskCreationSupportInfoDocument = gql`
    query GetTaskCreationSupportInfo {
  defaultDocument {
    folders {
      edges {
        node {
          name
          id
          projects {
            edges {
              node {
                name
                completed
                id
                numberOfAvailableTasks
              }
            }
          }
        }
      }
    }
    projects {
      edges {
        node {
          id
          name
          completed
          numberOfAvailableTasks
        }
      }
    }
    tags {
      edges {
        node {
          name
          id
          tags {
            edges {
              node {
                name
                id
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const GetNestedTagsDocument = gql`
    query GetNestedTags {
  defaultDocument {
    tags {
      edges {
        node {
          name
          id
          tags {
            edges {
              node {
                name
                id
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const GetPerspectiveNamesDocument = gql`
    query GetPerspectiveNames {
  defaultDocument {
    perspectiveNames
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
    },
    GetTasksWithTag(variables: GetTasksWithTagQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTasksWithTagQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTasksWithTagQuery>(GetTasksWithTagDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTasksWithTag');
    },
    GetTopLevelProjects(variables?: GetTopLevelProjectsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTopLevelProjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTopLevelProjectsQuery>(GetTopLevelProjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTopLevelProjects');
    },
    GetTaskCreationSupportInfo(variables?: GetTaskCreationSupportInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTaskCreationSupportInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTaskCreationSupportInfoQuery>(GetTaskCreationSupportInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTaskCreationSupportInfo');
    },
    GetNestedTags(variables?: GetNestedTagsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNestedTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNestedTagsQuery>(GetNestedTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNestedTags');
    },
    GetPerspectiveNames(variables?: GetPerspectiveNamesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPerspectiveNamesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPerspectiveNamesQuery>(GetPerspectiveNamesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPerspectiveNames');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;