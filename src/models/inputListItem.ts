class inputListItem {
  value: string;
  isTuched: boolean;
  id: string;

  constructor(
  ) {
    this.value = "";
    this.isTuched = false;
    this.id = Math.random().toString();
  }
}

export default inputListItem;