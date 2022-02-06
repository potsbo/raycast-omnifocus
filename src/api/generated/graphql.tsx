import { GraphQLResolveInfo } from "graphql";
import { RequestInit } from "graphql-request/dist/types.dom";
import { useQuery, UseQueryOptions } from "react-query";
import { fetch } from "../fetch";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Project = {
  __typename?: "Project";
  id: Scalars["String"];
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  flattenedTasks: Array<Maybe<Task>>;
};

export type QueryFlattenedTasksArgs = {
  available?: InputMaybe<Scalars["Boolean"]>;
  flagged?: InputMaybe<Scalars["Boolean"]>;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type Task = {
  __typename?: "Task";
  completed: Scalars["Boolean"];
  containingProject?: Maybe<Project>;
  effectiveDueDate?: Maybe<Scalars["String"]>;
  effectivelyCompleted: Scalars["Boolean"];
  flagged: Scalars["Boolean"];
  id: Scalars["String"];
  name: Scalars["String"];
};

export type GetFlaggedTasksQueryVariables = Exact<{ [key: string]: never }>;

export type GetFlaggedTasksQuery = {
  __typename?: "Query";
  flattenedTasks: Array<{
    __typename?: "Task";
    name: string;
    id: string;
    effectiveDueDate?: string | null;
    completed: boolean;
    effectivelyCompleted: boolean;
    flagged: boolean;
    containingProject?: { __typename?: "Project"; id: string; name: string } | null;
  } | null>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

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
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Project: ResolverTypeWrapper<Project>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Task: ResolverTypeWrapper<Task>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  Int: Scalars["Int"];
  Project: Project;
  Query: {};
  String: Scalars["String"];
  Task: Task;
};

export type ProjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Project"] = ResolversParentTypes["Project"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  flattenedTasks?: Resolver<
    Array<Maybe<ResolversTypes["Task"]>>,
    ParentType,
    ContextType,
    Partial<QueryFlattenedTasksArgs>
  >;
};

export type TaskResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Task"] = ResolversParentTypes["Task"]
> = {
  completed?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  containingProject?: Resolver<Maybe<ResolversTypes["Project"]>, ParentType, ContextType>;
  effectiveDueDate?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  effectivelyCompleted?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
};

export const GetFlaggedTasksDocument = `
    query GetFlaggedTasks {
  flattenedTasks(flagged: true) {
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
}
    `;
export const useGetFlaggedTasksQuery = <TData = GetFlaggedTasksQuery, TError = unknown>(
  variables?: GetFlaggedTasksQueryVariables,
  options?: UseQueryOptions<GetFlaggedTasksQuery, TError, TData>
) =>
  useQuery<GetFlaggedTasksQuery, TError, TData>(
    variables === undefined ? ["GetFlaggedTasks"] : ["GetFlaggedTasks", variables],
    fetch<GetFlaggedTasksQuery, GetFlaggedTasksQueryVariables>(GetFlaggedTasksDocument, variables),
    options
  );
