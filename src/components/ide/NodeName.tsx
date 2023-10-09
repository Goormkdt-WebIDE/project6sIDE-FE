import React from "react";
import { NodeApi } from "react-arborist";
import { Code, Directory } from "../types/TreeView.types";

type Props = {
  node: NodeApi<Code | Directory>;
};

export default function NodeName({ node }: Props) {
  return (
    <>
      {node.isEditing ? (
        <input
          type="text"
          defaultValue={node.data.name}
          onFocus={(e) => e.currentTarget.select()}
          onBlur={() => node.reset()}
          onKeyDown={(e) => {
            if (e.key === "Escape") node.reset();
            if (e.key === "Enter") node.submit(e.currentTarget.value);
          }}
          autoFocus
        />
      ) : (
        <h3>{node.data.name}</h3>
      )}
    </>
  );
}
