import React from "react";

export type ListItem = {
  itemInfo: React.ReactNode;
  subList?: ListItem[];
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
            <React.Fragment key={`SIMPLE_LIST_ITEM_${listItemIndex}`}>
              <li>{listItem.itemInfo}</li>
              {listItem.subList && <SimpleList list={listItem.subList} />}
            </React.Fragment>
          )
      )}
    </ul>
  );
};
