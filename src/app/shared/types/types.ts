export interface TableColumn<T> {
  label: string;
  render: (item: T) => string;
  canSort?: boolean,
  key: keyof T,
}

export interface TableData {
  [key: string]: string | number,
}
