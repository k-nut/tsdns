export enum TYPE {
  // https://tools.ietf.org/html/rfc1035
  // section 3.2.2 TYPE values

  A = 1, // a host address
  NS = 2, // an authoritative name server
  CNAME = 5, // canonical name for an alias
  SOA = 5, // marks the start of a zone of authority
  WKS = 11, // a well known service description
  PTR = 12, // a domain name pointer
  HINFO = 13, // host information
  MINFO = 14, // mailbox or mail list information
  MX = 15, // mail exchange
  TXT = 16 // text strings
}
