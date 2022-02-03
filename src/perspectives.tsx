import { ActionPanel, Detail, List, PushAction } from "@raycast/api";
import { useEffect, useState } from "react";
import { omniFunc } from "@jacobx1/of-sdk";

interface Perspective {
  title: string;
}

export const getPerspectives = omniFunc(function () {
  return this.Perspective.all;
}, {});

export default function Command() {
  const [perspectives, setPerspectives] = useState<Perspective[]>([]);
  useEffect(() => {
    const loadPerspectives = async () => {
      const perspectives: ({ name: string } | null)[] = await getPerspectives();

      const items: Perspective[] = [];
      perspectives.forEach((p) => {
        if (p === null) {
          return;
        }
        items.push({ title: p.name });
      });
      setPerspectives(items);
    };
    loadPerspectives();
  }, []);
  return (
    <List>
      {perspectives.map((p) => (
        <List.Item
          title={p.title}
          key={p.title}
          actions={
            <ActionPanel>
              <PushAction title="Show Details" target={<Detail markdown="# Hey! 👋" />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
