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

/** The ancestor trees of this tree. */
export type AncestorTree = Node & TreeInterface & {
  __typename?: 'AncestorTree';
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
};

export type AncestorTreeConnection = Connection & {
  __typename?: 'AncestorTreeConnection';
  byId?: Maybe<AncestorTree>;
  edges: Array<AncestorTreeEdge>;
  pageInfo: PageInfo;
};


export type AncestorTreeConnectionByIdArgs = {
  id: Scalars['String'];
};

export type AncestorTreeEdge = Edge & {
  __typename?: 'AncestorTreeEdge';
  cursor: Scalars['String'];
  node: AncestorTree;
};

/** The application's top-level scripting object. */
export type Application = {
  __typename?: 'Application';
  /** This is the build number of the application, for example 63.1 or 63.  Major and minor versions are separated by a dot.  So 63.10 comes after 63.1. */
  buildNumber: Scalars['String'];
  /** The current time offset from a reference date. Useful for timing scripts. */
  currentTimeOffset: Scalars['Float'];
  /** The user's default document. */
  defaultDocument: Document;
  documents: DocumentConnection;
  /** Is this the active application? */
  frontmost: Scalars['Boolean'];
  /** The name of the application. */
  name: Scalars['String'];
  /** The names of all available perspectives in the default document. */
  perspectiveNames: Array<Scalars['String']>;
  perspectives: PerspectiveConnection;
  preferences: PreferenceConnection;
  /** The Quick Entry panel for the default document. */
  quickEntry: QuickEntryTree;
  /** The date on from which the date collated smart groups are based.  When set, the reference date will be rounded to the first instant of the day of the specified date. */
  referenceDate: Scalars['String'];
  /** The version number of the application. */
  version: Scalars['String'];
};

/** Represents an inline text attachment. */
export type Attachment = RichTextInterface & {
  __typename?: 'Attachment';
  /** The name of the font of the first character. */
  font: Scalars['String'];
  /** The size in points of the first character. */
  size: Scalars['Int'];
  /** The style of the text. */
  style: Style;
  /** The plain text contents of the rich text. */
  text: Scalars['String'];
};

/** This subdivides the text into chunks that all have the same attributes. */
export type AttributeRun = RichTextInterface & {
  __typename?: 'AttributeRun';
  /** The name of the font of the first character. */
  font: Scalars['String'];
  /** The size in points of the first character. */
  size: Scalars['Int'];
  /** The style of the text. */
  style: Style;
  /** The plain text contents of the rich text. */
  text: Scalars['String'];
};

/** A task that is available for action.  This is simply a filter on the existing tasks and should be considred a read-only element.  These cannot be created directly; instead create a normal task. */
export type AvailableTask = Node & TaskInterface & {
  __typename?: 'AvailableTask';
  /** True if the task has a task that must be completed prior to it being actionable. */
  blocked: Scalars['Boolean'];
  /** True if the task is completed. Use the "mark complete" and "mark incomplete" commands to change a task's status. */
  completed: Scalars['Boolean'];
  /** If true, complete when children are completed. */
  completedByChildren: Scalars['Boolean'];
  /** The task's date of completion. This can only be modified on a completed task to backdate the completion date. */
  completionDate?: Maybe<Scalars['String']>;
  /** The task's project, up however many levels of parent tasks.  Inbox tasks aren't considered contained by their provisionalliy assigned container, so if the task is actually an inbox task, this will be missing value. */
  containingProject?: Maybe<Project>;
  /** When the task was created.  This can only be set when the object is still in the inserted state.  For objects created in the document, it can be passed with the creation properties.  For objects in a quick entry tree, it can be set until the quick entry panel is saved. */
  creationDate: Scalars['String'];
  /** When the task should become available for action. */
  deferDate?: Maybe<Scalars['String']>;
  /** True if the task is dropped. Use the "mark dropped" and "mark incomplete" commands to change a task's status. */
  dropped: Scalars['Boolean'];
  /** The date the task was dropped. This can only be modified on a dropped task to backdate the dropped date. */
  droppedDate?: Maybe<Scalars['String']>;
  /** When the task must be finished. */
  dueDate?: Maybe<Scalars['String']>;
  /** When the task should become available for action (including inherited). */
  effectiveDeferDate?: Maybe<Scalars['String']>;
  /** When the task must be finished (including inherited). */
  effectiveDueDate?: Maybe<Scalars['String']>;
  /** True if the task is completed, or any of it's containing tasks or project are completed. */
  effectivelyCompleted: Scalars['Boolean'];
  /** True if the task is dropped, or any of it's containing tasks or project are dropped. */
  effectivelyDropped: Scalars['Boolean'];
  /** The estimated time, in whole minutes, that this task will take to finish. */
  estimatedMinutes?: Maybe<Scalars['Int']>;
  /** True if flagged */
  flagged: Scalars['Boolean'];
  flattenedTasks: FlattenedTaskConnection;
  /** The identifier of the task. */
  id: Scalars['String'];
  /** Returns true if the task itself is an inbox task or if the task is contained by an inbox task. */
  inInbox: Scalars['Boolean'];
  /** When the task was last modified. */
  modificationDate: Scalars['String'];
  /** The name of the task. */
  name: Scalars['String'];
  /** If the task is the next task of its containing project, next is true. */
  next: Scalars['Boolean'];
  /** The next defer date if this task repeats on a fixed schedule and it has a defer date. */
  nextDeferDate?: Maybe<Scalars['String']>;
  /** The next due date if this task repeats on a fixed schedule and it has a due date. */
  nextDueDate?: Maybe<Scalars['String']>;
  /** The note of the task. */
  note: RichText;
  /** The number of available direct children of this task. */
  numberOfAvailableTasks: Scalars['Int'];
  /** The number of completed direct children of this task. */
  numberOfCompletedTasks: Scalars['Int'];
  /** The number of direct children of this task. */
  numberOfTasks: Scalars['Int'];
  /** The task holding this task.  If this is missing value, then this is a top level task -- either the root of a project or an inbox item. */
  parentTask?: Maybe<Task>;
  /** The task's first tag. Setting this will remove the current first tag on the task, if any and move or add the new tag as the first tag on the task. Setting this to missing value will remove the current first tag and leave any other remaining tags. */
  primaryTag?: Maybe<Tag>;
  /** The repetition interval of the task, or missing value if it does not repeat. This property is deprecated in favor of “repetition rule” and is here only for backwards compatibility with existing scripts. */
  repetition?: Maybe<RepetitionInterval>;
  /** The repetition rule for this task, or missing value if it does not repeat. */
  repetitionRule?: Maybe<RepetitionRule>;
  /** If true, any children are sequentially dependent. */
  sequential: Scalars['Boolean'];
  /** When set, the due date and defer date properties will use floating time zones. (Note: if a Task has no due or defer dates assigned, this property will revert to the database’s default setting.) */
  shouldUseFloatingTimeZone: Scalars['Boolean'];
  /** The tags assigned to this task. */
  tags: TagConnection;
  /** The tasks having this task as their container. */
  tasks: TaskConnection;
};

export type AvailableTaskConnection = Connection & {
  __typename?: 'AvailableTaskConnection';
  byId?: Maybe<AvailableTask>;
  edges: Array<AvailableTaskEdge>;
  pageInfo: PageInfo;
};


export type AvailableTaskConnectionByIdArgs = {
  id: Scalars['String'];
};

export type AvailableTaskEdge = Edge & {
  __typename?: 'AvailableTaskEdge';
  cursor: Scalars['String'];
  node: AvailableTask;
};

/** A built-in perspective. */
export type BuiltinPerspective = Node & PerspectiveInterface & {
  __typename?: 'BuiltinPerspective';
  /** The identifier of the perspective. */
  id: Scalars['String'];
  /** The name of the perspective. */
  name: Scalars['String'];
};

export type BuiltinPerspectiveConnection = Connection & {
  __typename?: 'BuiltinPerspectiveConnection';
  byId?: Maybe<BuiltinPerspective>;
  edges: Array<BuiltinPerspectiveEdge>;
  pageInfo: PageInfo;
};


export type BuiltinPerspectiveConnectionByIdArgs = {
  id: Scalars['String'];
};

export type BuiltinPerspectiveEdge = Edge & {
  __typename?: 'BuiltinPerspectiveEdge';
  cursor: Scalars['String'];
  node: BuiltinPerspective;
};

/** This subdivides the text into characters. */
export type Character = RichTextInterface & {
  __typename?: 'Character';
  /** The name of the font of the first character. */
  font: Scalars['String'];
  /** The size in points of the first character. */
  size: Scalars['Int'];
  /** The style of the text. */
  style: Style;
  /** The plain text contents of the rich text. */
  text: Scalars['String'];
};

export type Condition = {
  enabled?: Scalars['Boolean'];
  field?: InputMaybe<Scalars['String']>;
  operands?: InputMaybe<Array<Condition>>;
  operator?: Scalars['String'];
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

/** The tree of objects in the main window content. */
export type ContentTree = Node & TreeInterface & {
  __typename?: 'ContentTree';
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** The list of possible identifiers that can be set as the selected grouping identifier. */
  availableGroupingIdentifiers: Array<Scalars['String']>;
  /** The list of possible identifiers that can be set as the selected sorting identifier. */
  availableSortingIdentifiers: Array<Scalars['String']>;
  /** The list of possible identifiers that can be set as the selected task duration filter identifier. */
  availableTaskDurationFilterIdentifiers: Array<Scalars['String']>;
  /** The list of possible identifiers that can be set as the selected task flagged filter identifier. */
  availableTaskFlaggedFilterIdentifiers: Array<Scalars['String']>;
  /** The list of possible identifiers that can be set as the selected task state filter identifier. */
  availableTaskStateFilterIdentifiers: Array<Scalars['String']>;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The currently selected grouping identifier, controlling how the results shown in the content area are grouped. */
  selectedGroupingIdentifier: Scalars['String'];
  /** The currently selected sorting identifier, controlling how the results shown in the content area are ordered. */
  selectedSortingIdentifier: Scalars['String'];
  /** The currently selected task duration filter identifier. */
  selectedTaskDurationFilterIdentifier: Scalars['String'];
  /** The currently selected task flagged filter identifier. */
  selectedTaskFlaggedFilterIdentifier: Scalars['String'];
  /** The currently selected task state filter identifier. */
  selectedTaskStateFilterIdentifier: Scalars['String'];
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
};

export type ContentTreeConnection = Connection & {
  __typename?: 'ContentTreeConnection';
  byId?: Maybe<ContentTree>;
  edges: Array<ContentTreeEdge>;
  pageInfo: PageInfo;
};


export type ContentTreeConnectionByIdArgs = {
  id: Scalars['String'];
};

export type ContentTreeEdge = Edge & {
  __typename?: 'ContentTreeEdge';
  cursor: Scalars['String'];
  node: ContentTree;
};

/** A user created perspective. */
export type CustomPerspective = Node & PerspectiveInterface & {
  __typename?: 'CustomPerspective';
  /** The identifier of the perspective. */
  id: Scalars['String'];
  /** The name of the perspective. */
  name: Scalars['String'];
};

export type CustomPerspectiveConnection = Connection & {
  __typename?: 'CustomPerspectiveConnection';
  byId?: Maybe<CustomPerspective>;
  edges: Array<CustomPerspectiveEdge>;
  pageInfo: PageInfo;
};


export type CustomPerspectiveConnectionByIdArgs = {
  id: Scalars['String'];
};

export type CustomPerspectiveEdge = Edge & {
  __typename?: 'CustomPerspectiveEdge';
  cursor: Scalars['String'];
  node: CustomPerspective;
};

/** Deprecated. Where you would look up a "context" by name, id, or index before, you can now use the term "tag". Where you would get or set the "context" property of a task before, you can now use "primary tag". You may also use the "add", "remove", and "move" commands to manage multiple ordered tags on a task now. */
export type DeprecatedContext = Node & TagInterface & {
  __typename?: 'DeprecatedContext';
  /** If false, tasks associated with this tag will be skipped when determining the next action for a project. */
  allowsNextAction: Scalars['Boolean'];
  /** A count of the number of unblocked and incomplete tasks of this tag and all its active descendent tags. */
  availableTaskCount: Scalars['Int'];
  availableTasks: AvailableTaskConnection;
  /** The containing tag. */
  container: Tag;
  /** Deprecated; use tags. */
  deprecatedContexts: DeprecatedContextConnection;
  /** Set if the tag is currently hidden or any of its container tags are hidden. */
  effectivelyHidden: Scalars['Boolean'];
  flattenedTags: FlattenedTagConnection;
  /** Set if the tag is currently hidden. */
  hidden: Scalars['Boolean'];
  /** The identifier of the tag. */
  id: Scalars['String'];
  /** The physical location associated with the tag. */
  location?: Maybe<LocationInformation>;
  /** The name of the tag. */
  name: Scalars['String'];
  /** The note of the tag. */
  note: RichText;
  /** A count of the number of incomplete tasks of this tag and all its active descendent tags. */
  remainingTaskCount: Scalars['Int'];
  remainingTasks: RemainingTaskConnection;
  /** The tags having this tag as their container. */
  tags: TagConnection;
  /** The tasks having this tag. */
  tasks: TaskConnection;
};

export type DeprecatedContextConnection = Connection & {
  __typename?: 'DeprecatedContextConnection';
  byId?: Maybe<DeprecatedContext>;
  edges: Array<DeprecatedContextEdge>;
  pageInfo: PageInfo;
};


export type DeprecatedContextConnectionByIdArgs = {
  id: Scalars['String'];
};

export type DeprecatedContextEdge = Edge & {
  __typename?: 'DeprecatedContextEdge';
  cursor: Scalars['String'];
  node: DeprecatedContext;
};

/** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
export type DescendantTree = Node & TreeInterface & {
  __typename?: 'DescendantTree';
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
};

export type DescendantTreeConnection = Connection & {
  __typename?: 'DescendantTreeConnection';
  byId?: Maybe<DescendantTree>;
  edges: Array<DescendantTreeEdge>;
  pageInfo: PageInfo;
};


export type DescendantTreeConnectionByIdArgs = {
  id: Scalars['String'];
};

export type DescendantTreeEdge = Edge & {
  __typename?: 'DescendantTreeEdge';
  cursor: Scalars['String'];
  node: DescendantTree;
};

/** A document. */
export type Document = {
  __typename?: 'Document';
  /** Whether the document can redo the most recently undone command. */
  canRedo: Scalars['Boolean'];
  /** Whether the document can undo the most recent command. */
  canUndo: Scalars['Boolean'];
  /** Whether the document will write compressed transactions to disk; defaults to true. */
  compressesTransactions: Scalars['Boolean'];
  /** Deprecated; use tags. */
  deprecatedContexts: DeprecatedContextConnection;
  /** If set, automatic cleanup of inbox items won't happen. */
  disableAutomaticInboxCleanup: Scalars['Boolean'];
  flattenedFolders: FlattenedFolderConnection;
  flattenedProjects: FlattenedProjectConnection;
  flattenedTags: FlattenedTagConnection;
  flattenedTasks: FlattenedTaskConnection;
  /** The subset of the sections that are folders; folders having this folder as their container. */
  folders: FolderConnection;
  /** The document's unique identifier. */
  id: Scalars['String'];
  inboxTasks: InboxTaskConnection;
  /** Whether the document will write computed summary information when writing transactions. */
  includesSummaries: Scalars['Boolean'];
  /** Date of the last sync. */
  lastSyncDate: Scalars['String'];
  /** Error message (if any) for the last sync. */
  lastSyncError: Scalars['String'];
  /** Has it been modified since the last save? */
  modified: Scalars['Boolean'];
  /** Its name. */
  name: Scalars['String'];
  /** The document's path on disk. */
  path: Scalars['String'];
  /** The names of all available perspectives in this document. */
  perspectiveNames: Array<Scalars['String']>;
  perspectives: PerspectiveConnection;
  /** The subset of the sections that are projects; projects having this folder as their container. */
  projects: ProjectConnection;
  /** The Quick Entry panel for the document. */
  quickEntry: QuickEntryTree;
  /** The projects and folders contained by no folder. */
  sections: SectionConnection;
  settings: SettingConnection;
  /** True if the document is currently syncing, false otherwise. */
  syncing: Scalars['Boolean'];
  /** The top-level tags of the document. */
  tags: TagConnection;
  tasks: TaskConnection;
  /** Whether the document will autosave. */
  willAutosave: Scalars['Boolean'];
};

export type DocumentConnection = {
  __typename?: 'DocumentConnection';
  byId?: Maybe<Document>;
  edges: Array<DocumentEdge>;
  pageInfo: PageInfo;
};


export type DocumentConnectionByIdArgs = {
  id: Scalars['String'];
};

export type DocumentEdge = {
  __typename?: 'DocumentEdge';
  cursor: Scalars['String'];
  node: Document;
};

export type Edge = {
  cursor: Scalars['String'];
  node: Node;
};

/** A flattened list of folders in a document. */
export type FlattenedFolder = FolderInterface & Node & {
  __typename?: 'FlattenedFolder';
  /** When the folder was created. */
  creationDate: Scalars['String'];
  /** Set if the folder is currently hidden or any of its container folders are hidden. */
  effectivelyHidden: Scalars['Boolean'];
  flattenedFolders: FlattenedFolderConnection;
  flattenedProjects: FlattenedProjectConnection;
  /** The subset of the sections that are folders; folders having this folder as their container. */
  folders: FolderConnection;
  /** Set if the folder is currently hidden. */
  hidden: Scalars['Boolean'];
  /** The identifier of the folder. */
  id: Scalars['String'];
  /** When the folder was last modified. */
  modificationDate: Scalars['String'];
  /** The name of the folder. */
  name: Scalars['String'];
  /** The note of the folder. */
  note: RichText;
  /** The subset of the sections that are projects; projects having this folder as their container. */
  projects: ProjectConnection;
  /** The projects and folders having this folder as their container. */
  sections: SectionConnection;
};

export type FlattenedFolderConnection = Connection & {
  __typename?: 'FlattenedFolderConnection';
  byId?: Maybe<FlattenedFolder>;
  edges: Array<FlattenedFolderEdge>;
  pageInfo: PageInfo;
};


export type FlattenedFolderConnectionByIdArgs = {
  id: Scalars['String'];
};

export type FlattenedFolderEdge = Edge & {
  __typename?: 'FlattenedFolderEdge';
  cursor: Scalars['String'];
  node: FlattenedFolder;
};

/** A flattened list of projects under a folder or document. */
export type FlattenedProject = Node & ProjectInterface & {
  __typename?: 'FlattenedProject';
  /** True if the project has a project that must be completed prior to it being actionable. */
  blocked: Scalars['Boolean'];
  /** True if the project is completed. Use the "mark complete" and "mark incomplete" commands to change a project's status. */
  completed: Scalars['Boolean'];
  /** If true, complete when children are completed. */
  completedByChildren: Scalars['Boolean'];
  /** The project's date of completion. This can only be modified on a completed project to backdate the completion date. */
  completionDate?: Maybe<Scalars['String']>;
  /** When the project was created.  This can only be set when the object is still in the inserted state.  For objects created in the document, it can be passed with the creation properties.  For objects in a quick entry tree, it can be set until the quick entry panel is saved. */
  creationDate: Scalars['String'];
  /** True if the project is the default holder of sington actions.  Only one project can have this flag set; setting it on a project will clear it on any other project having it.  Setting this to true will set 'singleton action holder' to true if not already so set. */
  defaultSingletonActionHolder: Scalars['Boolean'];
  /** When the project should become available for action. */
  deferDate?: Maybe<Scalars['String']>;
  /** True if the project is dropped. Use the "mark dropped" and "mark incomplete" commands to change a project's status. */
  dropped: Scalars['Boolean'];
  /** The date the project was dropped. This can only be modified on a dropped project to backdate the dropped date. */
  droppedDate?: Maybe<Scalars['String']>;
  /** When the project must be finished. */
  dueDate?: Maybe<Scalars['String']>;
  /** When the project should become available for action (including inherited). */
  effectiveDeferDate?: Maybe<Scalars['String']>;
  /** When the project must be finished (including inherited). */
  effectiveDueDate?: Maybe<Scalars['String']>;
  /** The effective status of the project. */
  effectiveStatus: ProjectStatus;
  /** True if the project is completed */
  effectivelyCompleted: Scalars['Boolean'];
  /** True if the project is dropped */
  effectivelyDropped: Scalars['Boolean'];
  /** The estimated time, in whole minutes, that this project will take to finish. */
  estimatedMinutes?: Maybe<Scalars['Int']>;
  /** True if flagged */
  flagged: Scalars['Boolean'];
  /** The folder of the project, or missing value if it is contained directly by the document. */
  folder?: Maybe<Folder>;
  /** The identifier of the project. */
  id: Scalars['String'];
  /** When the project was last reviewed. */
  lastReviewDate: Scalars['String'];
  /** When the project was last modified. */
  modificationDate: Scalars['String'];
  /** The name of the project. */
  name: Scalars['String'];
  /** The next defer date if this project repeats on a fixed schedule and it has a defer date. */
  nextDeferDate?: Maybe<Scalars['String']>;
  /** The next due date if this project repeats on a fixed schedule and it has a due date. */
  nextDueDate?: Maybe<Scalars['String']>;
  /** When the project should next be reviewed. Setting this to missing value will set the review date based off the last review date and review interval. */
  nextReviewDate?: Maybe<Scalars['String']>;
  /** The next actionable child of this project. */
  nextTask?: Maybe<Task>;
  /** The note of the project. */
  note: RichText;
  /** The number of available direct children of this project. */
  numberOfAvailableTasks: Scalars['Int'];
  /** The number of completed direct children of this project. */
  numberOfCompletedTasks: Scalars['Int'];
  /** The number of direct children of this project. */
  numberOfTasks: Scalars['Int'];
  /** The project's first tag. Setting this will remove the current first tag on the project, if any and move or add the new tag as the first tag on the project. Setting this to missing value will remove the current first tag and leave any other remaining tags. */
  primaryTag?: Maybe<Tag>;
  /** The repetition interval of the project, or missing value if it does not repeat. This property is deprecated in favor of “repetition rule” and is here only for backwards compatibility with existing scripts. */
  repetition?: Maybe<RepetitionInterval>;
  /** The repetition rule for this project, or missing value if it does not repeat. */
  repetitionRule?: Maybe<RepetitionRule>;
  /** The review interval for the project. */
  reviewInterval: RepetitionInterval;
  /** The root task of this project, holding the project's name, note, dates and child tasks. */
  rootTask: Task;
  /** If true, any children are sequentially dependent. */
  sequential: Scalars['Boolean'];
  /** When set, the due date and defer date properties will use floating time zones. (Note: if a Task has no due or defer dates assigned, this property will revert to the database’s default setting.) */
  shouldUseFloatingTimeZone: Scalars['Boolean'];
  /** True if the project contains singleton actions. */
  singletonActionHolder: Scalars['Boolean'];
  /** The status of the project. */
  status: ProjectStatus;
};

export type FlattenedProjectConnection = Connection & {
  __typename?: 'FlattenedProjectConnection';
  byId?: Maybe<FlattenedProject>;
  edges: Array<FlattenedProjectEdge>;
  pageInfo: PageInfo;
};


export type FlattenedProjectConnectionByIdArgs = {
  id: Scalars['String'];
};

export type FlattenedProjectEdge = Edge & {
  __typename?: 'FlattenedProjectEdge';
  cursor: Scalars['String'];
  node: FlattenedProject;
};

/** A flattened list of tags in a document. */
export type FlattenedTag = Node & TagInterface & {
  __typename?: 'FlattenedTag';
  /** If false, tasks associated with this tag will be skipped when determining the next action for a project. */
  allowsNextAction: Scalars['Boolean'];
  /** A count of the number of unblocked and incomplete tasks of this tag and all its active descendent tags. */
  availableTaskCount: Scalars['Int'];
  availableTasks: AvailableTaskConnection;
  /** The containing tag. */
  container: Tag;
  /** Deprecated; use tags. */
  deprecatedContexts: DeprecatedContextConnection;
  /** Set if the tag is currently hidden or any of its container tags are hidden. */
  effectivelyHidden: Scalars['Boolean'];
  flattenedTags: FlattenedTagConnection;
  /** Set if the tag is currently hidden. */
  hidden: Scalars['Boolean'];
  /** The identifier of the tag. */
  id: Scalars['String'];
  /** The physical location associated with the tag. */
  location?: Maybe<LocationInformation>;
  /** The name of the tag. */
  name: Scalars['String'];
  /** The note of the tag. */
  note: RichText;
  /** A count of the number of incomplete tasks of this tag and all its active descendent tags. */
  remainingTaskCount: Scalars['Int'];
  remainingTasks: RemainingTaskConnection;
  /** The tags having this tag as their container. */
  tags: TagConnection;
  /** The tasks having this tag. */
  tasks: TaskConnection;
};

export type FlattenedTagConnection = Connection & {
  __typename?: 'FlattenedTagConnection';
  byId?: Maybe<FlattenedTag>;
  edges: Array<FlattenedTagEdge>;
  pageInfo: PageInfo;
};


export type FlattenedTagConnectionByIdArgs = {
  id: Scalars['String'];
};

export type FlattenedTagEdge = Edge & {
  __typename?: 'FlattenedTagEdge';
  cursor: Scalars['String'];
  node: FlattenedTag;
};

/** A flattened list of tasks under a task or document. */
export type FlattenedTask = Node & TaskInterface & {
  __typename?: 'FlattenedTask';
  /** True if the task has a task that must be completed prior to it being actionable. */
  blocked: Scalars['Boolean'];
  /** True if the task is completed. Use the "mark complete" and "mark incomplete" commands to change a task's status. */
  completed: Scalars['Boolean'];
  /** If true, complete when children are completed. */
  completedByChildren: Scalars['Boolean'];
  /** The task's date of completion. This can only be modified on a completed task to backdate the completion date. */
  completionDate?: Maybe<Scalars['String']>;
  /** The task's project, up however many levels of parent tasks.  Inbox tasks aren't considered contained by their provisionalliy assigned container, so if the task is actually an inbox task, this will be missing value. */
  containingProject?: Maybe<Project>;
  /** When the task was created.  This can only be set when the object is still in the inserted state.  For objects created in the document, it can be passed with the creation properties.  For objects in a quick entry tree, it can be set until the quick entry panel is saved. */
  creationDate: Scalars['String'];
  /** When the task should become available for action. */
  deferDate?: Maybe<Scalars['String']>;
  /** True if the task is dropped. Use the "mark dropped" and "mark incomplete" commands to change a task's status. */
  dropped: Scalars['Boolean'];
  /** The date the task was dropped. This can only be modified on a dropped task to backdate the dropped date. */
  droppedDate?: Maybe<Scalars['String']>;
  /** When the task must be finished. */
  dueDate?: Maybe<Scalars['String']>;
  /** When the task should become available for action (including inherited). */
  effectiveDeferDate?: Maybe<Scalars['String']>;
  /** When the task must be finished (including inherited). */
  effectiveDueDate?: Maybe<Scalars['String']>;
  /** True if the task is completed, or any of it's containing tasks or project are completed. */
  effectivelyCompleted: Scalars['Boolean'];
  /** True if the task is dropped, or any of it's containing tasks or project are dropped. */
  effectivelyDropped: Scalars['Boolean'];
  /** The estimated time, in whole minutes, that this task will take to finish. */
  estimatedMinutes?: Maybe<Scalars['Int']>;
  /** True if flagged */
  flagged: Scalars['Boolean'];
  flattenedTasks: FlattenedTaskConnection;
  /** The identifier of the task. */
  id: Scalars['String'];
  /** Returns true if the task itself is an inbox task or if the task is contained by an inbox task. */
  inInbox: Scalars['Boolean'];
  /** When the task was last modified. */
  modificationDate: Scalars['String'];
  /** The name of the task. */
  name: Scalars['String'];
  /** If the task is the next task of its containing project, next is true. */
  next: Scalars['Boolean'];
  /** The next defer date if this task repeats on a fixed schedule and it has a defer date. */
  nextDeferDate?: Maybe<Scalars['String']>;
  /** The next due date if this task repeats on a fixed schedule and it has a due date. */
  nextDueDate?: Maybe<Scalars['String']>;
  /** The note of the task. */
  note: RichText;
  /** The number of available direct children of this task. */
  numberOfAvailableTasks: Scalars['Int'];
  /** The number of completed direct children of this task. */
  numberOfCompletedTasks: Scalars['Int'];
  /** The number of direct children of this task. */
  numberOfTasks: Scalars['Int'];
  /** The task holding this task.  If this is missing value, then this is a top level task -- either the root of a project or an inbox item. */
  parentTask?: Maybe<Task>;
  /** The task's first tag. Setting this will remove the current first tag on the task, if any and move or add the new tag as the first tag on the task. Setting this to missing value will remove the current first tag and leave any other remaining tags. */
  primaryTag?: Maybe<Tag>;
  /** The repetition interval of the task, or missing value if it does not repeat. This property is deprecated in favor of “repetition rule” and is here only for backwards compatibility with existing scripts. */
  repetition?: Maybe<RepetitionInterval>;
  /** The repetition rule for this task, or missing value if it does not repeat. */
  repetitionRule?: Maybe<RepetitionRule>;
  /** If true, any children are sequentially dependent. */
  sequential: Scalars['Boolean'];
  /** When set, the due date and defer date properties will use floating time zones. (Note: if a Task has no due or defer dates assigned, this property will revert to the database’s default setting.) */
  shouldUseFloatingTimeZone: Scalars['Boolean'];
  /** The tags assigned to this task. */
  tags: TagConnection;
  /** The tasks having this task as their container. */
  tasks: TaskConnection;
};

export type FlattenedTaskConnection = Connection & {
  __typename?: 'FlattenedTaskConnection';
  byId?: Maybe<FlattenedTask>;
  edges: Array<FlattenedTaskEdge>;
  pageInfo: PageInfo;
};


export type FlattenedTaskConnectionByIdArgs = {
  id: Scalars['String'];
};

export type FlattenedTaskEdge = Edge & {
  __typename?: 'FlattenedTaskEdge';
  cursor: Scalars['String'];
  node: FlattenedTask;
};

/** A group of projects and sub-folders representing an area of responsibility. */
export type Folder = FolderInterface & Node & SectionInterface & {
  __typename?: 'Folder';
  /** When the folder was created. */
  creationDate: Scalars['String'];
  /** Set if the folder is currently hidden or any of its container folders are hidden. */
  effectivelyHidden: Scalars['Boolean'];
  flattenedFolders: FlattenedFolderConnection;
  flattenedProjects: FlattenedProjectConnection;
  /** The subset of the sections that are folders; folders having this folder as their container. */
  folders: FolderConnection;
  /** Set if the folder is currently hidden. */
  hidden: Scalars['Boolean'];
  /** The identifier of the folder. */
  id: Scalars['String'];
  /** When the folder was last modified. */
  modificationDate: Scalars['String'];
  /** The name of the folder. */
  name: Scalars['String'];
  /** The note of the folder. */
  note: RichText;
  /** The subset of the sections that are projects; projects having this folder as their container. */
  projects: ProjectConnection;
  /** The projects and folders having this folder as their container. */
  sections: SectionConnection;
};

export type FolderConnection = Connection & {
  __typename?: 'FolderConnection';
  byId?: Maybe<FolderInterface>;
  edges: Array<FolderEdge>;
  pageInfo: PageInfo;
};


export type FolderConnectionByIdArgs = {
  id: Scalars['String'];
};

export type FolderEdge = Edge & {
  __typename?: 'FolderEdge';
  cursor: Scalars['String'];
  node: FolderInterface;
};

export type FolderInterface = {
  /** When the folder was created. */
  creationDate: Scalars['String'];
  /** Set if the folder is currently hidden or any of its container folders are hidden. */
  effectivelyHidden: Scalars['Boolean'];
  flattenedFolders: FlattenedFolderConnection;
  flattenedProjects: FlattenedProjectConnection;
  /** The subset of the sections that are folders; folders having this folder as their container. */
  folders: FolderConnection;
  /** Set if the folder is currently hidden. */
  hidden: Scalars['Boolean'];
  /** The identifier of the folder. */
  id: Scalars['String'];
  /** When the folder was last modified. */
  modificationDate: Scalars['String'];
  /** The name of the folder. */
  name: Scalars['String'];
  /** The note of the folder. */
  note: RichText;
  /** The subset of the sections that are projects; projects having this folder as their container. */
  projects: ProjectConnection;
  /** The projects and folders having this folder as their container. */
  sections: SectionConnection;
};

/** The sibling trees of this tree after it in the user-specified sort ordering. */
export type FollowingSibling = Node & TreeInterface & {
  __typename?: 'FollowingSibling';
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
};

export type FollowingSiblingConnection = Connection & {
  __typename?: 'FollowingSiblingConnection';
  byId?: Maybe<FollowingSibling>;
  edges: Array<FollowingSiblingEdge>;
  pageInfo: PageInfo;
};


export type FollowingSiblingConnectionByIdArgs = {
  id: Scalars['String'];
};

export type FollowingSiblingEdge = Edge & {
  __typename?: 'FollowingSiblingEdge';
  cursor: Scalars['String'];
  node: FollowingSibling;
};

/** A day in the forecast sidebar tree. */
export type ForecastDay = Node & {
  __typename?: 'ForecastDay';
  /** The count shown in the sidebar for this forecast day, or zero if there is no count shown. */
  badgeCount: Scalars['Int'];
  /** True if the forecast day has no content at all. Note that some content will not cause a badge to be shown in the sidebar, and some content is controlled by user preferences. */
  empty: Scalars['Boolean'];
  /** The identifier of the task. */
  id: Scalars['String'];
  /** A display name for the forecast day. */
  name: Scalars['String'];
};

export type ForecastDayConnection = Connection & {
  __typename?: 'ForecastDayConnection';
  byId?: Maybe<ForecastDay>;
  edges: Array<ForecastDayEdge>;
  pageInfo: PageInfo;
};


export type ForecastDayConnectionByIdArgs = {
  id: Scalars['String'];
};

export type ForecastDayEdge = Edge & {
  __typename?: 'ForecastDayEdge';
  cursor: Scalars['String'];
  node: ForecastDay;
};

export type ForecastDayInterface = {
  /** The count shown in the sidebar for this forecast day, or zero if there is no count shown. */
  badgeCount: Scalars['Int'];
  /** True if the forecast day has no content at all. Note that some content will not cause a badge to be shown in the sidebar, and some content is controlled by user preferences. */
  empty: Scalars['Boolean'];
  /** The identifier of the task. */
  id: Scalars['String'];
  /** A display name for the forecast day. */
  name: Scalars['String'];
};

/** The sidebar tree used when the window's sidebar tab property is set to forecast tab. */
export type ForecastSidebarTree = SidebarTreeInterface & {
  __typename?: 'ForecastSidebarTree';
  /** The list of possible smart group identifiers that can be set as the selected smart group identifier. */
  availableSmartGroupIdentifiers: Array<Scalars['String']>;
  forecastDays: ForecastDayConnection;
  /** The currently selected smart group identifier. */
  selectedSmartGroupIdentifier?: Maybe<Scalars['String']>;
};

/** A task that is in the document's inbox */
export type InboxTask = Node & TaskInterface & {
  __typename?: 'InboxTask';
  /** True if the task has a task that must be completed prior to it being actionable. */
  blocked: Scalars['Boolean'];
  /** True if the task is completed. Use the "mark complete" and "mark incomplete" commands to change a task's status. */
  completed: Scalars['Boolean'];
  /** If true, complete when children are completed. */
  completedByChildren: Scalars['Boolean'];
  /** The task's date of completion. This can only be modified on a completed task to backdate the completion date. */
  completionDate?: Maybe<Scalars['String']>;
  /** The task's project, up however many levels of parent tasks.  Inbox tasks aren't considered contained by their provisionalliy assigned container, so if the task is actually an inbox task, this will be missing value. */
  containingProject?: Maybe<Project>;
  /** When the task was created.  This can only be set when the object is still in the inserted state.  For objects created in the document, it can be passed with the creation properties.  For objects in a quick entry tree, it can be set until the quick entry panel is saved. */
  creationDate: Scalars['String'];
  /** When the task should become available for action. */
  deferDate?: Maybe<Scalars['String']>;
  /** True if the task is dropped. Use the "mark dropped" and "mark incomplete" commands to change a task's status. */
  dropped: Scalars['Boolean'];
  /** The date the task was dropped. This can only be modified on a dropped task to backdate the dropped date. */
  droppedDate?: Maybe<Scalars['String']>;
  /** When the task must be finished. */
  dueDate?: Maybe<Scalars['String']>;
  /** When the task should become available for action (including inherited). */
  effectiveDeferDate?: Maybe<Scalars['String']>;
  /** When the task must be finished (including inherited). */
  effectiveDueDate?: Maybe<Scalars['String']>;
  /** True if the task is completed, or any of it's containing tasks or project are completed. */
  effectivelyCompleted: Scalars['Boolean'];
  /** True if the task is dropped, or any of it's containing tasks or project are dropped. */
  effectivelyDropped: Scalars['Boolean'];
  /** The estimated time, in whole minutes, that this task will take to finish. */
  estimatedMinutes?: Maybe<Scalars['Int']>;
  /** True if flagged */
  flagged: Scalars['Boolean'];
  flattenedTasks: FlattenedTaskConnection;
  /** The identifier of the task. */
  id: Scalars['String'];
  /** Returns true if the task itself is an inbox task or if the task is contained by an inbox task. */
  inInbox: Scalars['Boolean'];
  /** When the task was last modified. */
  modificationDate: Scalars['String'];
  /** The name of the task. */
  name: Scalars['String'];
  /** If the task is the next task of its containing project, next is true. */
  next: Scalars['Boolean'];
  /** The next defer date if this task repeats on a fixed schedule and it has a defer date. */
  nextDeferDate?: Maybe<Scalars['String']>;
  /** The next due date if this task repeats on a fixed schedule and it has a due date. */
  nextDueDate?: Maybe<Scalars['String']>;
  /** The note of the task. */
  note: RichText;
  /** The number of available direct children of this task. */
  numberOfAvailableTasks: Scalars['Int'];
  /** The number of completed direct children of this task. */
  numberOfCompletedTasks: Scalars['Int'];
  /** The number of direct children of this task. */
  numberOfTasks: Scalars['Int'];
  /** The task holding this task.  If this is missing value, then this is a top level task -- either the root of a project or an inbox item. */
  parentTask?: Maybe<Task>;
  /** The task's first tag. Setting this will remove the current first tag on the task, if any and move or add the new tag as the first tag on the task. Setting this to missing value will remove the current first tag and leave any other remaining tags. */
  primaryTag?: Maybe<Tag>;
  /** The repetition interval of the task, or missing value if it does not repeat. This property is deprecated in favor of “repetition rule” and is here only for backwards compatibility with existing scripts. */
  repetition?: Maybe<RepetitionInterval>;
  /** The repetition rule for this task, or missing value if it does not repeat. */
  repetitionRule?: Maybe<RepetitionRule>;
  /** If true, any children are sequentially dependent. */
  sequential: Scalars['Boolean'];
  /** When set, the due date and defer date properties will use floating time zones. (Note: if a Task has no due or defer dates assigned, this property will revert to the database’s default setting.) */
  shouldUseFloatingTimeZone: Scalars['Boolean'];
  /** The tags assigned to this task. */
  tags: TagConnection;
  /** The tasks having this task as their container. */
  tasks: TaskConnection;
};

export type InboxTaskConnection = Connection & {
  __typename?: 'InboxTaskConnection';
  byId?: Maybe<InboxTask>;
  edges: Array<InboxTaskEdge>;
  pageInfo: PageInfo;
};


export type InboxTaskConnectionByIdArgs = {
  id: Scalars['String'];
};

export type InboxTaskEdge = Edge & {
  __typename?: 'InboxTaskEdge';
  cursor: Scalars['String'];
  node: InboxTask;
};

/** The tree in the sidebar representing the Inbox. */
export type InboxTree = Node & TreeInterface & {
  __typename?: 'InboxTree';
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
};

export type InboxTreeConnection = Connection & {
  __typename?: 'InboxTreeConnection';
  byId?: Maybe<InboxTree>;
  edges: Array<InboxTreeEdge>;
  pageInfo: PageInfo;
};


export type InboxTreeConnectionByIdArgs = {
  id: Scalars['String'];
};

export type InboxTreeEdge = Edge & {
  __typename?: 'InboxTreeEdge';
  cursor: Scalars['String'];
  node: InboxTree;
};

export enum IntervalUnit {
  /** Days */
  Day = 'DAY',
  /** Hours */
  Hour = 'HOUR',
  /** Minutes */
  Minute = 'MINUTE',
  /** Months */
  Month = 'MONTH',
  /** Weeks */
  Week = 'WEEK',
  /** Years */
  Year = 'YEAR'
}

/** The descendants of a tree that have no children themselves. */
export type Leaf = Node & TreeInterface & {
  __typename?: 'Leaf';
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
};

export type LeafConnection = Connection & {
  __typename?: 'LeafConnection';
  byId?: Maybe<Leaf>;
  edges: Array<LeafEdge>;
  pageInfo: PageInfo;
};


export type LeafConnectionByIdArgs = {
  id: Scalars['String'];
};

export type LeafEdge = Edge & {
  __typename?: 'LeafEdge';
  cursor: Scalars['String'];
  node: Leaf;
};

/** The tree in the sidebar representing the top level library of objects. */
export type LibraryTree = Node & TreeInterface & {
  __typename?: 'LibraryTree';
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
};

export type LibraryTreeConnection = Connection & {
  __typename?: 'LibraryTreeConnection';
  byId?: Maybe<LibraryTree>;
  edges: Array<LibraryTreeEdge>;
  pageInfo: PageInfo;
};


export type LibraryTreeConnectionByIdArgs = {
  id: Scalars['String'];
};

export type LibraryTreeEdge = Edge & {
  __typename?: 'LibraryTreeEdge';
  cursor: Scalars['String'];
  node: LibraryTree;
};

export type LocationInformation = {
  __typename?: 'LocationInformation';
  /** Altitude in meters from sea level. */
  altitude: Scalars['Float'];
  /** Latitude in degrees from -90 to +90. */
  latitude: Scalars['Float'];
  /** Longitude in degrees from -180 to +180. */
  longitude: Scalars['Float'];
  /** A display name for the location. */
  name: Scalars['String'];
  /** Radius of accuracy in kilometers, from 0.1km to 10km. */
  radius: Scalars['Float'];
  /** Location notification trigger. */
  trigger: LocationTrigger;
};

export enum LocationTrigger {
  /** notify when arriving at this location */
  NotifyWhenArriving = 'NOTIFY_WHEN_ARRIVING',
  /** notify when leaving this location */
  NotifyWhenLeaving = 'NOTIFY_WHEN_LEAVING'
}

export type Mutation = {
  __typename?: 'Mutation';
  pushInboxTask: InboxTask;
};


export type MutationPushInboxTaskArgs = {
  completionDate?: InputMaybe<Scalars['String']>;
  deferDate?: InputMaybe<Scalars['String']>;
  droppedDate?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['String']>;
  estimatedMinutes?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

/** A named style object. */
export type NamedStyle = Node & StyleInterface & {
  __typename?: 'NamedStyle';
  /** The name of the font of the style. */
  font: Scalars['String'];
  /** An identifier for the named style that is unique within its document.  Currently this identifier is not persistent between two different sessions of editing the document. */
  id: Scalars['String'];
  /** The name of the style.  Must be unique within the containing document. */
  name: Scalars['String'];
  namedStyles: NamedStyleConnection;
};

export type NamedStyleConnection = Connection & {
  __typename?: 'NamedStyleConnection';
  byId?: Maybe<NamedStyle>;
  edges: Array<NamedStyleEdge>;
  pageInfo: PageInfo;
};


export type NamedStyleConnectionByIdArgs = {
  id: Scalars['String'];
};

export type NamedStyleEdge = Edge & {
  __typename?: 'NamedStyleEdge';
  cursor: Scalars['String'];
  node: NamedStyle;
};

export type NamedStyleInterface = {
  /** An identifier for the named style that is unique within its document.  Currently this identifier is not persistent between two different sessions of editing the document. */
  id: Scalars['String'];
  /** The name of the style.  Must be unique within the containing document. */
  name: Scalars['String'];
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

/** This subdivides the text into paragraphs. */
export type Paragraph = RichTextInterface & {
  __typename?: 'Paragraph';
  /** The name of the font of the first character. */
  font: Scalars['String'];
  /** The size in points of the first character. */
  size: Scalars['Int'];
  /** The style of the text. */
  style: Style;
  /** The plain text contents of the rich text. */
  text: Scalars['String'];
};

/** A perspective. */
export type Perspective = Node & PerspectiveInterface & {
  __typename?: 'Perspective';
  /** The identifier of the perspective. */
  id: Scalars['String'];
  /** The name of the perspective. */
  name: Scalars['String'];
};

export type PerspectiveConnection = Connection & {
  __typename?: 'PerspectiveConnection';
  byId?: Maybe<PerspectiveInterface>;
  edges: Array<PerspectiveEdge>;
  pageInfo: PageInfo;
};


export type PerspectiveConnectionByIdArgs = {
  id: Scalars['String'];
};

export type PerspectiveEdge = Edge & {
  __typename?: 'PerspectiveEdge';
  cursor: Scalars['String'];
  node: PerspectiveInterface;
};

export type PerspectiveInterface = {
  /** The identifier of the perspective. */
  id: Scalars['String'];
  /** The name of the perspective. */
  name: Scalars['String'];
};

/** The sibling trees of this tree before it in the user-specified sort ordering. */
export type PrecedingSibling = Node & TreeInterface & {
  __typename?: 'PrecedingSibling';
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
};

export type PrecedingSiblingConnection = Connection & {
  __typename?: 'PrecedingSiblingConnection';
  byId?: Maybe<PrecedingSibling>;
  edges: Array<PrecedingSiblingEdge>;
  pageInfo: PageInfo;
};


export type PrecedingSiblingConnectionByIdArgs = {
  id: Scalars['String'];
};

export type PrecedingSiblingEdge = Edge & {
  __typename?: 'PrecedingSiblingEdge';
  cursor: Scalars['String'];
  node: PrecedingSibling;
};

/** Application preference */
export type Preference = Node & {
  __typename?: 'Preference';
  /** The identifier of the preference. */
  id: Scalars['String'];
};

export type PreferenceConnection = Connection & {
  __typename?: 'PreferenceConnection';
  byId?: Maybe<Preference>;
  edges: Array<PreferenceEdge>;
  pageInfo: PageInfo;
};


export type PreferenceConnectionByIdArgs = {
  id: Scalars['String'];
};

export type PreferenceEdge = Edge & {
  __typename?: 'PreferenceEdge';
  cursor: Scalars['String'];
  node: Preference;
};

export type PreferenceInterface = {
  /** The identifier of the preference. */
  id: Scalars['String'];
};

/** A project. */
export type Project = Node & ProjectInterface & SectionInterface & {
  __typename?: 'Project';
  /** True if the project has a project that must be completed prior to it being actionable. */
  blocked: Scalars['Boolean'];
  /** True if the project is completed. Use the "mark complete" and "mark incomplete" commands to change a project's status. */
  completed: Scalars['Boolean'];
  /** If true, complete when children are completed. */
  completedByChildren: Scalars['Boolean'];
  /** The project's date of completion. This can only be modified on a completed project to backdate the completion date. */
  completionDate?: Maybe<Scalars['String']>;
  /** When the project was created.  This can only be set when the object is still in the inserted state.  For objects created in the document, it can be passed with the creation properties.  For objects in a quick entry tree, it can be set until the quick entry panel is saved. */
  creationDate: Scalars['String'];
  /** True if the project is the default holder of sington actions.  Only one project can have this flag set; setting it on a project will clear it on any other project having it.  Setting this to true will set 'singleton action holder' to true if not already so set. */
  defaultSingletonActionHolder: Scalars['Boolean'];
  /** When the project should become available for action. */
  deferDate?: Maybe<Scalars['String']>;
  /** True if the project is dropped. Use the "mark dropped" and "mark incomplete" commands to change a project's status. */
  dropped: Scalars['Boolean'];
  /** The date the project was dropped. This can only be modified on a dropped project to backdate the dropped date. */
  droppedDate?: Maybe<Scalars['String']>;
  /** When the project must be finished. */
  dueDate?: Maybe<Scalars['String']>;
  /** When the project should become available for action (including inherited). */
  effectiveDeferDate?: Maybe<Scalars['String']>;
  /** When the project must be finished (including inherited). */
  effectiveDueDate?: Maybe<Scalars['String']>;
  /** The effective status of the project. */
  effectiveStatus: ProjectStatus;
  /** True if the project is completed */
  effectivelyCompleted: Scalars['Boolean'];
  /** True if the project is dropped */
  effectivelyDropped: Scalars['Boolean'];
  /** The estimated time, in whole minutes, that this project will take to finish. */
  estimatedMinutes?: Maybe<Scalars['Int']>;
  /** True if flagged */
  flagged: Scalars['Boolean'];
  /** The folder of the project, or missing value if it is contained directly by the document. */
  folder?: Maybe<Folder>;
  /** The identifier of the project. */
  id: Scalars['String'];
  /** When the project was last reviewed. */
  lastReviewDate: Scalars['String'];
  /** When the project was last modified. */
  modificationDate: Scalars['String'];
  /** The name of the project. */
  name: Scalars['String'];
  /** The next defer date if this project repeats on a fixed schedule and it has a defer date. */
  nextDeferDate?: Maybe<Scalars['String']>;
  /** The next due date if this project repeats on a fixed schedule and it has a due date. */
  nextDueDate?: Maybe<Scalars['String']>;
  /** When the project should next be reviewed. Setting this to missing value will set the review date based off the last review date and review interval. */
  nextReviewDate?: Maybe<Scalars['String']>;
  /** The next actionable child of this project. */
  nextTask?: Maybe<Task>;
  /** The note of the project. */
  note: RichText;
  /** The number of available direct children of this project. */
  numberOfAvailableTasks: Scalars['Int'];
  /** The number of completed direct children of this project. */
  numberOfCompletedTasks: Scalars['Int'];
  /** The number of direct children of this project. */
  numberOfTasks: Scalars['Int'];
  /** The project's first tag. Setting this will remove the current first tag on the project, if any and move or add the new tag as the first tag on the project. Setting this to missing value will remove the current first tag and leave any other remaining tags. */
  primaryTag?: Maybe<Tag>;
  /** The repetition interval of the project, or missing value if it does not repeat. This property is deprecated in favor of “repetition rule” and is here only for backwards compatibility with existing scripts. */
  repetition?: Maybe<RepetitionInterval>;
  /** The repetition rule for this project, or missing value if it does not repeat. */
  repetitionRule?: Maybe<RepetitionRule>;
  /** The review interval for the project. */
  reviewInterval: RepetitionInterval;
  /** The root task of this project, holding the project's name, note, dates and child tasks. */
  rootTask: Task;
  /** If true, any children are sequentially dependent. */
  sequential: Scalars['Boolean'];
  /** When set, the due date and defer date properties will use floating time zones. (Note: if a Task has no due or defer dates assigned, this property will revert to the database’s default setting.) */
  shouldUseFloatingTimeZone: Scalars['Boolean'];
  /** True if the project contains singleton actions. */
  singletonActionHolder: Scalars['Boolean'];
  /** The status of the project. */
  status: ProjectStatus;
};

export type ProjectConnection = Connection & {
  __typename?: 'ProjectConnection';
  byId?: Maybe<ProjectInterface>;
  edges: Array<ProjectEdge>;
  pageInfo: PageInfo;
};


export type ProjectConnectionByIdArgs = {
  id: Scalars['String'];
};

export type ProjectEdge = Edge & {
  __typename?: 'ProjectEdge';
  cursor: Scalars['String'];
  node: ProjectInterface;
};

export type ProjectInterface = {
  /** True if the project has a project that must be completed prior to it being actionable. */
  blocked: Scalars['Boolean'];
  /** True if the project is completed. Use the "mark complete" and "mark incomplete" commands to change a project's status. */
  completed: Scalars['Boolean'];
  /** If true, complete when children are completed. */
  completedByChildren: Scalars['Boolean'];
  /** The project's date of completion. This can only be modified on a completed project to backdate the completion date. */
  completionDate?: Maybe<Scalars['String']>;
  /** When the project was created.  This can only be set when the object is still in the inserted state.  For objects created in the document, it can be passed with the creation properties.  For objects in a quick entry tree, it can be set until the quick entry panel is saved. */
  creationDate: Scalars['String'];
  /** True if the project is the default holder of sington actions.  Only one project can have this flag set; setting it on a project will clear it on any other project having it.  Setting this to true will set 'singleton action holder' to true if not already so set. */
  defaultSingletonActionHolder: Scalars['Boolean'];
  /** When the project should become available for action. */
  deferDate?: Maybe<Scalars['String']>;
  /** True if the project is dropped. Use the "mark dropped" and "mark incomplete" commands to change a project's status. */
  dropped: Scalars['Boolean'];
  /** The date the project was dropped. This can only be modified on a dropped project to backdate the dropped date. */
  droppedDate?: Maybe<Scalars['String']>;
  /** When the project must be finished. */
  dueDate?: Maybe<Scalars['String']>;
  /** When the project should become available for action (including inherited). */
  effectiveDeferDate?: Maybe<Scalars['String']>;
  /** When the project must be finished (including inherited). */
  effectiveDueDate?: Maybe<Scalars['String']>;
  /** The effective status of the project. */
  effectiveStatus: ProjectStatus;
  /** True if the project is completed */
  effectivelyCompleted: Scalars['Boolean'];
  /** True if the project is dropped */
  effectivelyDropped: Scalars['Boolean'];
  /** The estimated time, in whole minutes, that this project will take to finish. */
  estimatedMinutes?: Maybe<Scalars['Int']>;
  /** True if flagged */
  flagged: Scalars['Boolean'];
  /** The folder of the project, or missing value if it is contained directly by the document. */
  folder?: Maybe<Folder>;
  /** The identifier of the project. */
  id: Scalars['String'];
  /** When the project was last reviewed. */
  lastReviewDate: Scalars['String'];
  /** When the project was last modified. */
  modificationDate: Scalars['String'];
  /** The name of the project. */
  name: Scalars['String'];
  /** The next defer date if this project repeats on a fixed schedule and it has a defer date. */
  nextDeferDate?: Maybe<Scalars['String']>;
  /** The next due date if this project repeats on a fixed schedule and it has a due date. */
  nextDueDate?: Maybe<Scalars['String']>;
  /** When the project should next be reviewed. Setting this to missing value will set the review date based off the last review date and review interval. */
  nextReviewDate?: Maybe<Scalars['String']>;
  /** The next actionable child of this project. */
  nextTask?: Maybe<Task>;
  /** The note of the project. */
  note: RichText;
  /** The number of available direct children of this project. */
  numberOfAvailableTasks: Scalars['Int'];
  /** The number of completed direct children of this project. */
  numberOfCompletedTasks: Scalars['Int'];
  /** The number of direct children of this project. */
  numberOfTasks: Scalars['Int'];
  /** The project's first tag. Setting this will remove the current first tag on the project, if any and move or add the new tag as the first tag on the project. Setting this to missing value will remove the current first tag and leave any other remaining tags. */
  primaryTag?: Maybe<Tag>;
  /** The repetition interval of the project, or missing value if it does not repeat. This property is deprecated in favor of “repetition rule” and is here only for backwards compatibility with existing scripts. */
  repetition?: Maybe<RepetitionInterval>;
  /** The repetition rule for this project, or missing value if it does not repeat. */
  repetitionRule?: Maybe<RepetitionRule>;
  /** The review interval for the project. */
  reviewInterval: RepetitionInterval;
  /** The root task of this project, holding the project's name, note, dates and child tasks. */
  rootTask: Task;
  /** If true, any children are sequentially dependent. */
  sequential: Scalars['Boolean'];
  /** When set, the due date and defer date properties will use floating time zones. (Note: if a Task has no due or defer dates assigned, this property will revert to the database’s default setting.) */
  shouldUseFloatingTimeZone: Scalars['Boolean'];
  /** True if the project contains singleton actions. */
  singletonActionHolder: Scalars['Boolean'];
  /** The status of the project. */
  status: ProjectStatus;
};

export enum ProjectStatus {
  /** Active */
  ActiveStatus = 'ACTIVE_STATUS',
  /** Done */
  DoneStatus = 'DONE_STATUS',
  /** Dropped */
  DroppedStatus = 'DROPPED_STATUS',
  /** On Hold */
  OnHoldStatus = 'ON_HOLD_STATUS'
}

export type Query = {
  __typename?: 'Query';
  application: Application;
};

/** The Quick Entry panel. */
export type QuickEntryTree = Node & TreeInterface & {
  __typename?: 'QuickEntryTree';
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** Deprecated; use tags. */
  deprecatedContexts: DeprecatedContextConnection;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  folders: FolderConnection;
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  inboxTasks: InboxTaskConnection;
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  projects: ProjectConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  tags: TagConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
  /** Whether the quick entry panel is currently visible. */
  visible: Scalars['Boolean'];
};

export type QuickEntryTreeConnection = Connection & {
  __typename?: 'QuickEntryTreeConnection';
  byId?: Maybe<QuickEntryTree>;
  edges: Array<QuickEntryTreeEdge>;
  pageInfo: PageInfo;
};


export type QuickEntryTreeConnectionByIdArgs = {
  id: Scalars['String'];
};

export type QuickEntryTreeEdge = Edge & {
  __typename?: 'QuickEntryTreeEdge';
  cursor: Scalars['String'];
  node: QuickEntryTree;
};

/** A task that is not complete, though it may be blocked.  This is simply a filter on the existing tasks and should be considred a read-only element.  These cannot be created directly; instead create a normal task. */
export type RemainingTask = Node & TaskInterface & {
  __typename?: 'RemainingTask';
  /** True if the task has a task that must be completed prior to it being actionable. */
  blocked: Scalars['Boolean'];
  /** True if the task is completed. Use the "mark complete" and "mark incomplete" commands to change a task's status. */
  completed: Scalars['Boolean'];
  /** If true, complete when children are completed. */
  completedByChildren: Scalars['Boolean'];
  /** The task's date of completion. This can only be modified on a completed task to backdate the completion date. */
  completionDate?: Maybe<Scalars['String']>;
  /** The task's project, up however many levels of parent tasks.  Inbox tasks aren't considered contained by their provisionalliy assigned container, so if the task is actually an inbox task, this will be missing value. */
  containingProject?: Maybe<Project>;
  /** When the task was created.  This can only be set when the object is still in the inserted state.  For objects created in the document, it can be passed with the creation properties.  For objects in a quick entry tree, it can be set until the quick entry panel is saved. */
  creationDate: Scalars['String'];
  /** When the task should become available for action. */
  deferDate?: Maybe<Scalars['String']>;
  /** True if the task is dropped. Use the "mark dropped" and "mark incomplete" commands to change a task's status. */
  dropped: Scalars['Boolean'];
  /** The date the task was dropped. This can only be modified on a dropped task to backdate the dropped date. */
  droppedDate?: Maybe<Scalars['String']>;
  /** When the task must be finished. */
  dueDate?: Maybe<Scalars['String']>;
  /** When the task should become available for action (including inherited). */
  effectiveDeferDate?: Maybe<Scalars['String']>;
  /** When the task must be finished (including inherited). */
  effectiveDueDate?: Maybe<Scalars['String']>;
  /** True if the task is completed, or any of it's containing tasks or project are completed. */
  effectivelyCompleted: Scalars['Boolean'];
  /** True if the task is dropped, or any of it's containing tasks or project are dropped. */
  effectivelyDropped: Scalars['Boolean'];
  /** The estimated time, in whole minutes, that this task will take to finish. */
  estimatedMinutes?: Maybe<Scalars['Int']>;
  /** True if flagged */
  flagged: Scalars['Boolean'];
  flattenedTasks: FlattenedTaskConnection;
  /** The identifier of the task. */
  id: Scalars['String'];
  /** Returns true if the task itself is an inbox task or if the task is contained by an inbox task. */
  inInbox: Scalars['Boolean'];
  /** When the task was last modified. */
  modificationDate: Scalars['String'];
  /** The name of the task. */
  name: Scalars['String'];
  /** If the task is the next task of its containing project, next is true. */
  next: Scalars['Boolean'];
  /** The next defer date if this task repeats on a fixed schedule and it has a defer date. */
  nextDeferDate?: Maybe<Scalars['String']>;
  /** The next due date if this task repeats on a fixed schedule and it has a due date. */
  nextDueDate?: Maybe<Scalars['String']>;
  /** The note of the task. */
  note: RichText;
  /** The number of available direct children of this task. */
  numberOfAvailableTasks: Scalars['Int'];
  /** The number of completed direct children of this task. */
  numberOfCompletedTasks: Scalars['Int'];
  /** The number of direct children of this task. */
  numberOfTasks: Scalars['Int'];
  /** The task holding this task.  If this is missing value, then this is a top level task -- either the root of a project or an inbox item. */
  parentTask?: Maybe<Task>;
  /** The task's first tag. Setting this will remove the current first tag on the task, if any and move or add the new tag as the first tag on the task. Setting this to missing value will remove the current first tag and leave any other remaining tags. */
  primaryTag?: Maybe<Tag>;
  /** The repetition interval of the task, or missing value if it does not repeat. This property is deprecated in favor of “repetition rule” and is here only for backwards compatibility with existing scripts. */
  repetition?: Maybe<RepetitionInterval>;
  /** The repetition rule for this task, or missing value if it does not repeat. */
  repetitionRule?: Maybe<RepetitionRule>;
  /** If true, any children are sequentially dependent. */
  sequential: Scalars['Boolean'];
  /** When set, the due date and defer date properties will use floating time zones. (Note: if a Task has no due or defer dates assigned, this property will revert to the database’s default setting.) */
  shouldUseFloatingTimeZone: Scalars['Boolean'];
  /** The tags assigned to this task. */
  tags: TagConnection;
  /** The tasks having this task as their container. */
  tasks: TaskConnection;
};

export type RemainingTaskConnection = Connection & {
  __typename?: 'RemainingTaskConnection';
  byId?: Maybe<RemainingTask>;
  edges: Array<RemainingTaskEdge>;
  pageInfo: PageInfo;
};


export type RemainingTaskConnectionByIdArgs = {
  id: Scalars['String'];
};

export type RemainingTaskEdge = Edge & {
  __typename?: 'RemainingTaskEdge';
  cursor: Scalars['String'];
  node: RemainingTask;
};

export type RepetitionInterval = {
  __typename?: 'RepetitionInterval';
  /** If fixed, the next repetition will be relative to a fixed calendar.  If sliding, the next repetition will be calculated when needed. */
  fixed: Scalars['Boolean'];
  /** The count of the repetition interval. */
  steps: Scalars['Int'];
  /** The units of the repetition interval. */
  unit: IntervalUnit;
};

export enum RepetitionMethod {
  /** Due again after completion. */
  DueAfterCompletion = 'DUE_AFTER_COMPLETION',
  /** Repeat on a fixed schedule. */
  FixedRepetition = 'FIXED_REPETITION',
  /** Start again after completion. */
  StartAfterCompletion = 'START_AFTER_COMPLETION'
}

export type RepetitionRule = {
  __typename?: 'RepetitionRule';
  /** The iCalendar (RFC 2445) string describing the recurrence. */
  recurrence: Scalars['String'];
  /** The repetition method. If fixed, the next repetition will be relative to a fixed calendar.  If sliding, the next repetition will be calculated when the action or inbox item is resolved. */
  repetitionMethod: RepetitionMethod;
};

/** Rich (styled) text */
export type RichText = RichTextInterface & {
  __typename?: 'RichText';
  /** Alignment of the text. */
  alignment: TextAlignment;
  /** Number of pixels shifted above or below the normal baseline. */
  baselineOffset: Scalars['Float'];
  /** The name of the font of the first character. */
  font: Scalars['String'];
  /** The size in points of the first character. */
  size: Scalars['Int'];
  /** The style of the text. */
  style: Style;
  /** The superscript level of the text. */
  superscript: Scalars['Int'];
  /** The plain text contents of the rich text. */
  text: Scalars['String'];
  /** Is the first character underlined? */
  underlined: Scalars['Boolean'];
};

export type RichTextInterface = {
  /** The name of the font of the first character. */
  font: Scalars['String'];
  /** The size in points of the first character. */
  size: Scalars['Int'];
  /** The style of the text. */
  style: Style;
  /** The plain text contents of the rich text. */
  text: Scalars['String'];
};

/** A portion of a folder or document; either a project or a folder. */
export type Section = Node & SectionInterface & {
  __typename?: 'Section';
  /** The identifier of the project or folder. */
  id: Scalars['String'];
  /** The name of the project or folder. */
  name: Scalars['String'];
};

export type SectionConnection = Connection & {
  __typename?: 'SectionConnection';
  byId?: Maybe<SectionInterface>;
  edges: Array<SectionEdge>;
  pageInfo: PageInfo;
};


export type SectionConnectionByIdArgs = {
  id: Scalars['String'];
};

export type SectionEdge = Edge & {
  __typename?: 'SectionEdge';
  cursor: Scalars['String'];
  node: SectionInterface;
};

export type SectionInterface = {
  /** The identifier of the project or folder. */
  id: Scalars['String'];
  /** The name of the project or folder. */
  name: Scalars['String'];
};

/** The trees of this tree that are selected in the user interface, possibly including this tree. */
export type SelectedTree = Node & TreeInterface & {
  __typename?: 'SelectedTree';
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
};

export type SelectedTreeConnection = Connection & {
  __typename?: 'SelectedTreeConnection';
  byId?: Maybe<SelectedTree>;
  edges: Array<SelectedTreeEdge>;
  pageInfo: PageInfo;
};


export type SelectedTreeConnectionByIdArgs = {
  id: Scalars['String'];
};

export type SelectedTreeEdge = Edge & {
  __typename?: 'SelectedTreeEdge';
  cursor: Scalars['String'];
  node: SelectedTree;
};

/** Document setting */
export type Setting = Node & {
  __typename?: 'Setting';
  /** The identifier of the setting. */
  id: Scalars['String'];
};

export type SettingConnection = Connection & {
  __typename?: 'SettingConnection';
  byId?: Maybe<Setting>;
  edges: Array<SettingEdge>;
  pageInfo: PageInfo;
};


export type SettingConnectionByIdArgs = {
  id: Scalars['String'];
};

export type SettingEdge = Edge & {
  __typename?: 'SettingEdge';
  cursor: Scalars['String'];
  node: Setting;
};

export type SettingInterface = {
  /** The identifier of the setting. */
  id: Scalars['String'];
};

/** The tree of objects in the window sidebar. */
export type SidebarTree = Node & SidebarTreeInterface & TreeInterface & {
  __typename?: 'SidebarTree';
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** The list of possible smart group identifiers that can be set as the selected smart group identifier. */
  availableSmartGroupIdentifiers: Array<Scalars['String']>;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The currently selected smart group identifier. */
  selectedSmartGroupIdentifier?: Maybe<Scalars['String']>;
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
};

export type SidebarTreeInterface = {
  /** The list of possible smart group identifiers that can be set as the selected smart group identifier. */
  availableSmartGroupIdentifiers: Array<Scalars['String']>;
  /** The currently selected smart group identifier. */
  selectedSmartGroupIdentifier?: Maybe<Scalars['String']>;
};

/** A style object. */
export type Style = StyleInterface & {
  __typename?: 'Style';
  /** The name of the font of the style. */
  font: Scalars['String'];
  namedStyles: NamedStyleConnection;
};

export type StyleInterface = {
  /** The name of the font of the style. */
  font: Scalars['String'];
  namedStyles: NamedStyleConnection;
};

/** A tag. */
export type Tag = Node & TagInterface & {
  __typename?: 'Tag';
  /** If false, tasks associated with this tag will be skipped when determining the next action for a project. */
  allowsNextAction: Scalars['Boolean'];
  /** A count of the number of unblocked and incomplete tasks of this tag and all its active descendent tags. */
  availableTaskCount: Scalars['Int'];
  availableTasks: AvailableTaskConnection;
  /** The containing tag. */
  container: Tag;
  /** Deprecated; use tags. */
  deprecatedContexts: DeprecatedContextConnection;
  /** Set if the tag is currently hidden or any of its container tags are hidden. */
  effectivelyHidden: Scalars['Boolean'];
  flattenedTags: FlattenedTagConnection;
  /** Set if the tag is currently hidden. */
  hidden: Scalars['Boolean'];
  /** The identifier of the tag. */
  id: Scalars['String'];
  /** The physical location associated with the tag. */
  location?: Maybe<LocationInformation>;
  /** The name of the tag. */
  name: Scalars['String'];
  /** The note of the tag. */
  note: RichText;
  /** A count of the number of incomplete tasks of this tag and all its active descendent tags. */
  remainingTaskCount: Scalars['Int'];
  remainingTasks: RemainingTaskConnection;
  /** The tags having this tag as their container. */
  tags: TagConnection;
  /** The tasks having this tag. */
  tasks: TaskConnection;
};

export type TagConnection = Connection & {
  __typename?: 'TagConnection';
  byId?: Maybe<TagInterface>;
  edges: Array<TagEdge>;
  pageInfo: PageInfo;
};


export type TagConnectionByIdArgs = {
  id: Scalars['String'];
};

export type TagEdge = Edge & {
  __typename?: 'TagEdge';
  cursor: Scalars['String'];
  node: TagInterface;
};

export type TagInterface = {
  /** If false, tasks associated with this tag will be skipped when determining the next action for a project. */
  allowsNextAction: Scalars['Boolean'];
  /** A count of the number of unblocked and incomplete tasks of this tag and all its active descendent tags. */
  availableTaskCount: Scalars['Int'];
  availableTasks: AvailableTaskConnection;
  /** The containing tag. */
  container: Tag;
  /** Deprecated; use tags. */
  deprecatedContexts: DeprecatedContextConnection;
  /** Set if the tag is currently hidden or any of its container tags are hidden. */
  effectivelyHidden: Scalars['Boolean'];
  flattenedTags: FlattenedTagConnection;
  /** Set if the tag is currently hidden. */
  hidden: Scalars['Boolean'];
  /** The identifier of the tag. */
  id: Scalars['String'];
  /** The physical location associated with the tag. */
  location?: Maybe<LocationInformation>;
  /** The name of the tag. */
  name: Scalars['String'];
  /** The note of the tag. */
  note: RichText;
  /** A count of the number of incomplete tasks of this tag and all its active descendent tags. */
  remainingTaskCount: Scalars['Int'];
  remainingTasks: RemainingTaskConnection;
  /** The tags having this tag as their container. */
  tags: TagConnection;
  /** The tasks having this tag. */
  tasks: TaskConnection;
};

/** A task. This might represent the root of a project, an action within a project or other action or an inbox item. */
export type Task = Node & TaskInterface & {
  __typename?: 'Task';
  /** True if the task has a task that must be completed prior to it being actionable. */
  blocked: Scalars['Boolean'];
  /** True if the task is completed. Use the "mark complete" and "mark incomplete" commands to change a task's status. */
  completed: Scalars['Boolean'];
  /** If true, complete when children are completed. */
  completedByChildren: Scalars['Boolean'];
  /** The task's date of completion. This can only be modified on a completed task to backdate the completion date. */
  completionDate?: Maybe<Scalars['String']>;
  /** The task's project, up however many levels of parent tasks.  Inbox tasks aren't considered contained by their provisionalliy assigned container, so if the task is actually an inbox task, this will be missing value. */
  containingProject?: Maybe<Project>;
  /** When the task was created.  This can only be set when the object is still in the inserted state.  For objects created in the document, it can be passed with the creation properties.  For objects in a quick entry tree, it can be set until the quick entry panel is saved. */
  creationDate: Scalars['String'];
  /** When the task should become available for action. */
  deferDate?: Maybe<Scalars['String']>;
  /** True if the task is dropped. Use the "mark dropped" and "mark incomplete" commands to change a task's status. */
  dropped: Scalars['Boolean'];
  /** The date the task was dropped. This can only be modified on a dropped task to backdate the dropped date. */
  droppedDate?: Maybe<Scalars['String']>;
  /** When the task must be finished. */
  dueDate?: Maybe<Scalars['String']>;
  /** When the task should become available for action (including inherited). */
  effectiveDeferDate?: Maybe<Scalars['String']>;
  /** When the task must be finished (including inherited). */
  effectiveDueDate?: Maybe<Scalars['String']>;
  /** True if the task is completed, or any of it's containing tasks or project are completed. */
  effectivelyCompleted: Scalars['Boolean'];
  /** True if the task is dropped, or any of it's containing tasks or project are dropped. */
  effectivelyDropped: Scalars['Boolean'];
  /** The estimated time, in whole minutes, that this task will take to finish. */
  estimatedMinutes?: Maybe<Scalars['Int']>;
  /** True if flagged */
  flagged: Scalars['Boolean'];
  flattenedTasks: FlattenedTaskConnection;
  /** The identifier of the task. */
  id: Scalars['String'];
  /** Returns true if the task itself is an inbox task or if the task is contained by an inbox task. */
  inInbox: Scalars['Boolean'];
  /** When the task was last modified. */
  modificationDate: Scalars['String'];
  /** The name of the task. */
  name: Scalars['String'];
  /** If the task is the next task of its containing project, next is true. */
  next: Scalars['Boolean'];
  /** The next defer date if this task repeats on a fixed schedule and it has a defer date. */
  nextDeferDate?: Maybe<Scalars['String']>;
  /** The next due date if this task repeats on a fixed schedule and it has a due date. */
  nextDueDate?: Maybe<Scalars['String']>;
  /** The note of the task. */
  note: RichText;
  /** The number of available direct children of this task. */
  numberOfAvailableTasks: Scalars['Int'];
  /** The number of completed direct children of this task. */
  numberOfCompletedTasks: Scalars['Int'];
  /** The number of direct children of this task. */
  numberOfTasks: Scalars['Int'];
  /** The task holding this task.  If this is missing value, then this is a top level task -- either the root of a project or an inbox item. */
  parentTask?: Maybe<Task>;
  /** The task's first tag. Setting this will remove the current first tag on the task, if any and move or add the new tag as the first tag on the task. Setting this to missing value will remove the current first tag and leave any other remaining tags. */
  primaryTag?: Maybe<Tag>;
  /** The repetition interval of the task, or missing value if it does not repeat. This property is deprecated in favor of “repetition rule” and is here only for backwards compatibility with existing scripts. */
  repetition?: Maybe<RepetitionInterval>;
  /** The repetition rule for this task, or missing value if it does not repeat. */
  repetitionRule?: Maybe<RepetitionRule>;
  /** If true, any children are sequentially dependent. */
  sequential: Scalars['Boolean'];
  /** When set, the due date and defer date properties will use floating time zones. (Note: if a Task has no due or defer dates assigned, this property will revert to the database’s default setting.) */
  shouldUseFloatingTimeZone: Scalars['Boolean'];
  /** The tags assigned to this task. */
  tags: TagConnection;
  /** The tasks having this task as their container. */
  tasks: TaskConnection;
};

export type TaskConnection = Connection & {
  __typename?: 'TaskConnection';
  byId?: Maybe<TaskInterface>;
  edges: Array<TaskEdge>;
  pageInfo: PageInfo;
};


export type TaskConnectionByIdArgs = {
  id: Scalars['String'];
};

export type TaskEdge = Edge & {
  __typename?: 'TaskEdge';
  cursor: Scalars['String'];
  node: TaskInterface;
};

export type TaskInterface = {
  /** True if the task has a task that must be completed prior to it being actionable. */
  blocked: Scalars['Boolean'];
  /** True if the task is completed. Use the "mark complete" and "mark incomplete" commands to change a task's status. */
  completed: Scalars['Boolean'];
  /** If true, complete when children are completed. */
  completedByChildren: Scalars['Boolean'];
  /** The task's date of completion. This can only be modified on a completed task to backdate the completion date. */
  completionDate?: Maybe<Scalars['String']>;
  /** The task's project, up however many levels of parent tasks.  Inbox tasks aren't considered contained by their provisionalliy assigned container, so if the task is actually an inbox task, this will be missing value. */
  containingProject?: Maybe<Project>;
  /** When the task was created.  This can only be set when the object is still in the inserted state.  For objects created in the document, it can be passed with the creation properties.  For objects in a quick entry tree, it can be set until the quick entry panel is saved. */
  creationDate: Scalars['String'];
  /** When the task should become available for action. */
  deferDate?: Maybe<Scalars['String']>;
  /** True if the task is dropped. Use the "mark dropped" and "mark incomplete" commands to change a task's status. */
  dropped: Scalars['Boolean'];
  /** The date the task was dropped. This can only be modified on a dropped task to backdate the dropped date. */
  droppedDate?: Maybe<Scalars['String']>;
  /** When the task must be finished. */
  dueDate?: Maybe<Scalars['String']>;
  /** When the task should become available for action (including inherited). */
  effectiveDeferDate?: Maybe<Scalars['String']>;
  /** When the task must be finished (including inherited). */
  effectiveDueDate?: Maybe<Scalars['String']>;
  /** True if the task is completed, or any of it's containing tasks or project are completed. */
  effectivelyCompleted: Scalars['Boolean'];
  /** True if the task is dropped, or any of it's containing tasks or project are dropped. */
  effectivelyDropped: Scalars['Boolean'];
  /** The estimated time, in whole minutes, that this task will take to finish. */
  estimatedMinutes?: Maybe<Scalars['Int']>;
  /** True if flagged */
  flagged: Scalars['Boolean'];
  flattenedTasks: FlattenedTaskConnection;
  /** The identifier of the task. */
  id: Scalars['String'];
  /** Returns true if the task itself is an inbox task or if the task is contained by an inbox task. */
  inInbox: Scalars['Boolean'];
  /** When the task was last modified. */
  modificationDate: Scalars['String'];
  /** The name of the task. */
  name: Scalars['String'];
  /** If the task is the next task of its containing project, next is true. */
  next: Scalars['Boolean'];
  /** The next defer date if this task repeats on a fixed schedule and it has a defer date. */
  nextDeferDate?: Maybe<Scalars['String']>;
  /** The next due date if this task repeats on a fixed schedule and it has a due date. */
  nextDueDate?: Maybe<Scalars['String']>;
  /** The note of the task. */
  note: RichText;
  /** The number of available direct children of this task. */
  numberOfAvailableTasks: Scalars['Int'];
  /** The number of completed direct children of this task. */
  numberOfCompletedTasks: Scalars['Int'];
  /** The number of direct children of this task. */
  numberOfTasks: Scalars['Int'];
  /** The task holding this task.  If this is missing value, then this is a top level task -- either the root of a project or an inbox item. */
  parentTask?: Maybe<Task>;
  /** The task's first tag. Setting this will remove the current first tag on the task, if any and move or add the new tag as the first tag on the task. Setting this to missing value will remove the current first tag and leave any other remaining tags. */
  primaryTag?: Maybe<Tag>;
  /** The repetition interval of the task, or missing value if it does not repeat. This property is deprecated in favor of “repetition rule” and is here only for backwards compatibility with existing scripts. */
  repetition?: Maybe<RepetitionInterval>;
  /** The repetition rule for this task, or missing value if it does not repeat. */
  repetitionRule?: Maybe<RepetitionRule>;
  /** If true, any children are sequentially dependent. */
  sequential: Scalars['Boolean'];
  /** When set, the due date and defer date properties will use floating time zones. (Note: if a Task has no due or defer dates assigned, this property will revert to the database’s default setting.) */
  shouldUseFloatingTimeZone: Scalars['Boolean'];
  /** The tags assigned to this task. */
  tags: TagConnection;
  /** The tasks having this task as their container. */
  tasks: TaskConnection;
};

export enum TextAlignment {
  Center = 'CENTER',
  Justified = 'JUSTIFIED',
  Left = 'LEFT',
  Natural = 'NATURAL',
  Right = 'RIGHT'
}

/** A tree representing an object, along with its sub-trees. */
export type Tree = Node & TreeInterface & {
  __typename?: 'Tree';
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
};

export type TreeConnection = Connection & {
  __typename?: 'TreeConnection';
  byId?: Maybe<TreeInterface>;
  edges: Array<TreeEdge>;
  pageInfo: PageInfo;
};


export type TreeConnectionByIdArgs = {
  id: Scalars['String'];
};

export type TreeEdge = Edge & {
  __typename?: 'TreeEdge';
  cursor: Scalars['String'];
  node: TreeInterface;
};

export type TreeInterface = {
  /** The ancestor trees of this tree. */
  ancestorTrees: AncestorTreeConnection;
  /** All the descendant trees in the user-specified sort ordering, listing each tree, then its children and so forth. */
  descendantTrees: DescendantTreeConnection;
  /** This is true if the node is expanded. */
  expanded: Scalars['Boolean'];
  /** The sibling trees of this tree after it in the user-specified sort ordering. */
  followingSiblings: FollowingSiblingConnection;
  /** The identifier of object being represented by this tree. */
  id: Scalars['String'];
  /** The descendants of this tree that have no children themselves. */
  leafs: LeafConnection;
  /** The name of the object being represented by this tree. */
  name: Scalars['String'];
  /** This is true if the node note is expanded. */
  noteExpanded: Scalars['Boolean'];
  /** The sibling trees of this tree before it in the user-specified sort ordering. */
  precedingSiblings: PrecedingSiblingConnection;
  /** This is true if the node is selected.  Note that attempts to set this while the node is not visible (collapsed parent, etc.) will silently do nothing. */
  selected: Scalars['Boolean'];
  /** The trees of this tree that are selected in the user interface. */
  selectedTrees: SelectedTreeConnection;
  /** The immediate child trees of this tree in the user-specified sort ordering. */
  trees: TreeConnection;
};

/** This subdivides the text into words. */
export type Word = RichTextInterface & {
  __typename?: 'Word';
  /** The name of the font of the first character. */
  font: Scalars['String'];
  /** The size in points of the first character. */
  size: Scalars['Int'];
  /** The style of the text. */
  style: Style;
  /** The plain text contents of the rich text. */
  text: Scalars['String'];
};

type TaskViewModel_AvailableTask_Fragment = { __typename?: 'AvailableTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null };

type TaskViewModel_FlattenedTask_Fragment = { __typename?: 'FlattenedTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null };

type TaskViewModel_InboxTask_Fragment = { __typename?: 'InboxTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null };

type TaskViewModel_RemainingTask_Fragment = { __typename?: 'RemainingTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null };

type TaskViewModel_Task_Fragment = { __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null };

export type TaskViewModelFragment = TaskViewModel_AvailableTask_Fragment | TaskViewModel_FlattenedTask_Fragment | TaskViewModel_InboxTask_Fragment | TaskViewModel_RemainingTask_Fragment | TaskViewModel_Task_Fragment;

type ProjectViewModel_FlattenedProject_Fragment = { __typename?: 'FlattenedProject', name: string, completed: boolean, id: string, numberOfAvailableTasks: number };

type ProjectViewModel_Project_Fragment = { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number };

export type ProjectViewModelFragment = ProjectViewModel_FlattenedProject_Fragment | ProjectViewModel_Project_Fragment;

export type TopLevelProjectsFragment = { __typename?: 'Document', projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'FlattenedProject', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } | { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } };

export type FolderedProjectDepth1Fragment = { __typename?: 'Document', folders: { __typename?: 'FolderConnection', edges: Array<{ __typename?: 'FolderEdge', node: { __typename?: 'FlattenedFolder', name: string, id: string, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'FlattenedProject', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } | { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } } | { __typename?: 'Folder', name: string, id: string, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'FlattenedProject', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } | { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } } }> } };

export type FolderedTagDepth1Fragment = { __typename?: 'Document', tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string } | { __typename?: 'FlattenedTag', name: string, id: string } | { __typename?: 'Tag', name: string, id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string } | { __typename?: 'FlattenedTag', name: string, id: string } | { __typename?: 'Tag', name: string, id: string } }> } } | { __typename?: 'Tag', name: string, id: string, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string } | { __typename?: 'FlattenedTag', name: string, id: string } | { __typename?: 'Tag', name: string, id: string } }> } } }> } };

export type FolderedTagDepth2Fragment = { __typename?: 'Document', tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } }> } };

export type GetTasksQueryVariables = Exact<{
  onlyFlagged?: Scalars['Boolean'];
  onlyAvailable?: Scalars['Boolean'];
  withEffectiveDueDate?: Scalars['Boolean'];
}>;


export type GetTasksQuery = { __typename?: 'Query', application: { __typename?: 'Application', defaultDocument: { __typename?: 'Document', flattenedTasks: { __typename?: 'FlattenedTaskConnection', edges: Array<{ __typename?: 'FlattenedTaskEdge', node: { __typename?: 'FlattenedTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } }> } } } };

export type GetInboxTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInboxTasksQuery = { __typename?: 'Query', application: { __typename?: 'Application', defaultDocument: { __typename?: 'Document', inboxTasks: { __typename?: 'InboxTaskConnection', edges: Array<{ __typename?: 'InboxTaskEdge', node: { __typename?: 'InboxTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } }> } } } };

export type GetTasksInProjectQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type GetTasksInProjectQuery = { __typename?: 'Query', application: { __typename?: 'Application', defaultDocument: { __typename?: 'Document', projects: { __typename?: 'ProjectConnection', byId?: { __typename?: 'FlattenedProject', rootTask: { __typename?: 'Task', tasks: { __typename?: 'TaskConnection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'AvailableTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'FlattenedTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'InboxTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'RemainingTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } }> } } } | { __typename?: 'Project', rootTask: { __typename?: 'Task', tasks: { __typename?: 'TaskConnection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'AvailableTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'FlattenedTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'InboxTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'RemainingTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } }> } } } | null } } } };

export type GetNestedProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNestedProjectsQuery = { __typename?: 'Query', application: { __typename?: 'Application', defaultDocument: { __typename?: 'Document', folders: { __typename?: 'FolderConnection', edges: Array<{ __typename?: 'FolderEdge', node: { __typename?: 'FlattenedFolder', name: string, id: string, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'FlattenedProject', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } | { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } } | { __typename?: 'Folder', name: string, id: string, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'FlattenedProject', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } | { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } } }> } } } };

export type GetTasksWithTagQueryVariables = Exact<{
  tagId: Scalars['String'];
}>;


export type GetTasksWithTagQuery = { __typename?: 'Query', application: { __typename?: 'Application', defaultDocument: { __typename?: 'Document', tags: { __typename?: 'TagConnection', byId?: { __typename?: 'DeprecatedContext', tasks: { __typename?: 'TaskConnection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'AvailableTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'FlattenedTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'InboxTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'RemainingTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } }> } } | { __typename?: 'FlattenedTag', tasks: { __typename?: 'TaskConnection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'AvailableTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'FlattenedTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'InboxTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'RemainingTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } }> } } | { __typename?: 'Tag', tasks: { __typename?: 'TaskConnection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'AvailableTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'FlattenedTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'InboxTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'RemainingTask', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } | { __typename?: 'Task', name: string, id: string, effectiveDueDate?: string | null, completed: boolean, effectivelyCompleted: boolean, flagged: boolean, containingProject?: { __typename?: 'Project', id: string, name: string } | null } }> } } | null } } } };

export type GetTopLevelProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopLevelProjectsQuery = { __typename?: 'Query', application: { __typename?: 'Application', defaultDocument: { __typename?: 'Document', folders: { __typename?: 'FolderConnection', edges: Array<{ __typename?: 'FolderEdge', node: { __typename?: 'FlattenedFolder', name: string, id: string, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'FlattenedProject', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } | { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } } | { __typename?: 'Folder', name: string, id: string, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'FlattenedProject', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } | { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } } }> }, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'FlattenedProject', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } | { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } } } };

export type GetTaskCreationSupportInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaskCreationSupportInfoQuery = { __typename?: 'Query', application: { __typename?: 'Application', defaultDocument: { __typename?: 'Document', folders: { __typename?: 'FolderConnection', edges: Array<{ __typename?: 'FolderEdge', node: { __typename?: 'FlattenedFolder', name: string, id: string, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'FlattenedProject', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } | { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } } | { __typename?: 'Folder', name: string, id: string, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'FlattenedProject', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } | { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> } } }> }, projects: { __typename?: 'ProjectConnection', edges: Array<{ __typename?: 'ProjectEdge', node: { __typename?: 'FlattenedProject', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } | { __typename?: 'Project', name: string, completed: boolean, id: string, numberOfAvailableTasks: number } }> }, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string } | { __typename?: 'FlattenedTag', name: string, id: string } | { __typename?: 'Tag', name: string, id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string } | { __typename?: 'FlattenedTag', name: string, id: string } | { __typename?: 'Tag', name: string, id: string } }> } } | { __typename?: 'Tag', name: string, id: string, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string } | { __typename?: 'FlattenedTag', name: string, id: string } | { __typename?: 'Tag', name: string, id: string } }> } } }> } } } };

export type GetNestedTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNestedTagsQuery = { __typename?: 'Query', application: { __typename?: 'Application', defaultDocument: { __typename?: 'Document', tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } }> } } } };

export type GetNestedTagsFromQueryVariables = Exact<{
  tagId: Scalars['String'];
}>;


export type GetNestedTagsFromQuery = { __typename?: 'Query', application: { __typename?: 'Application', defaultDocument: { __typename?: 'Document', tags: { __typename?: 'TagConnection', byId?: { __typename?: 'DeprecatedContext', id: string, name: string, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } }> } } | { __typename?: 'FlattenedTag', id: string, name: string, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } }> } } | { __typename?: 'Tag', id: string, name: string, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'FlattenedTag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } | { __typename?: 'Tag', name: string, id: string, availableTaskCount: number, tags: { __typename?: 'TagConnection', edges: Array<{ __typename?: 'TagEdge', node: { __typename?: 'DeprecatedContext', id: string } | { __typename?: 'FlattenedTag', id: string } | { __typename?: 'Tag', id: string } }> } } }> } } }> } } | null } } } };

export type GetPerspectiveNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPerspectiveNamesQuery = { __typename?: 'Query', application: { __typename?: 'Application', defaultDocument: { __typename?: 'Document', perspectiveNames: Array<string> } } };



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
  AncestorTree: ResolverTypeWrapper<AncestorTree>;
  AncestorTreeConnection: ResolverTypeWrapper<AncestorTreeConnection>;
  AncestorTreeEdge: ResolverTypeWrapper<AncestorTreeEdge>;
  Application: ResolverTypeWrapper<Application>;
  Attachment: ResolverTypeWrapper<Attachment>;
  AttributeRun: ResolverTypeWrapper<AttributeRun>;
  AvailableTask: ResolverTypeWrapper<AvailableTask>;
  AvailableTaskConnection: ResolverTypeWrapper<AvailableTaskConnection>;
  AvailableTaskEdge: ResolverTypeWrapper<AvailableTaskEdge>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BuiltinPerspective: ResolverTypeWrapper<BuiltinPerspective>;
  BuiltinPerspectiveConnection: ResolverTypeWrapper<BuiltinPerspectiveConnection>;
  BuiltinPerspectiveEdge: ResolverTypeWrapper<BuiltinPerspectiveEdge>;
  Character: ResolverTypeWrapper<Character>;
  Condition: Condition;
  Connection: ResolversTypes['AncestorTreeConnection'] | ResolversTypes['AvailableTaskConnection'] | ResolversTypes['BuiltinPerspectiveConnection'] | ResolversTypes['ContentTreeConnection'] | ResolversTypes['CustomPerspectiveConnection'] | ResolversTypes['DeprecatedContextConnection'] | ResolversTypes['DescendantTreeConnection'] | ResolversTypes['FlattenedFolderConnection'] | ResolversTypes['FlattenedProjectConnection'] | ResolversTypes['FlattenedTagConnection'] | ResolversTypes['FlattenedTaskConnection'] | ResolversTypes['FolderConnection'] | ResolversTypes['FollowingSiblingConnection'] | ResolversTypes['ForecastDayConnection'] | ResolversTypes['InboxTaskConnection'] | ResolversTypes['InboxTreeConnection'] | ResolversTypes['LeafConnection'] | ResolversTypes['LibraryTreeConnection'] | ResolversTypes['NamedStyleConnection'] | ResolversTypes['PerspectiveConnection'] | ResolversTypes['PrecedingSiblingConnection'] | ResolversTypes['PreferenceConnection'] | ResolversTypes['ProjectConnection'] | ResolversTypes['QuickEntryTreeConnection'] | ResolversTypes['RemainingTaskConnection'] | ResolversTypes['SectionConnection'] | ResolversTypes['SelectedTreeConnection'] | ResolversTypes['SettingConnection'] | ResolversTypes['TagConnection'] | ResolversTypes['TaskConnection'] | ResolversTypes['TreeConnection'];
  ContentTree: ResolverTypeWrapper<ContentTree>;
  ContentTreeConnection: ResolverTypeWrapper<ContentTreeConnection>;
  ContentTreeEdge: ResolverTypeWrapper<ContentTreeEdge>;
  CustomPerspective: ResolverTypeWrapper<CustomPerspective>;
  CustomPerspectiveConnection: ResolverTypeWrapper<CustomPerspectiveConnection>;
  CustomPerspectiveEdge: ResolverTypeWrapper<CustomPerspectiveEdge>;
  DeprecatedContext: ResolverTypeWrapper<DeprecatedContext>;
  DeprecatedContextConnection: ResolverTypeWrapper<DeprecatedContextConnection>;
  DeprecatedContextEdge: ResolverTypeWrapper<DeprecatedContextEdge>;
  DescendantTree: ResolverTypeWrapper<DescendantTree>;
  DescendantTreeConnection: ResolverTypeWrapper<DescendantTreeConnection>;
  DescendantTreeEdge: ResolverTypeWrapper<DescendantTreeEdge>;
  Document: ResolverTypeWrapper<Document>;
  DocumentConnection: ResolverTypeWrapper<DocumentConnection>;
  DocumentEdge: ResolverTypeWrapper<DocumentEdge>;
  Edge: ResolversTypes['AncestorTreeEdge'] | ResolversTypes['AvailableTaskEdge'] | ResolversTypes['BuiltinPerspectiveEdge'] | ResolversTypes['ContentTreeEdge'] | ResolversTypes['CustomPerspectiveEdge'] | ResolversTypes['DeprecatedContextEdge'] | ResolversTypes['DescendantTreeEdge'] | ResolversTypes['FlattenedFolderEdge'] | ResolversTypes['FlattenedProjectEdge'] | ResolversTypes['FlattenedTagEdge'] | ResolversTypes['FlattenedTaskEdge'] | ResolversTypes['FolderEdge'] | ResolversTypes['FollowingSiblingEdge'] | ResolversTypes['ForecastDayEdge'] | ResolversTypes['InboxTaskEdge'] | ResolversTypes['InboxTreeEdge'] | ResolversTypes['LeafEdge'] | ResolversTypes['LibraryTreeEdge'] | ResolversTypes['NamedStyleEdge'] | ResolversTypes['PerspectiveEdge'] | ResolversTypes['PrecedingSiblingEdge'] | ResolversTypes['PreferenceEdge'] | ResolversTypes['ProjectEdge'] | ResolversTypes['QuickEntryTreeEdge'] | ResolversTypes['RemainingTaskEdge'] | ResolversTypes['SectionEdge'] | ResolversTypes['SelectedTreeEdge'] | ResolversTypes['SettingEdge'] | ResolversTypes['TagEdge'] | ResolversTypes['TaskEdge'] | ResolversTypes['TreeEdge'];
  FlattenedFolder: ResolverTypeWrapper<FlattenedFolder>;
  FlattenedFolderConnection: ResolverTypeWrapper<FlattenedFolderConnection>;
  FlattenedFolderEdge: ResolverTypeWrapper<FlattenedFolderEdge>;
  FlattenedProject: ResolverTypeWrapper<FlattenedProject>;
  FlattenedProjectConnection: ResolverTypeWrapper<FlattenedProjectConnection>;
  FlattenedProjectEdge: ResolverTypeWrapper<FlattenedProjectEdge>;
  FlattenedTag: ResolverTypeWrapper<FlattenedTag>;
  FlattenedTagConnection: ResolverTypeWrapper<FlattenedTagConnection>;
  FlattenedTagEdge: ResolverTypeWrapper<FlattenedTagEdge>;
  FlattenedTask: ResolverTypeWrapper<FlattenedTask>;
  FlattenedTaskConnection: ResolverTypeWrapper<FlattenedTaskConnection>;
  FlattenedTaskEdge: ResolverTypeWrapper<FlattenedTaskEdge>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Folder: ResolverTypeWrapper<Folder>;
  FolderConnection: ResolverTypeWrapper<FolderConnection>;
  FolderEdge: ResolverTypeWrapper<FolderEdge>;
  FolderInterface: ResolversTypes['FlattenedFolder'] | ResolversTypes['Folder'];
  FollowingSibling: ResolverTypeWrapper<FollowingSibling>;
  FollowingSiblingConnection: ResolverTypeWrapper<FollowingSiblingConnection>;
  FollowingSiblingEdge: ResolverTypeWrapper<FollowingSiblingEdge>;
  ForecastDay: ResolverTypeWrapper<ForecastDay>;
  ForecastDayConnection: ResolverTypeWrapper<ForecastDayConnection>;
  ForecastDayEdge: ResolverTypeWrapper<ForecastDayEdge>;
  ForecastDayInterface: never;
  ForecastSidebarTree: ResolverTypeWrapper<ForecastSidebarTree>;
  InboxTask: ResolverTypeWrapper<InboxTask>;
  InboxTaskConnection: ResolverTypeWrapper<InboxTaskConnection>;
  InboxTaskEdge: ResolverTypeWrapper<InboxTaskEdge>;
  InboxTree: ResolverTypeWrapper<InboxTree>;
  InboxTreeConnection: ResolverTypeWrapper<InboxTreeConnection>;
  InboxTreeEdge: ResolverTypeWrapper<InboxTreeEdge>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntervalUnit: IntervalUnit;
  Leaf: ResolverTypeWrapper<Leaf>;
  LeafConnection: ResolverTypeWrapper<LeafConnection>;
  LeafEdge: ResolverTypeWrapper<LeafEdge>;
  LibraryTree: ResolverTypeWrapper<LibraryTree>;
  LibraryTreeConnection: ResolverTypeWrapper<LibraryTreeConnection>;
  LibraryTreeEdge: ResolverTypeWrapper<LibraryTreeEdge>;
  LocationInformation: ResolverTypeWrapper<LocationInformation>;
  LocationTrigger: LocationTrigger;
  Mutation: ResolverTypeWrapper<{}>;
  NamedStyle: ResolverTypeWrapper<NamedStyle>;
  NamedStyleConnection: ResolverTypeWrapper<NamedStyleConnection>;
  NamedStyleEdge: ResolverTypeWrapper<NamedStyleEdge>;
  NamedStyleInterface: never;
  Node: ResolversTypes['AncestorTree'] | ResolversTypes['AvailableTask'] | ResolversTypes['BuiltinPerspective'] | ResolversTypes['ContentTree'] | ResolversTypes['CustomPerspective'] | ResolversTypes['DeprecatedContext'] | ResolversTypes['DescendantTree'] | ResolversTypes['FlattenedFolder'] | ResolversTypes['FlattenedProject'] | ResolversTypes['FlattenedTag'] | ResolversTypes['FlattenedTask'] | ResolversTypes['Folder'] | ResolversTypes['FollowingSibling'] | ResolversTypes['ForecastDay'] | ResolversTypes['InboxTask'] | ResolversTypes['InboxTree'] | ResolversTypes['Leaf'] | ResolversTypes['LibraryTree'] | ResolversTypes['NamedStyle'] | ResolversTypes['Perspective'] | ResolversTypes['PrecedingSibling'] | ResolversTypes['Preference'] | ResolversTypes['Project'] | ResolversTypes['QuickEntryTree'] | ResolversTypes['RemainingTask'] | ResolversTypes['Section'] | ResolversTypes['SelectedTree'] | ResolversTypes['Setting'] | ResolversTypes['SidebarTree'] | ResolversTypes['Tag'] | ResolversTypes['Task'] | ResolversTypes['Tree'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Paragraph: ResolverTypeWrapper<Paragraph>;
  Perspective: ResolverTypeWrapper<Perspective>;
  PerspectiveConnection: ResolverTypeWrapper<PerspectiveConnection>;
  PerspectiveEdge: ResolverTypeWrapper<PerspectiveEdge>;
  PerspectiveInterface: ResolversTypes['BuiltinPerspective'] | ResolversTypes['CustomPerspective'] | ResolversTypes['Perspective'];
  PrecedingSibling: ResolverTypeWrapper<PrecedingSibling>;
  PrecedingSiblingConnection: ResolverTypeWrapper<PrecedingSiblingConnection>;
  PrecedingSiblingEdge: ResolverTypeWrapper<PrecedingSiblingEdge>;
  Preference: ResolverTypeWrapper<Preference>;
  PreferenceConnection: ResolverTypeWrapper<PreferenceConnection>;
  PreferenceEdge: ResolverTypeWrapper<PreferenceEdge>;
  PreferenceInterface: never;
  Project: ResolverTypeWrapper<Project>;
  ProjectConnection: ResolverTypeWrapper<ProjectConnection>;
  ProjectEdge: ResolverTypeWrapper<ProjectEdge>;
  ProjectInterface: ResolversTypes['FlattenedProject'] | ResolversTypes['Project'];
  ProjectStatus: ProjectStatus;
  Query: ResolverTypeWrapper<{}>;
  QuickEntryTree: ResolverTypeWrapper<QuickEntryTree>;
  QuickEntryTreeConnection: ResolverTypeWrapper<QuickEntryTreeConnection>;
  QuickEntryTreeEdge: ResolverTypeWrapper<QuickEntryTreeEdge>;
  RemainingTask: ResolverTypeWrapper<RemainingTask>;
  RemainingTaskConnection: ResolverTypeWrapper<RemainingTaskConnection>;
  RemainingTaskEdge: ResolverTypeWrapper<RemainingTaskEdge>;
  RepetitionInterval: ResolverTypeWrapper<RepetitionInterval>;
  RepetitionMethod: RepetitionMethod;
  RepetitionRule: ResolverTypeWrapper<RepetitionRule>;
  RichText: ResolverTypeWrapper<RichText>;
  RichTextInterface: ResolversTypes['Attachment'] | ResolversTypes['AttributeRun'] | ResolversTypes['Character'] | ResolversTypes['Paragraph'] | ResolversTypes['RichText'] | ResolversTypes['Word'];
  Section: ResolverTypeWrapper<Section>;
  SectionConnection: ResolverTypeWrapper<SectionConnection>;
  SectionEdge: ResolverTypeWrapper<SectionEdge>;
  SectionInterface: ResolversTypes['Folder'] | ResolversTypes['Project'] | ResolversTypes['Section'];
  SelectedTree: ResolverTypeWrapper<SelectedTree>;
  SelectedTreeConnection: ResolverTypeWrapper<SelectedTreeConnection>;
  SelectedTreeEdge: ResolverTypeWrapper<SelectedTreeEdge>;
  Setting: ResolverTypeWrapper<Setting>;
  SettingConnection: ResolverTypeWrapper<SettingConnection>;
  SettingEdge: ResolverTypeWrapper<SettingEdge>;
  SettingInterface: never;
  SidebarTree: ResolverTypeWrapper<SidebarTree>;
  SidebarTreeInterface: ResolversTypes['ForecastSidebarTree'] | ResolversTypes['SidebarTree'];
  String: ResolverTypeWrapper<Scalars['String']>;
  Style: ResolverTypeWrapper<Style>;
  StyleInterface: ResolversTypes['NamedStyle'] | ResolversTypes['Style'];
  Tag: ResolverTypeWrapper<Tag>;
  TagConnection: ResolverTypeWrapper<TagConnection>;
  TagEdge: ResolverTypeWrapper<TagEdge>;
  TagInterface: ResolversTypes['DeprecatedContext'] | ResolversTypes['FlattenedTag'] | ResolversTypes['Tag'];
  Task: ResolverTypeWrapper<Task>;
  TaskConnection: ResolverTypeWrapper<TaskConnection>;
  TaskEdge: ResolverTypeWrapper<TaskEdge>;
  TaskInterface: ResolversTypes['AvailableTask'] | ResolversTypes['FlattenedTask'] | ResolversTypes['InboxTask'] | ResolversTypes['RemainingTask'] | ResolversTypes['Task'];
  TextAlignment: TextAlignment;
  Tree: ResolverTypeWrapper<Tree>;
  TreeConnection: ResolverTypeWrapper<TreeConnection>;
  TreeEdge: ResolverTypeWrapper<TreeEdge>;
  TreeInterface: ResolversTypes['AncestorTree'] | ResolversTypes['ContentTree'] | ResolversTypes['DescendantTree'] | ResolversTypes['FollowingSibling'] | ResolversTypes['InboxTree'] | ResolversTypes['Leaf'] | ResolversTypes['LibraryTree'] | ResolversTypes['PrecedingSibling'] | ResolversTypes['QuickEntryTree'] | ResolversTypes['SelectedTree'] | ResolversTypes['SidebarTree'] | ResolversTypes['Tree'];
  Word: ResolverTypeWrapper<Word>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AncestorTree: AncestorTree;
  AncestorTreeConnection: AncestorTreeConnection;
  AncestorTreeEdge: AncestorTreeEdge;
  Application: Application;
  Attachment: Attachment;
  AttributeRun: AttributeRun;
  AvailableTask: AvailableTask;
  AvailableTaskConnection: AvailableTaskConnection;
  AvailableTaskEdge: AvailableTaskEdge;
  Boolean: Scalars['Boolean'];
  BuiltinPerspective: BuiltinPerspective;
  BuiltinPerspectiveConnection: BuiltinPerspectiveConnection;
  BuiltinPerspectiveEdge: BuiltinPerspectiveEdge;
  Character: Character;
  Condition: Condition;
  Connection: ResolversParentTypes['AncestorTreeConnection'] | ResolversParentTypes['AvailableTaskConnection'] | ResolversParentTypes['BuiltinPerspectiveConnection'] | ResolversParentTypes['ContentTreeConnection'] | ResolversParentTypes['CustomPerspectiveConnection'] | ResolversParentTypes['DeprecatedContextConnection'] | ResolversParentTypes['DescendantTreeConnection'] | ResolversParentTypes['FlattenedFolderConnection'] | ResolversParentTypes['FlattenedProjectConnection'] | ResolversParentTypes['FlattenedTagConnection'] | ResolversParentTypes['FlattenedTaskConnection'] | ResolversParentTypes['FolderConnection'] | ResolversParentTypes['FollowingSiblingConnection'] | ResolversParentTypes['ForecastDayConnection'] | ResolversParentTypes['InboxTaskConnection'] | ResolversParentTypes['InboxTreeConnection'] | ResolversParentTypes['LeafConnection'] | ResolversParentTypes['LibraryTreeConnection'] | ResolversParentTypes['NamedStyleConnection'] | ResolversParentTypes['PerspectiveConnection'] | ResolversParentTypes['PrecedingSiblingConnection'] | ResolversParentTypes['PreferenceConnection'] | ResolversParentTypes['ProjectConnection'] | ResolversParentTypes['QuickEntryTreeConnection'] | ResolversParentTypes['RemainingTaskConnection'] | ResolversParentTypes['SectionConnection'] | ResolversParentTypes['SelectedTreeConnection'] | ResolversParentTypes['SettingConnection'] | ResolversParentTypes['TagConnection'] | ResolversParentTypes['TaskConnection'] | ResolversParentTypes['TreeConnection'];
  ContentTree: ContentTree;
  ContentTreeConnection: ContentTreeConnection;
  ContentTreeEdge: ContentTreeEdge;
  CustomPerspective: CustomPerspective;
  CustomPerspectiveConnection: CustomPerspectiveConnection;
  CustomPerspectiveEdge: CustomPerspectiveEdge;
  DeprecatedContext: DeprecatedContext;
  DeprecatedContextConnection: DeprecatedContextConnection;
  DeprecatedContextEdge: DeprecatedContextEdge;
  DescendantTree: DescendantTree;
  DescendantTreeConnection: DescendantTreeConnection;
  DescendantTreeEdge: DescendantTreeEdge;
  Document: Document;
  DocumentConnection: DocumentConnection;
  DocumentEdge: DocumentEdge;
  Edge: ResolversParentTypes['AncestorTreeEdge'] | ResolversParentTypes['AvailableTaskEdge'] | ResolversParentTypes['BuiltinPerspectiveEdge'] | ResolversParentTypes['ContentTreeEdge'] | ResolversParentTypes['CustomPerspectiveEdge'] | ResolversParentTypes['DeprecatedContextEdge'] | ResolversParentTypes['DescendantTreeEdge'] | ResolversParentTypes['FlattenedFolderEdge'] | ResolversParentTypes['FlattenedProjectEdge'] | ResolversParentTypes['FlattenedTagEdge'] | ResolversParentTypes['FlattenedTaskEdge'] | ResolversParentTypes['FolderEdge'] | ResolversParentTypes['FollowingSiblingEdge'] | ResolversParentTypes['ForecastDayEdge'] | ResolversParentTypes['InboxTaskEdge'] | ResolversParentTypes['InboxTreeEdge'] | ResolversParentTypes['LeafEdge'] | ResolversParentTypes['LibraryTreeEdge'] | ResolversParentTypes['NamedStyleEdge'] | ResolversParentTypes['PerspectiveEdge'] | ResolversParentTypes['PrecedingSiblingEdge'] | ResolversParentTypes['PreferenceEdge'] | ResolversParentTypes['ProjectEdge'] | ResolversParentTypes['QuickEntryTreeEdge'] | ResolversParentTypes['RemainingTaskEdge'] | ResolversParentTypes['SectionEdge'] | ResolversParentTypes['SelectedTreeEdge'] | ResolversParentTypes['SettingEdge'] | ResolversParentTypes['TagEdge'] | ResolversParentTypes['TaskEdge'] | ResolversParentTypes['TreeEdge'];
  FlattenedFolder: FlattenedFolder;
  FlattenedFolderConnection: FlattenedFolderConnection;
  FlattenedFolderEdge: FlattenedFolderEdge;
  FlattenedProject: FlattenedProject;
  FlattenedProjectConnection: FlattenedProjectConnection;
  FlattenedProjectEdge: FlattenedProjectEdge;
  FlattenedTag: FlattenedTag;
  FlattenedTagConnection: FlattenedTagConnection;
  FlattenedTagEdge: FlattenedTagEdge;
  FlattenedTask: FlattenedTask;
  FlattenedTaskConnection: FlattenedTaskConnection;
  FlattenedTaskEdge: FlattenedTaskEdge;
  Float: Scalars['Float'];
  Folder: Folder;
  FolderConnection: FolderConnection;
  FolderEdge: FolderEdge;
  FolderInterface: ResolversParentTypes['FlattenedFolder'] | ResolversParentTypes['Folder'];
  FollowingSibling: FollowingSibling;
  FollowingSiblingConnection: FollowingSiblingConnection;
  FollowingSiblingEdge: FollowingSiblingEdge;
  ForecastDay: ForecastDay;
  ForecastDayConnection: ForecastDayConnection;
  ForecastDayEdge: ForecastDayEdge;
  ForecastDayInterface: never;
  ForecastSidebarTree: ForecastSidebarTree;
  InboxTask: InboxTask;
  InboxTaskConnection: InboxTaskConnection;
  InboxTaskEdge: InboxTaskEdge;
  InboxTree: InboxTree;
  InboxTreeConnection: InboxTreeConnection;
  InboxTreeEdge: InboxTreeEdge;
  Int: Scalars['Int'];
  Leaf: Leaf;
  LeafConnection: LeafConnection;
  LeafEdge: LeafEdge;
  LibraryTree: LibraryTree;
  LibraryTreeConnection: LibraryTreeConnection;
  LibraryTreeEdge: LibraryTreeEdge;
  LocationInformation: LocationInformation;
  Mutation: {};
  NamedStyle: NamedStyle;
  NamedStyleConnection: NamedStyleConnection;
  NamedStyleEdge: NamedStyleEdge;
  NamedStyleInterface: never;
  Node: ResolversParentTypes['AncestorTree'] | ResolversParentTypes['AvailableTask'] | ResolversParentTypes['BuiltinPerspective'] | ResolversParentTypes['ContentTree'] | ResolversParentTypes['CustomPerspective'] | ResolversParentTypes['DeprecatedContext'] | ResolversParentTypes['DescendantTree'] | ResolversParentTypes['FlattenedFolder'] | ResolversParentTypes['FlattenedProject'] | ResolversParentTypes['FlattenedTag'] | ResolversParentTypes['FlattenedTask'] | ResolversParentTypes['Folder'] | ResolversParentTypes['FollowingSibling'] | ResolversParentTypes['ForecastDay'] | ResolversParentTypes['InboxTask'] | ResolversParentTypes['InboxTree'] | ResolversParentTypes['Leaf'] | ResolversParentTypes['LibraryTree'] | ResolversParentTypes['NamedStyle'] | ResolversParentTypes['Perspective'] | ResolversParentTypes['PrecedingSibling'] | ResolversParentTypes['Preference'] | ResolversParentTypes['Project'] | ResolversParentTypes['QuickEntryTree'] | ResolversParentTypes['RemainingTask'] | ResolversParentTypes['Section'] | ResolversParentTypes['SelectedTree'] | ResolversParentTypes['Setting'] | ResolversParentTypes['SidebarTree'] | ResolversParentTypes['Tag'] | ResolversParentTypes['Task'] | ResolversParentTypes['Tree'];
  PageInfo: PageInfo;
  Paragraph: Paragraph;
  Perspective: Perspective;
  PerspectiveConnection: PerspectiveConnection;
  PerspectiveEdge: PerspectiveEdge;
  PerspectiveInterface: ResolversParentTypes['BuiltinPerspective'] | ResolversParentTypes['CustomPerspective'] | ResolversParentTypes['Perspective'];
  PrecedingSibling: PrecedingSibling;
  PrecedingSiblingConnection: PrecedingSiblingConnection;
  PrecedingSiblingEdge: PrecedingSiblingEdge;
  Preference: Preference;
  PreferenceConnection: PreferenceConnection;
  PreferenceEdge: PreferenceEdge;
  PreferenceInterface: never;
  Project: Project;
  ProjectConnection: ProjectConnection;
  ProjectEdge: ProjectEdge;
  ProjectInterface: ResolversParentTypes['FlattenedProject'] | ResolversParentTypes['Project'];
  Query: {};
  QuickEntryTree: QuickEntryTree;
  QuickEntryTreeConnection: QuickEntryTreeConnection;
  QuickEntryTreeEdge: QuickEntryTreeEdge;
  RemainingTask: RemainingTask;
  RemainingTaskConnection: RemainingTaskConnection;
  RemainingTaskEdge: RemainingTaskEdge;
  RepetitionInterval: RepetitionInterval;
  RepetitionRule: RepetitionRule;
  RichText: RichText;
  RichTextInterface: ResolversParentTypes['Attachment'] | ResolversParentTypes['AttributeRun'] | ResolversParentTypes['Character'] | ResolversParentTypes['Paragraph'] | ResolversParentTypes['RichText'] | ResolversParentTypes['Word'];
  Section: Section;
  SectionConnection: SectionConnection;
  SectionEdge: SectionEdge;
  SectionInterface: ResolversParentTypes['Folder'] | ResolversParentTypes['Project'] | ResolversParentTypes['Section'];
  SelectedTree: SelectedTree;
  SelectedTreeConnection: SelectedTreeConnection;
  SelectedTreeEdge: SelectedTreeEdge;
  Setting: Setting;
  SettingConnection: SettingConnection;
  SettingEdge: SettingEdge;
  SettingInterface: never;
  SidebarTree: SidebarTree;
  SidebarTreeInterface: ResolversParentTypes['ForecastSidebarTree'] | ResolversParentTypes['SidebarTree'];
  String: Scalars['String'];
  Style: Style;
  StyleInterface: ResolversParentTypes['NamedStyle'] | ResolversParentTypes['Style'];
  Tag: Tag;
  TagConnection: TagConnection;
  TagEdge: TagEdge;
  TagInterface: ResolversParentTypes['DeprecatedContext'] | ResolversParentTypes['FlattenedTag'] | ResolversParentTypes['Tag'];
  Task: Task;
  TaskConnection: TaskConnection;
  TaskEdge: TaskEdge;
  TaskInterface: ResolversParentTypes['AvailableTask'] | ResolversParentTypes['FlattenedTask'] | ResolversParentTypes['InboxTask'] | ResolversParentTypes['RemainingTask'] | ResolversParentTypes['Task'];
  Tree: Tree;
  TreeConnection: TreeConnection;
  TreeEdge: TreeEdge;
  TreeInterface: ResolversParentTypes['AncestorTree'] | ResolversParentTypes['ContentTree'] | ResolversParentTypes['DescendantTree'] | ResolversParentTypes['FollowingSibling'] | ResolversParentTypes['InboxTree'] | ResolversParentTypes['Leaf'] | ResolversParentTypes['LibraryTree'] | ResolversParentTypes['PrecedingSibling'] | ResolversParentTypes['QuickEntryTree'] | ResolversParentTypes['SelectedTree'] | ResolversParentTypes['SidebarTree'] | ResolversParentTypes['Tree'];
  Word: Word;
};

export type RecordTypeDirectiveArgs = { };

export type RecordTypeDirectiveResolver<Result, Parent, ContextType = any, Args = RecordTypeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type WhoseDirectiveArgs = {
  condition: Array<Condition>;
};

export type WhoseDirectiveResolver<Result, Parent, ContextType = any, Args = WhoseDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AncestorTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AncestorTree'] = ResolversParentTypes['AncestorTree']> = {
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AncestorTreeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AncestorTreeConnection'] = ResolversParentTypes['AncestorTreeConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['AncestorTree']>, ParentType, ContextType, RequireFields<AncestorTreeConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['AncestorTreeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AncestorTreeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AncestorTreeEdge'] = ResolversParentTypes['AncestorTreeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['AncestorTree'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Application'] = ResolversParentTypes['Application']> = {
  buildNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currentTimeOffset?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  defaultDocument?: Resolver<ResolversTypes['Document'], ParentType, ContextType>;
  documents?: Resolver<ResolversTypes['DocumentConnection'], ParentType, ContextType>;
  frontmost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  perspectiveNames?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  perspectives?: Resolver<ResolversTypes['PerspectiveConnection'], ParentType, ContextType>;
  preferences?: Resolver<ResolversTypes['PreferenceConnection'], ParentType, ContextType>;
  quickEntry?: Resolver<ResolversTypes['QuickEntryTree'], ParentType, ContextType>;
  referenceDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttachmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attachment'] = ResolversParentTypes['Attachment']> = {
  font?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  style?: Resolver<ResolversTypes['Style'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeRunResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeRun'] = ResolversParentTypes['AttributeRun']> = {
  font?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  style?: Resolver<ResolversTypes['Style'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AvailableTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['AvailableTask'] = ResolversParentTypes['AvailableTask']> = {
  blocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedByChildren?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  containingProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  droppedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectivelyCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  effectivelyDropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  estimatedMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedTasks?: Resolver<ResolversTypes['FlattenedTaskConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inInbox?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  modificationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  next?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  numberOfAvailableTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfCompletedTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parentTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  primaryTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  repetition?: Resolver<Maybe<ResolversTypes['RepetitionInterval']>, ParentType, ContextType>;
  repetitionRule?: Resolver<Maybe<ResolversTypes['RepetitionRule']>, ParentType, ContextType>;
  sequential?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shouldUseFloatingTimeZone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AvailableTaskConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AvailableTaskConnection'] = ResolversParentTypes['AvailableTaskConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['AvailableTask']>, ParentType, ContextType, RequireFields<AvailableTaskConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['AvailableTaskEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AvailableTaskEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AvailableTaskEdge'] = ResolversParentTypes['AvailableTaskEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['AvailableTask'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuiltinPerspectiveResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuiltinPerspective'] = ResolversParentTypes['BuiltinPerspective']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuiltinPerspectiveConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuiltinPerspectiveConnection'] = ResolversParentTypes['BuiltinPerspectiveConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['BuiltinPerspective']>, ParentType, ContextType, RequireFields<BuiltinPerspectiveConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['BuiltinPerspectiveEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuiltinPerspectiveEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuiltinPerspectiveEdge'] = ResolversParentTypes['BuiltinPerspectiveEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['BuiltinPerspective'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = {
  font?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  style?: Resolver<ResolversTypes['Style'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = {
  __resolveType: TypeResolveFn<'AncestorTreeConnection' | 'AvailableTaskConnection' | 'BuiltinPerspectiveConnection' | 'ContentTreeConnection' | 'CustomPerspectiveConnection' | 'DeprecatedContextConnection' | 'DescendantTreeConnection' | 'FlattenedFolderConnection' | 'FlattenedProjectConnection' | 'FlattenedTagConnection' | 'FlattenedTaskConnection' | 'FolderConnection' | 'FollowingSiblingConnection' | 'ForecastDayConnection' | 'InboxTaskConnection' | 'InboxTreeConnection' | 'LeafConnection' | 'LibraryTreeConnection' | 'NamedStyleConnection' | 'PerspectiveConnection' | 'PrecedingSiblingConnection' | 'PreferenceConnection' | 'ProjectConnection' | 'QuickEntryTreeConnection' | 'RemainingTaskConnection' | 'SectionConnection' | 'SelectedTreeConnection' | 'SettingConnection' | 'TagConnection' | 'TaskConnection' | 'TreeConnection', ParentType, ContextType>;
  byId?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<ConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['Edge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type ContentTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentTree'] = ResolversParentTypes['ContentTree']> = {
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  availableGroupingIdentifiers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  availableSortingIdentifiers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  availableTaskDurationFilterIdentifiers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  availableTaskFlaggedFilterIdentifiers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  availableTaskStateFilterIdentifiers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedGroupingIdentifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  selectedSortingIdentifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  selectedTaskDurationFilterIdentifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  selectedTaskFlaggedFilterIdentifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  selectedTaskStateFilterIdentifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentTreeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentTreeConnection'] = ResolversParentTypes['ContentTreeConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['ContentTree']>, ParentType, ContextType, RequireFields<ContentTreeConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['ContentTreeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentTreeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentTreeEdge'] = ResolversParentTypes['ContentTreeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ContentTree'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomPerspectiveResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomPerspective'] = ResolversParentTypes['CustomPerspective']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomPerspectiveConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomPerspectiveConnection'] = ResolversParentTypes['CustomPerspectiveConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['CustomPerspective']>, ParentType, ContextType, RequireFields<CustomPerspectiveConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['CustomPerspectiveEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomPerspectiveEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomPerspectiveEdge'] = ResolversParentTypes['CustomPerspectiveEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CustomPerspective'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeprecatedContextResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeprecatedContext'] = ResolversParentTypes['DeprecatedContext']> = {
  allowsNextAction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  availableTaskCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  availableTasks?: Resolver<ResolversTypes['AvailableTaskConnection'], ParentType, ContextType>;
  container?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>;
  deprecatedContexts?: Resolver<ResolversTypes['DeprecatedContextConnection'], ParentType, ContextType>;
  effectivelyHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedTags?: Resolver<ResolversTypes['FlattenedTagConnection'], ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['LocationInformation']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  remainingTaskCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  remainingTasks?: Resolver<ResolversTypes['RemainingTaskConnection'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeprecatedContextConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeprecatedContextConnection'] = ResolversParentTypes['DeprecatedContextConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['DeprecatedContext']>, ParentType, ContextType, RequireFields<DeprecatedContextConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['DeprecatedContextEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeprecatedContextEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeprecatedContextEdge'] = ResolversParentTypes['DeprecatedContextEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['DeprecatedContext'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DescendantTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DescendantTree'] = ResolversParentTypes['DescendantTree']> = {
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DescendantTreeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DescendantTreeConnection'] = ResolversParentTypes['DescendantTreeConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['DescendantTree']>, ParentType, ContextType, RequireFields<DescendantTreeConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['DescendantTreeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DescendantTreeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DescendantTreeEdge'] = ResolversParentTypes['DescendantTreeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['DescendantTree'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
  canRedo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canUndo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  compressesTransactions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  deprecatedContexts?: Resolver<ResolversTypes['DeprecatedContextConnection'], ParentType, ContextType>;
  disableAutomaticInboxCleanup?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedFolders?: Resolver<ResolversTypes['FlattenedFolderConnection'], ParentType, ContextType>;
  flattenedProjects?: Resolver<ResolversTypes['FlattenedProjectConnection'], ParentType, ContextType>;
  flattenedTags?: Resolver<ResolversTypes['FlattenedTagConnection'], ParentType, ContextType>;
  flattenedTasks?: Resolver<ResolversTypes['FlattenedTaskConnection'], ParentType, ContextType>;
  folders?: Resolver<ResolversTypes['FolderConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inboxTasks?: Resolver<ResolversTypes['InboxTaskConnection'], ParentType, ContextType>;
  includesSummaries?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastSyncDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastSyncError?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  perspectiveNames?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  perspectives?: Resolver<ResolversTypes['PerspectiveConnection'], ParentType, ContextType>;
  projects?: Resolver<ResolversTypes['ProjectConnection'], ParentType, ContextType>;
  quickEntry?: Resolver<ResolversTypes['QuickEntryTree'], ParentType, ContextType>;
  sections?: Resolver<ResolversTypes['SectionConnection'], ParentType, ContextType>;
  settings?: Resolver<ResolversTypes['SettingConnection'], ParentType, ContextType>;
  syncing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType>;
  willAutosave?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DocumentConnection'] = ResolversParentTypes['DocumentConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType, RequireFields<DocumentConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['DocumentEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DocumentEdge'] = ResolversParentTypes['DocumentEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Document'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']> = {
  __resolveType: TypeResolveFn<'AncestorTreeEdge' | 'AvailableTaskEdge' | 'BuiltinPerspectiveEdge' | 'ContentTreeEdge' | 'CustomPerspectiveEdge' | 'DeprecatedContextEdge' | 'DescendantTreeEdge' | 'FlattenedFolderEdge' | 'FlattenedProjectEdge' | 'FlattenedTagEdge' | 'FlattenedTaskEdge' | 'FolderEdge' | 'FollowingSiblingEdge' | 'ForecastDayEdge' | 'InboxTaskEdge' | 'InboxTreeEdge' | 'LeafEdge' | 'LibraryTreeEdge' | 'NamedStyleEdge' | 'PerspectiveEdge' | 'PrecedingSiblingEdge' | 'PreferenceEdge' | 'ProjectEdge' | 'QuickEntryTreeEdge' | 'RemainingTaskEdge' | 'SectionEdge' | 'SelectedTreeEdge' | 'SettingEdge' | 'TagEdge' | 'TaskEdge' | 'TreeEdge', ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Node'], ParentType, ContextType>;
};

export type FlattenedFolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlattenedFolder'] = ResolversParentTypes['FlattenedFolder']> = {
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  effectivelyHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedFolders?: Resolver<ResolversTypes['FlattenedFolderConnection'], ParentType, ContextType>;
  flattenedProjects?: Resolver<ResolversTypes['FlattenedProjectConnection'], ParentType, ContextType>;
  folders?: Resolver<ResolversTypes['FolderConnection'], ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modificationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  projects?: Resolver<ResolversTypes['ProjectConnection'], ParentType, ContextType>;
  sections?: Resolver<ResolversTypes['SectionConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlattenedFolderConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlattenedFolderConnection'] = ResolversParentTypes['FlattenedFolderConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['FlattenedFolder']>, ParentType, ContextType, RequireFields<FlattenedFolderConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['FlattenedFolderEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlattenedFolderEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlattenedFolderEdge'] = ResolversParentTypes['FlattenedFolderEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['FlattenedFolder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlattenedProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlattenedProject'] = ResolversParentTypes['FlattenedProject']> = {
  blocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedByChildren?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  defaultSingletonActionHolder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  deferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  droppedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveStatus?: Resolver<ResolversTypes['ProjectStatus'], ParentType, ContextType>;
  effectivelyCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  effectivelyDropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  estimatedMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  folder?: Resolver<Maybe<ResolversTypes['Folder']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastReviewDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modificationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nextDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextReviewDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  numberOfAvailableTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfCompletedTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  primaryTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  repetition?: Resolver<Maybe<ResolversTypes['RepetitionInterval']>, ParentType, ContextType>;
  repetitionRule?: Resolver<Maybe<ResolversTypes['RepetitionRule']>, ParentType, ContextType>;
  reviewInterval?: Resolver<ResolversTypes['RepetitionInterval'], ParentType, ContextType>;
  rootTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType>;
  sequential?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shouldUseFloatingTimeZone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  singletonActionHolder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ProjectStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlattenedProjectConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlattenedProjectConnection'] = ResolversParentTypes['FlattenedProjectConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['FlattenedProject']>, ParentType, ContextType, RequireFields<FlattenedProjectConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['FlattenedProjectEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlattenedProjectEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlattenedProjectEdge'] = ResolversParentTypes['FlattenedProjectEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['FlattenedProject'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlattenedTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlattenedTag'] = ResolversParentTypes['FlattenedTag']> = {
  allowsNextAction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  availableTaskCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  availableTasks?: Resolver<ResolversTypes['AvailableTaskConnection'], ParentType, ContextType>;
  container?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>;
  deprecatedContexts?: Resolver<ResolversTypes['DeprecatedContextConnection'], ParentType, ContextType>;
  effectivelyHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedTags?: Resolver<ResolversTypes['FlattenedTagConnection'], ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['LocationInformation']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  remainingTaskCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  remainingTasks?: Resolver<ResolversTypes['RemainingTaskConnection'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlattenedTagConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlattenedTagConnection'] = ResolversParentTypes['FlattenedTagConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['FlattenedTag']>, ParentType, ContextType, RequireFields<FlattenedTagConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['FlattenedTagEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlattenedTagEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlattenedTagEdge'] = ResolversParentTypes['FlattenedTagEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['FlattenedTag'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlattenedTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlattenedTask'] = ResolversParentTypes['FlattenedTask']> = {
  blocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedByChildren?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  containingProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  droppedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectivelyCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  effectivelyDropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  estimatedMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedTasks?: Resolver<ResolversTypes['FlattenedTaskConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inInbox?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  modificationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  next?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  numberOfAvailableTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfCompletedTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parentTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  primaryTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  repetition?: Resolver<Maybe<ResolversTypes['RepetitionInterval']>, ParentType, ContextType>;
  repetitionRule?: Resolver<Maybe<ResolversTypes['RepetitionRule']>, ParentType, ContextType>;
  sequential?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shouldUseFloatingTimeZone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlattenedTaskConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlattenedTaskConnection'] = ResolversParentTypes['FlattenedTaskConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['FlattenedTask']>, ParentType, ContextType, RequireFields<FlattenedTaskConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['FlattenedTaskEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlattenedTaskEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlattenedTaskEdge'] = ResolversParentTypes['FlattenedTaskEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['FlattenedTask'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = {
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  effectivelyHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedFolders?: Resolver<ResolversTypes['FlattenedFolderConnection'], ParentType, ContextType>;
  flattenedProjects?: Resolver<ResolversTypes['FlattenedProjectConnection'], ParentType, ContextType>;
  folders?: Resolver<ResolversTypes['FolderConnection'], ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modificationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  projects?: Resolver<ResolversTypes['ProjectConnection'], ParentType, ContextType>;
  sections?: Resolver<ResolversTypes['SectionConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FolderConnection'] = ResolversParentTypes['FolderConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['FolderInterface']>, ParentType, ContextType, RequireFields<FolderConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['FolderEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FolderEdge'] = ResolversParentTypes['FolderEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['FolderInterface'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['FolderInterface'] = ResolversParentTypes['FolderInterface']> = {
  __resolveType: TypeResolveFn<'FlattenedFolder' | 'Folder', ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  effectivelyHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedFolders?: Resolver<ResolversTypes['FlattenedFolderConnection'], ParentType, ContextType>;
  flattenedProjects?: Resolver<ResolversTypes['FlattenedProjectConnection'], ParentType, ContextType>;
  folders?: Resolver<ResolversTypes['FolderConnection'], ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modificationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  projects?: Resolver<ResolversTypes['ProjectConnection'], ParentType, ContextType>;
  sections?: Resolver<ResolversTypes['SectionConnection'], ParentType, ContextType>;
};

export type FollowingSiblingResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowingSibling'] = ResolversParentTypes['FollowingSibling']> = {
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowingSiblingConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowingSiblingConnection'] = ResolversParentTypes['FollowingSiblingConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['FollowingSibling']>, ParentType, ContextType, RequireFields<FollowingSiblingConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['FollowingSiblingEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowingSiblingEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowingSiblingEdge'] = ResolversParentTypes['FollowingSiblingEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['FollowingSibling'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForecastDayResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastDay'] = ResolversParentTypes['ForecastDay']> = {
  badgeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  empty?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForecastDayConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastDayConnection'] = ResolversParentTypes['ForecastDayConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['ForecastDay']>, ParentType, ContextType, RequireFields<ForecastDayConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['ForecastDayEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForecastDayEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastDayEdge'] = ResolversParentTypes['ForecastDayEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ForecastDay'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForecastDayInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastDayInterface'] = ResolversParentTypes['ForecastDayInterface']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  badgeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  empty?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ForecastSidebarTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastSidebarTree'] = ResolversParentTypes['ForecastSidebarTree']> = {
  availableSmartGroupIdentifiers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  forecastDays?: Resolver<ResolversTypes['ForecastDayConnection'], ParentType, ContextType>;
  selectedSmartGroupIdentifier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InboxTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxTask'] = ResolversParentTypes['InboxTask']> = {
  blocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedByChildren?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  containingProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  droppedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectivelyCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  effectivelyDropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  estimatedMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedTasks?: Resolver<ResolversTypes['FlattenedTaskConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inInbox?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  modificationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  next?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  numberOfAvailableTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfCompletedTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parentTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  primaryTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  repetition?: Resolver<Maybe<ResolversTypes['RepetitionInterval']>, ParentType, ContextType>;
  repetitionRule?: Resolver<Maybe<ResolversTypes['RepetitionRule']>, ParentType, ContextType>;
  sequential?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shouldUseFloatingTimeZone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InboxTaskConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxTaskConnection'] = ResolversParentTypes['InboxTaskConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['InboxTask']>, ParentType, ContextType, RequireFields<InboxTaskConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['InboxTaskEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InboxTaskEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxTaskEdge'] = ResolversParentTypes['InboxTaskEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['InboxTask'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InboxTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxTree'] = ResolversParentTypes['InboxTree']> = {
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InboxTreeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxTreeConnection'] = ResolversParentTypes['InboxTreeConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['InboxTree']>, ParentType, ContextType, RequireFields<InboxTreeConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['InboxTreeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InboxTreeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxTreeEdge'] = ResolversParentTypes['InboxTreeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['InboxTree'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LeafResolvers<ContextType = any, ParentType extends ResolversParentTypes['Leaf'] = ResolversParentTypes['Leaf']> = {
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LeafConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LeafConnection'] = ResolversParentTypes['LeafConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['Leaf']>, ParentType, ContextType, RequireFields<LeafConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['LeafEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LeafEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LeafEdge'] = ResolversParentTypes['LeafEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Leaf'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LibraryTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LibraryTree'] = ResolversParentTypes['LibraryTree']> = {
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LibraryTreeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LibraryTreeConnection'] = ResolversParentTypes['LibraryTreeConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['LibraryTree']>, ParentType, ContextType, RequireFields<LibraryTreeConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['LibraryTreeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LibraryTreeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LibraryTreeEdge'] = ResolversParentTypes['LibraryTreeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['LibraryTree'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationInformation'] = ResolversParentTypes['LocationInformation']> = {
  altitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  radius?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  trigger?: Resolver<ResolversTypes['LocationTrigger'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  pushInboxTask?: Resolver<ResolversTypes['InboxTask'], ParentType, ContextType, RequireFields<MutationPushInboxTaskArgs, 'name'>>;
};

export type NamedStyleResolvers<ContextType = any, ParentType extends ResolversParentTypes['NamedStyle'] = ResolversParentTypes['NamedStyle']> = {
  font?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namedStyles?: Resolver<ResolversTypes['NamedStyleConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NamedStyleConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['NamedStyleConnection'] = ResolversParentTypes['NamedStyleConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['NamedStyle']>, ParentType, ContextType, RequireFields<NamedStyleConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['NamedStyleEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NamedStyleEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['NamedStyleEdge'] = ResolversParentTypes['NamedStyleEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['NamedStyle'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NamedStyleInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['NamedStyleInterface'] = ResolversParentTypes['NamedStyleInterface']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'AncestorTree' | 'AvailableTask' | 'BuiltinPerspective' | 'ContentTree' | 'CustomPerspective' | 'DeprecatedContext' | 'DescendantTree' | 'FlattenedFolder' | 'FlattenedProject' | 'FlattenedTag' | 'FlattenedTask' | 'Folder' | 'FollowingSibling' | 'ForecastDay' | 'InboxTask' | 'InboxTree' | 'Leaf' | 'LibraryTree' | 'NamedStyle' | 'Perspective' | 'PrecedingSibling' | 'Preference' | 'Project' | 'QuickEntryTree' | 'RemainingTask' | 'Section' | 'SelectedTree' | 'Setting' | 'SidebarTree' | 'Tag' | 'Task' | 'Tree', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParagraphResolvers<ContextType = any, ParentType extends ResolversParentTypes['Paragraph'] = ResolversParentTypes['Paragraph']> = {
  font?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  style?: Resolver<ResolversTypes['Style'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PerspectiveResolvers<ContextType = any, ParentType extends ResolversParentTypes['Perspective'] = ResolversParentTypes['Perspective']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PerspectiveConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PerspectiveConnection'] = ResolversParentTypes['PerspectiveConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['PerspectiveInterface']>, ParentType, ContextType, RequireFields<PerspectiveConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['PerspectiveEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PerspectiveEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PerspectiveEdge'] = ResolversParentTypes['PerspectiveEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PerspectiveInterface'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PerspectiveInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['PerspectiveInterface'] = ResolversParentTypes['PerspectiveInterface']> = {
  __resolveType: TypeResolveFn<'BuiltinPerspective' | 'CustomPerspective' | 'Perspective', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type PrecedingSiblingResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrecedingSibling'] = ResolversParentTypes['PrecedingSibling']> = {
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrecedingSiblingConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrecedingSiblingConnection'] = ResolversParentTypes['PrecedingSiblingConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['PrecedingSibling']>, ParentType, ContextType, RequireFields<PrecedingSiblingConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['PrecedingSiblingEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrecedingSiblingEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrecedingSiblingEdge'] = ResolversParentTypes['PrecedingSiblingEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PrecedingSibling'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferenceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preference'] = ResolversParentTypes['Preference']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferenceConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PreferenceConnection'] = ResolversParentTypes['PreferenceConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['Preference']>, ParentType, ContextType, RequireFields<PreferenceConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['PreferenceEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferenceEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PreferenceEdge'] = ResolversParentTypes['PreferenceEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Preference'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferenceInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['PreferenceInterface'] = ResolversParentTypes['PreferenceInterface']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  blocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedByChildren?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  defaultSingletonActionHolder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  deferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  droppedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveStatus?: Resolver<ResolversTypes['ProjectStatus'], ParentType, ContextType>;
  effectivelyCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  effectivelyDropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  estimatedMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  folder?: Resolver<Maybe<ResolversTypes['Folder']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastReviewDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modificationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nextDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextReviewDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  numberOfAvailableTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfCompletedTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  primaryTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  repetition?: Resolver<Maybe<ResolversTypes['RepetitionInterval']>, ParentType, ContextType>;
  repetitionRule?: Resolver<Maybe<ResolversTypes['RepetitionRule']>, ParentType, ContextType>;
  reviewInterval?: Resolver<ResolversTypes['RepetitionInterval'], ParentType, ContextType>;
  rootTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType>;
  sequential?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shouldUseFloatingTimeZone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  singletonActionHolder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ProjectStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectConnection'] = ResolversParentTypes['ProjectConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['ProjectInterface']>, ParentType, ContextType, RequireFields<ProjectConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['ProjectEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectEdge'] = ResolversParentTypes['ProjectEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ProjectInterface'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectInterface'] = ResolversParentTypes['ProjectInterface']> = {
  __resolveType: TypeResolveFn<'FlattenedProject' | 'Project', ParentType, ContextType>;
  blocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedByChildren?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  defaultSingletonActionHolder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  deferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  droppedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveStatus?: Resolver<ResolversTypes['ProjectStatus'], ParentType, ContextType>;
  effectivelyCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  effectivelyDropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  estimatedMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  folder?: Resolver<Maybe<ResolversTypes['Folder']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastReviewDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modificationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nextDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextReviewDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  numberOfAvailableTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfCompletedTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  primaryTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  repetition?: Resolver<Maybe<ResolversTypes['RepetitionInterval']>, ParentType, ContextType>;
  repetitionRule?: Resolver<Maybe<ResolversTypes['RepetitionRule']>, ParentType, ContextType>;
  reviewInterval?: Resolver<ResolversTypes['RepetitionInterval'], ParentType, ContextType>;
  rootTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType>;
  sequential?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shouldUseFloatingTimeZone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  singletonActionHolder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ProjectStatus'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  application?: Resolver<ResolversTypes['Application'], ParentType, ContextType>;
};

export type QuickEntryTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuickEntryTree'] = ResolversParentTypes['QuickEntryTree']> = {
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  deprecatedContexts?: Resolver<ResolversTypes['DeprecatedContextConnection'], ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  folders?: Resolver<ResolversTypes['FolderConnection'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inboxTasks?: Resolver<ResolversTypes['InboxTaskConnection'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  projects?: Resolver<ResolversTypes['ProjectConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
  visible?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuickEntryTreeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuickEntryTreeConnection'] = ResolversParentTypes['QuickEntryTreeConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['QuickEntryTree']>, ParentType, ContextType, RequireFields<QuickEntryTreeConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['QuickEntryTreeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuickEntryTreeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuickEntryTreeEdge'] = ResolversParentTypes['QuickEntryTreeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['QuickEntryTree'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemainingTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemainingTask'] = ResolversParentTypes['RemainingTask']> = {
  blocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedByChildren?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  containingProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  droppedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectivelyCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  effectivelyDropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  estimatedMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedTasks?: Resolver<ResolversTypes['FlattenedTaskConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inInbox?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  modificationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  next?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  numberOfAvailableTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfCompletedTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parentTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  primaryTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  repetition?: Resolver<Maybe<ResolversTypes['RepetitionInterval']>, ParentType, ContextType>;
  repetitionRule?: Resolver<Maybe<ResolversTypes['RepetitionRule']>, ParentType, ContextType>;
  sequential?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shouldUseFloatingTimeZone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemainingTaskConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemainingTaskConnection'] = ResolversParentTypes['RemainingTaskConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['RemainingTask']>, ParentType, ContextType, RequireFields<RemainingTaskConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['RemainingTaskEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemainingTaskEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemainingTaskEdge'] = ResolversParentTypes['RemainingTaskEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['RemainingTask'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RepetitionIntervalResolvers<ContextType = any, ParentType extends ResolversParentTypes['RepetitionInterval'] = ResolversParentTypes['RepetitionInterval']> = {
  fixed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  steps?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['IntervalUnit'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RepetitionRuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['RepetitionRule'] = ResolversParentTypes['RepetitionRule']> = {
  recurrence?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  repetitionMethod?: Resolver<ResolversTypes['RepetitionMethod'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RichTextResolvers<ContextType = any, ParentType extends ResolversParentTypes['RichText'] = ResolversParentTypes['RichText']> = {
  alignment?: Resolver<ResolversTypes['TextAlignment'], ParentType, ContextType>;
  baselineOffset?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  font?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  style?: Resolver<ResolversTypes['Style'], ParentType, ContextType>;
  superscript?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  underlined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RichTextInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['RichTextInterface'] = ResolversParentTypes['RichTextInterface']> = {
  __resolveType: TypeResolveFn<'Attachment' | 'AttributeRun' | 'Character' | 'Paragraph' | 'RichText' | 'Word', ParentType, ContextType>;
  font?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  style?: Resolver<ResolversTypes['Style'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SectionConnection'] = ResolversParentTypes['SectionConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['SectionInterface']>, ParentType, ContextType, RequireFields<SectionConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['SectionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SectionEdge'] = ResolversParentTypes['SectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['SectionInterface'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['SectionInterface'] = ResolversParentTypes['SectionInterface']> = {
  __resolveType: TypeResolveFn<'Folder' | 'Project' | 'Section', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SelectedTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SelectedTree'] = ResolversParentTypes['SelectedTree']> = {
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SelectedTreeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SelectedTreeConnection'] = ResolversParentTypes['SelectedTreeConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['SelectedTree']>, ParentType, ContextType, RequireFields<SelectedTreeConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['SelectedTreeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SelectedTreeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SelectedTreeEdge'] = ResolversParentTypes['SelectedTreeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['SelectedTree'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SettingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Setting'] = ResolversParentTypes['Setting']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SettingConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SettingConnection'] = ResolversParentTypes['SettingConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['Setting']>, ParentType, ContextType, RequireFields<SettingConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['SettingEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SettingEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SettingEdge'] = ResolversParentTypes['SettingEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Setting'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SettingInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['SettingInterface'] = ResolversParentTypes['SettingInterface']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SidebarTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SidebarTree'] = ResolversParentTypes['SidebarTree']> = {
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  availableSmartGroupIdentifiers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedSmartGroupIdentifier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SidebarTreeInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['SidebarTreeInterface'] = ResolversParentTypes['SidebarTreeInterface']> = {
  __resolveType: TypeResolveFn<'ForecastSidebarTree' | 'SidebarTree', ParentType, ContextType>;
  availableSmartGroupIdentifiers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  selectedSmartGroupIdentifier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type StyleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Style'] = ResolversParentTypes['Style']> = {
  font?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namedStyles?: Resolver<ResolversTypes['NamedStyleConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StyleInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['StyleInterface'] = ResolversParentTypes['StyleInterface']> = {
  __resolveType: TypeResolveFn<'NamedStyle' | 'Style', ParentType, ContextType>;
  font?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namedStyles?: Resolver<ResolversTypes['NamedStyleConnection'], ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  allowsNextAction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  availableTaskCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  availableTasks?: Resolver<ResolversTypes['AvailableTaskConnection'], ParentType, ContextType>;
  container?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>;
  deprecatedContexts?: Resolver<ResolversTypes['DeprecatedContextConnection'], ParentType, ContextType>;
  effectivelyHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedTags?: Resolver<ResolversTypes['FlattenedTagConnection'], ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['LocationInformation']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  remainingTaskCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  remainingTasks?: Resolver<ResolversTypes['RemainingTaskConnection'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagConnection'] = ResolversParentTypes['TagConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['TagInterface']>, ParentType, ContextType, RequireFields<TagConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['TagEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagEdge'] = ResolversParentTypes['TagEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['TagInterface'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagInterface'] = ResolversParentTypes['TagInterface']> = {
  __resolveType: TypeResolveFn<'DeprecatedContext' | 'FlattenedTag' | 'Tag', ParentType, ContextType>;
  allowsNextAction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  availableTaskCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  availableTasks?: Resolver<ResolversTypes['AvailableTaskConnection'], ParentType, ContextType>;
  container?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>;
  deprecatedContexts?: Resolver<ResolversTypes['DeprecatedContextConnection'], ParentType, ContextType>;
  effectivelyHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedTags?: Resolver<ResolversTypes['FlattenedTagConnection'], ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['LocationInformation']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  remainingTaskCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  remainingTasks?: Resolver<ResolversTypes['RemainingTaskConnection'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  blocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedByChildren?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  containingProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  droppedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectivelyCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  effectivelyDropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  estimatedMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedTasks?: Resolver<ResolversTypes['FlattenedTaskConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inInbox?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  modificationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  next?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  numberOfAvailableTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfCompletedTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parentTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  primaryTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  repetition?: Resolver<Maybe<ResolversTypes['RepetitionInterval']>, ParentType, ContextType>;
  repetitionRule?: Resolver<Maybe<ResolversTypes['RepetitionRule']>, ParentType, ContextType>;
  sequential?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shouldUseFloatingTimeZone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskConnection'] = ResolversParentTypes['TaskConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['TaskInterface']>, ParentType, ContextType, RequireFields<TaskConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['TaskEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskEdge'] = ResolversParentTypes['TaskEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['TaskInterface'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskInterface'] = ResolversParentTypes['TaskInterface']> = {
  __resolveType: TypeResolveFn<'AvailableTask' | 'FlattenedTask' | 'InboxTask' | 'RemainingTask' | 'Task', ParentType, ContextType>;
  blocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedByChildren?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  containingProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  droppedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectiveDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effectivelyCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  effectivelyDropped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  estimatedMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flattenedTasks?: Resolver<ResolversTypes['FlattenedTaskConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inInbox?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  modificationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  next?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextDeferDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextDueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<ResolversTypes['RichText'], ParentType, ContextType>;
  numberOfAvailableTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfCompletedTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parentTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  primaryTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  repetition?: Resolver<Maybe<ResolversTypes['RepetitionInterval']>, ParentType, ContextType>;
  repetitionRule?: Resolver<Maybe<ResolversTypes['RepetitionRule']>, ParentType, ContextType>;
  sequential?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shouldUseFloatingTimeZone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagConnection'], ParentType, ContextType>;
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType>;
};

export type TreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tree'] = ResolversParentTypes['Tree']> = {
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TreeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TreeConnection'] = ResolversParentTypes['TreeConnection']> = {
  byId?: Resolver<Maybe<ResolversTypes['TreeInterface']>, ParentType, ContextType, RequireFields<TreeConnectionByIdArgs, 'id'>>;
  edges?: Resolver<Array<ResolversTypes['TreeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TreeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TreeEdge'] = ResolversParentTypes['TreeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['TreeInterface'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TreeInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['TreeInterface'] = ResolversParentTypes['TreeInterface']> = {
  __resolveType: TypeResolveFn<'AncestorTree' | 'ContentTree' | 'DescendantTree' | 'FollowingSibling' | 'InboxTree' | 'Leaf' | 'LibraryTree' | 'PrecedingSibling' | 'QuickEntryTree' | 'SelectedTree' | 'SidebarTree' | 'Tree', ParentType, ContextType>;
  ancestorTrees?: Resolver<ResolversTypes['AncestorTreeConnection'], ParentType, ContextType>;
  descendantTrees?: Resolver<ResolversTypes['DescendantTreeConnection'], ParentType, ContextType>;
  expanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingSiblings?: Resolver<ResolversTypes['FollowingSiblingConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leafs?: Resolver<ResolversTypes['LeafConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noteExpanded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  precedingSiblings?: Resolver<ResolversTypes['PrecedingSiblingConnection'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedTrees?: Resolver<ResolversTypes['SelectedTreeConnection'], ParentType, ContextType>;
  trees?: Resolver<ResolversTypes['TreeConnection'], ParentType, ContextType>;
};

export type WordResolvers<ContextType = any, ParentType extends ResolversParentTypes['Word'] = ResolversParentTypes['Word']> = {
  font?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  style?: Resolver<ResolversTypes['Style'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AncestorTree?: AncestorTreeResolvers<ContextType>;
  AncestorTreeConnection?: AncestorTreeConnectionResolvers<ContextType>;
  AncestorTreeEdge?: AncestorTreeEdgeResolvers<ContextType>;
  Application?: ApplicationResolvers<ContextType>;
  Attachment?: AttachmentResolvers<ContextType>;
  AttributeRun?: AttributeRunResolvers<ContextType>;
  AvailableTask?: AvailableTaskResolvers<ContextType>;
  AvailableTaskConnection?: AvailableTaskConnectionResolvers<ContextType>;
  AvailableTaskEdge?: AvailableTaskEdgeResolvers<ContextType>;
  BuiltinPerspective?: BuiltinPerspectiveResolvers<ContextType>;
  BuiltinPerspectiveConnection?: BuiltinPerspectiveConnectionResolvers<ContextType>;
  BuiltinPerspectiveEdge?: BuiltinPerspectiveEdgeResolvers<ContextType>;
  Character?: CharacterResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  ContentTree?: ContentTreeResolvers<ContextType>;
  ContentTreeConnection?: ContentTreeConnectionResolvers<ContextType>;
  ContentTreeEdge?: ContentTreeEdgeResolvers<ContextType>;
  CustomPerspective?: CustomPerspectiveResolvers<ContextType>;
  CustomPerspectiveConnection?: CustomPerspectiveConnectionResolvers<ContextType>;
  CustomPerspectiveEdge?: CustomPerspectiveEdgeResolvers<ContextType>;
  DeprecatedContext?: DeprecatedContextResolvers<ContextType>;
  DeprecatedContextConnection?: DeprecatedContextConnectionResolvers<ContextType>;
  DeprecatedContextEdge?: DeprecatedContextEdgeResolvers<ContextType>;
  DescendantTree?: DescendantTreeResolvers<ContextType>;
  DescendantTreeConnection?: DescendantTreeConnectionResolvers<ContextType>;
  DescendantTreeEdge?: DescendantTreeEdgeResolvers<ContextType>;
  Document?: DocumentResolvers<ContextType>;
  DocumentConnection?: DocumentConnectionResolvers<ContextType>;
  DocumentEdge?: DocumentEdgeResolvers<ContextType>;
  Edge?: EdgeResolvers<ContextType>;
  FlattenedFolder?: FlattenedFolderResolvers<ContextType>;
  FlattenedFolderConnection?: FlattenedFolderConnectionResolvers<ContextType>;
  FlattenedFolderEdge?: FlattenedFolderEdgeResolvers<ContextType>;
  FlattenedProject?: FlattenedProjectResolvers<ContextType>;
  FlattenedProjectConnection?: FlattenedProjectConnectionResolvers<ContextType>;
  FlattenedProjectEdge?: FlattenedProjectEdgeResolvers<ContextType>;
  FlattenedTag?: FlattenedTagResolvers<ContextType>;
  FlattenedTagConnection?: FlattenedTagConnectionResolvers<ContextType>;
  FlattenedTagEdge?: FlattenedTagEdgeResolvers<ContextType>;
  FlattenedTask?: FlattenedTaskResolvers<ContextType>;
  FlattenedTaskConnection?: FlattenedTaskConnectionResolvers<ContextType>;
  FlattenedTaskEdge?: FlattenedTaskEdgeResolvers<ContextType>;
  Folder?: FolderResolvers<ContextType>;
  FolderConnection?: FolderConnectionResolvers<ContextType>;
  FolderEdge?: FolderEdgeResolvers<ContextType>;
  FolderInterface?: FolderInterfaceResolvers<ContextType>;
  FollowingSibling?: FollowingSiblingResolvers<ContextType>;
  FollowingSiblingConnection?: FollowingSiblingConnectionResolvers<ContextType>;
  FollowingSiblingEdge?: FollowingSiblingEdgeResolvers<ContextType>;
  ForecastDay?: ForecastDayResolvers<ContextType>;
  ForecastDayConnection?: ForecastDayConnectionResolvers<ContextType>;
  ForecastDayEdge?: ForecastDayEdgeResolvers<ContextType>;
  ForecastDayInterface?: ForecastDayInterfaceResolvers<ContextType>;
  ForecastSidebarTree?: ForecastSidebarTreeResolvers<ContextType>;
  InboxTask?: InboxTaskResolvers<ContextType>;
  InboxTaskConnection?: InboxTaskConnectionResolvers<ContextType>;
  InboxTaskEdge?: InboxTaskEdgeResolvers<ContextType>;
  InboxTree?: InboxTreeResolvers<ContextType>;
  InboxTreeConnection?: InboxTreeConnectionResolvers<ContextType>;
  InboxTreeEdge?: InboxTreeEdgeResolvers<ContextType>;
  Leaf?: LeafResolvers<ContextType>;
  LeafConnection?: LeafConnectionResolvers<ContextType>;
  LeafEdge?: LeafEdgeResolvers<ContextType>;
  LibraryTree?: LibraryTreeResolvers<ContextType>;
  LibraryTreeConnection?: LibraryTreeConnectionResolvers<ContextType>;
  LibraryTreeEdge?: LibraryTreeEdgeResolvers<ContextType>;
  LocationInformation?: LocationInformationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NamedStyle?: NamedStyleResolvers<ContextType>;
  NamedStyleConnection?: NamedStyleConnectionResolvers<ContextType>;
  NamedStyleEdge?: NamedStyleEdgeResolvers<ContextType>;
  NamedStyleInterface?: NamedStyleInterfaceResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Paragraph?: ParagraphResolvers<ContextType>;
  Perspective?: PerspectiveResolvers<ContextType>;
  PerspectiveConnection?: PerspectiveConnectionResolvers<ContextType>;
  PerspectiveEdge?: PerspectiveEdgeResolvers<ContextType>;
  PerspectiveInterface?: PerspectiveInterfaceResolvers<ContextType>;
  PrecedingSibling?: PrecedingSiblingResolvers<ContextType>;
  PrecedingSiblingConnection?: PrecedingSiblingConnectionResolvers<ContextType>;
  PrecedingSiblingEdge?: PrecedingSiblingEdgeResolvers<ContextType>;
  Preference?: PreferenceResolvers<ContextType>;
  PreferenceConnection?: PreferenceConnectionResolvers<ContextType>;
  PreferenceEdge?: PreferenceEdgeResolvers<ContextType>;
  PreferenceInterface?: PreferenceInterfaceResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectConnection?: ProjectConnectionResolvers<ContextType>;
  ProjectEdge?: ProjectEdgeResolvers<ContextType>;
  ProjectInterface?: ProjectInterfaceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QuickEntryTree?: QuickEntryTreeResolvers<ContextType>;
  QuickEntryTreeConnection?: QuickEntryTreeConnectionResolvers<ContextType>;
  QuickEntryTreeEdge?: QuickEntryTreeEdgeResolvers<ContextType>;
  RemainingTask?: RemainingTaskResolvers<ContextType>;
  RemainingTaskConnection?: RemainingTaskConnectionResolvers<ContextType>;
  RemainingTaskEdge?: RemainingTaskEdgeResolvers<ContextType>;
  RepetitionInterval?: RepetitionIntervalResolvers<ContextType>;
  RepetitionRule?: RepetitionRuleResolvers<ContextType>;
  RichText?: RichTextResolvers<ContextType>;
  RichTextInterface?: RichTextInterfaceResolvers<ContextType>;
  Section?: SectionResolvers<ContextType>;
  SectionConnection?: SectionConnectionResolvers<ContextType>;
  SectionEdge?: SectionEdgeResolvers<ContextType>;
  SectionInterface?: SectionInterfaceResolvers<ContextType>;
  SelectedTree?: SelectedTreeResolvers<ContextType>;
  SelectedTreeConnection?: SelectedTreeConnectionResolvers<ContextType>;
  SelectedTreeEdge?: SelectedTreeEdgeResolvers<ContextType>;
  Setting?: SettingResolvers<ContextType>;
  SettingConnection?: SettingConnectionResolvers<ContextType>;
  SettingEdge?: SettingEdgeResolvers<ContextType>;
  SettingInterface?: SettingInterfaceResolvers<ContextType>;
  SidebarTree?: SidebarTreeResolvers<ContextType>;
  SidebarTreeInterface?: SidebarTreeInterfaceResolvers<ContextType>;
  Style?: StyleResolvers<ContextType>;
  StyleInterface?: StyleInterfaceResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagConnection?: TagConnectionResolvers<ContextType>;
  TagEdge?: TagEdgeResolvers<ContextType>;
  TagInterface?: TagInterfaceResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskConnection?: TaskConnectionResolvers<ContextType>;
  TaskEdge?: TaskEdgeResolvers<ContextType>;
  TaskInterface?: TaskInterfaceResolvers<ContextType>;
  Tree?: TreeResolvers<ContextType>;
  TreeConnection?: TreeConnectionResolvers<ContextType>;
  TreeEdge?: TreeEdgeResolvers<ContextType>;
  TreeInterface?: TreeInterfaceResolvers<ContextType>;
  Word?: WordResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  recordType?: RecordTypeDirectiveResolver<any, any, ContextType>;
  whose?: WhoseDirectiveResolver<any, any, ContextType>;
};

export const TaskViewModelFragmentDoc = gql`
    fragment TaskViewModel on TaskInterface {
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
export const ProjectViewModelFragmentDoc = gql`
    fragment ProjectViewModel on ProjectInterface {
  name
  completed
  id
  numberOfAvailableTasks
}
    `;
export const TopLevelProjectsFragmentDoc = gql`
    fragment TopLevelProjects on Document {
  projects {
    edges {
      node {
        ...ProjectViewModel
      }
    }
  }
}
    ${ProjectViewModelFragmentDoc}`;
export const FolderedProjectDepth1FragmentDoc = gql`
    fragment FolderedProjectDepth1 on Document {
  folders {
    edges {
      node {
        name
        id
        projects {
          edges {
            node {
              ...ProjectViewModel
            }
          }
        }
      }
    }
  }
}
    ${ProjectViewModelFragmentDoc}`;
export const FolderedTagDepth1FragmentDoc = gql`
    fragment FolderedTagDepth1 on Document {
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
    `;
export const FolderedTagDepth2FragmentDoc = gql`
    fragment FolderedTagDepth2 on Document {
  tags {
    edges {
      node {
        name
        id
        availableTaskCount
        tags {
          edges {
            node {
              name
              id
              availableTaskCount
              tags {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const GetTasksDocument = gql`
    query GetTasks($onlyFlagged: Boolean! = false, $onlyAvailable: Boolean! = false, $withEffectiveDueDate: Boolean! = false) {
  application {
    defaultDocument {
      flattenedTasks @whose(condition: {operator: "and", operands: [{field: "effectivelyCompleted", value: "false"}, {field: "flagged", enabled: $onlyFlagged}, {operator: "not", operands: [{field: "effectiveDeferDate", value: "null", enabled: $withEffectiveDueDate}]}, {enabled: $onlyAvailable, operator: "or", operands: [{field: "effectiveDeferDate", operator: "=", value: "null"}, {field: "effectiveDeferDate", operator: "<", value: "new Date()"}]}]}) {
        edges {
          node {
            ...TaskViewModel
          }
        }
      }
    }
  }
}
    ${TaskViewModelFragmentDoc}`;
export const GetInboxTasksDocument = gql`
    query GetInboxTasks {
  application {
    defaultDocument {
      inboxTasks @whose(condition: {operator: "and", operands: [{field: "effectivelyCompleted", value: "false"}, {operator: "or", operands: [{field: "effectiveDeferDate", operator: "=", value: "null"}, {field: "effectiveDeferDate", operator: "<", value: "new Date()"}]}]}) {
        edges {
          node {
            ...TaskViewModel
          }
        }
      }
    }
  }
}
    ${TaskViewModelFragmentDoc}`;
export const GetTasksInProjectDocument = gql`
    query GetTasksInProject($projectId: String!) {
  application {
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
}
    ${TaskViewModelFragmentDoc}`;
export const GetNestedProjectsDocument = gql`
    query GetNestedProjects {
  application {
    defaultDocument {
      ...FolderedProjectDepth1
    }
  }
}
    ${FolderedProjectDepth1FragmentDoc}`;
export const GetTasksWithTagDocument = gql`
    query GetTasksWithTag($tagId: String!) {
  application {
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
}
    ${TaskViewModelFragmentDoc}`;
export const GetTopLevelProjectsDocument = gql`
    query GetTopLevelProjects {
  application {
    defaultDocument {
      ...FolderedProjectDepth1
      ...TopLevelProjects
    }
  }
}
    ${FolderedProjectDepth1FragmentDoc}
${TopLevelProjectsFragmentDoc}`;
export const GetTaskCreationSupportInfoDocument = gql`
    query GetTaskCreationSupportInfo {
  application {
    defaultDocument {
      ...FolderedProjectDepth1
      ...TopLevelProjects
      ...FolderedTagDepth1
    }
  }
}
    ${FolderedProjectDepth1FragmentDoc}
${TopLevelProjectsFragmentDoc}
${FolderedTagDepth1FragmentDoc}`;
export const GetNestedTagsDocument = gql`
    query GetNestedTags {
  application {
    defaultDocument {
      ...FolderedTagDepth2
    }
  }
}
    ${FolderedTagDepth2FragmentDoc}`;
export const GetNestedTagsFromDocument = gql`
    query GetNestedTagsFrom($tagId: String!) {
  application {
    defaultDocument {
      tags {
        byId(id: $tagId) {
          id
          name
          tags {
            edges {
              node {
                name
                id
                availableTaskCount
                tags {
                  edges {
                    node {
                      name
                      id
                      availableTaskCount
                      tags {
                        edges {
                          node {
                            id
                          }
                        }
                      }
                    }
                  }
                }
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
  application {
    defaultDocument {
      perspectiveNames
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
    GetNestedTagsFrom(variables: GetNestedTagsFromQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNestedTagsFromQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNestedTagsFromQuery>(GetNestedTagsFromDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNestedTagsFrom');
    },
    GetPerspectiveNames(variables?: GetPerspectiveNamesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPerspectiveNamesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPerspectiveNamesQuery>(GetPerspectiveNamesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPerspectiveNames');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;