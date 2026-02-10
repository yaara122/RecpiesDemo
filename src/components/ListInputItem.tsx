import { useRef } from "react";
import inputListItem from "../models/inputListItem";

const ListInputItems: React.FC<{
  item: inputListItem;
  deleteItem: (id: string) => void;
  addItem: () => void;
  updateItemVal: (id: string, value:string ) => void;
  toggleIsTuched: (id: string, isTuched: boolean) => void;
}> = (props) => {

// make user that the default value works
  const { item, deleteItem, addItem, updateItemVal } = props;
  const currentInput = useRef<HTMLInputElement>(null);

  const inputTextChangeHandler = () => {
    if (!item.isTuched) {
      props.toggleIsTuched(item.id, item.isTuched);
      addItem();
    }
    if (currentInput.current.value === "" && item.isTuched) {
      deleteItem(item.id);
    } else {
      updateItemVal(item.id, currentInput.current.value);
    }
  };

  return (
    <input
      type="text"
      onChange={inputTextChangeHandler}
      ref={currentInput}
      value={item.value}
      defaultValue={item.value}
    ></input>
  );
};

export default ListInputItems;
