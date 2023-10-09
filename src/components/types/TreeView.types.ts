import { NodeApi } from "react-arborist";

export type Code = {
  id: string;
  name: string;
  text: string;
  extension: string;
  type?: string;
  children?: TreeNode[];
};

export type Directory = {
  id: string;
  name: string;
  directories?: Directory[];
  codes?: Code[];
  type?: string;
  children?: TreeNode[];
  isClosed?: boolean;
};

export type TreeNode = Directory | Code;

export type onCreateArgs = {
  parentId: string | null;
  index: number;
  type: string;
  parentNode: NodeApi<Code | Directory> | null;
};

export type onDeleteArgs = {
  ids: string[];
  nodes: NodeApi<Code | Directory>[];
};

export type onRenameArgs = {
  id: string;
  name: string;
  node: NodeApi<Code | Directory>;
};
