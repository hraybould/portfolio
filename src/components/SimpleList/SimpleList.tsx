import React from "react";

export type ListItem = {
  itemInfo: React.ReactNode;
  sublist?: ListItem[];
  visible: boolean;
};

interface SimpleListProps {
  list: ListItem[];
}

export const SimpleList: React.FC<SimpleListProps> = ({ list }) => {
  if (!list.some((listItem) => listItem.visible)) {
    return null;
  }
  return (
    <ul>
      {list.map(
        (listItem, listItemIndex) =>
          listItem.visible && (
            <React.Fragment key={listItemIndex}>
              <li>{listItem.itemInfo}</li>
              {listItem.sublist && <SimpleList list={listItem.sublist} />}
            </React.Fragment>
          )
      )}
    </ul>
  );
};
