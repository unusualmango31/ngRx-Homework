export class DateOperations {
  static getStringCurrentDate(): string {
    const today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear();

    return  yyyy + "-" + mm + "-" + dd;
  }
  static dateToString(date: Date): string {
    const dd = String(date.getDate()).padStart(2, "0"),
          mm = String(date.getMonth() + 1).padStart(2, "0"),
          yyyy = date.getFullYear();

    return  yyyy + "-" + mm + "-" + dd;
  }
  static transformToCorrectDate(dateStr: string): string {
    const yyyy = dateStr.slice(0, 4),
          mm = dateStr.slice(5, 7),
          dd = dateStr.slice(8, 10);

    return dd + "." + mm + "." + yyyy;
  }
  static convertToInputDate(dateStr: string): string {
    return DateOperations.dateToString(DateOperations.convertToDate(dateStr));
  }
  static convertToDate(dateStr: string): Date {
    const dd = Number(dateStr.slice(0, 2)),
          mm = Number(dateStr.slice(3, 5)),
          yyyy = Number(dateStr.slice(6, 10));

    return new Date(yyyy, mm, dd);
  }
}
