export interface IParser<T1> {
  parse <T2>(content: T2): T1
}
