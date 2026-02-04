import { useRef } from "react";

const ListInputItems = (props) => {
  const { item, deleteItem, addItem, updateItemVal } = props;
  const currentInput = useRef(item.value);

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
    ></input>
  );
};

export default ListInputItems;
